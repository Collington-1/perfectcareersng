import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GrantForm } from "@/components/admin/grant-form";
import { createGrant } from "@/lib/actions/admin-grants";

export default function NewGrantPage() {
  return (
    <div>
      <AdminPageHeader title="New Grant" description="Publishes immediately and auto-expires in 30 days." />
      <GrantForm action={createGrant} submitLabel="Publish Grant" />
    </div>
  );
}
