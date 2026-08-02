import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | PerfectCareers",
  description: "Answers to common questions about jobs, scholarships, grants, career services and posting on PerfectCareers.",
};

const faqGroups = [
  {
    group: "General",
    faqs: [
      { question: "Is it free to browse jobs, scholarships and grants?", answer: "Yes — browsing and applying to listings on PerfectCareers is completely free. We earn from optional career services like CV writing and LinkedIn optimization." },
      { question: "How often are new opportunities added?", answer: "New jobs, scholarships and grants are reviewed and published daily. Subscribe to our newsletter or follow us on WhatsApp to get notified first." },
      { question: "How do I know a listing is legitimate?", answer: "Every listing is reviewed before publishing. Legitimate opportunities never ask you to pay to \"release\" a job offer, scholarship or grant." },
    ],
  },
  {
    group: "Jobs, Scholarships & Grants",
    faqs: [
      { question: "How do I apply for a job listed on PerfectCareers?", answer: "Most jobs can be applied to directly via WhatsApp from the listing page, or via the employer's official application link where provided." },
      { question: "Can I filter scholarships by country?", answer: "Yes — visit our Scholarship Categories page to browse by destination country, including the UK, US, Canada and more." },
      { question: "Do you help with the actual application, not just the listing?", answer: "Yes — our CV writing, SOP writing and study abroad documentation services are built specifically to support your application." },
    ],
  },
  {
    group: "Career Services",
    faqs: [
      { question: "How do I get started with a career service like CV writing?", answer: "Chat with us on WhatsApp or visit the service page to see pricing and what's included. Most services are delivered within 24-72 hours." },
      { question: "Do you guarantee I'll get hired or win a scholarship?", answer: "No one can guarantee outcomes, but our services are built to significantly improve your chances — from ATS-optimized CVs to expert-reviewed SOPs and interview coaching." },
      { question: "What's included in the price?", answer: "Exact pricing and inclusions are confirmed with you directly on WhatsApp before you pay, based on the package you choose." },
    ],
  },
  {
    group: "Employers",
    faqs: [
      { question: "Can employers post jobs directly on PerfectCareers?", answer: "Yes — visit our Post a Job page or reach out via WhatsApp to discuss listing your vacancy." },
      { question: "Do you offer full recruitment support, not just listings?", answer: "Yes — our Recruitment & HR Services cover sourcing, screening and shortlisting candidates for your open roles." },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        description="Can't find what you're looking for? Reach out to us directly on WhatsApp."
        breadcrumbs={[{ label: "FAQs" }]}
      />
      <Section className="pt-0">
        <Container className="max-w-3xl space-y-12">
          {faqGroups.map((group) => (
            <div key={group.group}>
              <h2 className="font-heading text-xl font-bold text-foreground">{group.group}</h2>
              <Accordion type="single" collapsible className="mt-4 rounded-2xl bg-white px-6 ring-1 ring-border">
                {group.faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="py-4 font-heading text-base font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
