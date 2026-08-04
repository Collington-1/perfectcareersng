import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy | PerfectCareers" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updatedAt="August 1, 2026">
      <p>
        {siteConfig.legalName} (&ldquo;PerfectCareers,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy explains what
        information we collect, how we use it, and the choices you have.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We collect information you provide directly, such as your name, email address and phone number when you subscribe to our
        newsletter, submit a contact form, request a service, or reach out via WhatsApp. We also collect standard technical data
        (browser type, device, pages visited) through analytics tools to improve the site.
      </p>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to inquiries and deliver requested services</li>
        <li>To send newsletter updates about jobs, scholarships, grants and career tips (you can unsubscribe anytime)</li>
        <li>To improve our website, content and services</li>
        <li>To display relevant advertising, including via Google AdSense</li>
      </ul>
      <h2>Cookies</h2>
      <p>
        We use cookies for site functionality, analytics, and advertising personalization. See our{" "}
        <a href="/cookie-policy">Cookie Policy</a> for details.
      </p>
      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services such as Google Analytics and Google AdSense, which may collect data in accordance with their
        own privacy policies.
      </p>
      <h2>Data Sharing</h2>
      <p>
        We do not sell your personal information. We may share limited information with employers when you apply to a job through
        our platform, or with trusted service providers who help us operate the site.
      </p>
      <h2>Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data by contacting us at {siteConfig.contact.email}.</p>
      <h2>Contact Us</h2>
      <p>
        If you have questions about this policy, contact us at {siteConfig.contact.email} or via WhatsApp at {siteConfig.contact.whatsapp}.
      </p>
    </LegalPage>
  );
}
