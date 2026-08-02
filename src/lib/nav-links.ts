export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items?: NavLink[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Jobs",
    href: "/jobs",
    items: [
      { label: "All Jobs", href: "/jobs", description: "Browse every open role" },
      { label: "Remote Jobs", href: "/jobs?type=remote", description: "Work from anywhere" },
      { label: "Job Categories", href: "/jobs/categories", description: "Browse by industry" },
      { label: "Post a Job", href: "/employers/post-a-job", description: "For employers & recruiters" },
    ],
  },
  {
    label: "Scholarships",
    href: "/scholarships",
    items: [
      { label: "All Scholarships", href: "/scholarships" },
      { label: "Study Abroad", href: "/study-abroad", description: "UK, US, Canada guides" },
      { label: "Scholarship Categories", href: "/scholarships/categories" },
    ],
  },
  {
    label: "Grants",
    href: "/grants",
    items: [
      { label: "All Grants", href: "/grants" },
      { label: "Grant Categories", href: "/grants/categories" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "All Services", href: "/services" },
      { label: "CV Writing", href: "/services/cv-writing" },
      { label: "LinkedIn Optimization", href: "/services/linkedin-optimization" },
      { label: "Interview Preparation", href: "/services/interview-preparation" },
      { label: "Recruitment & HR Services", href: "/services/recruitment-hr" },
    ],
  },
  {
    label: "Career Advice",
    href: "/blog",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "CV Tips", href: "/blog/category/cv-tips" },
      { label: "LinkedIn Tips", href: "/blog/category/linkedin-tips" },
      { label: "Remote Work Tips", href: "/blog/category/remote-work" },
    ],
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "Grants", href: "/grants" },
      { label: "Career Advice", href: "/blog" },
      { label: "Study Abroad", href: "/study-abroad" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "CV Writing", href: "/services/cv-writing" },
      { label: "LinkedIn Optimization", href: "/services/linkedin-optimization" },
      { label: "SOP & Motivation Letters", href: "/services/sop-writing" },
      { label: "Portfolio Websites", href: "/services/portfolio-websites" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: "/employers/post-a-job" },
      { label: "Recruitment Services", href: "/services/recruitment-hr" },
      { label: "Advertise With Us", href: "/advertise" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/our-process" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Editorial Policy", href: "/editorial-policy" },
];
