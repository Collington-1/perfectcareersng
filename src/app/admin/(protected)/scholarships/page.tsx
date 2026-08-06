import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteScholarship } from "@/lib/actions/admin-scholarships";
import { formatDeadline } from "@/lib/format";

export default async function AdminScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader title="Scholarships" description={`${scholarships.length} listed`} newHref="/admin/scholarships/new" newLabel="New Scholarship" />

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">University</th>
              <th className="px-5 py-3">Country</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {scholarships.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-3 font-medium text-foreground">{s.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.university}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.country}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.expiresAt ? formatDeadline(s.expiresAt.toISOString()) : "—"}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/scholarships/${s.id}/edit`}
                      aria-label={`Edit ${s.title}`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton itemLabel={s.title} action={deleteScholarship.bind(null, s.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {scholarships.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No scholarships yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
