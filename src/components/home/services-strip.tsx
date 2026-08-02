import Link from "next/link";
import {
  FileText,
  MessageSquareText,
  Mic,
  ArrowRight,
} from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { LinkedInIcon } from "@/components/icons/social-icons";

const services = [
  {
    icon: FileText,
    title: "CV Writing",
    description: "Recruiter-tested CVs written by career experts, not templates.",
    href: "/services/cv-writing",
  },
  {
    icon: LinkedInIcon,
    title: "LinkedIn Optimization",
    description: "Profiles that get you found by recruiters, not just seen.",
    href: "/services/linkedin-optimization",
  },
  {
    icon: MessageSquareText,
    title: "SOP & Motivation Letters",
    description: "Compelling statements that get study-abroad applications approved.",
    href: "/services/sop-writing",
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    description: "Mock interviews and coaching to help you close the offer.",
    href: "/services/interview-preparation",
  },
];

export function ServicesStrip() {
  return (
    <Section className="bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Career services"
          title="Get chosen, not just seen"
          description="Listings get you in the door. These services help you actually get the offer."
          cta={{ label: "View all services", href: "/services" }}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white">
                <service.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{service.description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
