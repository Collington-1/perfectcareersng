import Link from "next/link";
import { Pencil, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/lib/actions/admin-testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Testimonials" description={`${testimonials.length} total`} newHref="/admin/testimonials/new" newLabel="New Testimonial" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  aria-label={`Edit ${t.name}`}
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  <Pencil className="size-3.5" />
                </Link>
                <DeleteButton itemLabel={t.name} action={deleteTestimonial.bind(null, t.id)} />
              </div>
            </div>
            <p className="line-clamp-3 text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
            <div className="border-t border-border pt-3">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
            {!t.isFeatured && <span className="text-xs text-muted-foreground">Not featured on homepage</span>}
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-muted-foreground">No testimonials yet.</p>}
      </div>
    </div>
  );
}
