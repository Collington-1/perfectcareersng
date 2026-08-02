import type { Config } from "@netlify/functions";

// Runs daily. Deletes jobs, scholarships and grants 30 days after they were
// published (expiresAt is set at creation time in the admin dashboard —
// see prisma/schema.prisma). No-ops safely until DATABASE_URL is set.
export default async () => {
  if (!process.env.DATABASE_URL) {
    console.log("expire-listings: DATABASE_URL not set yet, skipping.");
    return;
  }

  const { PrismaClient } = await import("../../src/generated/prisma/client");
  const { PrismaNeon } = await import("@prisma/adapter-neon");
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const now = new Date();
  const [jobs, scholarships, grants] = await Promise.all([
    prisma.job.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.scholarship.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.grant.deleteMany({ where: { expiresAt: { lt: now } } }),
  ]);

  console.log(
    `expire-listings: removed ${jobs.count} job(s), ${scholarships.count} scholarship(s), ${grants.count} grant(s)`
  );
};

export const config: Config = {
  schedule: "@daily",
};
