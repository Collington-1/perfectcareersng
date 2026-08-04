import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { updateTestimonial } from "@/lib/actions/admin-testimonials";
import { prisma } from "@/lib/prisma";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${testimonial.name}`} />
      <TestimonialForm
        action={action}
        submitLabel="Save Changes"
        defaults={{
          name: testimonial.name,
          role: testimonial.role ?? "",
          company: testimonial.company ?? "",
          quote: testimonial.quote,
          rating: testimonial.rating ?? 5,
          isFeatured: testimonial.isFeatured,
        }}
      />
    </div>
  );
}
