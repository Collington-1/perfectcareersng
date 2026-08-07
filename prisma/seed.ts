// Loads the exact placeholder content currently rendered from mock-data.ts
// into the real database, so the site becomes DB-backed without any
// visible change. Safe to re-run — every model is upserted by slug.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import {
  mockJobs,
  mockScholarships,
  mockGrants,
  mockBlogPosts,
  mockAuthors,
  mockTestimonials,
  jobCategories,
  scholarshipCategories,
  grantCategories,
  blogCategories,
  blogCategoryImage,
} from "../src/lib/mock-data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// mockJob.category / mockScholarship.country / mockGrant.industry are
// display labels, not the category slugs — map them explicitly rather
// than guessing, since a few don't match 1:1 (e.g. "Logistics" vs the
// "Logistics & Supply Chain" category label).
const JOB_CATEGORY_SLUG: Record<string, string> = {
  Technology: "technology",
  "Human Resources": "human-resources",
  "Customer Service": "customer-service",
  Marketing: "marketing",
  Healthcare: "healthcare",
  Education: "education",
  Logistics: "logistics",
  Sales: "sales",
};

const SCHOLARSHIP_CATEGORY_SLUG: Record<string, string> = {
  "United Kingdom": "united-kingdom",
  "United States": "united-states",
  Canada: "canada",
  Germany: "europe",
  Ireland: "europe",
  Netherlands: "europe",
  Japan: "asia-pacific",
  Australia: "asia-pacific",
  Nigeria: "nigeria",
};

const GRANT_CATEGORY_SLUG: Record<string, string> = {
  "All Industries": "technology",
  "Women-led Business": "women-led-business",
  Technology: "technology",
  Agriculture: "agriculture",
  "Innovation & Tech": "technology",
  "Creative Arts": "creative-arts",
  "Fashion & Textile": "fashion-textile",
  "Health & Medtech": "health-tech",
  "Trade & Export": "trade-export",
  "Renewable Energy": "renewable-energy",
};

const EMPLOYMENT_TYPE: Record<string, "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP"> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACT",
  Internship: "INTERNSHIP",
};

const WORK_MODE: Record<string, "ONSITE" | "REMOTE" | "HYBRID"> = {
  Onsite: "ONSITE",
  Remote: "REMOTE",
  Hybrid: "HYBRID",
};

async function main() {
  // --- Categories ---------------------------------------------------
  const categoryId = new Map<string, string>(); // `${type}:${slug}` -> id
  const categorySeeds = [
    ...jobCategories.map((c) => ({ type: "JOB" as const, name: c.label, slug: c.slug, description: undefined as string | undefined })),
    ...scholarshipCategories.map((c) => ({ type: "SCHOLARSHIP" as const, name: c.label, slug: c.slug, description: undefined as string | undefined })),
    ...grantCategories.map((c) => ({ type: "GRANT" as const, name: c.label, slug: c.slug, description: undefined as string | undefined })),
    ...blogCategories.map((c) => ({ type: "BLOG" as const, name: c.label, slug: c.slug, description: c.description })),
  ];
  for (const cat of categorySeeds) {
    const record = await prisma.category.upsert({
      where: { type_slug: { type: cat.type, slug: cat.slug } },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categoryId.set(`${cat.type}:${cat.slug}`, record.id);
  }
  console.log(`Seeded ${categorySeeds.length} categories.`);

  // --- Authors --------------------------------------------------------
  const authorId = new Map<string, string>();
  for (const author of mockAuthors) {
    const record = await prisma.author.upsert({
      where: { slug: author.slug },
      update: { name: author.name, role: author.role, bio: author.bio },
      create: { slug: author.slug, name: author.name, role: author.role, bio: author.bio },
    });
    authorId.set(author.slug, record.id);
  }
  console.log(`Seeded ${mockAuthors.length} authors.`);

  // --- Companies (derived from unique job employers) -------------------
  const companyId = new Map<string, string>();
  const uniqueCompanies = Array.from(new Set(mockJobs.map((j) => j.company)));
  for (const name of uniqueCompanies) {
    const slug = slugify(name);
    const record = await prisma.company.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
    companyId.set(name, record.id);
  }
  console.log(`Seeded ${uniqueCompanies.length} companies.`);

  // --- Tags (derived from unique blog tags) -----------------------------
  const tagId = new Map<string, string>();
  const uniqueTags = Array.from(new Set(mockBlogPosts.flatMap((p) => p.tags)));
  for (const name of uniqueTags) {
    const slug = slugify(name);
    const record = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
    tagId.set(name, record.id);
  }
  console.log(`Seeded ${uniqueTags.length} tags.`);

  // Jobs/Scholarships/Grants are "published" today, so the 30-day
  // auto-expiry window runs from the actual seed date, not the mock date.
  const publishedAt = new Date();
  const expiresAt = new Date(publishedAt.getTime() + 30 * 24 * 60 * 60 * 1000);

  // --- Jobs -------------------------------------------------------------
  let jobCount = 0;
  for (const job of mockJobs) {
    const catId = categoryId.get(`JOB:${JOB_CATEGORY_SLUG[job.category] ?? slugify(job.category)}`);
    const compId = companyId.get(job.company);
    if (!catId || !compId) {
      console.warn(`Skipping job "${job.title}" — missing category/company mapping`);
      continue;
    }
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: {
        slug: job.slug,
        title: job.title,
        description: job.description,
        companyId: compId,
        categoryId: catId,
        employmentType: EMPLOYMENT_TYPE[job.employmentType],
        workMode: WORK_MODE[job.workMode],
        experienceLevel: job.experienceLevel,
        qualification: job.qualification,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.currency,
        country: job.country,
        state: job.state === "—" ? null : job.state,
        city: job.city,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        applicationUrl: job.applicationUrl,
        featuredImageUrl: "/images/jobs-hub.png",
        publishedAt,
        deadline: new Date(job.deadline),
        expiresAt,
      },
    });
    jobCount++;
  }
  console.log(`Seeded ${jobCount} jobs.`);

  // --- Scholarships -------------------------------------------------------
  let scholarshipCount = 0;
  for (const s of mockScholarships) {
    const slug = SCHOLARSHIP_CATEGORY_SLUG[s.country] ?? slugify(s.country);
    const catId = categoryId.get(`SCHOLARSHIP:${slug}`);
    if (!catId) {
      console.warn(`Skipping scholarship "${s.title}" — missing category mapping for ${s.country}`);
      continue;
    }
    await prisma.scholarship.upsert({
      where: { slug: s.slug },
      update: { description: s.description },
      create: {
        slug: s.slug,
        title: s.title,
        description: s.description,
        country: s.country,
        university: s.university,
        amount: s.amount,
        fundingType: s.fundingType,
        eligibility: s.eligibility,
        requirements: s.requirements,
        documents: s.documents,
        howToApply: s.howToApply,
        officialUrl: s.officialUrl,
        categoryId: catId,
        featuredImageUrl: "/images/scholarships-hub.png",
        publishedAt,
        deadline: new Date(s.deadline),
        expiresAt,
      },
    });
    scholarshipCount++;
  }
  console.log(`Seeded ${scholarshipCount} scholarships.`);

  // --- Grants -----------------------------------------------------------
  let grantCount = 0;
  for (const g of mockGrants) {
    const slug = GRANT_CATEGORY_SLUG[g.industry] ?? slugify(g.industry);
    const catId = categoryId.get(`GRANT:${slug}`);
    if (!catId) {
      console.warn(`Skipping grant "${g.title}" — missing category mapping for ${g.industry}`);
      continue;
    }
    await prisma.grant.upsert({
      where: { slug: g.slug },
      update: { description: g.description },
      create: {
        slug: g.slug,
        title: g.title,
        description: g.description,
        provider: g.provider,
        fundingAmount: g.fundingAmount,
        eligibility: g.eligibility,
        country: g.country,
        businessStage: g.businessStage,
        industry: g.industry,
        requirements: g.requirements,
        applicationUrl: g.applicationUrl,
        categoryId: catId,
        featuredImageUrl: "/images/grants-hub.png",
        publishedAt,
        deadline: new Date(g.deadline),
        expiresAt,
      },
    });
    grantCount++;
  }
  console.log(`Seeded ${grantCount} grants.`);

  // --- Blog posts ---------------------------------------------------------
  let postCount = 0;
  for (const post of mockBlogPosts) {
    const catId = categoryId.get(`BLOG:${post.categorySlug}`);
    const authId = authorId.get(post.authorSlug);
    if (!catId || !authId) {
      console.warn(`Skipping post "${post.title}" — missing category/author mapping`);
      continue;
    }
    const tagIds = post.tags.map((t) => tagId.get(t)).filter((id): id is string => Boolean(id));
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        // Placeholder Tiptap doc — the rich text editor (admin dashboard)
        // will populate real editable JSON the first time this post is opened.
        content: { type: "doc", content: [] },
        contentHtml: post.contentHtml,
        authorId: authId,
        categoryId: catId,
        tags: { connect: tagIds.map((id) => ({ id })) },
        readingTimeMinutes: post.readingTimeMinutes,
        featuredImageUrl: blogCategoryImage(post.categorySlug),
        publishedAt: new Date(post.publishedAt),
      },
    });
    postCount++;
  }
  console.log(`Seeded ${postCount} blog posts.`);

  // --- Testimonials ---------------------------------------------------
  let testimonialCount = 0;
  for (const t of mockTestimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({
        data: { name: t.name, role: t.role, quote: t.quote, rating: t.rating, isFeatured: true },
      });
      testimonialCount++;
    }
  }
  console.log(`Seeded ${testimonialCount} testimonials.`);

  // --- First admin user (bootstrap only, never overwrites an existing password) ---
  // Always SUPER_ADMIN — this is the founder's account, the only one that
  // can invite/remove other admins.
  const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (bootstrapEmail && bootstrapPassword) {
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email: bootstrapEmail.toLowerCase() } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(bootstrapPassword, 12);
      await prisma.adminUser.create({
        data: { email: bootstrapEmail.toLowerCase(), passwordHash, name: "Okezie Collington", role: "SUPER_ADMIN" },
      });
      console.log(`Created admin user ${bootstrapEmail}.`);
    } else {
      if (existingAdmin.role !== "SUPER_ADMIN") {
        await prisma.adminUser.update({ where: { id: existingAdmin.id }, data: { role: "SUPER_ADMIN" } });
        console.log(`Promoted ${bootstrapEmail} to SUPER_ADMIN.`);
      } else {
        console.log("Admin user already exists, skipping.");
      }
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
