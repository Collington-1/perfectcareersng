import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { AdSlot } from "@/components/layout/ad-slot";
import { JobCard } from "@/components/content/job-card";
import { Button } from "@/components/ui/button";
import { mockJobs, jobCategories } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Job Vacancies in Nigeria — Latest Openings | PerfectCareers",
  description:
    "Browse verified job vacancies across Lagos, Abuja, Port Harcourt and remote roles. Filter by category, employment type and work mode — updated daily.",
  alternates: { canonical: "/jobs" },
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; type?: string; mode?: string; q?: string }>;
}) {
  const params = await searchParams;
  const isRemote = params.type === "remote";

  const categoryLabel = jobCategories.find((c) => c.slug === params.category)?.label;

  const filtered = mockJobs.filter((job) => {
    if (isRemote && job.workMode !== "Remote") return false;
    if (categoryLabel && job.category !== categoryLabel) return false;
    if (params.mode && job.workMode.toLowerCase() !== params.mode) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (!job.title.toLowerCase().includes(q) && !job.company.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="500+ live vacancies"
        title="Find Your Next Job in Nigeria"
        description="Hand-reviewed job openings across every major industry — Lagos, Abuja, Port Harcourt and fully remote roles, updated daily."
        breadcrumbs={[{ label: "Jobs" }]}
        icon={Briefcase}
        imageSrc="/images/jobs-hub.png"
        imageAlt="Confident Nigerian professional reviewing job opportunities"
      />

      <Section className="pt-0">
        <Container>
          <form action="/jobs" method="get" className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-border sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Job title or company"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select
              name="category"
              defaultValue={params.category ?? ""}
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
            >
              <option value="">All categories</option>
              {jobCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              name="mode"
              defaultValue={params.mode ?? ""}
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
            >
              <option value="">Any work mode</option>
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {mockJobs.length} listings
            </p>
            <Link href="/jobs/categories" className="text-sm font-semibold text-primary hover:text-primary/80">
              Browse by category →
            </Link>
          </div>

          <AdSlot type="leaderboard" className="mt-8" />

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-muted/40 p-10 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">No jobs match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try clearing a filter or searching a broader keyword.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/jobs">Clear filters</Link>
              </Button>
            </div>
          )}

          <AdSlot type="footer" className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
