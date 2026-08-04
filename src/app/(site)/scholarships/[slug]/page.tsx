import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Globe2, CalendarClock, BadgeCheck, CheckCircle2, FileText } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AdSlot } from "@/components/layout/ad-slot";
import { ShareButtons } from "@/components/content/share-buttons";
import { ScholarshipCard } from "@/components/content/scholarship-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDeadline } from "@/lib/format";
import { whatsappLink } from "@/lib/site-config";
import { getAllScholarships } from "@/lib/data";

export async function generateStaticParams() {
  const scholarships = await getAllScholarships();
  return scholarships.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scholarships = await getAllScholarships();
  const s = scholarships.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} — ${s.country} | PerfectCareers`, description: s.description, alternates: { canonical: `/scholarships/${s.slug}` } };
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholarships = await getAllScholarships();
  const scholarship = scholarships.find((s) => s.slug === slug);
  if (!scholarship) notFound();

  const related = scholarships.filter((s) => s.slug !== scholarship.slug && s.country === scholarship.country).slice(0, 3);

  return (
    <>
      <Section className="pb-0">
        <Container>
          <Breadcrumbs items={[{ label: "Scholarships", href: "/scholarships" }, { label: scholarship.title }]} />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{scholarship.title}</h1>
                  <p className="mt-1 text-base text-muted-foreground">{scholarship.university}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="outline">{scholarship.fundingType}</Badge>
                <Badge variant="outline">{scholarship.country}</Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="size-4" />
                  {scholarship.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="size-4" />
                  {scholarship.amount}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="size-4" />
                  Deadline: {formatDeadline(scholarship.deadline)}
                </span>
              </div>

              <div className="prose prose-neutral mt-8 max-w-none">
                <h2 className="font-heading text-xl font-semibold text-foreground">About this scholarship</h2>
                <p className="text-muted-foreground">{scholarship.description}</p>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Eligibility</h2>
                <ul className="mt-3 space-y-2">
                  {scholarship.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Requirements</h2>
                <ul className="mt-3 space-y-2">
                  {scholarship.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Documents Needed</h2>
                <ul className="mt-3 space-y-2">
                  {scholarship.documents.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">How to Apply</h2>
                <p className="text-muted-foreground">{scholarship.howToApply}</p>
              </div>

              <AdSlot type="in-article" className="mt-10" />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <ShareButtons path={`/scholarships/${scholarship.slug}`} title={scholarship.title} />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-border">
                <p className="font-heading text-lg font-bold text-foreground">Need help applying?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our study abroad advisors review SOPs, documents and applications before you submit.
                </p>
                <Button asChild size="lg" className="mt-4 w-full" variant="secondary">
                  <Link href="/services/study-abroad-documentation">Get Application Support</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="mt-2 w-full">
                  <a href={whatsappLink(`Hi, I'd like help applying for the ${scholarship.title}.`)} target="_blank" rel="noopener noreferrer">
                    Ask on WhatsApp
                  </a>
                </Button>
              </div>
              <AdSlot type="sidebar" />
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container>
            <h2 className="font-heading text-2xl font-bold text-foreground">More scholarships in {scholarship.country}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ScholarshipCard key={r.slug} scholarship={r} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
