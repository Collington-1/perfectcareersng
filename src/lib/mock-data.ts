// Placeholder content, shaped to match the Prisma models 1:1.
// Swap these reads for real `prisma.job.findMany(...)` etc. once the
// database is seeded — component props won't need to change.

export type MockJob = {
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  category: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Onsite" | "Remote" | "Hybrid";
  city: string;
  state: string;
  country: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  experienceLevel: string;
  qualification: string;
  deadline: string;
  applicationUrl: string;
  publishedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

export type MockScholarship = {
  slug: string;
  title: string;
  university: string;
  country: string;
  amount: string;
  fundingType: string;
  deadline: string;
  publishedAt: string;
  description: string;
  eligibility: string[];
  requirements: string[];
  documents: string[];
  howToApply: string;
  officialUrl: string;
};

export type MockGrant = {
  slug: string;
  title: string;
  provider: string;
  fundingAmount: string;
  industry: string;
  country: string;
  businessStage: string;
  deadline: string;
  publishedAt: string;
  description: string;
  eligibility: string[];
  requirements: string[];
  applicationUrl: string;
};

export type MockAuthor = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export type MockBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  authorSlug: string;
  author: string;
  readingTimeMinutes: number;
  publishedAt: string;
  contentHtml: string;
};

export type MockTestimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const jobCategories = [
  { slug: "technology", label: "Technology" },
  { slug: "banking-finance", label: "Banking & Finance" },
  { slug: "oil-gas", label: "Oil & Gas" },
  { slug: "human-resources", label: "Human Resources" },
  { slug: "marketing", label: "Marketing" },
  { slug: "customer-service", label: "Customer Service" },
  { slug: "healthcare", label: "Healthcare" },
  { slug: "education", label: "Education" },
  { slug: "logistics", label: "Logistics & Supply Chain" },
  { slug: "sales", label: "Sales & Business Development" },
  { slug: "agriculture", label: "Agriculture" },
  { slug: "management", label: "Management" },
  { slug: "engineering", label: "Engineering" },
  { slug: "construction-real-estate", label: "Construction & Real Estate" },
  { slug: "legal", label: "Legal" },
  { slug: "hospitality-tourism", label: "Hospitality & Tourism" },
  { slug: "media-creative", label: "Media & Creative" },
  { slug: "manufacturing", label: "Manufacturing" },
  { slug: "telecommunications", label: "Telecommunications" },
  { slug: "ngo-development", label: "NGO & Development" },
  { slug: "government-public-sector", label: "Government & Public Sector" },
  { slug: "admin-office", label: "Admin & Office Support" },
  { slug: "other", label: "Other" },
];

export const scholarshipCategories = [
  { slug: "united-kingdom", label: "United Kingdom" },
  { slug: "united-states", label: "United States" },
  { slug: "canada", label: "Canada" },
  { slug: "europe", label: "Europe" },
  { slug: "asia-pacific", label: "Asia Pacific" },
  { slug: "nigeria", label: "Nigeria (Local)" },
  { slug: "other", label: "Other" },
];

export const grantCategories = [
  { slug: "technology", label: "Technology & Innovation" },
  { slug: "women-led-business", label: "Women-Led Business" },
  { slug: "agriculture", label: "Agriculture" },
  { slug: "creative-arts", label: "Creative Arts" },
  { slug: "fashion-textile", label: "Fashion & Textile" },
  { slug: "health-tech", label: "Health & Medtech" },
  { slug: "trade-export", label: "Trade & Export" },
  { slug: "renewable-energy", label: "Renewable Energy" },
  { slug: "other", label: "Other" },
];

export const blogCategories = [
  { slug: "cv-tips", label: "CV Tips", description: "Write CVs that clear applicant tracking systems and impress recruiters.", image: "/images/blog-categories/cv-tips.png" },
  { slug: "linkedin-tips", label: "LinkedIn Tips", description: "Optimize your profile to get found, and get messaged first.", image: "/images/blog-categories/linkedin-tips.png" },
  { slug: "interview-prep", label: "Interview Prep", description: "Practical coaching to help you close the offer with confidence.", image: "/images/blog-categories/interview-prep.png" },
  { slug: "remote-work", label: "Remote Work", description: "Land and thrive in remote roles that pay in dollars.", image: "/images/blog-categories/remote-work.png" },
  { slug: "study-abroad", label: "Study Abroad", description: "Everything you need to study in the UK, US, Canada and beyond.", image: "/images/study-abroad.png" },
  { slug: "scholarship-tips", label: "Scholarship Tips", description: "How to find, apply for, and win fully-funded scholarships.", image: "/images/blog-categories/scholarship-tips.png" },
  { slug: "grant-funding", label: "Grant & Funding Tips", description: "Grow your business with the right grant and the right pitch.", image: "/images/blog-categories/grant-funding.png" },
  { slug: "hr-insights", label: "HR Insights", description: "What recruiters and hiring managers actually look for.", image: "/images/blog-categories/hr-insights.png" },
  { slug: "career-growth", label: "Career Growth", description: "Promotions, pivots, and building a career that compounds.", image: "/images/blog-categories/career-growth.png" },
  { slug: "job-search", label: "Job Search Strategy", description: "Where to look, how to apply, and how to stand out in Nigeria's market.", image: "/images/blog-categories/job-search.png" },
];

export function blogCategoryImage(categorySlug: string) {
  return blogCategories.find((c) => c.slug === categorySlug)?.image ?? "/images/blog-hub.png";
}

export const mockAuthors: MockAuthor[] = [
  { slug: "chiamaka-nwosu", name: "Chiamaka Nwosu", role: "Lead CV Strategist", bio: "Chiamaka has reviewed over 3,000 CVs for Nigerian job seekers and trains recruiters on applicant screening at PerfectCareers." },
  { slug: "tobi-adekunle", name: "Tobi Adekunle", role: "LinkedIn & Personal Branding Coach", bio: "Tobi helps professionals build LinkedIn profiles and personal brands that convert views into interview invitations." },
  { slug: "amaka-eze", name: "Amaka Eze", role: "Remote Work Specialist", bio: "Amaka has coached hundreds of Nigerians into remote roles with global companies and writes on distributed-work careers." },
  { slug: "emeka-okafor", name: "Emeka Okafor", role: "Career Coach & Interview Trainer", bio: "Emeka runs PerfectCareers' mock interview program and has trained candidates who've been hired at banks, telcos and startups." },
  { slug: "ifeoma-chukwu", name: "Ifeoma Chukwu", role: "Study Abroad Advisor", bio: "Ifeoma advises students on scholarship applications and study-abroad documentation for the UK, US, Canada and Europe." },
  { slug: "david-eze", name: "David Eze", role: "Grants & Funding Analyst", bio: "David researches business grants and funding opportunities across Africa and advises founders on grant-ready applications." },
  { slug: "ngozi-bassey", name: "Ngozi Bassey", role: "HR & Recruitment Consultant", bio: "Ngozi spent eight years in corporate HR before joining PerfectCareers to advise both job seekers and employers." },
];

export const mockJobs: MockJob[] = [
  {
    slug: "product-manager-lagos-fintech",
    title: "Product Manager",
    company: "Zenith Digital Bank",
    category: "Technology",
    employmentType: "Full-time",
    workMode: "Hybrid",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    salaryMin: 800000,
    salaryMax: 1200000,
    currency: "NGN",
    experienceLevel: "Mid-level (3-5 years)",
    qualification: "B.Sc in a relevant field",
    deadline: "2026-09-15",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-28",
    description:
      "Zenith Digital Bank is looking for a Product Manager to own the roadmap for its retail savings and payments products, working closely with engineering, design and compliance to ship features used by millions of Nigerians.",
    responsibilities: [
      "Define and prioritize the product roadmap based on user research and business goals",
      "Write clear product specs and work with engineering to ship on schedule",
      "Analyze product metrics and run experiments to improve activation and retention",
      "Collaborate with compliance and risk teams on regulated financial features",
    ],
    requirements: [
      "3-5 years of product management experience, ideally in fintech",
      "Strong analytical skills and comfort with SQL or product analytics tools",
      "Excellent written communication for specs and stakeholder updates",
      "Experience shipping consumer-facing mobile products is a strong plus",
    ],
  },
  {
    slug: "frontend-engineer-remote-africa",
    title: "Frontend Engineer (React)",
    company: "Nomad Labs",
    category: "Technology",
    employmentType: "Full-time",
    workMode: "Remote",
    city: "Remote",
    state: "—",
    country: "Remote (Africa-friendly hours)",
    salaryMin: 900000,
    salaryMax: 1500000,
    currency: "NGN",
    experienceLevel: "Mid to Senior (3+ years)",
    qualification: "B.Sc in Computer Science or equivalent experience",
    deadline: "2026-09-05",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-27",
    description:
      "Nomad Labs builds tools for distributed teams and is hiring a Frontend Engineer to lead development of their customer-facing dashboard using React, TypeScript and modern tooling.",
    responsibilities: [
      "Build and maintain performant, accessible React interfaces",
      "Collaborate async with a distributed team across time zones",
      "Own frontend architecture decisions and code review standards",
      "Partner with design on a consistent, polished component system",
    ],
    requirements: [
      "3+ years building production React applications",
      "Strong TypeScript and modern CSS/Tailwind experience",
      "Comfortable working async with a fully remote team",
      "Portfolio or GitHub showing shipped, real-world work",
    ],
  },
  {
    slug: "hr-business-partner-abuja",
    title: "HR Business Partner",
    company: "Meridian Oil & Gas",
    category: "Human Resources",
    employmentType: "Full-time",
    workMode: "Onsite",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    salaryMin: 650000,
    salaryMax: 950000,
    currency: "NGN",
    experienceLevel: "Mid-level (4-7 years)",
    qualification: "B.Sc/HND in Human Resources or related field; CIPM is an advantage",
    deadline: "2026-08-30",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-25",
    description:
      "Meridian Oil & Gas is seeking an HR Business Partner to support workforce planning, employee relations and performance management for its Abuja operations team.",
    responsibilities: [
      "Partner with department heads on workforce planning and hiring",
      "Manage employee relations issues with fairness and discretion",
      "Coordinate performance review cycles and development plans",
      "Ensure HR policies comply with Nigerian labour law",
    ],
    requirements: [
      "4-7 years of HR generalist or business partner experience",
      "Strong knowledge of Nigerian employment law",
      "Excellent interpersonal and conflict-resolution skills",
      "Experience in oil & gas or a similarly regulated industry preferred",
    ],
  },
  {
    slug: "customer-success-lead-ph",
    title: "Customer Success Lead",
    company: "Harbourline Logistics",
    category: "Customer Service",
    employmentType: "Full-time",
    workMode: "Onsite",
    city: "Port Harcourt",
    state: "Rivers",
    country: "Nigeria",
    salaryMin: 500000,
    salaryMax: 750000,
    currency: "NGN",
    experienceLevel: "Mid-level (3-5 years)",
    qualification: "B.Sc in any discipline",
    deadline: "2026-08-25",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-24",
    description:
      "Harbourline Logistics needs a Customer Success Lead to manage key client relationships and lead a small support team across its Port Harcourt operations.",
    responsibilities: [
      "Own relationships with Harbourline's top logistics clients",
      "Lead and coach a team of customer support representatives",
      "Track and report on customer satisfaction and retention metrics",
      "Work with operations to resolve escalated delivery issues quickly",
    ],
    requirements: [
      "3-5 years in customer success, account management or support leadership",
      "Calm, solutions-oriented communication style",
      "Experience in logistics, freight or supply chain is a plus",
      "Comfortable working with CRM and support ticketing tools",
    ],
  },
  {
    slug: "data-analyst-remote",
    title: "Data Analyst",
    company: "Savannah Insights",
    category: "Technology",
    employmentType: "Contract",
    workMode: "Remote",
    city: "Remote",
    state: "—",
    country: "Remote",
    salaryMin: 700000,
    salaryMax: 1000000,
    currency: "NGN",
    experienceLevel: "Mid-level (2-4 years)",
    qualification: "B.Sc in Statistics, Economics, Computer Science or related field",
    deadline: "2026-09-10",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-22",
    description:
      "Savannah Insights is hiring a contract Data Analyst to build dashboards and reporting pipelines for clients across fintech and consumer goods.",
    responsibilities: [
      "Build and maintain dashboards in SQL and BI tools",
      "Clean and validate datasets from multiple client sources",
      "Present clear, actionable insights to non-technical stakeholders",
      "Support ad-hoc analysis requests across active client projects",
    ],
    requirements: [
      "2-4 years of hands-on data analysis experience",
      "Strong SQL skills and familiarity with a BI tool (Power BI, Looker, Metabase)",
      "Ability to communicate findings clearly in writing",
      "Self-directed and comfortable with contract-based, deliverable-driven work",
    ],
  },
  {
    slug: "brand-marketing-manager-lagos",
    title: "Brand & Marketing Manager",
    company: "Coastline Consumer Goods",
    category: "Marketing",
    employmentType: "Full-time",
    workMode: "Hybrid",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    salaryMin: 750000,
    salaryMax: 1100000,
    currency: "NGN",
    experienceLevel: "Senior (5+ years)",
    qualification: "B.Sc in Marketing, Business or related field; MBA is a plus",
    deadline: "2026-09-01",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-20",
    description:
      "Coastline Consumer Goods is looking for a Brand & Marketing Manager to lead campaign strategy and grow market share for its household product lines across Nigeria.",
    responsibilities: [
      "Develop and execute integrated brand campaigns across digital and traditional media",
      "Manage agency and media partner relationships and budgets",
      "Track brand health metrics and campaign ROI",
      "Lead a small in-house marketing and content team",
    ],
    requirements: [
      "5+ years in brand or marketing management, FMCG experience preferred",
      "Proven track record leading successful campaigns",
      "Strong budget management and negotiation skills",
      "Excellent leadership and cross-functional collaboration ability",
    ],
  },
  {
    slug: "registered-nurse-lagos-hospital",
    title: "Registered Nurse",
    company: "Lakeview Specialist Hospital",
    category: "Healthcare",
    employmentType: "Full-time",
    workMode: "Onsite",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    salaryMin: 350000,
    salaryMax: 550000,
    currency: "NGN",
    experienceLevel: "Entry to Mid-level (1-4 years)",
    qualification: "RN license with NMCN registration",
    deadline: "2026-08-20",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-18",
    description:
      "Lakeview Specialist Hospital is expanding its inpatient care team and is hiring Registered Nurses committed to attentive, high-quality patient care.",
    responsibilities: [
      "Provide direct patient care across assigned wards",
      "Administer medication and monitor patient vitals accurately",
      "Maintain detailed, compliant patient records",
      "Collaborate with doctors and specialists on care plans",
    ],
    requirements: [
      "Valid NMCN registration and practicing license",
      "1-4 years of clinical nursing experience",
      "Strong attention to detail and bedside manner",
      "Willingness to work rotating shifts",
    ],
  },
  {
    slug: "secondary-school-teacher-abuja",
    title: "Secondary School Mathematics Teacher",
    company: "Crestwood International School",
    category: "Education",
    employmentType: "Full-time",
    workMode: "Onsite",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    salaryMin: 300000,
    salaryMax: 450000,
    currency: "NGN",
    experienceLevel: "Entry to Mid-level (2+ years)",
    qualification: "B.Sc/B.Ed in Mathematics or Education",
    deadline: "2026-08-15",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-15",
    description:
      "Crestwood International School is hiring a Mathematics teacher for its senior secondary department, following a British-curriculum-aligned syllabus.",
    responsibilities: [
      "Plan and deliver engaging mathematics lessons for SS1-SS3",
      "Prepare students for WAEC, IGCSE and internal assessments",
      "Track student progress and communicate with parents",
      "Participate in curriculum planning and school activities",
    ],
    requirements: [
      "B.Sc or B.Ed in Mathematics or related field",
      "2+ years of classroom teaching experience",
      "Familiarity with WAEC/IGCSE curricula preferred",
      "Patient, structured, and student-focused teaching style",
    ],
  },
  {
    slug: "supply-chain-officer-lagos",
    title: "Supply Chain Officer",
    company: "Delta Warehousing Group",
    category: "Logistics",
    employmentType: "Full-time",
    workMode: "Onsite",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    salaryMin: 450000,
    salaryMax: 650000,
    currency: "NGN",
    experienceLevel: "Mid-level (3-5 years)",
    qualification: "B.Sc in Logistics, Supply Chain Management or related field",
    deadline: "2026-09-08",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-12",
    description:
      "Delta Warehousing Group is hiring a Supply Chain Officer to coordinate inventory, procurement and distribution across its Lagos warehouse network.",
    responsibilities: [
      "Coordinate inbound and outbound inventory across warehouses",
      "Track procurement timelines and vendor performance",
      "Optimize distribution routes to reduce delivery cost and time",
      "Prepare regular supply chain performance reports",
    ],
    requirements: [
      "3-5 years of supply chain or logistics coordination experience",
      "Strong Excel and inventory management system skills",
      "Excellent organizational and vendor negotiation skills",
      "Ability to work under pressure during peak periods",
    ],
  },
  {
    slug: "business-development-executive-lagos",
    title: "Business Development Executive",
    company: "Northline Insurance",
    category: "Sales",
    employmentType: "Full-time",
    workMode: "Hybrid",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    salaryMin: 400000,
    salaryMax: 700000,
    currency: "NGN",
    experienceLevel: "Entry to Mid-level (1-3 years)",
    qualification: "B.Sc in any discipline",
    deadline: "2026-08-28",
    applicationUrl: "#apply-whatsapp",
    publishedAt: "2026-07-10",
    description:
      "Northline Insurance is looking for a driven Business Development Executive to grow its SME insurance client base across Lagos, with a strong commission structure.",
    responsibilities: [
      "Identify and pursue new SME insurance client opportunities",
      "Build and maintain a healthy sales pipeline",
      "Present tailored insurance packages to prospective clients",
      "Meet and exceed monthly acquisition targets",
    ],
    requirements: [
      "1-3 years of B2B sales or business development experience",
      "Strong communication and relationship-building skills",
      "Self-motivated with a results-driven mindset",
      "Insurance or financial services background is a plus, not required",
    ],
  },
];

export const mockScholarships: MockScholarship[] = [
  {
    slug: "chevening-uk-scholarship",
    title: "Global Leaders Chevening-Style Scholarship",
    university: "University of Manchester",
    country: "United Kingdom",
    amount: "Full tuition + monthly stipend",
    fundingType: "Fully Funded",
    deadline: "2026-10-15",
    publishedAt: "2026-07-01",
    description:
      "A fully-funded master's scholarship for outstanding Nigerian professionals with demonstrated leadership potential, covering tuition, living stipend, and one return flight to the UK.",
    eligibility: [
      "Nigerian citizen with at least 2 years of post-graduation work experience",
      "Bachelor's degree with a minimum of Second Class Upper",
      "Demonstrated leadership experience in your field or community",
      "Must return to Nigeria for at least 2 years after the programme",
    ],
    requirements: ["Completed application form", "Two reference letters", "Personal statement (500 words)", "IELTS/TOEFL score"],
    documents: ["Valid international passport", "Degree certificate and transcripts", "CV", "Proof of English proficiency"],
    howToApply:
      "Applications open through the official scholarship portal each August. Candidates submit an online form, personal statement, and two references, followed by a panel interview for shortlisted applicants.",
    officialUrl: "#",
  },
  {
    slug: "canada-vanier-graduate",
    title: "Vanier-Style Graduate Excellence Award",
    university: "University of Toronto",
    country: "Canada",
    amount: "CAD 50,000 per year",
    fundingType: "Fully Funded",
    deadline: "2026-11-01",
    publishedAt: "2026-07-02",
    description:
      "A prestigious doctoral scholarship for international students demonstrating academic excellence, research potential, and leadership, funded for up to three years.",
    eligibility: [
      "Nomination by a Canadian institution offering a doctoral programme",
      "First-class academic record at undergraduate and graduate level",
      "Strong research proposal aligned with the host faculty",
      "Evidence of leadership and community engagement",
    ],
    requirements: ["Research proposal", "Three academic reference letters", "Statement of leadership experience"],
    documents: ["Academic transcripts", "CV/résumé", "Valid passport", "English proficiency test results"],
    howToApply:
      "Candidates must first secure admission and institutional nomination before submitting the scholarship application through the university's graduate portal.",
    officialUrl: "#",
  },
  {
    slug: "fulbright-style-us-masters",
    title: "Fulbright-Style Master's Fellowship",
    university: "Columbia University",
    country: "United States",
    amount: "Full funding + living allowance",
    fundingType: "Fully Funded",
    deadline: "2026-09-30",
    publishedAt: "2026-07-03",
    description:
      "A competitive fellowship supporting a fully-funded master's degree in the United States for Nigerian graduates with strong academic and community records.",
    eligibility: [
      "Nigerian citizen residing in Nigeria at time of application",
      "Bachelor's degree with strong academic standing",
      "Minimum 2 years of relevant work or volunteer experience",
      "Clear plan to return and contribute to Nigeria after the programme",
    ],
    requirements: ["Statement of purpose", "Study objectives essay", "Three letters of recommendation", "TOEFL/IELTS score"],
    documents: ["Transcripts (translated if needed)", "Valid passport", "CV", "English proficiency scores"],
    howToApply:
      "Applications are submitted online through the fellowship's national portal, followed by a written test and interview stage for shortlisted candidates.",
    officialUrl: "#",
  },
  {
    slug: "daad-germany-scholarship",
    title: "DAAD-Style Development Scholarship",
    university: "Technical University of Munich",
    country: "Germany",
    amount: "€934/month + tuition support",
    fundingType: "Fully Funded",
    deadline: "2026-10-31",
    publishedAt: "2026-07-04",
    description:
      "A development-focused postgraduate scholarship for professionals from developing countries pursuing degrees relevant to sustainable development in Engineering, Economics or Public Policy.",
    eligibility: [
      "At least 2 years of professional experience after first degree",
      "Degree relevant to development-related fields",
      "Strong motivation to apply learning back home in Nigeria",
      "German or English proficiency depending on programme language",
    ],
    requirements: ["Letter of motivation", "Curriculum vitae", "Two reference letters"],
    documents: ["University entrance qualification", "Transcripts", "Language certificates", "Valid passport"],
    howToApply:
      "Applications are submitted directly to the host university or via the scholarship database, with a national selection interview for qualified applicants.",
    officialUrl: "#",
  },
  {
    slug: "commonwealth-shared-scholarship",
    title: "Commonwealth Shared Scholarship",
    university: "University of Edinburgh",
    country: "United Kingdom",
    amount: "Full tuition + travel + stipend",
    fundingType: "Fully Funded",
    deadline: "2026-12-01",
    publishedAt: "2026-07-05",
    description:
      "A fully-funded master's scholarship for students from lower-income Commonwealth countries, prioritizing candidates who could not otherwise afford to study in the UK.",
    eligibility: [
      "Citizen of a developing Commonwealth country, including Nigeria",
      "Cannot afford to study in the UK without this scholarship",
      "First degree with at least Second Class Upper",
      "Applying to an eligible shared master's programme",
    ],
    requirements: ["Online application form", "Two academic references", "Evidence of financial need"],
    documents: ["Degree certificate and transcripts", "Valid passport", "Proof of English proficiency"],
    howToApply:
      "Apply directly through the university's admissions portal, indicating interest in Commonwealth Shared Scholarship funding; selection is made by the Commonwealth Scholarship Commission.",
    officialUrl: "#",
  },
  {
    slug: "australia-awards-scholarship",
    title: "Australia Awards Scholarship",
    university: "University of Melbourne",
    country: "Australia",
    amount: "Full funding + relocation support",
    fundingType: "Fully Funded",
    deadline: "2026-11-20",
    publishedAt: "2026-07-06",
    description:
      "An Australian government-style scholarship supporting future leaders from partner countries to undertake postgraduate study that contributes to development priorities.",
    eligibility: [
      "Nigerian citizen not already residing in Australia",
      "Minimum 2 years of work experience relevant to your field",
      "Strong academic record and leadership potential",
      "Commitment to return to Nigeria after study",
    ],
    requirements: ["Online application", "Development impact statement", "Two referee reports"],
    documents: ["Academic transcripts", "Valid passport", "English test results (IELTS)"],
    howToApply:
      "Applications open annually through the official awards portal; shortlisted candidates undergo an interview with the selection panel in-country.",
    officialUrl: "#",
  },
  {
    slug: "trinity-college-dublin-scholarship",
    title: "Trinity International Excellence Scholarship",
    university: "Trinity College Dublin",
    country: "Ireland",
    amount: "50% tuition fee waiver",
    fundingType: "Partial Funding",
    deadline: "2026-09-20",
    publishedAt: "2026-07-07",
    description:
      "A merit-based scholarship for high-achieving international students admitted to postgraduate programmes at Trinity College Dublin, awarded automatically to top applicants.",
    eligibility: [
      "Admitted or applying to an eligible postgraduate programme",
      "Minimum GPA equivalent to a Second Class Upper",
      "International fee-paying student status",
    ],
    requirements: ["Completed programme application", "Academic transcripts"],
    documents: ["Degree certificate", "Transcripts", "English proficiency score", "Valid passport"],
    howToApply:
      "No separate application is required — all eligible applicants to the postgraduate programme are automatically considered for this award upon admission.",
    officialUrl: "#",
  },
  {
    slug: "holland-scholarship-netherlands",
    title: "Holland Scholarship",
    university: "University of Amsterdam",
    country: "Netherlands",
    amount: "€5,000 one-time award",
    fundingType: "Partial Funding",
    deadline: "2026-10-01",
    publishedAt: "2026-07-08",
    description:
      "A one-time award from the Dutch government and participating universities to help non-EU students offset first-year tuition and living costs in the Netherlands.",
    eligibility: [
      "Non-EU/EEA nationality, including Nigerian citizens",
      "First-time applicant to a Dutch bachelor's or master's programme",
      "Meets the academic admission requirements of the chosen programme",
    ],
    requirements: ["Motivation statement", "Academic transcripts"],
    documents: ["Valid passport", "Transcripts", "English proficiency certificate"],
    howToApply:
      "Apply for admission to the university first, then submit the Holland Scholarship application through the university's scholarship portal before the deadline.",
    officialUrl: "#",
  },
  {
    slug: "mext-japan-scholarship",
    title: "MEXT-Style Japanese Government Scholarship",
    university: "University of Tokyo",
    country: "Japan",
    amount: "Full tuition + monthly stipend",
    fundingType: "Fully Funded",
    deadline: "2026-08-10",
    publishedAt: "2026-07-09",
    description:
      "A fully-funded scholarship from the Japanese government covering tuition, a monthly living allowance and airfare for international students pursuing research or degree programmes.",
    eligibility: [
      "Nigerian citizen aged 34 or below (varies by programme)",
      "Strong academic record in a relevant field",
      "Willingness to undertake basic Japanese language study if required",
    ],
    requirements: ["Application through the Nigerian embassy in Abuja", "Research plan or study proposal", "Academic transcripts"],
    documents: ["Valid passport", "Degree certificate", "Health certificate", "Recommendation letter"],
    howToApply:
      "Applications are submitted through the Japanese Embassy in Nigeria annually, followed by a written exam and interview for shortlisted candidates.",
    officialUrl: "#",
  },
  {
    slug: "nigerian-national-merit-scholarship",
    title: "National Merit Scholarship for Undergraduates",
    university: "University of Lagos",
    country: "Nigeria",
    amount: "₦300,000 per session",
    fundingType: "Partial Funding",
    deadline: "2026-09-25",
    publishedAt: "2026-07-10",
    description:
      "A merit-based scholarship supporting outstanding Nigerian undergraduates with strong academic performance and demonstrated financial need across all disciplines.",
    eligibility: [
      "Nigerian citizen currently enrolled in an accredited university",
      "Minimum CGPA of 4.0 on a 5-point scale",
      "Demonstrated financial need",
    ],
    requirements: ["Completed application form", "Current academic transcript", "Recommendation letter from department"],
    documents: ["Admission letter", "Academic transcript", "Local government identification"],
    howToApply:
      "Applications are submitted online with supporting documents; shortlisted candidates may be invited for a verification interview at a regional center.",
    officialUrl: "#",
  },
];

export const mockGrants: MockGrant[] = [
  {
    slug: "tony-elumelu-foundation-grant",
    title: "Pan-African Entrepreneurship Grant",
    provider: "Tony Elumelu-Style Foundation",
    fundingAmount: "$5,000 seed funding",
    industry: "All Industries",
    country: "Nigeria (Pan-African)",
    businessStage: "Early-stage / Idea stage",
    deadline: "2026-09-01",
    publishedAt: "2026-07-01",
    description:
      "A seed-funding and mentorship programme supporting early-stage African entrepreneurs with non-refundable capital, structured training and a 12-month mentoring relationship.",
    eligibility: [
      "African citizen and business based in Africa",
      "Business idea or company operating for less than 3 years",
      "Ability to commit to the full 12-month mentorship programme",
    ],
    requirements: ["Business summary (300 words)", "Basic financial projections", "Valid means of identification"],
    applicationUrl: "#",
  },
  {
    slug: "she-leads-africa-grant",
    title: "Women in Business Growth Grant",
    provider: "She Leads Africa-Style Fund",
    fundingAmount: "₦2,000,000",
    industry: "Women-led Business",
    country: "Nigeria",
    businessStage: "Growth stage (1+ years trading)",
    deadline: "2026-10-10",
    publishedAt: "2026-07-02",
    description:
      "A grant and accelerator programme for women-led Nigerian businesses ready to scale, combining non-dilutive funding with a structured 6-week growth curriculum.",
    eligibility: [
      "Business must be at least 51% women-owned",
      "Operating for a minimum of 12 months with evidence of revenue",
      "Registered business (CAC registration required)",
    ],
    requirements: ["CAC certificate", "1-page pitch deck", "12 months of bank statements or revenue evidence"],
    applicationUrl: "#",
  },
  {
    slug: "google-black-founders-fund",
    title: "Black Founders Tech Fund",
    provider: "Google for Startups-Style Fund",
    fundingAmount: "$50,000 – $100,000",
    industry: "Technology",
    country: "Nigeria",
    businessStage: "Seed to Series A",
    deadline: "2026-11-15",
    publishedAt: "2026-07-03",
    description:
      "Non-dilutive cash funding plus Google Cloud credits and mentorship for Black-led tech startups building scalable digital products across Africa.",
    eligibility: [
      "At least one Black founder with significant equity and leadership role",
      "Registered tech startup with a working product or MVP",
      "Demonstrated early traction (users, revenue, or pilot partners)",
    ],
    requirements: ["Pitch deck", "Product demo or link", "Founding team bios", "Cap table summary"],
    applicationUrl: "#",
  },
  {
    slug: "cbn-agribusiness-grant",
    title: "Agribusiness Growth Grant",
    provider: "Central Bank Development Fund-Style Scheme",
    fundingAmount: "₦3,500,000",
    industry: "Agriculture",
    country: "Nigeria",
    businessStage: "Growth stage",
    deadline: "2026-09-20",
    publishedAt: "2026-07-04",
    description:
      "A low-interest development fund supporting agribusinesses across the value chain, from primary production to agro-processing and distribution.",
    eligibility: [
      "Registered agribusiness operating in Nigeria",
      "Verifiable farmland, equipment, or processing facility",
      "Clear plan for job creation or output increase",
    ],
    requirements: ["Business plan", "CAC registration", "Land or facility ownership/lease evidence"],
    applicationUrl: "#",
  },
  {
    slug: "youth-innovation-challenge-grant",
    title: "Youth Innovation Challenge Grant",
    provider: "National Youth Investment Fund-Style Scheme",
    fundingAmount: "₦1,500,000",
    industry: "Innovation & Tech",
    country: "Nigeria",
    businessStage: "Idea to early-stage",
    deadline: "2026-10-05",
    publishedAt: "2026-07-05",
    description:
      "A competitive grant challenge rewarding innovative solutions from Nigerian youth in technology, agriculture, health and creative industries.",
    eligibility: [
      "Nigerian citizen aged 18-35",
      "Innovative business idea or early-stage venture",
      "Willingness to participate in a public pitch event",
    ],
    requirements: ["3-minute pitch video", "Business concept note", "Valid ID showing age eligibility"],
    applicationUrl: "#",
  },
  {
    slug: "creative-industry-grant",
    title: "Creative Industry Development Grant",
    provider: "Ministry of Arts & Culture-Style Fund",
    fundingAmount: "₦1,000,000",
    industry: "Creative Arts",
    country: "Nigeria",
    businessStage: "Early to growth stage",
    deadline: "2026-12-15",
    publishedAt: "2026-07-06",
    description:
      "Funding support for Nigerian creatives and cultural entrepreneurs in film, music, fashion, and visual arts to scale production and distribution.",
    eligibility: [
      "Nigerian creative entrepreneur or registered creative business",
      "Evidence of prior creative work or portfolio",
      "Clear plan for how funds will be used",
    ],
    requirements: ["Portfolio or work samples", "Project proposal", "Budget breakdown"],
    applicationUrl: "#",
  },
  {
    slug: "fashion-forward-textile-grant",
    title: "Fashion Forward Textile Grant",
    provider: "Nigerian Textile Development Fund-Style Scheme",
    fundingAmount: "₦1,800,000",
    industry: "Fashion & Textile",
    country: "Nigeria",
    businessStage: "Early to growth stage",
    deadline: "2026-11-05",
    publishedAt: "2026-07-07",
    description:
      "Grant funding and equipment support for Nigerian fashion designers and textile producers looking to scale local production and reduce reliance on imports.",
    eligibility: [
      "Registered fashion or textile business operating in Nigeria",
      "At least 6 months of demonstrable production activity",
      "Plan to scale local sourcing or manufacturing",
    ],
    requirements: ["Business registration", "Product samples or lookbook", "Growth plan"],
    applicationUrl: "#",
  },
  {
    slug: "healthtech-innovation-fund",
    title: "HealthTech Innovation Fund",
    provider: "African Health Innovation Fund-Style Scheme",
    fundingAmount: "$10,000 – $30,000",
    industry: "Health & Medtech",
    country: "Nigeria",
    businessStage: "Seed stage",
    deadline: "2026-10-20",
    publishedAt: "2026-07-08",
    description:
      "Funding and mentorship for early-stage health-tech ventures improving access to diagnostics, care delivery, or health data across Nigeria.",
    eligibility: [
      "Registered health-tech startup with a working prototype or product",
      "At least one founder with relevant clinical or technical background",
      "Solution addressing a clear healthcare access gap",
    ],
    requirements: ["Pitch deck", "Product demo", "Regulatory compliance summary (if applicable)"],
    applicationUrl: "#",
  },
  {
    slug: "export-trade-growth-grant",
    title: "Export & Trade Growth Grant",
    provider: "Nigerian Export Promotion Council-Style Scheme",
    fundingAmount: "₦2,500,000",
    industry: "Trade & Export",
    country: "Nigeria",
    businessStage: "Growth stage",
    deadline: "2026-12-01",
    publishedAt: "2026-07-09",
    description:
      "Support for Nigerian SMEs looking to begin or scale exporting goods internationally, covering certification, logistics and market-entry costs.",
    eligibility: [
      "Registered business with an exportable product",
      "Evidence of product quality or existing certification",
      "Clear target export market",
    ],
    requirements: ["CAC registration", "Product specification sheet", "Export readiness plan"],
    applicationUrl: "#",
  },
  {
    slug: "renewable-energy-access-grant",
    title: "Renewable Energy Access Grant",
    provider: "Rural Electrification Fund-Style Scheme",
    fundingAmount: "₦4,000,000",
    industry: "Renewable Energy",
    country: "Nigeria",
    businessStage: "Growth stage",
    deadline: "2026-11-25",
    publishedAt: "2026-07-10",
    description:
      "Grant support for solar and clean energy businesses expanding access to reliable power in underserved Nigerian communities.",
    eligibility: [
      "Registered renewable energy business or cooperative",
      "Demonstrated technical capacity to deploy solar or clean energy systems",
      "Target community with a clear energy access gap",
    ],
    requirements: ["Technical proposal", "CAC registration", "Community needs assessment"],
    applicationUrl: "#",
  },
];

export const mockBlogPosts: MockBlogPost[] = [
  {
    slug: "how-to-write-a-cv-nigerian-recruiters-notice",
    title: "How to Write a CV Nigerian Recruiters Actually Notice",
    excerpt: "The 7 changes that move your CV from the rejection pile to the interview list — with real before/after examples.",
    category: "CV Tips",
    categorySlug: "cv-tips",
    tags: ["CV Writing", "Job Search", "Nigeria"],
    authorSlug: "chiamaka-nwosu",
    author: "Chiamaka Nwosu",
    readingTimeMinutes: 7,
    publishedAt: "2026-07-29",
    contentHtml:
      "<p>Most CVs don't get rejected because the candidate is unqualified. They get rejected because a recruiter spends six seconds scanning the page and can't quickly find proof that the person can do the job.</p><h2>1. Lead with achievements, not duties</h2><p>Instead of \"Responsible for managing social media accounts,\" write \"Grew Instagram engagement by 34% in 4 months through a redesigned content calendar.\" Numbers make claims verifiable and memorable.</p><h2>2. Match the job description's language</h2><p>Many Nigerian companies still use keyword-based applicant tracking systems. If the job post says \"stakeholder management,\" your CV should say it too — not a synonym.</p><h2>3. Cut anything older than 10 years</h2><p>Unless it's directly relevant, older roles dilute your CV's focus. Summarize them in one line at the bottom instead of a full section.</p><h2>4. Use one consistent format</h2><p>Recruiters trust CVs that look deliberate. Pick one font, one date format, and one bullet style, and use it throughout.</p><h2>5. Add a short professional summary</h2><p>Three lines at the top stating who you are, your core strength, and what you're looking for helps a recruiter place you instantly.</p><h2>6. Remove the objective statement clichés</h2><p>\"Seeking a challenging role in a reputable organization\" tells a recruiter nothing. Replace it with specifics about your target role.</p><h2>7. Proofread twice, then once more</h2><p>A single typo can be the difference between a callback and silence, especially for roles requiring attention to detail.</p><p>If you'd rather have a career expert handle this for you, our <a href=\"/services/cv-writing\">CV writing service</a> is built specifically around what Nigerian recruiters screen for.</p>",
  },
  {
    slug: "ats-friendly-cv-formatting-guide",
    title: "The ATS-Friendly CV Formatting Guide Most People Get Wrong",
    excerpt: "Fancy templates can quietly get your CV rejected before a human ever sees it. Here's what actually works.",
    category: "CV Tips",
    categorySlug: "cv-tips",
    tags: ["CV Writing", "ATS", "Job Search"],
    authorSlug: "chiamaka-nwosu",
    author: "Chiamaka Nwosu",
    readingTimeMinutes: 6,
    publishedAt: "2026-06-18",
    contentHtml:
      "<p>Applicant Tracking Systems (ATS) parse your CV into plain text before a human ever opens it. If the parser can't read your layout, a strong candidate can be filtered out automatically.</p><h2>Avoid tables and text boxes</h2><p>Many ATS platforms can't correctly read content placed inside tables, columns, or text boxes — the exact layout many \"designer\" templates use.</p><h2>Stick to standard section headings</h2><p>\"Work Experience,\" \"Education,\" and \"Skills\" are recognized instantly. Creative alternatives like \"My Journey\" can confuse the parser.</p><h2>Save as a Word document unless told otherwise</h2><p>Unless a job post explicitly requests a PDF, a .docx file is parsed more reliably by most ATS platforms.</p><h2>Keep contact information out of the header/footer</h2><p>Some systems skip headers and footers entirely, which means your name and phone number might never get extracted.</p><p>Once your CV is ATS-safe, the next priority is making sure the content itself is compelling — that's where a professional review makes the biggest difference.</p>",
  },
  {
    slug: "linkedin-profile-checklist-2026",
    title: "The 2026 LinkedIn Profile Checklist for Job Seekers",
    excerpt: "Recruiters spend 6 seconds on your profile before deciding. Here's exactly what they look at first.",
    category: "LinkedIn Tips",
    categorySlug: "linkedin-tips",
    tags: ["LinkedIn", "Personal Branding", "Job Search"],
    authorSlug: "tobi-adekunle",
    author: "Tobi Adekunle",
    readingTimeMinutes: 6,
    publishedAt: "2026-07-26",
    contentHtml:
      "<p>Recruiters using LinkedIn Recruiter view your photo, headline, and current role before anything else. Optimizing for that first glance dramatically increases your response rate.</p><h2>Your headline is prime real estate</h2><p>Don't just list your job title. Add what you do and who you help: \"Product Manager | Fintech & Payments | Building for the Nigerian mass market.\"</p><h2>Use a real, professional photo</h2><p>Profiles with a clear, friendly headshot get significantly more profile views than those without one.</p><h2>Write your About section for humans, not robots</h2><p>Keyword-stuffing looks unnatural. Write in first person about your strengths, what you're looking for, and a career highlight or two.</p><h2>Turn on \"Open to Work\"</h2><p>This single setting can be the difference between being found by a recruiter and being invisible in search.</p><h2>Request recommendations, don't just give them</h2><p>Two or three specific, credible recommendations do more for your credibility than a long list of skill endorsements.</p><p>Want a professional to handle your entire profile overhaul? Our <a href=\"/services/linkedin-optimization\">LinkedIn optimization service</a> covers all of this and more.</p>",
  },
  {
    slug: "linkedin-connection-strategy-nigeria",
    title: "How to Grow a LinkedIn Network That Actually Gets You Hired",
    excerpt: "Connection count means nothing. Here's how to build a network that opens real opportunities.",
    category: "LinkedIn Tips",
    categorySlug: "linkedin-tips",
    tags: ["LinkedIn", "Networking"],
    authorSlug: "tobi-adekunle",
    author: "Tobi Adekunle",
    readingTimeMinutes: 5,
    publishedAt: "2026-06-10",
    contentHtml:
      "<p>Having 5,000 random connections doesn't help your job search. A smaller, relevant network built around your target industry does.</p><h2>Connect with intent, not volume</h2><p>Before sending a request, check the person's role. Recruiters and hiring managers at your target companies matter far more than random professionals.</p><h2>Always personalize your request</h2><p>A short note — \"Hi, I admire the work your team is doing on X, would love to connect\" — dramatically increases acceptance rates.</p><h2>Engage before you ask for anything</h2><p>Commenting thoughtfully on someone's posts for a few weeks makes a direct message far more likely to get a reply later.</p><h2>Post occasionally, even if it feels awkward at first</h2><p>Sharing a short reflection on your work once every week or two keeps you visible to your network without requiring constant effort.</p><p>Consistency matters more than perfection — a modest, active network beats a large, silent one.</p>",
  },
  {
    slug: "mock-interview-mistakes-nigerian-candidates",
    title: "5 Interview Mistakes That Cost Nigerian Candidates the Offer",
    excerpt: "These aren't about qualifications — they're about how candidates present themselves under pressure.",
    category: "Interview Prep",
    categorySlug: "interview-prep",
    tags: ["Interview Prep", "Job Search"],
    authorSlug: "emeka-okafor",
    author: "Emeka Okafor",
    readingTimeMinutes: 7,
    publishedAt: "2026-07-14",
    contentHtml:
      "<p>After running hundreds of mock interviews, the same avoidable mistakes come up again and again — regardless of how strong a candidate's actual experience is.</p><h2>1. Rambling instead of using a structure</h2><p>Use the STAR method (Situation, Task, Action, Result) to keep behavioral answers tight and outcome-focused instead of wandering.</p><h2>2. Not researching the company beyond the website homepage</h2><p>Interviewers notice quickly when a candidate hasn't looked into recent company news, products, or challenges.</p><h2>3. Underselling achievements out of modesty</h2><p>Cultural humility is admirable, but an interview is the one setting where you're expected to clearly state your impact.</p><h2>4. Having no questions prepared</h2><p>\"No, I think you covered everything\" signals disengagement. Always have two or three thoughtful questions ready.</p><h2>5. Weak salary negotiation</h2><p>Accepting the first offer without discussion often leaves money on the table — most employers expect some negotiation.</p><p>Our <a href=\"/services/interview-preparation\">interview preparation service</a> runs live mock interviews to help you fix these before it counts.</p>",
  },
  {
    slug: "questions-to-ask-in-an-interview",
    title: "12 Smart Questions to Ask at the End of Any Interview",
    excerpt: "The questions you ask reveal as much about you as the answers you give. Use these to stand out.",
    category: "Interview Prep",
    categorySlug: "interview-prep",
    tags: ["Interview Prep"],
    authorSlug: "emeka-okafor",
    author: "Emeka Okafor",
    readingTimeMinutes: 5,
    publishedAt: "2026-06-05",
    contentHtml:
      "<p>Good closing questions do two things: they give you real information, and they signal that you're seriously evaluating the opportunity, not just hoping for any offer.</p><h2>About the role</h2><p>\"What does success look like in this role after the first 6 months?\" and \"What's the biggest challenge someone in this role would face right now?\"</p><h2>About the team</h2><p>\"How would you describe the team's working style?\" and \"What's one thing you'd change about how the team currently operates?\"</p><h2>About growth</h2><p>\"What does career progression typically look like for someone starting in this position?\"</p><h2>About the company</h2><p>\"What's something about the company culture that surprised you after you joined?\"</p><p>Avoid asking anything you could have easily found on the company website — it signals you didn't prepare.</p>",
  },
  {
    slug: "get-hired-remote-nigeria-guide",
    title: "How Nigerians Are Getting Hired Remotely by Global Companies",
    excerpt: "A practical, step-by-step guide to landing remote roles that pay in dollars — platforms, timing, and interview tips.",
    category: "Remote Work",
    categorySlug: "remote-work",
    tags: ["Remote Work", "Job Search"],
    authorSlug: "amaka-eze",
    author: "Amaka Eze",
    readingTimeMinutes: 9,
    publishedAt: "2026-07-23",
    contentHtml:
      "<p>Remote hiring from Nigeria into global companies has grown significantly, but it still requires a different approach than applying to local roles.</p><h2>Pick your lane: freelance platforms vs. full-time remote</h2><p>Platforms like Upwork are good for building a portfolio quickly, but dedicated remote job boards and direct applications tend to lead to more stable, better-paying full-time roles.</p><h2>Time zone overlap matters more than you'd think</h2><p>Companies hiring across Africa often prioritize candidates who can overlap a few hours with US or European teams — mention your flexibility explicitly in applications.</p><h2>Get comfortable with async communication</h2><p>Remote teams rely heavily on written updates. Strong, clear written communication is often weighted as highly as technical skill.</p><h2>Get paid without losing money to fees</h2><p>Research platforms like Payoneer, Wise, or Deel early — this affects your real take-home pay significantly.</p><h2>Build a visible portfolio or GitHub</h2><p>Remote employers can't assess you in person, so a visible body of work does a lot of the trust-building for you.</p><p>Our <a href=\"/blog/category/remote-work\">Remote Work</a> resources are updated regularly with platform recommendations and application strategies.</p>",
  },
  {
    slug: "remote-work-tools-every-nigerian-professional-needs",
    title: "8 Tools Every Nigerian Remote Worker Should Set Up First",
    excerpt: "From reliable internet backup to time-zone tools, here's the practical setup that keeps remote workers employable.",
    category: "Remote Work",
    categorySlug: "remote-work",
    tags: ["Remote Work", "Productivity"],
    authorSlug: "amaka-eze",
    author: "Amaka Eze",
    readingTimeMinutes: 6,
    publishedAt: "2026-06-22",
    contentHtml:
      "<p>Reliability is the number one thing global employers worry about when hiring remotely from Nigeria. The right setup removes that worry before it becomes a concern.</p><h2>1. A backup internet connection</h2><p>A secondary mobile data plan as backup avoids the single point of failure that ends careers with unreliable clients.</p><h2>2. An inverter or backup power source</h2><p>Even a small backup power setup keeps you online through short outages during work hours.</p><h2>3. A dedicated time-zone converter</h2><p>Tools like World Time Buddy prevent the embarrassing (and costly) mistake of missing a meeting due to time confusion.</p><h2>4. A professional video call background</h2><p>A clean, quiet space signals professionalism during video interviews and daily standups.</p><h2>5-8. Password manager, VPN, async messaging app, and a reliable payment platform</h2><p>Each removes a small friction point that, left unsolved, quietly damages your reliability in a remote employer's eyes.</p>",
  },
  {
    slug: "study-abroad-application-timeline",
    title: "The Realistic Study Abroad Application Timeline (UK, US & Canada)",
    excerpt: "Missing early deadlines is the #1 reason strong applicants get rejected. Plan backward from intake using this timeline.",
    category: "Study Abroad",
    categorySlug: "study-abroad",
    tags: ["Study Abroad", "Scholarships"],
    authorSlug: "ifeoma-chukwu",
    author: "Ifeoma Chukwu",
    readingTimeMinutes: 8,
    publishedAt: "2026-07-11",
    contentHtml:
      "<p>Most students start their study abroad process too late — not because they're unqualified, but because scholarship and admission deadlines close far earlier than expected.</p><h2>12-18 months before intake</h2><p>Research programmes, shortlist universities, and start preparing for standardized tests like IELTS or GRE where required.</p><h2>9-12 months before intake</h2><p>Request recommendation letters early — professors and employers often need weeks, not days, to write strong ones.</p><h2>6-9 months before intake</h2><p>Submit university applications. Many scholarship deadlines (like Chevening or Commonwealth) fall in this window too — don't wait for admission before applying to scholarships that allow concurrent applications.</p><h2>3-6 months before intake</h2><p>Handle visa applications, proof of funds documentation, and accommodation arrangements once admission is confirmed.</p><h2>1-3 months before intake</h2><p>Book flights, attend pre-departure briefings, and finalize your visa interview preparation.</p><p>Our <a href=\"/services/study-abroad-documentation\">study abroad documentation service</a> helps applicants avoid the paperwork mistakes that cause delays at each stage.</p>",
  },
  {
    slug: "sop-writing-mistakes-scholarship-applicants-make",
    title: "5 Statement of Purpose Mistakes That Sink Strong Applications",
    excerpt: "A great SOP doesn't need to be dramatic — it needs to be specific, honest, and structured. Here's what goes wrong.",
    category: "Study Abroad",
    categorySlug: "study-abroad",
    tags: ["SOP Writing", "Scholarships", "Study Abroad"],
    authorSlug: "ifeoma-chukwu",
    author: "Ifeoma Chukwu",
    readingTimeMinutes: 6,
    publishedAt: "2026-06-15",
    contentHtml:
      "<p>Admissions and scholarship committees read hundreds of statements. The ones that stand out are specific — not the ones that sound the most impressive.</p><h2>1. Starting with a generic quote or cliché</h2><p>\"Since I was a child, I have always been passionate about...\" is one of the most common opening lines committees see — and it rarely helps.</p><h2>2. Listing achievements instead of connecting them</h2><p>A strong SOP explains why each experience led logically to your next goal, not just what you did.</p><h2>3. Ignoring the \"why this programme, specifically\" question</h2><p>Naming specific courses, professors, or research areas signals genuine, researched interest rather than a generic application.</p><h2>4. Being vague about future plans</h2><p>Committees want to see a credible plan for how this specific degree moves you toward a specific goal.</p><h2>5. Skipping the professional review</h2><p>A second, expert set of eyes consistently catches structural and clarity issues the writer is too close to see.</p>",
  },
  {
    slug: "how-to-find-legitimate-scholarships",
    title: "How to Find Legitimate Scholarships Without Getting Scammed",
    excerpt: "Scholarship scams target ambitious students. Here's how to tell a real opportunity from a fake one.",
    category: "Scholarship Tips",
    categorySlug: "scholarship-tips",
    tags: ["Scholarships", "Study Abroad"],
    authorSlug: "ifeoma-chukwu",
    author: "Ifeoma Chukwu",
    readingTimeMinutes: 6,
    publishedAt: "2026-07-08",
    contentHtml:
      "<p>Scholarship scams are common enough that learning a few warning signs can save applicants both money and heartbreak.</p><h2>Legitimate scholarships never ask for payment to \"process\" your win</h2><p>A real scholarship provider does not need money from you to release funds you've supposedly already won.</p><h2>Check for an official, verifiable website</h2><p>Cross-reference the scholarship with the university or government body's official website, not just the page that's promoting it.</p><h2>Be wary of guaranteed acceptance</h2><p>Genuine scholarships are competitive. Any programme promising guaranteed funding regardless of qualifications should raise concern.</p><h2>Verify contact details independently</h2><p>Search the organization's name plus \"scam\" or \"reviews\" before submitting personal documents.</p><p>Our <a href=\"/scholarships\">scholarship listings</a> are reviewed before publishing specifically to help applicants avoid these traps.</p>",
  },
  {
    slug: "how-to-choose-the-right-scholarship-for-you",
    title: "How to Choose the Right Scholarship for Your Goals (Not Just Any Scholarship)",
    excerpt: "Applying to every scholarship you find wastes time. Here's how to prioritize the ones worth your energy.",
    category: "Scholarship Tips",
    categorySlug: "scholarship-tips",
    tags: ["Scholarships"],
    authorSlug: "ifeoma-chukwu",
    author: "Ifeoma Chukwu",
    readingTimeMinutes: 5,
    publishedAt: "2026-06-01",
    contentHtml:
      "<p>Not every scholarship is worth the hours it takes to apply. Prioritizing well means you can put real effort into fewer, stronger applications.</p><h2>Match funding type to your actual need</h2><p>A partial scholarship is only useful if you can realistically cover the remaining cost — check this honestly before investing time.</p><h2>Consider the post-study obligations</h2><p>Some scholarships require returning home for a set number of years; others don't. Know which fits your long-term plans.</p><h2>Weigh your competitiveness realistically</h2><p>Apply to a mix of highly competitive and moderately competitive scholarships rather than only the most famous names.</p><h2>Check the field-of-study restrictions closely</h2><p>Some funders only support specific disciplines like STEM or public policy — don't waste an application outside your eligible field.</p>",
  },
  {
    slug: "business-grant-application-checklist",
    title: "The Business Grant Application Checklist Most Founders Skip",
    excerpt: "Grant reviewers reject applications for avoidable reasons. Here's the checklist that prevents them.",
    category: "Grant & Funding Tips",
    categorySlug: "grant-funding",
    tags: ["Grants", "Small Business"],
    authorSlug: "david-eze",
    author: "David Eze",
    readingTimeMinutes: 7,
    publishedAt: "2026-07-02",
    contentHtml:
      "<p>Most rejected grant applications aren't rejected because the business idea is weak — they're rejected because the application itself is incomplete or unclear.</p><h2>1. Business registration documents</h2><p>Have your CAC certificate ready and current before you start applying — missing registration disqualifies many applicants outright.</p><h2>2. A clear, specific use-of-funds breakdown</h2><p>\"General business growth\" is too vague. Reviewers want to see exactly what the money will be spent on and why.</p><h2>3. Evidence of traction</h2><p>Bank statements, sales records, or customer testimonials make your application far more credible than projections alone.</p><h2>4. A realistic, not inflated, growth plan</h2><p>Overly ambitious projections without a clear path can hurt credibility more than modest, well-supported ones.</p><h2>5. A concise, well-written pitch</h2><p>Reviewers read dozens of applications — clarity and brevity consistently outperform length.</p><p>Our <a href=\"/grants\">grant listings</a> are updated regularly so you're not chasing expired opportunities.</p>",
  },
  {
    slug: "how-grant-reviewers-actually-score-applications",
    title: "How Grant Reviewers Actually Score Applications (And What to Prioritize)",
    excerpt: "Understanding the scoring rubric changes how you should write every section of your application.",
    category: "Grant & Funding Tips",
    categorySlug: "grant-funding",
    tags: ["Grants", "Small Business"],
    authorSlug: "david-eze",
    author: "David Eze",
    readingTimeMinutes: 6,
    publishedAt: "2026-05-28",
    contentHtml:
      "<p>Most grant programmes use a structured scoring rubric, even when it's not published. Writing with that rubric in mind meaningfully improves your odds.</p><h2>Impact and job creation carry heavy weight</h2><p>Reviewers consistently prioritize applications that clearly show community or economic impact, not just individual business growth.</p><h2>Feasibility matters more than ambition</h2><p>A believable, well-supported plan scores higher than an exciting but unproven one.</p><h2>Team credibility is scored, even informally</h2><p>Briefly highlighting relevant experience or past execution builds reviewer confidence in your ability to deliver.</p><h2>Budget clarity signals seriousness</h2><p>A clean, itemized budget is read as a proxy for how seriously you'll manage the actual funds if awarded.</p><p>Write every section as if a specific, busy reviewer is scoring it against a checklist — because they usually are.</p>",
  },
  {
    slug: "what-recruiters-look-for-first-30-seconds",
    title: "What Recruiters Actually Look For in the First 30 Seconds",
    excerpt: "Insights from the hiring side — the specific signals that move a candidate from 'maybe' to 'yes'.",
    category: "HR Insights",
    categorySlug: "hr-insights",
    tags: ["HR", "Recruitment", "Job Search"],
    authorSlug: "ngozi-bassey",
    author: "Ngozi Bassey",
    readingTimeMinutes: 6,
    publishedAt: "2026-06-30",
    contentHtml:
      "<p>After years reviewing applications on the employer side, a few patterns show up consistently in the first quick scan of a candidate's materials.</p><h2>Relevance beats prestige</h2><p>A candidate whose recent experience directly matches the role often beats a more \"impressive\" but less relevant background.</p><h2>Clean formatting signals conscientiousness</h2><p>Messy formatting is quietly read as a preview of how organized someone's work will be on the job.</p><h2>A tailored cover note (even 3 sentences) stands out</h2><p>Most applicants send nothing or a generic template — a short, specific note is a fast, easy differentiator.</p><h2>Career gaps aren't automatically disqualifying</h2><p>What matters is whether the application addresses the gap briefly and confidently, rather than leaving it to guesswork.</p><p>Understanding the hiring side's perspective is one of the fastest ways to improve how you present yourself as a candidate.</p>",
  },
  {
    slug: "salary-negotiation-nigeria-guide",
    title: "How to Negotiate Salary in Nigeria Without Losing the Offer",
    excerpt: "Negotiation doesn't have to feel confrontational. Here's a practical, low-risk approach that works.",
    category: "HR Insights",
    categorySlug: "hr-insights",
    tags: ["Salary Negotiation", "Job Search"],
    authorSlug: "ngozi-bassey",
    author: "Ngozi Bassey",
    readingTimeMinutes: 6,
    publishedAt: "2026-05-20",
    contentHtml:
      "<p>Many Nigerian professionals accept the first offer out of fear of appearing ungrateful — but most employers build negotiation room into their initial offer.</p><h2>Never give the first number if you can avoid it</h2><p>If asked for salary expectations early, a range based on market research protects you better than a fixed figure.</p><h2>Research market rates before the conversation</h2><p>Salary data from platforms and your own network gives you a defensible, confident basis for your ask.</p><h2>Negotiate the full package, not just base salary</h2><p>Housing allowance, health insurance, remote flexibility, and leave days are often more negotiable than base pay itself.</p><h2>Use a collaborative, not combative, tone</h2><p>\"Based on my research and experience, I was hoping we could look at something closer to X\" keeps the conversation constructive.</p><p>A respectful, well-prepared negotiation rarely costs candidates an offer — silence about your expectations costs you money instead.</p>",
  },
  {
    slug: "when-to-consider-a-career-change",
    title: "5 Signs It Might Be Time for a Career Change (Not Just a New Job)",
    excerpt: "Sometimes the problem isn't your employer — it's the entire career path. Here's how to tell the difference.",
    category: "Career Growth",
    categorySlug: "career-growth",
    tags: ["Career Growth", "Career Change"],
    authorSlug: "emeka-okafor",
    author: "Emeka Okafor",
    readingTimeMinutes: 6,
    publishedAt: "2026-06-25",
    contentHtml:
      "<p>Dissatisfaction at work doesn't always mean you need a career change — sometimes it means you need a different employer within the same field. Here's how to tell which applies.</p><h2>1. The dissatisfaction follows you across employers</h2><p>If you've felt the same frustration in every job within a field, the field itself may be the mismatch, not any single employer.</p><h2>2. You're consistently drawn to a different type of work</h2><p>Notice what you gravitate toward in your free time — side projects often reveal a direction worth pursuing seriously.</p><h2>3. The skills you enjoy using aren't central to your current role</h2><p>A mismatch between your strongest skills and your daily responsibilities is a strong, practical signal.</p><h2>4. Growth in your current path has clearly plateaued</h2><p>If there's no realistic next step left in your current trajectory, it may be time to build toward a new one.</p><h2>5. You've researched the transition, not just fantasized about it</h2><p>A well-researched transition plan, even a rough one, is a good sign the interest is more than a passing mood.</p>",
  },
  {
    slug: "building-a-personal-brand-early-career",
    title: "Why Building a Personal Brand Early Pays Off Later in Your Career",
    excerpt: "The professionals who get unexpected opportunities usually built visibility long before they needed it.",
    category: "Career Growth",
    categorySlug: "career-growth",
    tags: ["Career Growth", "Personal Branding"],
    authorSlug: "tobi-adekunle",
    author: "Tobi Adekunle",
    readingTimeMinutes: 5,
    publishedAt: "2026-05-15",
    contentHtml:
      "<p>Opportunities often go to the person a hiring manager already knows of, not necessarily the most qualified applicant in a blind pool. Visibility compounds over time.</p><h2>Start before you feel ready</h2><p>Early-career professionals often wait to \"have more experience\" before sharing their work — but consistency matters more than seniority.</p><h2>Document your work, don't just do it</h2><p>A short post explaining a problem you solved builds more credibility over time than the work itself, which stays invisible otherwise.</p><h2>Pick one platform and go deep</h2><p>Trying to maintain a presence everywhere dilutes effort. LinkedIn is usually the highest-leverage platform for career-related visibility.</p><h2>Be helpful publicly, not just impressive</h2><p>Answering questions and sharing useful resources builds trust faster than only posting personal achievements.</p><p>Five years of quiet visibility-building often outperforms a single well-timed job application.</p>",
  },
  {
    slug: "where-nigerians-are-actually-getting-hired-2026",
    title: "Where Nigerians Are Actually Getting Hired in 2026",
    excerpt: "A look at which sectors and job types are actively hiring right now, based on our own listings data.",
    category: "Job Search Strategy",
    categorySlug: "job-search",
    tags: ["Job Search", "Nigeria"],
    authorSlug: "ngozi-bassey",
    author: "Ngozi Bassey",
    readingTimeMinutes: 7,
    publishedAt: "2026-07-05",
    contentHtml:
      "<p>Job seekers often focus their search on the most talked-about industries, while some of the strongest hiring activity happens quietly in less glamorous sectors.</p><h2>Fintech and digital banking remain strong</h2><p>Product, engineering, and compliance roles continue to see steady demand as digital banks compete for market share.</p><h2>Logistics and supply chain are quietly growing</h2><p>E-commerce growth has created consistent demand for logistics coordinators and supply chain officers, often with less applicant competition.</p><h2>Remote-friendly roles are expanding beyond tech</h2><p>Customer support, content, and operations roles for international companies are increasingly open to Nigeria-based remote hires.</p><h2>Healthcare and education remain consistently in-demand</h2><p>These sectors see steady hiring activity regardless of broader economic cycles, making them a reliable option for many candidates.</p><p>Browse <a href=\"/jobs\">current listings</a> across these categories to see live opportunities matching each trend.</p>",
  },
  {
    slug: "job-application-follow-up-email-templates",
    title: "How (and When) to Follow Up on a Job Application Without Being Annoying",
    excerpt: "Silence after applying doesn't always mean rejection. Here's how to follow up professionally.",
    category: "Job Search Strategy",
    categorySlug: "job-search",
    tags: ["Job Search"],
    authorSlug: "emeka-okafor",
    author: "Emeka Okafor",
    readingTimeMinutes: 5,
    publishedAt: "2026-05-10",
    contentHtml:
      "<p>Many strong candidates never hear back simply because their application got buried — not because they were rejected. A well-timed follow-up can fix that.</p><h2>Wait at least 7-10 business days</h2><p>Following up too early can come across as impatient; too late and the role may already be filled.</p><h2>Keep it short and specific</h2><p>Reference the exact role and date you applied, and reaffirm your interest in one or two sentences — no need to restate your entire CV.</p><h2>Send it to the right person, if possible</h2><p>A note to the hiring manager or recruiter directly performs better than a message to a generic company inbox.</p><h2>Follow up once, not repeatedly</h2><p>A single, polite follow-up is professional. Multiple follow-ups in a short window can work against you.</p><p>If there's still no response after a follow-up, it's reasonable to move your attention to other active applications.</p>",
  },
];

export const mockTestimonials: MockTestimonial[] = [
  { name: "Fatima Bello", role: "Hired at a Lagos fintech", quote: "PerfectCareers rewrote my CV and within three weeks I had two interview invites. The LinkedIn optimization made recruiters reach out to me first.", rating: 5 },
  { name: "David Okonkwo", role: "UK Master's Scholar", quote: "I found the exact scholarship that matched my profile through their listings, and their SOP review service made my application stand out.", rating: 5 },
  { name: "Ngozi Umeh", role: "Small Business Owner, Enugu", quote: "The grant writing support helped me secure funding I didn't think I qualified for. Professional, fast, and genuinely invested in my success.", rating: 5 },
  { name: "Emeka Chukwu", role: "Hired at an oil & gas firm, Port Harcourt", quote: "The mock interview session was tougher than the real one. I walked in prepared for every question they actually asked.", rating: 5 },
  { name: "Blessing Adeyemi", role: "Remote Software Tester", quote: "I didn't think I could get hired remotely without connections abroad. PerfectCareers' remote work guide changed my entire approach.", rating: 5 },
  { name: "Ibrahim Sule", role: "Canada Graduate Scholar", quote: "Their study abroad documentation service caught errors in my application I would never have noticed myself.", rating: 5 },
];

export const popularCategories = [
  { label: "Technology", href: "/jobs?category=technology", count: 128 },
  { label: "Banking & Finance", href: "/jobs?category=banking-finance", count: 96 },
  { label: "Oil & Gas", href: "/jobs?category=oil-gas", count: 54 },
  { label: "Remote Jobs", href: "/jobs?category=remote", count: 210 },
  { label: "Human Resources", href: "/jobs?category=human-resources", count: 41 },
  { label: "Marketing", href: "/jobs?category=marketing", count: 63 },
];
