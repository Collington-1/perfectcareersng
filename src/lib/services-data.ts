import type React from "react";
import { FileText, MessageSquareText, Award, LayoutTemplate, Plane, Mic, Users2 } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/social-icons";

export type PricingTier = { name: string; price: string; description: string; features: string[]; featured?: boolean };

export type ServiceIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export type ServiceContent = {
  slug: string;
  icon: ServiceIcon;
  heroImage?: string;
  name: string;
  shortDescription: string;
  heroDescription: string;
  benefits: { title: string; description: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  pricingTiers: PricingTier[];
  faqs: { question: string; answer: string }[];
};

export const services: ServiceContent[] = [
  {
    slug: "cv-writing",
    icon: FileText,
    heroImage: "/images/services/cv-writing.png",
    name: "CV Writing",
    shortDescription: "Recruiter-tested CVs written by career experts, not templates.",
    heroDescription:
      "A professionally written, ATS-optimized CV that gets you past the screening software and into the interview pile — built around what Nigerian and international recruiters actually screen for.",
    benefits: [
      { title: "0% AI, 100% human-written", description: "Every CV is written from scratch by a career strategist, never auto-generated." },
      { title: "ATS-optimized formatting", description: "Structured to pass applicant tracking systems used by most mid-to-large employers." },
      { title: "Keyword-matched to your target role", description: "We tailor language to match the roles and industries you're applying to." },
      { title: "Achievement-focused writing", description: "We translate your responsibilities into measurable, recruiter-impressive results." },
    ],
    howItWorks: [
      { step: "1", title: "Share your background", description: "Fill a short intake form or send us your existing CV and career details on WhatsApp." },
      { step: "2", title: "We write your first draft", description: "A dedicated CV writer builds your document within the agreed turnaround time." },
      { step: "3", title: "Review and revise", description: "You review the draft and request adjustments until it's exactly right." },
      { step: "4", title: "Receive your final files", description: "Get your polished CV in Word and PDF, ready to send to any employer." },
    ],
    pricingTiers: [
      { name: "Entry Level", price: "From ₦X,XXX", description: "For early-career professionals (0-3 years)", features: ["1 revision round", "ATS-optimized format", "48-hour turnaround"] },
      { name: "Professional", price: "From ₦XX,XXX", description: "For mid-to-senior professionals", featured: true, features: ["2 revision rounds", "ATS-optimized format", "Achievement-focused rewrite", "24-hour turnaround"] },
      { name: "Executive / International", price: "From ₦XX,XXX", description: "For senior or international applications", features: ["Unlimited revisions (7 days)", "Cover letter included", "LinkedIn summary included"] },
    ],
    faqs: [
      { question: "How long does it take?", answer: "Most CVs are delivered within 24-48 hours depending on the package selected." },
      { question: "Do you write cover letters too?", answer: "Yes — cover letters are available as an add-on or bundled into higher-tier packages." },
      { question: "What format will I receive?", answer: "You'll receive an editable Word document and a print-ready PDF." },
    ],
  },
  {
    slug: "linkedin-optimization",
    icon: LinkedInIcon,
    heroImage: "/images/services/linkedin-optimization.png",
    name: "LinkedIn Optimization",
    shortDescription: "Profiles that get you found by recruiters, not just seen.",
    heroDescription:
      "A complete LinkedIn profile overhaul — headline, About section, experience, and visibility strategy — so recruiters find and message you first, instead of the other way around.",
    benefits: [
      { title: "Recruiter-optimized headline & About", description: "Written to be found in search and to convert profile views into messages." },
      { title: "Strong visual presentation", description: "Guidance on a professional cover photo and consistent, polished formatting." },
      { title: "Strategic content plan", description: "A short content calendar so your visibility keeps growing after we're done." },
      { title: "Active networking support", description: "Guided outreach to recruiters and relevant professionals in your target field." },
    ],
    howItWorks: [
      { step: "1", title: "Profile audit", description: "We review your current profile and identify what's holding it back." },
      { step: "2", title: "Full rewrite", description: "Headline, About, Experience and Featured sections are rewritten for impact." },
      { step: "3", title: "Visibility setup", description: "Open to Work settings, keywords, and skills are optimized for recruiter search." },
      { step: "4", title: "Ongoing activity (selected packages)", description: "We manage engagement and connection requests for your chosen period." },
    ],
    pricingTiers: [
      { name: "7-Day Optimization", price: "From ₦XX,XXX", description: "Full profile rewrite", features: ["Headline & About rewrite", "Experience section overhaul", "Cover photo guidance"] },
      { name: "2-Week Optimization", price: "From ₦XX,XXX", description: "Rewrite + active management", featured: true, features: ["Everything in 7-Day", "Content scheduling", "Strategic connection requests"] },
      { name: "1-Month Optimization", price: "From ₦XX,XXX", description: "Full visibility campaign", features: ["Everything in 2-Week", "Job notification setup", "Community engagement boost"] },
    ],
    faqs: [
      { question: "Will you post on my behalf?", answer: "For the 2-week and 1-month packages, yes — we schedule and manage relevant content and engagement." },
      { question: "Do I need to change my profile photo?", answer: "We'll advise you on what works best, but the final choice is always yours." },
    ],
  },
  {
    slug: "sop-writing",
    icon: MessageSquareText,
    name: "SOP & Motivation Letter Writing",
    shortDescription: "Compelling statements that get study-abroad applications approved.",
    heroDescription:
      "A clear, specific and compelling Statement of Purpose or Motivation Letter that connects your story to your chosen programme — written to meet what admissions and scholarship committees actually look for.",
    benefits: [
      { title: "Built around your real story", description: "No generic templates — every statement is built from your actual experience and goals." },
      { title: "Programme-specific tailoring", description: "We research your target programme to reference it specifically, not generically." },
      { title: "Structured for admissions committees", description: "Follows a proven structure that keeps reviewers engaged from the first line." },
      { title: "Plagiarism-free, human-written", description: "100% original writing, checked before delivery." },
    ],
    howItWorks: [
      { step: "1", title: "Share your goals", description: "Tell us about your background, target programme, and career goals via our intake form." },
      { step: "2", title: "Structured interview", description: "A short call or written Q&A helps us capture the details that make your story specific." },
      { step: "3", title: "First draft delivered", description: "We write a complete draft aligned with your target programme's expectations." },
      { step: "4", title: "Revise until it's right", description: "We refine the statement together until you're confident submitting it." },
    ],
    pricingTiers: [
      { name: "Standard SOP", price: "From ₦XX,XXX", description: "For a single programme application", features: ["1 revision round", "Programme-specific research", "5-day turnaround"] },
      { name: "Premium SOP", price: "From ₦XX,XXX", description: "For scholarship or competitive applications", featured: true, features: ["3 revision rounds", "In-depth programme research", "3-day turnaround"] },
      { name: "Motivation Letter", price: "From ₦XX,XXX", description: "For job or programme motivation letters", features: ["1 revision round", "Tailored to specific opportunity"] },
    ],
    faqs: [
      { question: "Can you write for multiple programmes?", answer: "Yes — each additional programme-specific version is available at a reduced add-on rate." },
      { question: "Do you guarantee admission?", answer: "No service can guarantee admission, but we ensure your statement meets the standard competitive applicants submit." },
    ],
  },
  {
    slug: "reference-letters",
    icon: Award,
    heroImage: "/images/services/reference-letters.png",
    name: "Reference Letter Writing",
    shortDescription: "Professionally structured reference letters that support your application.",
    heroDescription:
      "A well-structured reference or recommendation letter draft that your referee can review, personalize and sign — saving them time while ensuring the letter genuinely strengthens your application.",
    benefits: [
      { title: "Saves your referee's time", description: "Busy managers and professors often struggle to find time to write from scratch." },
      { title: "Professionally structured", description: "Follows the format admissions committees and employers expect to see." },
      { title: "Specific, not generic", description: "Built around real examples of your work, provided by you." },
      { title: "Fast turnaround", description: "Draft delivered quickly so your referee only needs to review and personalize." },
    ],
    howItWorks: [
      { step: "1", title: "Share the context", description: "Tell us about your referee's relationship to you and the opportunity you're applying for." },
      { step: "2", title: "Provide examples", description: "Share specific achievements or projects the letter should reference." },
      { step: "3", title: "We draft the letter", description: "A complete, professional draft is prepared for your referee's review." },
      { step: "4", title: "Referee finalizes", description: "Your referee reviews, edits if needed, and signs the final letter." },
    ],
    pricingTiers: [
      { name: "Single Reference Letter", price: "From ₦XX,XXX", description: "One tailored draft", features: ["1 revision round", "3-day turnaround"] },
      { name: "Multiple References", price: "From ₦XX,XXX", description: "2-3 tailored drafts", featured: true, features: ["Consistent tone across letters", "Priority turnaround"] },
    ],
    faqs: [
      { question: "Will my referee need to do anything?", answer: "Just review, personalize if they wish, and sign — we handle the heavy lifting of the first draft." },
      { question: "Is this ethical for academic applications?", answer: "Yes — many referees welcome a draft to work from; the letter still reflects their genuine assessment of you." },
    ],
  },
  {
    slug: "portfolio-websites",
    icon: LayoutTemplate,
    name: "Portfolio Website Development",
    shortDescription: "A personal website that showcases your work and gets you noticed.",
    heroDescription:
      "A responsive, professionally designed portfolio website that showcases your work, experience and personal brand — built to impress recruiters, clients or admissions committees.",
    benefits: [
      { title: "Fully responsive design", description: "Looks great on desktop, tablet and mobile without compromise." },
      { title: "SEO-friendly for discovery", description: "Built so your name and work can actually be found on Google." },
      { title: "Tailored to your field", description: "Layout and content structure suited to your specific industry or discipline." },
      { title: "Fast, clean, and professional", description: "No bloated templates — a fast-loading site that reflects well on you." },
    ],
    howItWorks: [
      { step: "1", title: "Share your content", description: "Send us your CV, work samples, bio and any brand preferences you have." },
      { step: "2", title: "Design concept", description: "We propose a layout and design direction aligned with your goals." },
      { step: "3", title: "Build and review", description: "Your site is built and shared with you for feedback and revisions." },
      { step: "4", title: "Launch", description: "We publish your site with domain and hosting guidance included." },
    ],
    pricingTiers: [
      { name: "LinkedIn-Style Portfolio", price: "From ₦XX,XXX", description: "A simple, hosted personal profile page", features: ["Single page layout", "Mobile responsive"] },
      { name: "Personal Website", price: "From ₦XXX,XXX", description: "A full custom portfolio website", featured: true, features: ["Multi-page site", "Custom domain support", "SEO setup included"] },
    ],
    faqs: [
      { question: "Do you provide hosting and a domain?", answer: "We can guide you through domain and hosting setup, or handle it for you as part of the package." },
      { question: "Can I update the site myself later?", answer: "Yes — depending on the package, we can set it up on an easily editable platform." },
    ],
  },
  {
    slug: "study-abroad-documentation",
    icon: Plane,
    heroImage: "/images/study-abroad.png",
    name: "Study Abroad Documentation",
    shortDescription: "Complete, error-free documentation for your study abroad application.",
    heroDescription:
      "End-to-end support preparing the documents your study abroad application needs — from statements and CVs to financial and admission paperwork — reviewed carefully to avoid the mistakes that cause delays or rejection.",
    benefits: [
      { title: "One place for every document", description: "SOPs, CVs, reference letters and supporting documents, coordinated together." },
      { title: "Deadline-aware planning", description: "We help you plan backward from your intake so nothing is submitted late." },
      { title: "Experienced study abroad advisors", description: "Guidance from advisors who understand UK, US, Canadian and European requirements." },
      { title: "Careful, detail-level review", description: "We catch the small errors that quietly weaken otherwise strong applications." },
    ],
    howItWorks: [
      { step: "1", title: "Application audit", description: "We review your target programme's requirements and your current documents." },
      { step: "2", title: "Documentation plan", description: "You receive a clear checklist and timeline for every required document." },
      { step: "3", title: "Document preparation", description: "We prepare or refine each document with you, one by one." },
      { step: "4", title: "Final review before submission", description: "A full review of your application package before you submit." },
    ],
    pricingTiers: [
      { name: "Document Review", price: "From ₦XX,XXX", description: "Review of documents you've already prepared", features: ["Detailed feedback report", "1 round of revisions"] },
      { name: "Full Documentation Package", price: "From ₦XXX,XXX", description: "End-to-end document preparation", featured: true, features: ["SOP + CV + reference letter support", "Deadline planning", "Final submission review"] },
    ],
    faqs: [
      { question: "Do you handle visa applications too?", answer: "We focus on academic and application documentation; we can refer you to trusted visa guidance where needed." },
      { question: "Can you help with multiple university applications?", answer: "Yes — our full package is designed to support applications to several universities at once." },
    ],
  },
  {
    slug: "interview-preparation",
    icon: Mic,
    name: "Interview Preparation",
    shortDescription: "Mock interviews and coaching to help you close the offer.",
    heroDescription:
      "Realistic mock interviews and personalized coaching that prepare you for the exact kind of questions your target role and industry actually ask — so you walk in confident, not guessing.",
    benefits: [
      { title: "Realistic mock interviews", description: "Practice with a coach who simulates real interview pressure and follow-up questions." },
      { title: "Role and industry-specific prep", description: "Tailored to the actual role, company type, and interview format you'll face." },
      { title: "Structured feedback", description: "Clear, actionable feedback after every mock session, not just a pass/fail." },
      { title: "Salary negotiation coaching", description: "Guidance on how to discuss and negotiate compensation confidently." },
    ],
    howItWorks: [
      { step: "1", title: "Share the role", description: "Tell us about the role, company and interview stage you're preparing for." },
      { step: "2", title: "Mock interview session", description: "We run a live mock interview matched to your specific context." },
      { step: "3", title: "Feedback and coaching", description: "You receive detailed feedback and targeted coaching on weak areas." },
      { step: "4", title: "Final readiness check", description: "A short follow-up session ensures you're fully prepared before the real interview." },
    ],
    pricingTiers: [
      { name: "Single Mock Session", price: "From ₦XX,XXX", description: "One full mock interview + feedback", features: ["60-minute session", "Written feedback report"] },
      { name: "Interview Prep Package", price: "From ₦XX,XXX", description: "Multiple sessions + negotiation coaching", featured: true, features: ["2-3 mock sessions", "Salary negotiation coaching", "Follow-up readiness check"] },
    ],
    faqs: [
      { question: "Are sessions done virtually?", answer: "Yes — sessions are conducted over video call for convenience and can be scheduled flexibly." },
      { question: "Can you prepare me for technical interviews?", answer: "We tailor sessions to your field, including technical and case-style interview formats where relevant." },
    ],
  },
  {
    slug: "recruitment-hr",
    icon: Users2,
    name: "Recruitment & HR Services",
    shortDescription: "Sourcing, screening and HR support for growing Nigerian businesses.",
    heroDescription:
      "End-to-end recruitment and HR support for employers — from sourcing and screening candidates to broader HR advisory — so you spend less time filtering applications and more time building your team.",
    benefits: [
      { title: "Pre-screened candidate shortlists", description: "We handle sourcing and initial screening so you only meet qualified candidates." },
      { title: "Access to an engaged talent pool", description: "Reach candidates actively using PerfectCareers to find their next role." },
      { title: "Flexible engagement", description: "One-off hires or ongoing recruitment support, based on what your business needs." },
      { title: "HR advisory support", description: "Guidance on job descriptions, offer structuring, and onboarding best practices." },
    ],
    howItWorks: [
      { step: "1", title: "Share your hiring need", description: "Tell us about the role, requirements and timeline for your vacancy." },
      { step: "2", title: "Sourcing and screening", description: "We source candidates and screen them against your requirements." },
      { step: "3", title: "Shortlist delivered", description: "You receive a shortlist of qualified, interview-ready candidates." },
      { step: "4", title: "Support through offer", description: "We support you through interviews and offer stage as needed." },
    ],
    pricingTiers: [
      { name: "Single Role", price: "Custom quote", description: "Sourcing and screening for one vacancy", features: ["Shortlist of qualified candidates", "Initial screening included"] },
      { name: "Ongoing Partnership", price: "Custom quote", description: "For businesses hiring regularly", featured: true, features: ["Dedicated recruitment support", "Priority turnaround", "HR advisory access"] },
    ],
    faqs: [
      { question: "What industries do you recruit for?", answer: "We support a broad range of industries — talk to us about your specific hiring need." },
      { question: "Do you also post our job listing publicly?", answer: "Yes — see our dedicated Post a Job page for listing your vacancy on PerfectCareers." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
