"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().optional(),
  company: z.string().optional(),
  quote: z.string().min(10, "Quote should be a bit longer."),
  rating: z.coerce.number().min(1).max(5).default(5),
  isFeatured: z.coerce.boolean().default(false),
});

export type AdminFormState = { status: "idle" | "error"; message?: string };

function parse(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") || undefined,
    company: formData.get("company") || undefined,
    quote: formData.get("quote"),
    rating: formData.get("rating") || 5,
    isFeatured: formData.get("isFeatured") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;
  return { data: parsed.data } as const;
}

export async function createTestimonial(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = parse(formData);
  if ("error" in result) return { status: "error", message: result.error };

  await prisma.testimonial.create({ data: result.data });

  revalidatePath("/admin/testimonials");
  revalidatePath("/success-stories");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = parse(formData);
  if ("error" in result) return { status: "error", message: result.error };

  await prisma.testimonial.update({ where: { id }, data: result.data });

  revalidatePath("/admin/testimonials");
  revalidatePath("/success-stories");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/success-stories");
}
