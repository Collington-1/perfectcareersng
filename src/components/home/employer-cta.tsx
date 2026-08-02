import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";

export function EmployerCta() {
  return (
    <Section className="bg-white py-0 pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-secondary/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
              For Employers & Recruiters
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
              Hiring? Reach thousands of qualified candidates.
            </h2>
            <p className="mt-4 text-white/80">
              Post your job openings to Nigeria&apos;s most engaged career audience, or let our
              recruitment team handle sourcing and screening for you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/employers/post-a-job">
                  Post a Job <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={whatsappLink("Hi, I'd like to talk about recruitment services.")} target="_blank" rel="noopener noreferrer">
                  Talk to Our Recruitment Team
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
