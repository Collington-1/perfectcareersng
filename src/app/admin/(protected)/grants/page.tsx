import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteGrant } from "@/lib/actions/admin-grants";
import { formatDeadline } from "@/lib/format";

export default async function AdminGrantsPage() {
  const grants = await prisma.grant.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader title="Grants" description={`${grants.length} listed`} newHref="/admin/grants/new" newLabel="New Grant" />

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Provider</th>
              <th className="px-5 py-3">Industry</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {grants.map((g) => (
              <tr key={g.id}>
                <td className="px-5 py-3 font-medium text-foreground">{g.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{g.provider}</td>
                <td className="px-5 py-3 text-muted-foreground">{g.industry}</td>
                <td className="px-5 py-3 text-muted-foreground">{g.expiresAt ? formatDeadline(g.expiresAt.toISOString()) : "—"}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/grants/${g.id}/edit`}
                      aria-label={`Edit ${g.title}`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton itemLabel={g.title} action={deleteGrant.bind(null, g.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {grants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No grants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
