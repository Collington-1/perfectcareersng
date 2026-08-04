import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteSubscriber } from "@/lib/actions/admin-inboxes";
import { formatDeadline } from "@/lib/format";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Newsletter Subscribers" description={`${subscribers.length} total`} />

      <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Subscribed</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-3 font-medium text-foreground">{s.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.isActive ? "Active" : "Unsubscribed"}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDeadline(s.subscribedAt.toISOString())}</td>
                <td className="px-5 py-3 text-right">
                  <DeleteButton itemLabel={s.email} action={deleteSubscriber.bind(null, s.id)} />
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
