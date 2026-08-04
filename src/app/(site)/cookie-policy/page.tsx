import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Cookie Policy | PerfectCareers" };

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updatedAt="August 1, 2026">
      <p>This Cookie Policy explains how PerfectCareers uses cookies and similar technologies on our website.</p>
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device that help websites function properly and understand how visitors use them.</p>
      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential cookies:</strong> Required for core site functionality, such as navigation and forms.</li>
        <li><strong>Analytics cookies:</strong> Help us understand how visitors use the site (e.g. Google Analytics) so we can improve it.</li>
        <li><strong>Advertising cookies:</strong> Used by services like Google AdSense to display relevant ads and measure their performance.</li>
      </ul>
      <h2>Managing Cookies</h2>
      <p>
        You can control or disable cookies through your browser settings. Disabling essential cookies may affect how parts of the
        site function.
      </p>
      <h2>Contact</h2>
      <p>Questions about our use of cookies can be sent to {siteConfig.contact.email}.</p>
    </LegalPage>
  );
}
