import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ScholarshipForm } from "@/components/admin/scholarship-form";
import { createScholarship } from "@/lib/actions/admin-scholarships";

export default function NewScholarshipPage() {
  return (
    <div>
      <AdminPageHeader title="New Scholarship" description="Publishes immediately and auto-expires in 30 days." />
      <ScholarshipForm action={createScholarship} submitLabel="Publish Scholarship" />
    </div>
  );
}
