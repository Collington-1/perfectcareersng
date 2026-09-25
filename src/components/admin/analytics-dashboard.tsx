"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MousePointerClick,
  Users,
  MapPin,
  ExternalLink,
  Smartphone,
  Monitor,
  Globe2,
  TrendingUp,
  Activity,
  Briefcase,
  GraduationCap,
  HandCoins,
  Newspaper,
  CheckCircle2,
  Calendar,
  CalendarDays,
  Clock,
  Search,
  X,
  Filter,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/format";
import type {
  AnalyticsClickItem,
  AnalyticsOverview,
  TopOpportunity,
  CountryStat,
  CityStat,
  TypeDistribution,
} from "@/lib/analytics-data";

const TYPE_CONFIG = {
  JOB: {
    label: "Job",
    hrefPrefix: "/jobs",
    color: "bg-blue-50 text-blue-700 ring-blue-600/20",
    icon: Briefcase,
  },
  SCHOLARSHIP: {
    label: "Scholarship",
    hrefPrefix: "/scholarships",
    color: "bg-purple-50 text-purple-700 ring-purple-600/20",
    icon: GraduationCap,
  },
  GRANT: {
    label: "Grant",
    hrefPrefix: "/grants",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    icon: HandCoins,
  },
  BLOG: {
    label: "Blog",
    hrefPrefix: "/blog",
    color: "bg-amber-50 text-amber-700 ring-amber-600/20",
    icon: Newspaper,
  },
};

type TimeFilterRange = "all" | "today" | "7d" | "30d" | "this-month" | "custom";
type BreakdownTab = "dates" | "weeks" | "months";

function getWeekNumber(date: Date): { weekNum: number; year: number; label: string; key: string } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  const year = d.getUTCFullYear();
  return {
    weekNum,
    year,
    label: `Week ${weekNum}, ${year}`,
    key: `${year}-W${String(weekNum).padStart(2, "0")}`,
  };
}

function formatDateString(d: Date): string {
  return d.toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatExactTime(d: Date): string {
  return d.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function AnalyticsDashboard({
  overview: initialOverview,
  topOpportunities: initialTopOpp,
  topCountries: initialCountries,
  topCities: initialCities,
  typeDistribution: initialDistribution,
  rawClicks = [],
}: {
  overview: AnalyticsOverview;
  topOpportunities: TopOpportunity[];
  topCountries: CountryStat[];
  topCities: CityStat[];
  typeDistribution: TypeDistribution[];
  recentActivity?: unknown[];
  rawClicks?: AnalyticsClickItem[];
}) {
  const [timeRange, setTimeRange] = useState<TimeFilterRange>("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [breakdownTab, setBreakdownTab] = useState<BreakdownTab>("dates");
  const [activitySearch, setActivitySearch] = useState("");
  const [activityActionFilter, setActivityActionFilter] = useState<"ALL" | "VIEW" | "APPLY">("ALL");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Filter raw clicks based on time range and optional single date drilldown
  const filteredClicks = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    const monthAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    return rawClicks.filter((click) => {
      const clickTime = new Date(click.createdAt).getTime();

      // If single-date drilldown is active
      if (selectedDateFilter) {
        const clickDateKey = click.createdAt.slice(0, 10);
        if (clickDateKey !== selectedDateFilter) return false;
      }

      if (timeRange === "today") {
        return clickTime >= todayStart;
      }
      if (timeRange === "7d") {
        return clickTime >= weekAgo;
      }
      if (timeRange === "30d") {
        return clickTime >= monthAgo;
      }
      if (timeRange === "this-month") {
        return clickTime >= currentMonthStart;
      }
      if (timeRange === "custom") {
        if (customStart) {
          const start = new Date(customStart).getTime();
          if (clickTime < start) return false;
        }
        if (customEnd) {
          const end = new Date(customEnd);
          end.setHours(23, 59, 59, 999);
          if (clickTime > end.getTime()) return false;
        }
      }
      return true;
    });
  }, [rawClicks, timeRange, customStart, customEnd, selectedDateFilter]);

  // Compute metrics dynamically from filteredClicks (fallback to initial if "all" and not custom-drilled)
  const computedMetrics = useMemo(() => {
    if (timeRange === "all" && !selectedDateFilter && rawClicks.length === 0) {
      return {
        overview: initialOverview,
        topOpportunities: initialTopOpp,
        topCountries: initialCountries,
        topCities: initialCities,
        typeDistribution: initialDistribution,
      };
    }

    const totalClicks = filteredClicks.length;
    let totalViews = 0;
    let totalApplies = 0;
    const visitors = new Set<string>();

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

    const countryMap = new Map<string, { country: string; countryCode: string | null; count: number; visitors: Set<string> }>();
    const cityMap = new Map<string, { city: string; country: string; region: string | null; count: number }>();
    const typeCounts: Record<string, number> = { JOB: 0, SCHOLARSHIP: 0, GRANT: 0, BLOG: 0 };

    filteredClicks.forEach((c) => {
      if (c.action === "APPLY") {
        totalApplies++;
      } else {
        totalViews++;
      }
      if (c.visitorId) visitors.add(c.visitorId);

      // Opp
      const key = `${c.opportunityType}_${c.opportunitySlug}`;
      let opp = oppMap.get(key);
      if (!opp) {
        opp = {
          slug: c.opportunitySlug,
          title: c.opportunityTitle,
          type: c.opportunityType,
          views: 0,
          applies: 0,
          visitors: new Set(),
        };
        oppMap.set(key, opp);
      }
      if (c.action === "APPLY") opp.applies++;
      else opp.views++;
      if (c.visitorId) opp.visitors.add(c.visitorId);

      // Country
      const cName = c.country || "Unknown";
      let countryEntry = countryMap.get(cName);
      if (!countryEntry) {
        countryEntry = { country: cName, countryCode: c.countryCode, count: 0, visitors: new Set() };
        countryMap.set(cName, countryEntry);
      }
      countryEntry.count++;
      if (c.visitorId) countryEntry.visitors.add(c.visitorId);

      // City
      if (c.city && c.city !== "Unknown") {
        const cityKey = `${c.city}_${c.country}`;
        let cityEntry = cityMap.get(cityKey);
        if (!cityEntry) {
          cityEntry = { city: c.city, country: c.country, region: c.region, count: 0 };
          cityMap.set(cityKey, cityEntry);
        }
        cityEntry.count++;
      }

      // Type
      if (typeCounts[c.opportunityType] !== undefined) {
        typeCounts[c.opportunityType]++;
      }
    });

    const uniqueVisitors = visitors.size || (totalClicks > 0 ? 1 : 0);

    const topOpportunities: TopOpportunity[] = Array.from(oppMap.values())
      .map((item) => {
        const rate = item.views > 0 ? ((item.applies / item.views) * 100).toFixed(1) + "%" : "0%";
        return {
          slug: item.slug,
          title: item.title,
          type: item.type,
          views: item.views,
          applies: item.applies,
          uniqueVisitors: item.visitors.size || 1,
          conversionRate: rate,
        };
      })
      .sort((a, b) => b.views + b.applies - (a.views + a.applies))
      .slice(0, 10);

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

    const topCities: CityStat[] = Array.from(cityMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const topCountry = topCountries[0]?.country || "None yet";
    const topCity = topCities[0]?.city || "None yet";

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
    };
  }, [
    filteredClicks,
    timeRange,
    selectedDateFilter,
    rawClicks.length,
    initialOverview,
    initialTopOpp,
    initialCountries,
    initialCities,
    initialDistribution,
  ]);

  // Grouping by DATES (Days)
  const dateBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        dateKey: string;
        dateLabel: string;
        views: number;
        applies: number;
        visitors: Set<string>;
        topOppTitle: string;
        oppCountMap: Map<string, number>;
      }
    >();

    rawClicks.forEach((c) => {
      const d = new Date(c.createdAt);
      const dateKey = c.createdAt.slice(0, 10); // YYYY-MM-DD
      let entry = map.get(dateKey);
      if (!entry) {
        entry = {
          dateKey,
          dateLabel: formatDateString(d),
          views: 0,
          applies: 0,
          visitors: new Set(),
          topOppTitle: c.opportunityTitle,
          oppCountMap: new Map(),
        };
        map.set(dateKey, entry);
      }
      if (c.action === "APPLY") entry.applies++;
      else entry.views++;
      if (c.visitorId) entry.visitors.add(c.visitorId);

      const currentCount = (entry.oppCountMap.get(c.opportunityTitle) || 0) + 1;
      entry.oppCountMap.set(c.opportunityTitle, currentCount);
    });

    return Array.from(map.values())
      .map((entry) => {
        let bestTitle = "";
        let maxCount = 0;
        entry.oppCountMap.forEach((count, title) => {
          if (count > maxCount) {
            maxCount = count;
            bestTitle = title;
          }
        });
        return {
          dateKey: entry.dateKey,
          dateLabel: entry.dateLabel,
          views: entry.views,
          applies: entry.applies,
          uniqueVisitors: entry.visitors.size || 1,
          total: entry.views + entry.applies,
          topOpportunity: bestTitle,
        };
      })
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  }, [rawClicks]);

  // Grouping by WEEKS
  const weekBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        weekKey: string;
        weekLabel: string;
        views: number;
        applies: number;
        visitors: Set<string>;
        topOppTitle: string;
        oppCountMap: Map<string, number>;
      }
    >();

    rawClicks.forEach((c) => {
      const d = new Date(c.createdAt);
      const { key, label } = getWeekNumber(d);
      let entry = map.get(key);
      if (!entry) {
        entry = {
          weekKey: key,
          weekLabel: label,
          views: 0,
          applies: 0,
          visitors: new Set(),
          topOppTitle: c.opportunityTitle,
          oppCountMap: new Map(),
        };
        map.set(key, entry);
      }
      if (c.action === "APPLY") entry.applies++;
      else entry.views++;
      if (c.visitorId) entry.visitors.add(c.visitorId);

      const currentCount = (entry.oppCountMap.get(c.opportunityTitle) || 0) + 1;
      entry.oppCountMap.set(c.opportunityTitle, currentCount);
    });

    return Array.from(map.values())
      .map((entry) => {
        let bestTitle = "";
        let maxCount = 0;
        entry.oppCountMap.forEach((count, title) => {
          if (count > maxCount) {
            maxCount = count;
            bestTitle = title;
          }
        });
        return {
          weekKey: entry.weekKey,
          weekLabel: entry.weekLabel,
          views: entry.views,
          applies: entry.applies,
          uniqueVisitors: entry.visitors.size || 1,
          total: entry.views + entry.applies,
          topOpportunity: bestTitle,
        };
      })
      .sort((a, b) => b.weekKey.localeCompare(a.weekKey));
  }, [rawClicks]);

  // Grouping by MONTHS
  const monthBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        monthKey: string;
        monthLabel: string;
        views: number;
        applies: number;
        visitors: Set<string>;
        topOppTitle: string;
        oppCountMap: Map<string, number>;
      }
    >();

    rawClicks.forEach((c) => {
      const d = new Date(c.createdAt);
      const monthKey = c.createdAt.slice(0, 7); // YYYY-MM
      const monthLabel = d.toLocaleDateString("en-NG", { month: "long", year: "numeric" });
      let entry = map.get(monthKey);
      if (!entry) {
        entry = {
          monthKey,
          monthLabel,
          views: 0,
          applies: 0,
          visitors: new Set(),
          topOppTitle: c.opportunityTitle,
          oppCountMap: new Map(),
        };
        map.set(monthKey, entry);
      }
      if (c.action === "APPLY") entry.applies++;
      else entry.views++;
      if (c.visitorId) entry.visitors.add(c.visitorId);

      const currentCount = (entry.oppCountMap.get(c.opportunityTitle) || 0) + 1;
      entry.oppCountMap.set(c.opportunityTitle, currentCount);
    });

    return Array.from(map.values())
      .map((entry) => {
        let bestTitle = "";
        let maxCount = 0;
        entry.oppCountMap.forEach((count, title) => {
          if (count > maxCount) {
            maxCount = count;
            bestTitle = title;
          }
        });
        return {
          monthKey: entry.monthKey,
          monthLabel: entry.monthLabel,
          views: entry.views,
          applies: entry.applies,
          uniqueVisitors: entry.visitors.size || 1,
          total: entry.views + entry.applies,
          topOpportunity: bestTitle,
        };
      })
      .sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [rawClicks]);

  // Filtered Activity List
  const filteredActivityList = useMemo(() => {
    return filteredClicks
      .filter((click) => {
        if (activityActionFilter !== "ALL" && click.action !== activityActionFilter) return false;
        if (activitySearch.trim()) {
          const q = activitySearch.toLowerCase();
          const matchTitle = click.opportunityTitle.toLowerCase().includes(q);
          const matchLoc = (click.city || "").toLowerCase().includes(q) || click.country.toLowerCase().includes(q);
          const matchDate = formatDateString(new Date(click.createdAt)).toLowerCase().includes(q);
          return matchTitle || matchLoc || matchDate;
        }
        return true;
      })
      .slice(0, 50);
  }, [filteredClicks, activityActionFilter, activitySearch]);

  const { overview, topOpportunities, topCountries, topCities, typeDistribution } = computedMetrics;

  return (
    <div className="mt-8 space-y-8">
      {/* Top Header with Interactive Time Selector */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Opportunity Click &amp; Audience Analytics
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-600" />
              Live
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Filter clicks by specific dates, weeks, and months to see when views occurred.
          </p>
        </div>

        {/* Time Period Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => {
              setTimeRange("all");
              setSelectedDateFilter(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === "all" && !selectedDateFilter
                ? "bg-white text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Time
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange("today");
              setSelectedDateFilter(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === "today"
                ? "bg-white text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange("7d");
              setSelectedDateFilter(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === "7d"
                ? "bg-white text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This Week (7d)
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange("this-month");
              setSelectedDateFilter(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === "this-month"
                ? "bg-white text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange("custom");
              setSelectedDateFilter(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === "custom"
                ? "bg-white text-primary shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Custom Range
          </button>
        </div>
      </div>

      {/* Custom Date Range Picker bar */}
      {timeRange === "custom" && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-border animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Select Date Span:</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">From:</label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded-lg border border-border bg-white px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">To:</label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded-lg border border-border bg-white px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {(customStart || customEnd) && (
            <button
              type="button"
              onClick={() => {
                setCustomStart("");
                setCustomEnd("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Active Filter Notice if drilling down into a single date */}
      {selectedDateFilter && (
        <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-2.5 text-xs text-primary ring-1 ring-primary/20">
          <span className="font-medium">
            Filtering by date: <strong>{selectedDateFilter}</strong> ({filteredClicks.length} total views recorded on this day)
          </span>
          <button
            type="button"
            onClick={() => setSelectedDateFilter(null)}
            className="flex items-center gap-1 font-bold underline hover:opacity-80"
          >
            Show All Dates <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Analytics KPI Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-row items-center gap-4 p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MousePointerClick className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {overview.totalClicks.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-muted-foreground">Total Clicks &amp; Views</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center gap-4 p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
            <Users className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {overview.uniqueVisitors.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-muted-foreground">Unique People (Visitors)</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center gap-4 p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {overview.totalApplies.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-muted-foreground">Applications / Apply Clicks</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center gap-4 p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <MapPin className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-lg font-bold text-foreground">
              {overview.topCity !== "None yet"
                ? `${overview.topCity}, ${overview.topCountry}`
                : overview.topCountry}
            </p>
            <p className="text-xs font-medium text-muted-foreground">Top Visitor Location</p>
          </div>
        </Card>
      </div>

      {/* SECTION: Find Views by Dates, Weeks, & Months (Requested Feature) */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-border space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <CalendarDays className="size-5 text-primary" />
              View Timeline: Dates, Weeks &amp; Months
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select any date, week, or month to see exact views, unique people, and what was viewed.
            </p>
          </div>

          {/* Breakdown Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1">
            <button
              type="button"
              onClick={() => setBreakdownTab("dates")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                breakdownTab === "dates"
                  ? "bg-white text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              By Dates ({dateBreakdown.length} days)
            </button>
            <button
              type="button"
              onClick={() => setBreakdownTab("weeks")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                breakdownTab === "weeks"
                  ? "bg-white text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              By Weeks ({weekBreakdown.length} wks)
            </button>
            <button
              type="button"
              onClick={() => setBreakdownTab("months")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                breakdownTab === "months"
                  ? "bg-white text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              By Months ({monthBreakdown.length} mo)
            </button>
          </div>
        </div>

        {/* Tab 1: By Dates */}
        {breakdownTab === "dates" && (
          <div className="overflow-x-auto">
            {dateBreakdown.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 text-xs font-semibold tracking-wide text-muted-foreground uppercase border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-center">Total Views</th>
                    <th className="px-4 py-3 text-center">Unique People</th>
                    <th className="px-4 py-3 text-center">Apply Clicks</th>
                    <th className="px-4 py-3">Most Clicked That Day</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dateBreakdown.map((row) => {
                    const isSelected = selectedDateFilter === row.dateKey;
                    return (
                      <tr
                        key={row.dateKey}
                        className={`transition-colors ${
                          isSelected ? "bg-primary/10 font-semibold" : "hover:bg-muted/30"
                        }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="size-4 text-primary" />
                            {row.dateLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                            {row.views}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-muted-foreground">
                          {row.uniqueVisitors}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-emerald-600">
                          {row.applies}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs line-clamp-1 max-w-[280px]">
                          {row.topOpportunity || "None"}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {isSelected ? (
                            <button
                              type="button"
                              onClick={() => setSelectedDateFilter(null)}
                              className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-muted/80"
                            >
                              Reset
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedDateFilter(row.dateKey)}
                              className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/20"
                            >
                              Drill Down
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="py-8 text-center text-xs text-muted-foreground">No date records found.</p>
            )}
          </div>
        )}

        {/* Tab 2: By Weeks */}
        {breakdownTab === "weeks" && (
          <div className="overflow-x-auto">
            {weekBreakdown.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 text-xs font-semibold tracking-wide text-muted-foreground uppercase border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Week</th>
                    <th className="px-4 py-3 text-center">Total Views</th>
                    <th className="px-4 py-3 text-center">Unique People</th>
                    <th className="px-4 py-3 text-center">Apply Clicks</th>
                    <th className="px-4 py-3">Top Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {weekBreakdown.map((row) => (
                    <tr key={row.weekKey} className="hover:bg-muted/30">
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                        <span className="flex items-center gap-2">
                          <Layers className="size-4 text-purple-600" />
                          {row.weekLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 ring-1 ring-purple-600/20">
                          {row.views}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-muted-foreground">
                        {row.uniqueVisitors}
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-emerald-600">
                        {row.applies}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs line-clamp-1">
                        {row.topOpportunity || "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="py-8 text-center text-xs text-muted-foreground">No weekly records found.</p>
            )}
          </div>
        )}

        {/* Tab 3: By Months */}
        {breakdownTab === "months" && (
          <div className="overflow-x-auto">
            {monthBreakdown.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 text-xs font-semibold tracking-wide text-muted-foreground uppercase border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3 text-center">Total Views</th>
                    <th className="px-4 py-3 text-center">Unique People</th>
                    <th className="px-4 py-3 text-center">Apply Clicks</th>
                    <th className="px-4 py-3">Top Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {monthBreakdown.map((row) => (
                    <tr key={row.monthKey} className="hover:bg-muted/30">
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="size-4 text-emerald-600" />
                          {row.monthLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                          {row.views}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-muted-foreground">
                        {row.uniqueVisitors}
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-emerald-600">
                        {row.applies}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs line-clamp-1">
                        {row.topOpportunity || "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="py-8 text-center text-xs text-muted-foreground">No monthly records found.</p>
            )}
          </div>
        )}
      </div>

      {/* Main Grid: Most Clicked Opportunities & Locations */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Clicked Opportunities (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Most Clicked Opportunities
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ranked by total page views and applicant interest
                </p>
              </div>
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>

            {/* Table with properly spaced and padded headers (fixes squashed headers) */}
            <div className="mt-4 overflow-x-auto">
              {topOpportunities.length > 0 ? (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="border-b border-border bg-muted/20 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left min-w-[220px]">Opportunity</th>
                      <th className="px-3 py-3 text-center whitespace-nowrap">Type</th>
                      <th className="px-3 py-3 text-right whitespace-nowrap">Views</th>
                      <th className="px-3 py-3 text-right whitespace-nowrap">People</th>
                      <th className="px-3 py-3 text-right whitespace-nowrap">Applies</th>
                      <th className="px-4 py-3 text-right whitespace-nowrap">Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {topOpportunities.map((opp, idx) => {
                      const conf = TYPE_CONFIG[opp.type] || TYPE_CONFIG.JOB;
                      return (
                        <tr key={`${opp.type}_${opp.slug}`} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                                {idx + 1}
                              </span>
                              <Link
                                href={`${conf.hrefPrefix}/${opp.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View live on site"
                                className="group flex items-center gap-1.5 hover:text-primary transition-colors line-clamp-1"
                              >
                                <span>{opp.title}</span>
                                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary" />
                              </Link>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center whitespace-nowrap">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ${conf.color}`}
                            >
                              {conf.label}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right font-medium text-foreground whitespace-nowrap">
                            {opp.views}
                          </td>
                          <td className="px-3 py-3 text-right text-muted-foreground whitespace-nowrap">
                            {opp.uniqueVisitors}
                          </td>
                          <td className="px-3 py-3 text-right font-semibold text-emerald-600 whitespace-nowrap">
                            {opp.applies}
                          </td>
                          <td className="px-4 py-3 text-right text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {opp.conversionRate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  <Activity className="size-8 mx-auto text-muted-foreground/50 mb-2" />
                  <p>No clicks recorded for this selected time period.</p>
                </div>
              )}
            </div>
          </div>

          {/* Interest Distribution by Category */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <h3 className="font-heading text-base font-bold text-foreground">
              Audience Interest by Category
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Distribution of clicks across content types for this timeframe
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {typeDistribution.map((t) => {
                const conf = TYPE_CONFIG[t.type];
                const Icon = conf.icon;
                return (
                  <div key={t.type} className="rounded-xl bg-muted/40 p-3 ring-1 ring-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span className="font-medium flex items-center gap-1.5">
                        <Icon className="size-3.5" />
                        {t.label}
                      </span>
                      <span>{t.percentage}%</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{t.count.toLocaleString()}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(t.percentage, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visitor Locations Column (1 column) */}
        <div className="space-y-6">
          {/* Countries List */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Visitor Countries
                </h3>
                <p className="text-xs text-muted-foreground">Where opportunity seekers are from</p>
              </div>
              <Globe2 className="size-4 text-muted-foreground" />
            </div>

            <div className="mt-4 space-y-3">
              {topCountries.length > 0 ? (
                topCountries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <span className="text-sm">
                          {c.country === "Nigeria" ? "🇳🇬" : c.country === "Ghana" ? "🇬🇭" : c.country === "United Kingdom" ? "🇬🇧" : c.country === "United States" ? "🇺🇸" : c.country === "Canada" ? "🇨🇦" : "🌍"}
                        </span>
                        {c.country}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        {c.totalClicks} clicks ({c.percentage}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.max(c.percentage, 3)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  No location data recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Top Cities */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Top Cities
                </h3>
                <p className="text-xs text-muted-foreground">Most active metropolitan areas</p>
              </div>
              <MapPin className="size-4 text-muted-foreground" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {topCities.length > 0 ? (
                topCities.map((city) => (
                  <span
                    key={`${city.city}_${city.country}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1 text-xs text-foreground ring-1 ring-border"
                  >
                    <span className="font-medium">{city.city}</span>
                    <span className="text-[10px] text-muted-foreground">
                      ({city.count} clicks)
                    </span>
                  </span>
                ))
              ) : (
                <p className="py-4 text-center text-xs text-muted-foreground w-full">
                  No city data available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED INTERACTION LOG WITH EXACT DATES, WEEKS, AND TIMES */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-border space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              Detailed View Logs &amp; Click History
            </h3>
            <p className="text-xs text-muted-foreground">
              Audit log with exact date, time, week number, opportunity, and visitor location
            </p>
          </div>

          {/* Filters within activity feed */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActivityActionFilter("ALL")}
                className={`rounded-md px-2 py-1 font-medium ${
                  activityActionFilter === "ALL" ? "bg-white shadow-xs" : "text-muted-foreground"
                }`}
              >
                All Actions
              </button>
              <button
                type="button"
                onClick={() => setActivityActionFilter("VIEW")}
                className={`rounded-md px-2 py-1 font-medium ${
                  activityActionFilter === "VIEW" ? "bg-white text-blue-700 shadow-xs" : "text-muted-foreground"
                }`}
              >
                Views
              </button>
              <button
                type="button"
                onClick={() => setActivityActionFilter("APPLY")}
                className={`rounded-md px-2 py-1 font-medium ${
                  activityActionFilter === "APPLY" ? "bg-white text-emerald-700 shadow-xs" : "text-muted-foreground"
                }`}
              >
                Applies
              </button>
            </div>

            <div className="relative">
              <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                className="w-44 rounded-lg border border-border bg-white py-1 pr-2.5 pl-8 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
              />
              {activitySearch && (
                <button
                  type="button"
                  onClick={() => setActivitySearch("")}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredActivityList.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/30 text-muted-foreground uppercase tracking-wide font-semibold border-b border-border">
                <tr>
                  <th className="px-4 py-2.5">Date &amp; Time</th>
                  <th className="px-3 py-2.5">Week &amp; Month</th>
                  <th className="px-4 py-2.5">Opportunity</th>
                  <th className="px-3 py-2.5 text-center">Action</th>
                  <th className="px-4 py-2.5">Visitor Location</th>
                  <th className="px-3 py-2.5 text-center">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredActivityList.map((act) => {
                  const d = new Date(act.createdAt);
                  const { label: weekLabel } = getWeekNumber(d);
                  const monthLabel = d.toLocaleDateString("en-NG", { month: "short", year: "numeric" });
                  const conf = TYPE_CONFIG[act.opportunityType] || TYPE_CONFIG.JOB;

                  return (
                    <tr key={act.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 whitespace-nowrap font-medium text-foreground">
                        <div>
                          <span>{formatDateString(d)}</span>
                          <span className="block text-[10px] text-muted-foreground font-normal">
                            {formatExactTime(d)} ({formatRelativeDate(act.createdAt)})
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                        <span className="font-medium text-foreground">{weekLabel}</span>
                        <span className="block text-[10px]">{monthLabel}</span>
                      </td>
                      <td className="px-4 py-2.5 max-w-[260px]">
                        <Link
                          href={`${conf.hrefPrefix}/${act.opportunitySlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 line-clamp-1"
                        >
                          <span className="truncate">{act.opportunityTitle}</span>
                          <ExternalLink className="size-3 shrink-0 opacity-40 hover:opacity-100" />
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 text-center whitespace-nowrap">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                            act.action === "APPLY"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {act.action === "APPLY" ? "Apply Click" : "View"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <MapPin className="size-3 text-muted-foreground" />
                          {act.city ? `${act.city}, ${act.country}` : act.country}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center whitespace-nowrap text-muted-foreground">
                        {act.deviceType === "mobile" ? (
                          <span className="inline-flex items-center gap-1" title="Mobile">
                            <Smartphone className="size-3.5 text-muted-foreground" /> Mobile
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1" title="Desktop">
                            <Monitor className="size-3.5 text-muted-foreground" /> Desktop
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="py-8 text-center text-xs text-muted-foreground">
              No matching activity logs for the current filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
