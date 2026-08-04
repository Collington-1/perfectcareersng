import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Users, Sparkles, HeartHandshake } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us | PerfectCareers",
  description:
    "PerfectCareers is a Port Harcourt-based career platform helping Nigerians find verified jobs, scholarships, grants, and get chosen with expert career services.",
};

const values = [
  { icon: ShieldCheck, title: "Verified, not just listed", description: "Every opportunity is reviewed before it reaches you — no scams, no dead links." },
  { icon: Sparkles, title: "Human-written, always", description: "Our CV, SOP and LinkedIn work is 100% human-crafted, never auto-generated." },
  { icon: HeartHandshake, title: "Real people, real support", description: "You can reach a career expert on WhatsApp, not a chatbot or a ticket queue." },
  { icon: Users, title: "Built for Nigerians, globally", description: "Local job market depth, plus study-abroad and remote-work expertise that actually applies." },
];

const stats = [
  { value: "500+", label: "Live job openings" },
  { value: "80+", label: "Scholarships & grants" },
  { value: "10,000+", label: "Careers supported" },
  { value: "2026", label: "Founded in Port Harcourt" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PerfectCareers"
        title="Nigeria's Career Platform, Built From the Ground Up"
        description="We help ambitious Nigerians find verified jobs, scholarships and grants — and give them the CV, LinkedIn and interview support to actually get chosen."
        breadcrumbs={[{ label: "About Us" }]}
        imageSrc="/images/about-founder.png"
        imageAlt={`${siteConfig.founder.name}, founder of PerfectCareers`}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Our Story" title="Why we started PerfectCareers" />
          <div className="prose prose-neutral mt-6 max-w-none">
            <p>
              {siteConfig.legalName} was founded in {siteConfig.founder.founded} in Port Harcourt, Rivers State, by{" "}
              {siteConfig.founder.name}, out of a simple frustration: too many qualified Nigerians were being filtered out of
              opportunities they were genuinely capable of winning — not because they lacked talent, but because their CV never
              cleared the applicant tracking system, their LinkedIn profile was invisible to recruiters, or their scholarship
              application missed a detail that quietly disqualified them.
            </p>
            <p>
              PerfectCareers was built to close that gap from both directions: a single place to discover verified jobs, scholarships
              and business grants, and a team of career experts to help you actually put your best application forward — CV writing,
              LinkedIn optimization, SOP and motivation letter support, interview preparation and more.
            </p>
            <p>
              What started as a single founder's frustration with Nigeria's career information gap is growing into one of the
              country's most trusted destinations for career opportunity and guidance — one verified listing and one successful
              application at a time.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-6">
              <Target className="size-6 text-primary" />
              <p className="mt-3 font-heading text-lg font-bold text-foreground">Our Mission</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                To help every ambitious Nigerian find and win the job, scholarship or grant they're genuinely qualified for — by
                removing the information gaps and application mistakes that stand in the way.
              </p>
            </Card>
            <Card className="p-6">
              <Eye className="size-6 text-secondary" />
              <p className="mt-3 font-heading text-lg font-bold text-foreground">Our Vision</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                To become one of the largest and most trusted career opportunity platforms in Nigeria — and a launchpad for the next
                generation of Nigerian professionals, students and entrepreneurs.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Our Values" title="What guides how we work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-foreground">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-primary to-primary/80 text-white">
        <Container>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="font-heading text-2xl font-bold sm:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-sm text-white/80">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Have a question about who we are?</h2>
          <p className="max-w-xl text-muted-foreground">We're always happy to talk — reach our team directly on WhatsApp.</p>
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I'd like to learn more about PerfectCareers.")} target="_blank" rel="noopener noreferrer">
              Chat With Us
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
