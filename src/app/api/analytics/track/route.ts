import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type GeoPayload = {
  city?: string;
  country?: { code?: string; name?: string };
  subdivision?: { code?: string; name?: string };
  latitude?: number;
  longitude?: number;
};

function parseNetlifyGeo(headerValue: string | null): {
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
} | null {
  if (!headerValue) return null;
  try {
    const decoded = Buffer.from(headerValue, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded) as GeoPayload;
    return {
      country: parsed.country?.name,
      countryCode: parsed.country?.code,
      region: parsed.subdivision?.name,
      city: parsed.city,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };
  } catch {
    return null;
  }
}

function parseDevice(ua: string): "desktop" | "mobile" | "tablet" {
  const lower = ua.toLowerCase();
  if (lower.includes("tablet") || lower.includes("ipad")) return "tablet";
  if (lower.includes("mobile") || lower.includes("android") || lower.includes("iphone")) return "mobile";
  return "desktop";
}

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      opportunityType,
      opportunityId,
      opportunitySlug,
      opportunityTitle,
      action = "VIEW",
      visitorId,
      referrer,
    } = body;

    if (!opportunityType || !opportunitySlug || !opportunityTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const headers = req.headers;
    const userAgent = headers.get("user-agent") ?? "";
    const deviceType = parseDevice(userAgent);

    // Extract client IP
    const rawIp =
      headers.get("x-nf-client-connection-ip") ||
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      "";

    // 1. Try Netlify Geo header
    const netlifyGeo = parseNetlifyGeo(headers.get("x-nf-geo"));

    let country = netlifyGeo?.country || headers.get("x-country") || headers.get("x-vercel-ip-country") || null;
    let countryCode = netlifyGeo?.countryCode || headers.get("cf-ipcountry") || null;
    let region = netlifyGeo?.region || headers.get("x-vercel-ip-country-region") || null;
    let city = netlifyGeo?.city || headers.get("x-vercel-ip-city") || null;
    let latitude = netlifyGeo?.latitude ?? null;
    let longitude = netlifyGeo?.longitude ?? null;

    // 2. If geo is still unknown and we have a public IP, try quick lookup
    if (!country && rawIp && !isPrivateIp(rawIp)) {
      try {
        const res = await fetch(`https://ipwho.is/${rawIp}`, {
          signal: AbortSignal.timeout(1200),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            country = data.country || country;
            countryCode = data.country_code || countryCode;
            region = data.region || region;
            city = data.city || city;
            latitude = typeof data.latitude === "number" ? data.latitude : latitude;
            longitude = typeof data.longitude === "number" ? data.longitude : longitude;
          }
        }
      } catch {
        // Fallback gracefully on timeout/error
      }
    }

    // Handle local testing fallback
    if (!country && isPrivateIp(rawIp)) {
      country = "Nigeria"; // Default demo / local fallback for development
      countryCode = "NG";
      city = "Lagos";
    }

    // Record the click/view
    await prisma.opportunityClick.create({
      data: {
        opportunityType,
        opportunityId: opportunityId || null,
        opportunitySlug,
        opportunityTitle,
        action,
        visitorId: visitorId || null,
        ipAddress: rawIp ? rawIp.slice(0, 45) : null,
        country: country || "Unknown",
        countryCode: countryCode || null,
        region: region || null,
        city: city || null,
        latitude,
        longitude,
        userAgent: userAgent.slice(0, 255),
        deviceType,
        referrer: referrer ? String(referrer).slice(0, 255) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track opportunity click:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
