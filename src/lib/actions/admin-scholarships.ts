"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const scholarshipSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  categorySlug: z.string().min(1, "Choose a destination category."),
  customCategory: z.string().optional(),
  country: z.string().min(2, "Country is required."),
  university: z.string().min(2, "University is required."),
  amount: z.string().optional(),
  fundingType: z.string().optional(),
  howToApply: z.string().optional(),
  officialUrl: z.string().min(1, "Official link is required."),
  deadline: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
  content: z.string().min(1, "Content can't be empty."),
  contentHtml: z.string().min(1, "Content can't be empty."),
});

export type AdminFormState = { status: "idle" | "error"; message?: string };

async function parseForm(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    categorySlug: formData.get("categorySlug"),
    customCategory: formData.get("categorySlug") === "other" ? formData.get("customCategory") || undefined : undefined,
    country: formData.get("country"),
    university: formData.get("university"),
    amount: formData.get("amount") || undefined,
    fundingType: formData.get("fundingType") || undefined,
    howToApply: formData.get("howToApply") || undefined,
    officialUrl: formData.get("officialUrl"),
    deadline: formData.get("deadline") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    content: formData.get("content"),
    contentHtml: formData.get("contentHtml"),
  };
  const parsed = scholarshipSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;

  const category = await prisma.category.findUnique({
    where: { type_slug: { type: "SCHOLARSHIP", slug: parsed.data.categorySlug } },
  });
  if (!category) return { error: "Invalid category." } as const;

  return { data: parsed.data, categoryId: category.id } as const;
}

export async function createScholarship(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const publishedAt = new Date();

  try {
    await prisma.scholarship.create({
      data: {
        title: result.data.title,
        slug: result.data.slug,
        content: JSON.parse(result.data.content),
        contentHtml: result.data.contentHtml,
        country: result.data.country,
        university: result.data.university,
        amount: result.data.amount,
        fundingType: result.data.fundingType,
        howToApply: result.data.howToApply,
        officialUrl: result.data.officialUrl,
        categoryId: result.categoryId,
        customCategory: result.data.customCategory,
        featuredImageUrl: "/images/scholarships-hub.png",
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
        publishedAt,
      },
    });
  } catch {
    return { status: "error", message: "A scholarship with that slug already exists." };
  }

  revalidatePath("/admin/scholarships");
  revalidatePath("/scholarships");
  revalidatePath("/");
  redirect("/admin/scholarships");
}

export async function updateScholarship(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  try {
    await prisma.scholarship.update({
      where: { id },
      data: {
        title: result.data.title,
        slug: result.data.slug,
        content: JSON.parse(result.data.content),
        contentHtml: result.data.contentHtml,
        country: result.data.country,
        university: result.data.university,
        amount: result.data.amount,
        fundingType: result.data.fundingType,
        howToApply: result.data.howToApply,
        officialUrl: result.data.officialUrl,
        categoryId: result.categoryId,
        customCategory: result.data.customCategory,
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
      },
    });
  } catch {
    return { status: "error", message: "A scholarship with that slug already exists." };
  }

  revalidatePath("/admin/scholarships");
  revalidatePath("/scholarships");
  revalidatePath("/");
  redirect("/admin/scholarships");
}

export async function deleteScholarship(id: string) {
  await prisma.scholarship.delete({ where: { id } });
  revalidatePath("/admin/scholarships");
  revalidatePath("/scholarships");
  revalidatePath("/");
}
