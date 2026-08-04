import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = { title: "Coming Soon | PerfectCareers" };

export default function ComingSoonPage() {
  return (
    <>
      <Section className="flex min-h-[60vh] items-center">
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Sparkles className="size-7" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Something New Is Coming</h1>
            <p className="mt-2 max-w-md text-muted-foreground">
              We're building this feature to help you get even more out of PerfectCareers. Subscribe below and we'll let you know the
              moment it launches.
            </p>
          </div>
        </Container>
      </Section>
      <Newsletter />
    </>
  );
}
