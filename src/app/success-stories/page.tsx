import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTestimonials } from "@/lib/mock-data";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Success Stories | PerfectCareers",
  description: "Real outcomes from Nigerians who used PerfectCareers to land jobs, win scholarships and secure business grants.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Real People, Real Outcomes"
        description="From CV rewrites that unlocked interviews to scholarships won and grants secured — here's what working with us looks like."
        breadcrumbs={[{ label: "Success Stories" }]}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mockTestimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5 text-secondary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-muted/40 p-10 text-center">
            <h2 className="font-heading text-xl font-bold text-foreground">Want to be our next success story?</h2>
            <Button asChild size="lg">
              <a href={whatsappLink("Hi, I'd like to get started with PerfectCareers.")} target="_blank" rel="noopener noreferrer">
                Get Started on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
