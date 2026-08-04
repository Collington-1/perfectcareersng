import type { Metadata } from "next";
import { Search as SearchIcon } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { JobCard } from "@/components/content/job-card";
import { ScholarshipCard } from "@/components/content/scholarship-card";
import { GrantCard } from "@/components/content/grant-card";
import { BlogCard } from "@/components/content/blog-card";
import { getAllJobs, getAllScholarships, getAllGrants, getAllBlogPosts } from "@/lib/data";

export const metadata: Metadata = { title: "Search | PerfectCareers" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase().trim();

  const [allJobs, allScholarships, allGrants, allPosts] = await Promise.all([
    getAllJobs(),
    getAllScholarships(),
    getAllGrants(),
    getAllBlogPosts(),
  ]);

  const jobs = query ? allJobs.filter((j) => j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query)) : [];
  const scholarships = query ? allScholarships.filter((s) => s.title.toLowerCase().includes(query) || s.university.toLowerCase().includes(query)) : [];
  const grants = query ? allGrants.filter((g) => g.title.toLowerCase().includes(query) || g.provider.toLowerCase().includes(query)) : [];
  const posts = query ? allPosts.filter((p) => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query)) : [];

  const totalResults = jobs.length + scholarships.length + grants.length + posts.length;

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={q ? `Results for "${q}"` : "Search PerfectCareers"}
        description={q ? `${totalResults} result${totalResults === 1 ? "" : "s"} found across jobs, scholarships, grants and articles.` : "Search across jobs, scholarships, grants and career advice."}
        breadcrumbs={[{ label: "Search" }]}
        icon={SearchIcon}
      />
      <Section className="pt-0">
        <Container>
          <form action="/search" method="get" className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-border">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search jobs, scholarships, grants, articles..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </form>

          {q && totalResults === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No results found for &ldquo;{q}&rdquo;. Try a different keyword.</p>
          )}

          {jobs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-foreground">Jobs ({jobs.length})</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((j) => (
                  <JobCard key={j.slug} job={j} />
                ))}
              </div>
            </div>
          )}

          {scholarships.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-foreground">Scholarships ({scholarships.length})</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {scholarships.map((s) => (
                  <ScholarshipCard key={s.slug} scholarship={s} />
                ))}
              </div>
            </div>
          )}

          {grants.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-foreground">Grants ({grants.length})</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grants.map((g) => (
                  <GrantCard key={g.slug} grant={g} />
                ))}
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-foreground">Articles ({posts.length})</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
