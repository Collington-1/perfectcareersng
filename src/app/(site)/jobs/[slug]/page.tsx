import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, CalendarClock, BadgeCheck } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AdSlot } from "@/components/layout/ad-slot";
import { ShareButtons } from "@/components/content/share-buttons";
import { ApplyButton } from "@/components/content/apply-button";
import { JobCard } from "@/components/content/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDeadline, formatRelativeDate, stripHtmlToExcerpt } from "@/lib/format";
import { getAllJobs } from "@/lib/data";

export async function generateStaticParams() {
  const jobs = await getAllJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const jobs = await getAllJobs();
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  return {
    title: `${job.title} at ${job.company} — ${job.location} | PerfectCareers`,
    description: stripHtmlToExcerpt(job.contentHtml),
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jobs = await getAllJobs();
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const related = jobs.filter((j) => j.slug !== job.slug && j.category === job.category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: stripHtmlToExcerpt(job.contentHtml, 500),
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: { "@type": "Organization", name: job.company },
    jobLocationType: job.workMode === "Remote" ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: job.workMode === "Remote" ? { "@type": "Country", name: "Nigeria" } : undefined,
    jobLocation:
      job.workMode === "Remote"
        ? undefined
        : { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "NG" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section className="pb-0">
        <Container>
          <Breadcrumbs items={[{ label: "Jobs", href: "/jobs" }, { label: job.title }]} />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Briefcase className="size-6" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{job.title}</h1>
                  <p className="mt-1 text-base text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="outline">{job.employmentType}</Badge>
                <Badge variant="outline">{job.workMode}</Badge>
                <Badge variant="outline">{job.category}</Badge>
                {job.experienceLevel && <Badge variant="outline">{job.experienceLevel}</Badge>}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck className="size-4" />
                    {job.salary}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="size-4" />
                  Apply by {formatDeadline(job.deadline)}
                </span>
              </div>

              <div
                className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading prose-headings:text-foreground"
                dangerouslySetInnerHTML={{ __html: job.contentHtml }}
              />

              <AdSlot type="in-article" className="mt-10" />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <ShareButtons path={`/jobs/${job.slug}`} title={`${job.title} at ${job.company}`} />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-border">
                <p className="font-heading text-lg font-bold text-foreground">Ready to apply?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Applications for this role close {formatDeadline(job.deadline)}.
                </p>
                <div className="mt-4">
                  <ApplyButton
                    applicationUrl={job.applicationUrl}
                    whatsappMessage={`Hi, I'd like to apply for the ${job.title} role at ${job.company}.`}
                  />
                </div>
                <Button asChild variant="outline" size="lg" className="mt-2 w-full">
                  <Link href="/services/cv-writing">Get your CV reviewed first</Link>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">Posted {formatRelativeDate(job.publishedAt)}</p>
              </div>
              <AdSlot type="sidebar" />
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container>
            <h2 className="font-heading text-2xl font-bold text-foreground">Related jobs in {job.category}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <JobCard key={r.slug} job={r} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
