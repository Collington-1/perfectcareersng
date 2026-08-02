import type { Metadata } from "next";
import { Briefcase, GraduationCap, HandCoins, Newspaper } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: "Newsletter | PerfectCareers",
  description: "Get the best new jobs, scholarships, grants and career tips delivered to your inbox weekly.",
};

const perks = [
  { icon: Briefcase, label: "Curated new job openings" },
  { icon: GraduationCap, label: "Fresh scholarship deadlines" },
  { icon: HandCoins, label: "Business grant opportunities" },
  { icon: Newspaper, label: "Practical career tips" },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay Updated"
        title="Never Miss an Opportunity"
        description="One weekly email with the best new jobs, scholarships, grants and career advice. No spam, unsubscribe anytime."
        breadcrumbs={[{ label: "Newsletter" }]}
      />
      <Section className="pt-0">
        <Container>
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {perks.map((perk) => (
              <div key={perk.label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <perk.icon className="size-5" />
                </div>
                <p className="text-xs text-muted-foreground">{perk.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <div className="-mt-8">
        <Newsletter />
      </div>
    </>
  );
}
