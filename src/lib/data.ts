// Live database reads, shaped to match mock-data.ts's Mock* types exactly.
// Pages import from here instead of mock-data.ts; nothing downstream
// (cards, detail pages) needs to change since the shape is identical.
import { prisma } from "./prisma";
import type {
  MockJob,
  MockScholarship,
  MockGrant,
  MockBlogPost,
  MockAuthor,
  MockTestimonial,
} from "./mock-data";

function dateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

const EMPLOYMENT_TYPE_LABEL: Record<string, MockJob["employmentType"]> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Contract",
};

const WORK_MODE_LABEL: Record<string, MockJob["workMode"]> = {
  ONSITE: "Onsite",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

// ---------------------------------------------------------------- Jobs ----
export async function getAllJobs(): Promise<MockJob[]> {
  const jobs = await prisma.job.findMany({
    include: { company: true, category: true },
    orderBy: { publishedAt: "desc" },
  });
  return jobs.map((job) => ({
    slug: job.slug,
    title: job.title,
    company: job.company.name,
    companyLogo: job.company.logoUrl ?? undefined,
    category: job.category.name,
    employmentType: EMPLOYMENT_TYPE_LABEL[job.employmentType] ?? "Full-time",
    workMode: WORK_MODE_LABEL[job.workMode] ?? "Onsite",
    city: job.city ?? "Remote",
    state: job.state ?? "—",
    country: job.country,
    salaryMin: job.salaryMin ?? undefined,
    salaryMax: job.salaryMax ?? undefined,
    currency: job.salaryCurrency,
    experienceLevel: job.experienceLevel ?? "",
    qualification: job.qualification ?? "",
    deadline: job.deadline ? dateStr(job.deadline) : "",
    applicationUrl: job.applicationUrl,
    publishedAt: dateStr(job.publishedAt),
    description: job.description,
    responsibilities: (job.responsibilities as string[] | null) ?? [],
    requirements: (job.requirements as string[] | null) ?? [],
  }));
}

// ------------------------------------------------------- Scholarships -----
export async function getAllScholarships(): Promise<MockScholarship[]> {
  const rows = await prisma.scholarship.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map((s) => ({
    slug: s.slug,
    title: s.title,
    university: s.university,
    country: s.country,
    amount: s.amount ?? "",
    fundingType: s.fundingType ?? "",
    deadline: s.deadline ? dateStr(s.deadline) : "",
    publishedAt: dateStr(s.publishedAt),
    description: s.description ?? "",
    eligibility: (s.eligibility as string[] | null) ?? [],
    requirements: (s.requirements as string[] | null) ?? [],
    documents: (s.documents as string[] | null) ?? [],
    howToApply: s.howToApply ?? "",
    officialUrl: s.officialUrl,
  }));
}

// -------------------------------------------------------------- Grants ----
export async function getAllGrants(): Promise<MockGrant[]> {
  const rows = await prisma.grant.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map((g) => ({
    slug: g.slug,
    title: g.title,
    provider: g.provider,
    fundingAmount: g.fundingAmount ?? "",
    industry: g.industry ?? "",
    country: g.country,
    businessStage: g.businessStage ?? "",
    deadline: g.deadline ? dateStr(g.deadline) : "",
    publishedAt: dateStr(g.publishedAt),
    description: g.description ?? "",
    eligibility: (g.eligibility as string[] | null) ?? [],
    requirements: (g.requirements as string[] | null) ?? [],
    applicationUrl: g.applicationUrl,
  }));
}

// ----------------------------------------------------------- Blog posts ---
export async function getAllBlogPosts(): Promise<MockBlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    include: { author: true, category: true, tags: true },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category.name,
    categorySlug: post.category.slug,
    tags: post.tags.map((t) => t.name),
    authorSlug: post.author.slug,
    author: post.author.name,
    readingTimeMinutes: post.readingTimeMinutes,
    publishedAt: dateStr(post.publishedAt),
    contentHtml: post.contentHtml,
  }));
}

export async function getAllAuthors(): Promise<MockAuthor[]> {
  const authors = await prisma.author.findMany();
  return authors.map((a) => ({
    slug: a.slug,
    name: a.name,
    role: a.role ?? "",
    bio: a.bio ?? "",
  }));
}

// ------------------------------------------------------- Testimonials -----
export async function getAllTestimonials(): Promise<MockTestimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((t) => ({
    name: t.name,
    role: t.role ?? "",
    quote: t.quote,
    rating: t.rating ?? 5,
  }));
}
