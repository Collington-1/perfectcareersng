// Single source of truth for brand/business facts referenced across the site.
// The domain isn't purchased yet, so siteUrl is env-driven — set
// NEXT_PUBLIC_SITE_URL once a real domain exists (Netlify env var), and every
// canonical URL / OG tag / JSON-LD block picks it up automatically.
export const siteConfig = {
  name: "PerfectCareers",
  legalName: "Perfect Careers Nigeria Ltd",
  rcNumber: "RC 9222641",
  tagline: "Nigeria's premium destination for jobs, scholarships, grants and career growth",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.perfectcareerng.com",
  logo: {
    primary: "/brand/logo-primary.png",
    reversed: "/brand/logo-reversed.png",
    icon: "/brand/icon-mark.png",
  },
  contact: {
    whatsapp: "07079837417",
    whatsappIntl: "2347079837417",
    email: "perfectcareersng@gmail.com",
    address: {
      city: "Port Harcourt",
      state: "Rivers State",
      country: "Nigeria",
    },
  },
  social: {
    instagram: "https://instagram.com/perfectcareersng",
    twitter: "https://x.com/perfectcareersng",
    facebook: "https://facebook.com/perfectcareersng",
    linkedin: "https://linkedin.com/company/perfectcareersng",
  },
  founder: {
    name: "Okezie Collington",
    founded: "January 2026",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsappIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
