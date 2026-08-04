import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services-data";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing | PerfectCareers Career Services",
  description: "Simple, transparent pricing for CV writing, LinkedIn optimization, SOP writing, interview preparation and more.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        description="Every service below is confirmed with an exact quote on WhatsApp before you pay — no surprise fees."
        breadcrumbs={[{ label: "Pricing" }]}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon className="size-5" />
                </div>
                <p className="mt-4 font-heading text-base font-semibold text-foreground">{service.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{service.shortDescription}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.pricingTiers.slice(0, 2).map((tier) => (
                    <li key={tier.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <CheckCircle2 className="size-3.5 text-secondary" />
                        {tier.name}
                      </span>
                      <span className="font-medium text-foreground">{tier.price}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}`} className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80">
                  View full pricing <ArrowRight className="size-3.5" />
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-muted/40 p-10 text-center">
            <h2 className="font-heading text-xl font-bold text-foreground">Not sure which service you need?</h2>
            <p className="max-w-lg text-muted-foreground">Tell us your goal on WhatsApp and we'll recommend the right package for your budget.</p>
            <Button asChild size="lg">
              <a href={whatsappLink("Hi, I'd like help choosing the right service and package.")} target="_blank" rel="noopener noreferrer">
                Ask Us on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
