import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HandCoins, Building2, CalendarClock, BadgeCheck, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AdSlot } from "@/components/layout/ad-slot";
import { ShareButtons } from "@/components/content/share-buttons";
import { GrantCard } from "@/components/content/grant-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDeadline } from "@/lib/format";
import { mockGrants } from "@/lib/mock-data";
import { whatsappLink } from "@/lib/site-config";

export function generateStaticParams() {
  return mockGrants.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = mockGrants.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.title} — ${g.provider} | PerfectCareers`, description: g.description, alternates: { canonical: `/grants/${g.slug}` } };
}

export default async function GrantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const grant = mockGrants.find((g) => g.slug === slug);
  if (!grant) notFound();

  const related = mockGrants.filter((g) => g.slug !== grant.slug && g.industry === grant.industry).slice(0, 3);

  return (
    <>
      <Section className="pb-0">
        <Container>
          <Breadcrumbs items={[{ label: "Grants", href: "/grants" }, { label: grant.title }]} />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HandCoins className="size-6" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{grant.title}</h1>
                  <p className="mt-1 text-base text-muted-foreground">{grant.provider}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="outline">{grant.industry}</Badge>
                <Badge variant="outline">{grant.businessStage}</Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-4" />
                  {grant.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="size-4" />
                  {grant.fundingAmount}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="size-4" />
                  Deadline: {formatDeadline(grant.deadline)}
                </span>
              </div>

              <div className="prose prose-neutral mt-8 max-w-none">
                <h2 className="font-heading text-xl font-semibold text-foreground">About this grant</h2>
                <p className="text-muted-foreground">{grant.description}</p>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Eligibility</h2>
                <ul className="mt-3 space-y-2">
                  {grant.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Requirements</h2>
                <ul className="mt-3 space-y-2">
                  {grant.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <AdSlot type="in-article" className="mt-10" />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <ShareButtons path={`/grants/${grant.slug}`} title={grant.title} />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-border">
                <p className="font-heading text-lg font-bold text-foreground">Need help with your application?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our grant writing service helps founders build a compelling, reviewer-ready application.
                </p>
                <Button asChild size="lg" className="mt-4 w-full">
                  <a href={whatsappLink(`Hi, I'd like help applying for the ${grant.title}.`)} target="_blank" rel="noopener noreferrer">
                    Ask on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="mt-2 w-full">
                  <Link href="/services">Explore our services</Link>
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
            <h2 className="font-heading text-2xl font-bold text-foreground">More grants in {grant.industry}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <GrantCard key={r.slug} grant={r} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
