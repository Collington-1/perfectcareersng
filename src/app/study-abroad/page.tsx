import type { Metadata } from "next";
import Link from "next/link";
import { Plane, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { ScholarshipCard } from "@/components/content/scholarship-card";
import { BlogCard } from "@/components/content/blog-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockScholarships, mockBlogPosts } from "@/lib/mock-data";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Study Abroad Guide for Nigerians | PerfectCareers",
  description: "Everything Nigerian students need to study abroad — destinations, scholarships, application timelines and documentation support.",
};

const destinations = [
  { country: "United Kingdom", note: "1-year master's degrees and strong scholarship availability (Chevening, Commonwealth)." },
  { country: "United States", note: "World-leading research programmes with fellowship and assistantship funding options." },
  { country: "Canada", note: "Post-study work pathways and growing scholarship access for African students." },
  { country: "Germany", note: "Low or no tuition at public universities, plus DAAD-style development funding." },
];

export default function StudyAbroadPage() {
  const internationalScholarships = mockScholarships.filter((s) => s.country !== "Nigeria").slice(0, 6);
  const studyAbroadPosts = mockBlogPosts.filter((p) => p.categorySlug === "study-abroad");

  return (
    <>
      <PageHero
        eyebrow="Study Abroad"
        title="Your Guide to Studying Abroad"
        description="Destinations, scholarships, application timelines and documentation support — everything Nigerian students need in one place."
        breadcrumbs={[{ label: "Study Abroad" }]}
        icon={Plane}
        imageSrc="/images/study-abroad.png"
        imageAlt="Nigerian student at an airport, ready to travel to study abroad"
      />

      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="Popular Destinations" title="Where Nigerians are studying abroad" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <Card key={d.country} className="p-5">
                <p className="font-heading text-base font-semibold text-foreground">{d.country}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{d.note}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Funded Opportunities"
            title="Featured scholarships abroad"
            cta={{ label: "View all scholarships", href: "/scholarships" }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {internationalScholarships.map((s) => (
              <ScholarshipCard key={s.slug} scholarship={s} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Guides"
            title="Study abroad advice"
            cta={{ label: "View all articles", href: "/blog/category/study-abroad" }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {studyAbroadPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-primary to-primary/80 text-white">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Need help with your application?</h2>
          <p className="max-w-xl text-white/80">Our study abroad advisors help with SOPs, documentation and application review.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/services/study-abroad-documentation">
                Get Documentation Support <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <a href={whatsappLink("Hi, I'd like help with my study abroad application.")} target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
