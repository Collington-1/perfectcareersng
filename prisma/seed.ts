// Seed skeleton — populated with the full 10/10/10/20 dummy content set in
// later milestones (Jobs/Scholarships/Grants, then Blog). Running this now
// just establishes the taxonomy so early pages have categories to link to.
import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const CATEGORY_SEED: { type: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG"; name: string; slug: string }[] = [
  { type: "JOB", name: "Technology", slug: "technology" },
  { type: "JOB", name: "Banking & Finance", slug: "banking-finance" },
  { type: "JOB", name: "Oil & Gas", slug: "oil-gas" },
  { type: "JOB", name: "Remote", slug: "remote" },
  { type: "SCHOLARSHIP", name: "Undergraduate", slug: "undergraduate" },
  { type: "SCHOLARSHIP", name: "Postgraduate", slug: "postgraduate" },
  { type: "GRANT", name: "Small Business", slug: "small-business" },
  { type: "GRANT", name: "Tech Startups", slug: "tech-startups" },
  { type: "BLOG", name: "CV Tips", slug: "cv-tips" },
  { type: "BLOG", name: "LinkedIn Tips", slug: "linkedin-tips" },
  { type: "BLOG", name: "Remote Work", slug: "remote-work" },
  { type: "BLOG", name: "Study Abroad", slug: "study-abroad" },
];

async function main() {
  for (const category of CATEGORY_SEED) {
    await prisma.category.upsert({
      where: { type_slug: { type: category.type, slug: category.slug } },
      update: {},
      create: category,
    });
  }
  console.log(`Seeded ${CATEGORY_SEED.length} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
