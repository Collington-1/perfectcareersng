import type { Metadata } from "next";
import { GraduationCap, Building2, HandCoins, Newspaper } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Partners | PerfectCareers",
  description: "Partner with PerfectCareers as a university, employer, funding body or media organization to reach Nigeria's most engaged career audience.",
};

const partnerTypes = [
  { icon: Building2, title: "Employers & Recruiters", description: "List roles directly to our audience, or work with our recruitment team to source and screen candidates." },
  { icon: GraduationCap, title: "Universities & Scholarship Providers", description: "Reach qualified Nigerian applicants for your scholarship or degree programme." },
  { icon: HandCoins, title: "Grant & Funding Bodies", description: "Connect your funding opportunity with founders actively searching for capital." },
  { icon: Newspaper, title: "Media & Content Partners", description: "Collaborate on career content, co-branded resources, or cross-promotion." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Partner With PerfectCareers"
        description="We work with employers, universities, funding bodies and media partners to connect Nigerians with real opportunity."
        breadcrumbs={[{ label: "Partners" }]}
      />
      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="Ways to Partner" title="Who we work with" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {partnerTypes.map((p) => (
              <Card key={p.title} className="flex-row items-start gap-4 p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 text-center text-white">
            <h2 className="font-heading text-xl font-bold sm:text-2xl">Interested in partnering with us?</h2>
            <p className="max-w-lg text-white/80">Tell us about your organization and what you're looking to achieve — we'll get back to you within 48 hours.</p>
            <Button asChild size="lg" variant="secondary">
              <a href={whatsappLink("Hi, I'd like to discuss a partnership with PerfectCareers.")} target="_blank" rel="noopener noreferrer">
                Start the Conversation
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
