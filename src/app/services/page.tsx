import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Career Services — CV Writing, LinkedIn, Interview Prep & More | PerfectCareers",
  description:
    "Professional CV writing, LinkedIn optimization, SOP writing, interview preparation, portfolio websites and recruitment services for Nigerian professionals.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Career Services"
        title="Get Chosen, Not Just Seen"
        description="Listings get you in the door. These services help you actually get the offer — from your CV to the final interview."
        breadcrumbs={[{ label: "Services" }]}
        icon={Briefcase}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="p-0">
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col gap-4 p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white">
                    <service.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-base font-semibold text-foreground group-hover:text-primary">{service.name}</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">{service.shortDescription}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
