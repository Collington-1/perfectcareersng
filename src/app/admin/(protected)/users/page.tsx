import { redirect } from "next/navigation";
import { Check, X } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { InviteAdminForm } from "@/components/admin/invite-admin-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { removeAdmin, approveAccessRequest, denyAccessRequest } from "@/lib/actions/admin-users";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/format";

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") redirect("/admin");

  const [admins, pendingRequests] = await Promise.all([
    prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.adminAccessRequest.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Admin Users & Access"
        description="You're the main admin. Invite others to help manage content, approve access requests, or remove access at any time."
      />

      {pendingRequests.length > 0 && (
        <Card className="mt-6 border-secondary/30 p-5">
          <h2 className="font-heading text-sm font-semibold text-foreground">
            Pending Access Requests <Badge variant="outline" className="ml-1 align-middle">{pendingRequests.length}</Badge>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">People who asked for access via /admin/request-access.</p>
          <div className="mt-4 flex flex-col gap-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex flex-col gap-3 rounded-xl bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">
                    {req.name} <span className="font-normal text-muted-foreground">— {req.email}</span>
                  </p>
                  {req.message && <p className="mt-0.5 text-sm text-muted-foreground">&ldquo;{req.message}&rdquo;</p>}
                  <p className="mt-0.5 text-xs text-muted-foreground">Requested {formatRelativeDate(req.createdAt.toISOString())}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <form action={approveAccessRequest.bind(null, req.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
                    >
                      <Check className="size-4" /> Approve
                    </button>
                  </form>
                  <form action={denyAccessRequest.bind(null, req.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20"
                    >
                      <X className="size-4" /> Deny
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="mt-6 p-5">
        <h2 className="font-heading text-sm font-semibold text-foreground">Invite a New Admin</h2>
        <p className="mt-1 text-sm text-muted-foreground">They&apos;ll get an email with a link to set their own password.</p>
        <div className="mt-4">
          <InviteAdminForm />
        </div>
      </Card>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-5 py-3 font-medium text-foreground">{admin.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{admin.email}</td>
                <td className="px-5 py-3">
                  <Badge variant={admin.role === "SUPER_ADMIN" ? "default" : "outline"}>
                    {admin.role === "SUPER_ADMIN" ? "Main Admin" : "Admin"}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    {admin.id === session.user.id ? (
                      <span className="text-xs text-muted-foreground">You</span>
                    ) : (
                      <DeleteButton itemLabel={admin.name} action={removeAdmin.bind(null, admin.id)} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
