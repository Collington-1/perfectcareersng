import { BadgeCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified opportunities only",
    description: "Every job, scholarship and grant is reviewed before publishing — no scams, no dead links.",
  },
  {
    icon: Sparkles,
    title: "Human-written, not AI",
    description: "Our CV, SOP and LinkedIn services are 100% human-crafted and tailored to you.",
  },
  {
    icon: Users,
    title: "Built for Nigerians, globally",
    description: "Local job market expertise plus study-abroad and remote-work guidance that actually applies to you.",
  },
  {
    icon: BadgeCheck,
    title: "Real support, real people",
    description: "Reach a career expert on WhatsApp in minutes — not a chatbot, not a ticket queue.",
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why PerfectCareers"
          title="Career support that's actually credible"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <reason.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
