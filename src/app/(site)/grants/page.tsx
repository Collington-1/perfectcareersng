import type { Metadata } from "next";
import Link from "next/link";
import { HandCoins, Search } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { AdSlot } from "@/components/layout/ad-slot";
import { GrantCard } from "@/components/content/grant-card";
import { Button } from "@/components/ui/button";
import { grantCategories } from "@/lib/mock-data";
import { getAllGrants } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business Grants in Nigeria — Funding for Founders | PerfectCareers",
  description:
    "Browse business grants and funding opportunities for Nigerian entrepreneurs across technology, agriculture, fashion, health and more.",
  alternates: { canonical: "/grants" },
};

export default async function GrantsPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; q?: string }>;
}) {
  const params = await searchParams;
  const industryLabel = grantCategories.find((c) => c.slug === params.industry)?.label;

  const grants = await getAllGrants();
  const filtered = grants.filter((g) => {
    if (industryLabel && !g.industry.toLowerCase().includes(industryLabel.split(" ")[0].toLowerCase())) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (!g.title.toLowerCase().includes(q) && !g.provider.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="Funding for founders"
        title="Business Grants for Nigerian Entrepreneurs"
        description="Non-dilutive funding opportunities across technology, agriculture, fashion, health and more — reviewed before we publish them."
        breadcrumbs={[{ label: "Grants" }]}
        icon={HandCoins}
        imageSrc="/images/grants-hub.png"
        imageAlt="Nigerian small business owner in their workshop"
      />

      <Section className="pt-0">
        <Container>
          <form action="/grants" method="get" className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-border sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Grant name or provider"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select name="industry" defaultValue={params.industry ?? ""} className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground">
              <option value="">All industries</option>
              {grantCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {grants.length} grants
            </p>
            <Link href="/grants/categories" className="text-sm font-semibold text-primary hover:text-primary/80">
              Browse by industry →
            </Link>
          </div>

          <AdSlot type="leaderboard" className="mt-8" />

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <GrantCard key={g.slug} grant={g} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-muted/40 p-10 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">No grants match those filters</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/grants">Clear filters</Link>
              </Button>
            </div>
          )}

          <AdSlot type="footer" className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
