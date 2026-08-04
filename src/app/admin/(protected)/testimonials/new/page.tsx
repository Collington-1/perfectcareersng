import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/lib/actions/admin-testimonials";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="New Testimonial" />
      <TestimonialForm action={createTestimonial} submitLabel="Publish Testimonial" />
    </div>
  );
}
