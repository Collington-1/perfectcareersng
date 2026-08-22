import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { JobForm } from "@/components/admin/job-form";
import { updateJob } from "@/lib/actions/admin-jobs";
import { prisma } from "@/lib/prisma";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id }, include: { company: true, category: true } });
  if (!job) notFound();

  const action = updateJob.bind(null, job.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${job.title}`} />
      <JobForm
        action={action}
        submitLabel="Save Changes"
        defaults={{
          title: job.title,
          slug: job.slug,
          company: job.company.name,
          categorySlug: job.category.slug,
          customCategory: job.customCategory ?? "",
          employmentType: job.employmentType,
          workMode: job.workMode,
          experienceLevel: job.experienceLevel ?? "",
          salary: job.salary ?? "",
          location: job.location,
          applicationUrl: job.applicationUrl,
          deadline: job.deadline ? job.deadline.toISOString().slice(0, 10) : "",
          isFeatured: job.isFeatured,
          contentJson: job.content,
          contentHtml: job.contentHtml,
        }}
      />
    </div>
  );
}
