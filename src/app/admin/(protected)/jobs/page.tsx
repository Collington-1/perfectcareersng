import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/prisma";
import { JobsTable, AdminJobRow } from "@/components/admin/jobs-table";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    include: { company: true, category: true },
    orderBy: { publishedAt: "desc" },
  });

  const formattedJobs: AdminJobRow[] = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    slug: j.slug,
    isPublished: j.isPublished,
    publishedAt: j.publishedAt.toISOString(),
    company: { name: j.company.name },
    category: { name: j.customCategory || j.category.name },
  }));

  return (
    <div>
      <AdminPageHeader
        title="Jobs"
        description={`${jobs.length} listed`}
        newHref="/admin/jobs/new"
        newLabel="New Job"
      />
      <JobsTable initialJobs={formattedJobs} />
    </div>
  );
}
