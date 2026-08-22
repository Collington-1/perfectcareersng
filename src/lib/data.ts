// Live database reads. Job/Scholarship/Grant now carry a single rich-text
// content field (see prisma/schema.prisma) instead of separate structured
// fields, so their view types live here rather than reusing mock-data.ts's
// Mock* shapes (still used for Blog/Testimonials, which didn't change).
import { prisma } from "./prisma";
import type { MockBlogPost, MockAuthor, MockTestimonial } from "./mock-data";

function dateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

const EMPLOYMENT_TYPE_LABEL: Record<string, JobView["employmentType"]> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Contract",
};

const WORK_MODE_LABEL: Record<string, JobView["workMode"]> = {
  ONSITE: "Onsite",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

// ---------------------------------------------------------------- Jobs ----
export type JobView = {
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  category: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Onsite" | "Remote" | "Hybrid";
  location: string;
  salary: string | null;
  experienceLevel: string;
  deadline: string;
  applicationUrl: string;
  publishedAt: string;
  contentHtml: string;
};

export async function getAllJobs(): Promise<JobView[]> {
  const jobs = await prisma.job.findMany({
    include: { company: true, category: true },
    orderBy: { publishedAt: "desc" },
  });
  return jobs.map((job) => ({
    slug: job.slug,
    title: job.title,
    company: job.company.name,
    companyLogo: job.company.logoUrl ?? undefined,
    category: job.customCategory || job.category.name,
    employmentType: EMPLOYMENT_TYPE_LABEL[job.employmentType] ?? "Full-time",
    workMode: WORK_MODE_LABEL[job.workMode] ?? "Onsite",
    location: job.location,
    salary: job.salary,
    experienceLevel: job.experienceLevel ?? "",
    deadline: job.deadline ? dateStr(job.deadline) : "",
    applicationUrl: job.applicationUrl,
    publishedAt: dateStr(job.publishedAt),
    contentHtml: job.contentHtml,
  }));
}

// ------------------------------------------------------- Scholarships -----
export type ScholarshipView = {
  slug: string;
  title: string;
  university: string;
  country: string;
  category: string;
  amount: string;
  fundingType: string;
  deadline: string;
  publishedAt: string;
  contentHtml: string;
  howToApply: string;
  officialUrl: string;
};

export async function getAllScholarships(): Promise<ScholarshipView[]> {
  const rows = await prisma.scholarship.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map((s) => ({
    slug: s.slug,
    title: s.title,
    university: s.university,
    country: s.country,
    category: s.customCategory || s.category.name,
    amount: s.amount ?? "",
    fundingType: s.fundingType ?? "",
    deadline: s.deadline ? dateStr(s.deadline) : "",
    publishedAt: dateStr(s.publishedAt),
    contentHtml: s.contentHtml,
    howToApply: s.howToApply ?? "",
    officialUrl: s.officialUrl,
  }));
}

// -------------------------------------------------------------- Grants ----
export type GrantView = {
  slug: string;
  title: string;
  provider: string;
  fundingAmount: string;
  industry: string;
  country: string;
  businessStage: string;
  deadline: string;
  publishedAt: string;
  contentHtml: string;
  applicationUrl: string;
};

export async function getAllGrants(): Promise<GrantView[]> {
  const rows = await prisma.grant.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map((g) => ({
    slug: g.slug,
    title: g.title,
    provider: g.provider,
    fundingAmount: g.fundingAmount ?? "",
    industry: g.customCategory || g.industry || "",
    country: g.country,
    businessStage: g.businessStage ?? "",
    deadline: g.deadline ? dateStr(g.deadline) : "",
    publishedAt: dateStr(g.publishedAt),
    contentHtml: g.contentHtml,
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
