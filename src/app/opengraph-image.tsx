import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #6A2475 0%, #4a1a52 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            borderRadius: 9999,
            background: "#E65A24",
            marginBottom: 40,
          }}
        />
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "white" }}>
          Perfect<span style={{ color: "#F5A66B" }}>Careers</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.8)", marginTop: 20 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
