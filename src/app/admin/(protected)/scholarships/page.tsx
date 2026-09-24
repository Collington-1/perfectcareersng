import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/prisma";
import { ScholarshipsTable, AdminScholarshipRow } from "@/components/admin/scholarships-table";

export default async function AdminScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({
    orderBy: { publishedAt: "desc" },
  });

  const formattedScholarships: AdminScholarshipRow[] = scholarships.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    isPublished: s.isPublished,
    publishedAt: s.publishedAt.toISOString(),
    university: s.university,
    country: s.country,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Scholarships"
        description={`${scholarships.length} listed`}
        newHref="/admin/scholarships/new"
        newLabel="New Scholarship"
      />
      <ScholarshipsTable initialScholarships={formattedScholarships} />
    </div>
  );
}
