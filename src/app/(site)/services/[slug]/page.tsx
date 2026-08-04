import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { AdSlot } from "@/components/layout/ad-slot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, getService } from "@/lib/services-data";
import { getAllTestimonials } from "@/lib/data";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: `${service.name} | PerfectCareers`, description: service.heroDescription, alternates: { canonical: `/services/${service.slug}` } };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const allTestimonials = await getAllTestimonials();
  const testimonials = allTestimonials.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Career Service"
        title={service.name}
        description={service.heroDescription}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}
        icon={service.icon}
        imageSrc={service.heroImage}
        imageAlt={service.name}
      />

      <Section className="pt-0">
        <Container>
          <Button asChild size="lg">
            <a href={whatsappLink(`Hi, I'd like to learn more about ${service.name}.`)} target="_blank" rel="noopener noreferrer">
              Get Started on WhatsApp
            </a>
          </Button>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeading eyebrow="Benefits" title={`Why choose our ${service.name.toLowerCase()} service`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <Card key={benefit.title} className="flex-row items-start gap-4 p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">{benefit.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="How It Works" title="A simple, guided process" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.map((step) => (
              <div key={step.step}>
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
                  {step.step}
                </span>
                <p className="mt-3 font-heading text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <AdSlot type="leaderboard" />

      <Section className="bg-muted/40">
        <Container>
          <SectionHeading eyebrow="Pricing" title="Simple, transparent packages" description="Exact pricing is confirmed on WhatsApp based on your specific needs." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn("p-6", tier.featured && "ring-2 ring-primary")}
              >
                {tier.featured && (
                  <span className="w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">Most Popular</span>
                )}
                <p className="mt-3 font-heading text-lg font-bold text-foreground">{tier.name}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-primary">{tier.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant={tier.featured ? "default" : "outline"}>
                  <a href={whatsappLink(`Hi, I'm interested in the ${tier.name} package for ${service.name}.`)} target="_blank" rel="noopener noreferrer">
                    Get This Package
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Success Stories" title="Real people, real outcomes" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5 text-secondary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-heading text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" />
          <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-white px-6 ring-1 ring-border">
            {service.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-4 font-heading text-base font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-primary to-primary/80 text-white">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to get started?</h2>
          <p className="max-w-xl text-white/80">Chat with our team on WhatsApp — most services start within 24 hours of getting your details.</p>
          <Button asChild size="lg" variant="secondary">
            <a href={whatsappLink(`Hi, I'd like to get started with ${service.name}.`)} target="_blank" rel="noopener noreferrer">
              Chat With Us on WhatsApp
            </a>
          </Button>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Related" title="Other services you might need" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} className="p-0">
                <Link href={`/services/${r.slug}`} className="group flex h-full flex-col gap-3 p-5">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <r.icon className="size-4" />
                  </div>
                  <p className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">{r.name}</p>
                  <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="size-3" />
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
