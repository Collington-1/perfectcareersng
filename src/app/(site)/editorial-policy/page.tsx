import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Editorial Policy | PerfectCareers" };

export default function EditorialPolicyPage() {
  return (
    <LegalPage title="Editorial Policy" updatedAt="August 1, 2026">
      <p>
        PerfectCareers is committed to publishing accurate, useful and independently written career content. This policy explains how
        we create and maintain our editorial standards.
      </p>
      <h2>Human-Written Content</h2>
      <p>
        Our articles, guides and career advice are written and reviewed by our editorial team and career experts. We do not publish
        unreviewed AI-generated content as finished articles.
      </p>
      <h2>Listing Review Process</h2>
      <p>
        Jobs, scholarships and grants are reviewed before publishing to confirm they come from a credible source and include clear,
        verifiable details. Listings found to be inaccurate, expired or fraudulent are removed.
      </p>
      <h2>Editorial Independence</h2>
      <p>
        Our career advice reflects our genuine professional assessment. Paid placements, sponsorships or partnerships, where they
        exist, are clearly disclosed and do not influence our editorial recommendations.
      </p>
      <h2>Corrections</h2>
      <p>
        If you notice an error in our content or a listing, please let us know at {siteConfig.contact.email} and we will review and
        correct it promptly.
      </p>
    </LegalPage>
  );
}
