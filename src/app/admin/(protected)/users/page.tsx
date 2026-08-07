import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { InviteAdminForm } from "@/components/admin/invite-admin-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { removeAdmin } from "@/lib/actions/admin-users";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") redirect("/admin");

  const admins = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="Admin Users & Access"
        description="You're the main admin. Invite others to help manage content, or remove access at any time."
      />

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
