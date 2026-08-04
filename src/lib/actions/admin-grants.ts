"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function linesToArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const grantSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  categorySlug: z.string().min(1, "Choose a category."),
  provider: z.string().min(2, "Provider is required."),
  fundingAmount: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().min(2, "Country is required."),
  businessStage: z.string().optional(),
  description: z.string().min(20, "Description should be a bit longer."),
  applicationUrl: z.string().min(1, "Application link is required."),
  deadline: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
});

export type AdminFormState = { status: "idle" | "error"; message?: string };

async function parseForm(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    categorySlug: formData.get("categorySlug"),
    provider: formData.get("provider"),
    fundingAmount: formData.get("fundingAmount") || undefined,
    industry: formData.get("industry") || undefined,
    country: formData.get("country"),
    businessStage: formData.get("businessStage") || undefined,
    description: formData.get("description"),
    applicationUrl: formData.get("applicationUrl"),
    deadline: formData.get("deadline") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
  };
  const parsed = grantSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;

  const category = await prisma.category.findUnique({
    where: { type_slug: { type: "GRANT", slug: parsed.data.categorySlug } },
  });
  if (!category) return { error: "Invalid category." } as const;

  return {
    data: parsed.data,
    categoryId: category.id,
    eligibility: linesToArray(formData.get("eligibility")),
    requirements: linesToArray(formData.get("requirements")),
  } as const;
}

export async function createGrant(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const publishedAt = new Date();
  const expiresAt = new Date(publishedAt.getTime() + 30 * 24 * 60 * 60 * 1000);

  try {
    await prisma.grant.create({
      data: {
        title: result.data.title,
        slug: result.data.slug,
        description: result.data.description,
        provider: result.data.provider,
        fundingAmount: result.data.fundingAmount,
        industry: result.data.industry,
        country: result.data.country,
        businessStage: result.data.businessStage,
        eligibility: result.eligibility,
        requirements: result.requirements,
        applicationUrl: result.data.applicationUrl,
        categoryId: result.categoryId,
        featuredImageUrl: "/images/grants-hub.png",
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
        publishedAt,
        expiresAt,
      },
    });
  } catch {
    return { status: "error", message: "A grant with that slug already exists." };
  }

  revalidatePath("/admin/grants");
  revalidatePath("/grants");
  redirect("/admin/grants");
}

export async function updateGrant(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  try {
    await prisma.grant.update({
      where: { id },
      data: {
        title: result.data.title,
        slug: result.data.slug,
        description: result.data.description,
        provider: result.data.provider,
        fundingAmount: result.data.fundingAmount,
        industry: result.data.industry,
        country: result.data.country,
        businessStage: result.data.businessStage,
        eligibility: result.eligibility,
        requirements: result.requirements,
        applicationUrl: result.data.applicationUrl,
        categoryId: result.categoryId,
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
      },
    });
  } catch {
    return { status: "error", message: "A grant with that slug already exists." };
  }

  revalidatePath("/admin/grants");
  revalidatePath("/grants");
  redirect("/admin/grants");
}

export async function deleteGrant(id: string) {
  await prisma.grant.delete({ where: { id } });
  revalidatePath("/admin/grants");
  revalidatePath("/grants");
}
