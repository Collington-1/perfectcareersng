import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms of Service | PerfectCareers" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updatedAt="August 1, 2026">
      <p>
        These Terms of Service govern your use of the PerfectCareers website, operated by {siteConfig.legalName} ({siteConfig.rcNumber}).
        By using this site, you agree to these terms.
      </p>
      <h2>Use of the Platform</h2>
      <p>
        PerfectCareers publishes job, scholarship and grant listings, career content, and offers paid career services. Listings are
        reviewed before publishing, but we do not guarantee the accuracy, availability, or outcome of any third-party opportunity.
      </p>
      <h2>Paid Services</h2>
      <p>
        Career services (CV writing, LinkedIn optimization, SOP writing, interview preparation and others) are delivered as described
        on each service page. Pricing is confirmed directly with our team before payment. We do not guarantee employment, admission
        or scholarship outcomes as a result of any service.
      </p>
      <h2>User Conduct</h2>
      <p>
        You agree not to misuse the platform, submit false information, or use it for unlawful purposes. We reserve the right to
        remove content or restrict access that violates these terms.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        All content on this site, including articles, graphics and branding, is owned by {siteConfig.legalName} unless otherwise
        credited, and may not be reproduced without permission.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        PerfectCareers is not liable for losses arising from third-party job, scholarship or grant listings, or from decisions made
        based on our content. See our <a href="/disclaimer">Disclaimer</a> for more detail.
      </p>
      <h2>Changes to These Terms</h2>
      <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to {siteConfig.contact.email}.</p>
    </LegalPage>
  );
}
