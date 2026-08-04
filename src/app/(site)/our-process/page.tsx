import type { Metadata } from "next";
import { Search, FileCheck, Send, Trophy, Building2, Users, Handshake } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Process | PerfectCareers",
  description: "How PerfectCareers works for job seekers and employers — from discovery to offer.",
};

const seekerSteps = [
  { icon: Search, title: "Discover", description: "Browse verified jobs, scholarships and grants filtered by category, location and type." },
  { icon: FileCheck, title: "Get Application-Ready", description: "Use our CV, LinkedIn, SOP and interview services to strengthen your application." },
  { icon: Send, title: "Apply", description: "Apply directly to listings, or reach us on WhatsApp for guided support." },
  { icon: Trophy, title: "Get Chosen", description: "Walk into interviews and applications prepared, confident, and ready to close the offer." },
];

const employerSteps = [
  { icon: Building2, title: "Tell Us Your Need", description: "Share the role, requirements and timeline for your vacancy." },
  { icon: Users, title: "We Source & Screen", description: "We reach our engaged candidate audience and screen against your requirements." },
  { icon: Handshake, title: "You Hire With Confidence", description: "Receive a shortlist of qualified, interview-ready candidates." },
];

export default function OurProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Our Process"
        description="A clear, guided path — whether you're looking for your next opportunity or your next hire."
        breadcrumbs={[{ label: "Our Process" }]}
        imageSrc="/images/our-process.png"
        imageAlt="A clear step-by-step path, representing the PerfectCareers process"
      />

      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="For Job Seekers" title="From discovery to offer" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seekerSteps.map((step, i) => (
              <div key={step.title}>
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="mt-3 size-5 text-primary" />
                <p className="mt-2 font-heading text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeading eyebrow="For Employers" title="From vacancy to hire" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {employerSteps.map((step, i) => (
              <div key={step.title}>
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="mt-3 size-5 text-secondary" />
                <p className="mt-2 font-heading text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="flex flex-col items-center gap-4 text-center">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Ready to start?</h2>
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I'd like to get started with PerfectCareers.")} target="_blank" rel="noopener noreferrer">
              Chat With Us on WhatsApp
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
