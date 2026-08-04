import type { Metadata } from "next";
import { Users, Target, ShieldCheck, Clock } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Post a Job | PerfectCareers for Employers",
  description: "Post your job vacancy on PerfectCareers and reach thousands of qualified, actively-searching Nigerian candidates.",
};

const benefits = [
  { icon: Users, title: "An engaged, active audience", description: "Your listing reaches candidates actively searching, not passive scrollers." },
  { icon: Target, title: "Targeted by category & location", description: "Your role appears in the right category and location filters candidates actually use." },
  { icon: ShieldCheck, title: "Credibility from day one", description: "Listings appear alongside our reviewed jobs, scholarships and grants, in a trusted environment." },
  { icon: Clock, title: "Fast turnaround", description: "Most listings go live within 24-48 hours of confirmation." },
];

const faqs = [
  { question: "How do I post a job?", answer: "Reach out via WhatsApp or email with your job details, and our team will confirm package options and get your listing live." },
  { question: "How long does a listing stay active?", answer: "Standard listings run for 30 days, renewable if the role is still open." },
  { question: "Can you help screen candidates too?", answer: "Yes — see our Recruitment & HR Services for sourcing and screening support beyond just listing your role." },
];

export default function PostAJobPage() {
  return (
    <>
      <PageHero
        eyebrow="For Employers"
        title="Post Your Job Opening"
        description="Reach thousands of qualified, actively-searching candidates across Nigeria's most engaged career audience."
        breadcrumbs={[{ label: "Employers", href: "/employers/post-a-job" }, { label: "Post a Job" }]}
        imageSrc="/images/employers-post-a-job.png"
        imageAlt="Nigerian professionals in a hiring panel interview"
      />
      <Section className="pt-0">
        <Container>
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I'd like to post a job on PerfectCareers.")} target="_blank" rel="noopener noreferrer">
              Post a Job on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="ml-3">
            <a href={`mailto:${siteConfig.contact.email}?subject=Job Posting Inquiry`}>Email Us Instead</a>
          </Button>

          <SectionHeading eyebrow="Why Post With Us" title="Reach candidates who are actually looking" className="mt-16" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <Card key={b.title} className="flex-row items-start gap-4 p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <b.icon className="size-5" />
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">{b.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" />
          <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-white px-6 ring-1 ring-border">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-4 font-heading text-base font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  );
}
