import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Disclaimer | PerfectCareers" };

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updatedAt="August 1, 2026">
      <h2>No Guarantee of Outcomes</h2>
      <p>
        PerfectCareers publishes job, scholarship and grant opportunities sourced from employers, institutions and funding bodies. We
        review listings before publishing, but we do not control the hiring, admissions or funding decisions of any third party.
        Applying through our platform does not guarantee an interview, offer, admission or award.
      </p>
      <h2>Third-Party Listings</h2>
      <p>
        Opportunities are subject to change or expiry by the originating employer, institution or organization without notice. Always
        verify deadline and eligibility details directly with the official source before submitting sensitive documents or payments.
      </p>
      <h2>Career Services</h2>
      <p>
        Our CV writing, LinkedIn optimization, SOP writing, interview preparation and related services are designed to strengthen your
        application materials and readiness. They do not guarantee employment, admission or scholarship outcomes, as final decisions
        rest entirely with the hiring or admitting organization.
      </p>
      <h2>External Links</h2>
      <p>
        Our site may link to external websites, including official application portals. {siteConfig.legalName} is not responsible for
        the content, accuracy, or practices of external sites.
      </p>
      <h2>Scam Awareness</h2>
      <p>
        Legitimate scholarships, grants and employers do not request payment to release a prize, offer or funding. If you encounter
        suspicious requests through a listing on our platform, please report it to {siteConfig.contact.email}.
      </p>
    </LegalPage>
  );
}
