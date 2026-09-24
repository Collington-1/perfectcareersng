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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/format";
import type {
  AnalyticsOverview,
  TopOpportunity,
  CountryStat,
  CityStat,
  RecentActivity,
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

export function AnalyticsDashboard({
  overview,
  topOpportunities,
  topCountries,
  topCities,
  typeDistribution,
  recentActivity,
}: {
  overview: AnalyticsOverview;
  topOpportunities: TopOpportunity[];
  topCountries: CountryStat[];
  topCities: CityStat[];
  typeDistribution: TypeDistribution[];
  recentActivity: RecentActivity[];
}) {
  return (
    <div className="mt-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
          <p className="text-sm text-muted-foreground">
            Track which jobs, scholarships, and grants people are clicking on and where they are visiting from.
          </p>
        </div>
      </div>

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

      {/* Main Grid: Top Opportunities & Locations */}
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

            <div className="mt-4 overflow-x-auto">
              {topOpportunities.length > 0 ? (
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <tr>
                      <th className="pb-3">Opportunity</th>
                      <th className="pb-3 text-center">Type</th>
                      <th className="pb-3 text-right">Views</th>
                      <th className="pb-3 text-right">People</th>
                      <th className="pb-3 text-right">Applies</th>
                      <th className="pb-3 text-right">Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {topOpportunities.map((opp, idx) => {
                      const conf = TYPE_CONFIG[opp.type] || TYPE_CONFIG.JOB;
                      return (
                        <tr key={`${opp.type}_${opp.slug}`} className="hover:bg-muted/30">
                          <td className="py-3 pr-4 font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                                {idx + 1}
                              </span>
                              <Link
                                href={`${conf.hrefPrefix}/${opp.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View opportunity on site"
                                className="group flex items-center gap-1.5 hover:text-primary transition-colors line-clamp-1"
                              >
                                <span>{opp.title}</span>
                                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary" />
                              </Link>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${conf.color}`}
                            >
                              {conf.label}
                            </span>
                          </td>
                          <td className="py-3 text-right font-medium text-foreground">{opp.views}</td>
                          <td className="py-3 text-right text-muted-foreground">{opp.uniqueVisitors}</td>
                          <td className="py-3 text-right font-semibold text-emerald-600">{opp.applies}</td>
                          <td className="py-3 text-right text-xs font-medium text-muted-foreground">
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
                  <p>No clicks tracked yet.</p>
                  <p className="text-xs mt-1">
                    Once visitors browse jobs, scholarships, or grants, their activity and locations will appear here in real time.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interest Distribution by Type */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <h3 className="font-heading text-base font-bold text-foreground">
              Audience Interest by Category
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Distribution of clicks across content types
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
                          {c.country === "Nigeria" ? "🇳🇬" : c.country === "United Kingdom" ? "🇬🇧" : c.country === "United States" ? "🇺🇸" : c.country === "Canada" ? "🇨🇦" : "🌍"}
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

          {/* Recent Live Activity Feed */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Recent Clicks
                </h3>
                <p className="text-xs text-muted-foreground">Live stream of visitor interactions</p>
              </div>
              <Activity className="size-4 text-primary" />
            </div>

            <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {recentActivity.length > 0 ? (
                recentActivity.map((act) => {
                  const conf = TYPE_CONFIG[act.type] || TYPE_CONFIG.JOB;
                  return (
                    <div
                      key={act.id}
                      className="rounded-xl border border-border/60 bg-muted/20 p-2.5 text-xs transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`${conf.hrefPrefix}/${act.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {act.title}
                        </Link>
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                            act.action === "APPLY"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {act.action === "APPLY" ? "Apply Click" : "View"}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between text-muted-foreground text-[11px]">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-muted-foreground/70" />
                          {act.city ? `${act.city}, ${act.country}` : act.country}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {act.deviceType === "mobile" ? (
                            <Smartphone className="size-3 text-muted-foreground/70" />
                          ) : (
                            <Monitor className="size-3 text-muted-foreground/70" />
                          )}
                          <span>{formatRelativeDate(act.createdAt.toISOString())}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  No activity recorded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
