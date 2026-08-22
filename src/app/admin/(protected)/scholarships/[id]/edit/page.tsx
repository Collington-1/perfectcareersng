import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ScholarshipForm } from "@/components/admin/scholarship-form";
import { updateScholarship } from "@/lib/actions/admin-scholarships";
import { prisma } from "@/lib/prisma";

export default async function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = await prisma.scholarship.findUnique({ where: { id }, include: { category: true } });
  if (!scholarship) notFound();

  const action = updateScholarship.bind(null, scholarship.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${scholarship.title}`} />
      <ScholarshipForm
        action={action}
        submitLabel="Save Changes"
        defaults={{
          title: scholarship.title,
          slug: scholarship.slug,
          categorySlug: scholarship.category.slug,
          customCategory: scholarship.customCategory ?? "",
          country: scholarship.country,
          university: scholarship.university,
          amount: scholarship.amount ?? "",
          fundingType: scholarship.fundingType ?? "",
          howToApply: scholarship.howToApply ?? "",
          officialUrl: scholarship.officialUrl,
          deadline: scholarship.deadline ? scholarship.deadline.toISOString().slice(0, 10) : "",
          isFeatured: scholarship.isFeatured,
          contentJson: scholarship.content,
          contentHtml: scholarship.contentHtml,
        }}
      />
    </div>
  );
}
