import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/prisma";
import { GrantsTable, AdminGrantRow } from "@/components/admin/grants-table";

export default async function AdminGrantsPage() {
  const grants = await prisma.grant.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  const formattedGrants: AdminGrantRow[] = grants.map((g) => ({
    id: g.id,
    title: g.title,
    slug: g.slug,
    isPublished: g.isPublished,
    publishedAt: g.publishedAt.toISOString(),
    provider: g.provider,
    industry: g.customCategory || g.category.name,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Grants"
        description={`${grants.length} listed`}
        newHref="/admin/grants/new"
        newLabel="New Grant"
      />
      <GrantsTable initialGrants={formattedGrants} />
    </div>
  );
}
