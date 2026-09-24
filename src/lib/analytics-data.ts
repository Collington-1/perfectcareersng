import { prisma } from "@/lib/prisma";

export type AnalyticsOverview = {
  totalClicks: number;
  totalViews: number;
  totalApplies: number;
  uniqueVisitors: number;
  topCountry: string;
  topCity: string;
};

export type TopOpportunity = {
  slug: string;
  title: string;
  type: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
  views: number;
  applies: number;
  uniqueVisitors: number;
  conversionRate: string;
};

export type CountryStat = {
  country: string;
  countryCode: string | null;
  totalClicks: number;
  uniqueVisitors: number;
  percentage: number;
};

export type CityStat = {
  city: string;
  country: string;
  region: string | null;
  count: number;
};

export type RecentActivity = {
  id: string;
  title: string;
  slug: string;
  type: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
  action: string;
  country: string;
  city: string | null;
  deviceType: string | null;
  createdAt: Date;
};

export type TypeDistribution = {
  type: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
  label: string;
  count: number;
  percentage: number;
};

export async function getOpportunityAnalytics() {
  const [
    totalClicks,
    totalViews,
    totalApplies,
    recentClicks,
    allClicks,
  ] = await Promise.all([
    prisma.opportunityClick.count(),
    prisma.opportunityClick.count({ where: { action: "VIEW" } }),
    prisma.opportunityClick.count({ where: { action: "APPLY" } }),
    prisma.opportunityClick.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    }),
    prisma.opportunityClick.findMany({
      select: {
        opportunitySlug: true,
        opportunityTitle: true,
        opportunityType: true,
        action: true,
        visitorId: true,
        country: true,
        countryCode: true,
        region: true,
        city: true,
      },
    }),
  ]);

  // Unique visitors overall
  const visitorSet = new Set<string>();
  allClicks.forEach((c) => {
    if (c.visitorId) visitorSet.add(c.visitorId);
  });
  const uniqueVisitors = visitorSet.size || (totalClicks > 0 ? Math.min(totalClicks, 1) : 0);

  // Group by Opportunity
  const oppMap = new Map<
    string,
    {
      slug: string;
      title: string;
      type: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
      views: number;
      applies: number;
      visitors: Set<string>;
    }
  >();

  allClicks.forEach((c) => {
    const key = `${c.opportunityType}_${c.opportunitySlug}`;
    let item = oppMap.get(key);
    if (!item) {
      item = {
        slug: c.opportunitySlug,
        title: c.opportunityTitle,
        type: c.opportunityType,
        views: 0,
        applies: 0,
        visitors: new Set<string>(),
      };
      oppMap.set(key, item);
    }
    if (c.action === "APPLY") {
      item.applies++;
    } else {
      item.views++;
    }
    if (c.visitorId) {
      item.visitors.add(c.visitorId);
    }
  });

  const topOpportunities: TopOpportunity[] = Array.from(oppMap.values())
    .map((item) => {
      const totalOppClicks = item.views + item.applies;
      const rate = item.views > 0 ? ((item.applies / item.views) * 100).toFixed(1) + "%" : "0%";
      return {
        slug: item.slug,
        title: item.title,
        type: item.type,
        views: item.views,
        applies: item.applies,
        uniqueVisitors: item.visitors.size || (totalOppClicks > 0 ? 1 : 0),
        conversionRate: rate,
      };
    })
    .sort((a, b) => b.views + b.applies - (a.views + a.applies))
    .slice(0, 10);

  // Group by Country
  const countryMap = new Map<
    string,
    { country: string; countryCode: string | null; count: number; visitors: Set<string> }
  >();

  allClicks.forEach((c) => {
    const countryName = c.country || "Unknown";
    let entry = countryMap.get(countryName);
    if (!entry) {
      entry = {
        country: countryName,
        countryCode: c.countryCode,
        count: 0,
        visitors: new Set<string>(),
      };
      countryMap.set(countryName, entry);
    }
    entry.count++;
    if (c.visitorId) entry.visitors.add(c.visitorId);
  });

  const topCountries: CountryStat[] = Array.from(countryMap.values())
    .map((entry) => ({
      country: entry.country,
      countryCode: entry.countryCode,
      totalClicks: entry.count,
      uniqueVisitors: entry.visitors.size || 1,
      percentage: totalClicks > 0 ? Math.round((entry.count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.totalClicks - a.totalClicks)
    .slice(0, 8);

  // Group by City
  const cityMap = new Map<string, { city: string; country: string; region: string | null; count: number }>();
  allClicks.forEach((c) => {
    if (c.city && c.city !== "Unknown") {
      const key = `${c.city}_${c.country}`;
      let entry = cityMap.get(key);
      if (!entry) {
        entry = {
          city: c.city,
          country: c.country || "Unknown",
          region: c.region,
          count: 0,
        };
        cityMap.set(key, entry);
      }
      entry.count++;
    }
  });

  const topCities: CityStat[] = Array.from(cityMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Top summary
  const topCountry = topCountries[0]?.country || "None yet";
  const topCity = topCities[0]?.city || "None yet";

  // Content type distribution
  const typeCounts: Record<string, number> = { JOB: 0, SCHOLARSHIP: 0, GRANT: 0, BLOG: 0 };
  allClicks.forEach((c) => {
    if (typeCounts[c.opportunityType] !== undefined) {
      typeCounts[c.opportunityType]++;
    }
  });

  const typeLabels: Record<string, string> = {
    JOB: "Jobs",
    SCHOLARSHIP: "Scholarships",
    GRANT: "Grants",
    BLOG: "Blog Posts",
  };

  const typeDistribution: TypeDistribution[] = (["JOB", "SCHOLARSHIP", "GRANT", "BLOG"] as const).map(
    (t) => ({
      type: t,
      label: typeLabels[t],
      count: typeCounts[t],
      percentage: totalClicks > 0 ? Math.round((typeCounts[t] / totalClicks) * 100) : 0,
    })
  );

  const formattedRecentActivity: RecentActivity[] = recentClicks.map((r) => ({
    id: r.id,
    title: r.opportunityTitle,
    slug: r.opportunitySlug,
    type: r.opportunityType,
    action: r.action,
    country: r.country || "Unknown",
    city: r.city,
    deviceType: r.deviceType,
    createdAt: r.createdAt,
  }));

  return {
    overview: {
      totalClicks,
      totalViews,
      totalApplies,
      uniqueVisitors,
      topCountry,
      topCity,
    },
    topOpportunities,
    topCountries,
    topCities,
    typeDistribution,
    recentActivity: formattedRecentActivity,
  };
}
