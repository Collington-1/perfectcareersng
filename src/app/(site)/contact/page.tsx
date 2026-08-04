import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/content/contact-form";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | PerfectCareers",
  description: "Get in touch with PerfectCareers via WhatsApp, email or our contact form. We typically respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        description="Questions about a listing, a service, or a partnership? Reach out — we typically respond within 24 hours."
        breadcrumbs={[{ label: "Contact" }]}
        imageSrc="/images/contact-support.png"
        imageAlt="Friendly PerfectCareers support team member"
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-5">
              <a
                href={whatsappLink("Hi PerfectCareers, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-border hover:ring-primary/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C22 6.45 17.5 2 12.04 2m0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.84-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.55 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.71 8.23-8.25 8.23" />
                  </svg>
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.contact.whatsapp} — fastest way to reach us</p>
                </div>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-border hover:ring-primary/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
                </div>
              </a>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-border">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Office</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state}, {siteConfig.contact.address.country}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-border">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Response Time</p>
                  <p className="text-sm text-muted-foreground">Monday – Saturday, typically within 24 hours</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
