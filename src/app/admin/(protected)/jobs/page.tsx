import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteJob } from "@/lib/actions/admin-jobs";
import { formatDeadline } from "@/lib/format";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    include: { company: true, category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader title="Jobs" description={`${jobs.length} listed`} newHref="/admin/jobs/new" newLabel="New Job" />

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-5 py-3 font-medium text-foreground">{job.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.company.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.category.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.expiresAt ? formatDeadline(job.expiresAt.toISOString()) : "—"}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      aria-label={`Edit ${job.title}`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton itemLabel={job.title} action={deleteJob.bind(null, job.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
