import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteWhatsAppLead } from "@/lib/actions/admin-inboxes";
import { formatRelativeDate } from "@/lib/format";

export default async function AdminWhatsAppLeadsPage() {
  const leads = await prisma.whatsAppLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="WhatsApp Leads" description={`${leads.length} total`} />

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-5 py-3 font-medium text-foreground">{lead.name ?? "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{lead.phone ?? "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{lead.source ?? "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatRelativeDate(lead.createdAt.toISOString())}</td>
                <td className="px-5 py-3 text-right">
                  <DeleteButton itemLabel={lead.name ?? "this lead"} action={deleteWhatsAppLead.bind(null, lead.id)} />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No WhatsApp leads recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
