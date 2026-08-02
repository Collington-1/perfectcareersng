import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Search } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { AdSlot } from "@/components/layout/ad-slot";
import { ScholarshipCard } from "@/components/content/scholarship-card";
import { Button } from "@/components/ui/button";
import { mockScholarships, scholarshipCategories } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Scholarships for Nigerian Students — Fully & Partially Funded | PerfectCareers",
  description:
    "Browse verified scholarships in the UK, US, Canada, Europe, Asia and Nigeria. Filter by country and funding type — updated regularly.",
  alternates: { canonical: "/scholarships" },
};

const countrySlugMap: Record<string, string> = {
  "united-kingdom": "United Kingdom",
  "united-states": "United States",
  canada: "Canada",
  nigeria: "Nigeria",
};

export default async function ScholarshipsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; funding?: string; q?: string }>;
}) {
  const params = await searchParams;

  const filtered = mockScholarships.filter((s) => {
    if (params.country) {
      const label = countrySlugMap[params.country];
      if (label) {
        if (s.country !== label) return false;
      } else if (params.country === "europe" && !["Germany", "Ireland", "Netherlands"].includes(s.country)) {
        return false;
      } else if (params.country === "asia-pacific" && !["Australia", "Japan"].includes(s.country)) {
        return false;
      }
    }
    if (params.funding && s.fundingType.toLowerCase() !== params.funding) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.university.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="80+ funded opportunities"
        title="Scholarships for Nigerian Students"
        description="Fully and partially funded scholarships across the UK, US, Canada, Europe and beyond — reviewed before we publish them."
        breadcrumbs={[{ label: "Scholarships" }]}
        icon={GraduationCap}
        imageSrc="/images/scholarships-hub.png"
        imageAlt="Nigerian university student holding books and a laptop"
      />

      <Section className="pt-0">
        <Container>
          <form action="/scholarships" method="get" className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-border sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Scholarship or university"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select name="country" defaultValue={params.country ?? ""} className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground">
              <option value="">All countries</option>
              {scholarshipCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
            <select name="funding" defaultValue={params.funding ?? ""} className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground">
              <option value="">Any funding type</option>
              <option value="fully funded">Fully Funded</option>
              <option value="partial funding">Partial Funding</option>
            </select>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {mockScholarships.length} scholarships
            </p>
            <Link href="/scholarships/categories" className="text-sm font-semibold text-secondary hover:text-secondary/80">
              Browse by country →
            </Link>
          </div>

          <AdSlot type="leaderboard" className="mt-8" />

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <ScholarshipCard key={s.slug} scholarship={s} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-muted/40 p-10 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">No scholarships match those filters</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/scholarships">Clear filters</Link>
              </Button>
            </div>
          )}

          <AdSlot type="footer" className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
