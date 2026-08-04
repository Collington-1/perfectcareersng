import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { deleteContactMessage, toggleMessageRead } from "@/lib/actions/admin-inboxes";
import { formatRelativeDate } from "@/lib/format";

export default async function AdminContactMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Contact Messages" description={`${messages.length} total`} />

      <div className="mt-6 flex flex-col gap-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl bg-white p-5 ring-1 ring-border">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-heading text-sm font-semibold text-foreground">{m.name}</p>
                  {!m.isRead && <Badge className="bg-primary/10 text-primary hover:bg-primary/10">New</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  {m.email} {m.phone && `· ${m.phone}`} · {formatRelativeDate(m.createdAt.toISOString())}
                </p>
                {m.subject && <p className="mt-1 text-xs font-medium text-secondary">{m.subject}</p>}
              </div>
              <div className="flex items-center gap-2">
                <form action={toggleMessageRead.bind(null, m.id, !m.isRead)}>
                  <button type="submit" className="text-xs font-semibold text-primary hover:underline">
                    Mark as {m.isRead ? "unread" : "read"}
                  </button>
                </form>
                <DeleteButton itemLabel={`message from ${m.name}`} action={deleteContactMessage.bind(null, m.id)} />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
      </div>
    </div>
  );
}
