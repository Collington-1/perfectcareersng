import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GrantForm } from "@/components/admin/grant-form";
import { updateGrant } from "@/lib/actions/admin-grants";
import { prisma } from "@/lib/prisma";

export default async function EditGrantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const grant = await prisma.grant.findUnique({ where: { id }, include: { category: true } });
  if (!grant) notFound();

  const action = updateGrant.bind(null, grant.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${grant.title}`} />
      <GrantForm
        action={action}
        submitLabel="Save Changes"
        defaults={{
          title: grant.title,
          slug: grant.slug,
          categorySlug: grant.category.slug,
          customCategory: grant.customCategory ?? "",
          provider: grant.provider,
          fundingAmount: grant.fundingAmount ?? "",
          country: grant.country,
          businessStage: grant.businessStage ?? "",
          applicationUrl: grant.applicationUrl,
          deadline: grant.deadline ? grant.deadline.toISOString().slice(0, 10) : "",
          isFeatured: grant.isFeatured,
          contentJson: grant.content,
          contentHtml: grant.contentHtml,
        }}
      />
    </div>
  );
}
