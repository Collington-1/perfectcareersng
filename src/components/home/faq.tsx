import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it free to browse jobs, scholarships and grants?",
    answer: "Yes — browsing and applying to listings on PerfectCareers is completely free. We earn from optional career services like CV writing and LinkedIn optimization.",
  },
  {
    question: "How often are new opportunities added?",
    answer: "New jobs, scholarships and grants are reviewed and published daily. Subscribe to our newsletter or follow us on WhatsApp to get notified first.",
  },
  {
    question: "Do you guarantee I'll get hired or win a scholarship?",
    answer: "No one can guarantee outcomes, but our services are built to significantly improve your chances — from ATS-optimized CVs to expert-reviewed SOPs and interview coaching.",
  },
  {
    question: "How do I get started with a career service like CV writing?",
    answer: "Chat with us on WhatsApp or visit the service page to see pricing and what's included. Most services are delivered within 24–72 hours.",
  },
  {
    question: "Can employers post jobs directly on PerfectCareers?",
    answer: "Yes — visit our Post a Job page or reach out via WhatsApp to discuss recruitment packages for your business.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function Faq() {
  return (
    <Section className="bg-muted/40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" />
        <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-white px-6 ring-1 ring-border">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-4 font-heading text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
