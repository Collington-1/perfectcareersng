import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { JobForm } from "@/components/admin/job-form";
import { createJob } from "@/lib/actions/admin-jobs";

export default function NewJobPage() {
  return (
    <div>
      <AdminPageHeader title="New Job" description="Publishes immediately and auto-expires in 30 days." />
      <JobForm action={createJob} submitLabel="Publish Job" />
    </div>
  );
}
