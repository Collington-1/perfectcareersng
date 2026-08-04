import type { Metadata } from "next";
import { LayoutTemplate, MonitorSmartphone, Newspaper, Mail } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Advertise With Us | PerfectCareers",
  description: "Reach an engaged audience of Nigerian job seekers, students and entrepreneurs by advertising on PerfectCareers.",
};

const formats = [
  { icon: LayoutTemplate, title: "Display Advertising", description: "Leaderboard, sidebar and in-article placements across our jobs, scholarships, grants and blog pages." },
  { icon: MonitorSmartphone, title: "Mobile Placements", description: "Dedicated mobile-optimized ad formats reaching our majority mobile audience." },
  { icon: Newspaper, title: "Sponsored Content", description: "Branded articles or guides written in our editorial voice, clearly labeled as sponsored." },
  { icon: Mail, title: "Newsletter Sponsorship", description: "Reach our weekly newsletter subscribers with a dedicated placement." },
];

const stats = [
  { value: "500+", label: "Live listings" },
  { value: "10,000+", label: "Careers supported" },
  { value: "Nigeria-wide", label: "+ diaspora reach" },
];

export default function AdvertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Advertise"
        title="Reach Nigeria's Most Engaged Career Audience"
        description="Put your brand in front of ambitious job seekers, students and entrepreneurs actively looking for their next opportunity."
        breadcrumbs={[{ label: "Advertise With Us" }]}
        imageSrc="/images/advertise.png"
        imageAlt="Marketing professional reviewing advertising analytics"
      />
      <Section className="pt-0">
        <Container>
          <dl className="grid grid-cols-1 gap-6 rounded-2xl bg-muted/40 p-8 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-heading text-2xl font-bold text-primary sm:text-3xl">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>

          <SectionHeading eyebrow="Ad Formats" title="Ways to advertise with us" className="mt-14" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {formats.map((f) => (
              <Card key={f.title} className="flex-row items-start gap-4 p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 text-center text-white">
            <h2 className="font-heading text-xl font-bold sm:text-2xl">Ready to advertise?</h2>
            <p className="max-w-lg text-white/80">Tell us about your brand and goals, and we'll send you our current rate card and available placements.</p>
            <Button asChild size="lg" variant="secondary">
              <a href={whatsappLink("Hi, I'd like to advertise on PerfectCareers.")} target="_blank" rel="noopener noreferrer">
                Request Rate Card
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
