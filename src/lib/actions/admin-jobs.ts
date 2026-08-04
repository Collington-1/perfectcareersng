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

const jobSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  company: z.string().min(2, "Company name is required."),
  categorySlug: z.string().min(1, "Choose a category."),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  workMode: z.enum(["ONSITE", "REMOTE", "HYBRID"]),
  experienceLevel: z.string().optional(),
  qualification: z.string().optional(),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  salaryCurrency: z.string().default("NGN"),
  country: z.string().min(2, "Country is required."),
  state: z.string().optional(),
  city: z.string().optional(),
  description: z.string().min(20, "Description should be a bit longer."),
  applicationUrl: z.string().min(1, "Application link is required."),
  deadline: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
});

export type AdminFormState = { status: "idle" | "error"; message?: string };

async function parseJobForm(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    company: formData.get("company"),
    categorySlug: formData.get("categorySlug"),
    employmentType: formData.get("employmentType"),
    workMode: formData.get("workMode"),
    experienceLevel: formData.get("experienceLevel") || undefined,
    qualification: formData.get("qualification") || undefined,
    salaryMin: formData.get("salaryMin") || undefined,
    salaryMax: formData.get("salaryMax") || undefined,
    salaryCurrency: formData.get("salaryCurrency") || "NGN",
    country: formData.get("country"),
    state: formData.get("state") || undefined,
    city: formData.get("city") || undefined,
    description: formData.get("description"),
    applicationUrl: formData.get("applicationUrl"),
    deadline: formData.get("deadline") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
  };
  const parsed = jobSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;

  const category = await prisma.category.findUnique({ where: { type_slug: { type: "JOB", slug: parsed.data.categorySlug } } });
  if (!category) return { error: "Invalid category." } as const;

  const companySlug = slugify(parsed.data.company);
  const company = await prisma.company.upsert({
    where: { slug: companySlug },
    update: {},
    create: { slug: companySlug, name: parsed.data.company },
  });

  return {
    data: parsed.data,
    categoryId: category.id,
    companyId: company.id,
    responsibilities: linesToArray(formData.get("responsibilities")),
    requirements: linesToArray(formData.get("requirements")),
  } as const;
}

export async function createJob(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseJobForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const publishedAt = new Date();
  const expiresAt = new Date(publishedAt.getTime() + 30 * 24 * 60 * 60 * 1000);

  try {
    await prisma.job.create({
      data: {
        title: result.data.title,
        slug: result.data.slug,
        description: result.data.description,
        companyId: result.companyId,
        categoryId: result.categoryId,
        employmentType: result.data.employmentType,
        workMode: result.data.workMode,
        experienceLevel: result.data.experienceLevel,
        qualification: result.data.qualification,
        salaryMin: result.data.salaryMin,
        salaryMax: result.data.salaryMax,
        salaryCurrency: result.data.salaryCurrency,
        country: result.data.country,
        state: result.data.state,
        city: result.data.city,
        responsibilities: result.responsibilities,
        requirements: result.requirements,
        applicationUrl: result.data.applicationUrl,
        featuredImageUrl: "/images/jobs-hub.png",
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
        publishedAt,
        expiresAt,
      },
    });
  } catch {
    return { status: "error", message: "A job with that slug already exists." };
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  redirect("/admin/jobs");
}

export async function updateJob(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseJobForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  try {
    await prisma.job.update({
      where: { id },
      data: {
        title: result.data.title,
        slug: result.data.slug,
        description: result.data.description,
        companyId: result.companyId,
        categoryId: result.categoryId,
        employmentType: result.data.employmentType,
        workMode: result.data.workMode,
        experienceLevel: result.data.experienceLevel,
        qualification: result.data.qualification,
        salaryMin: result.data.salaryMin,
        salaryMax: result.data.salaryMax,
        salaryCurrency: result.data.salaryCurrency,
        country: result.data.country,
        state: result.data.state,
        city: result.data.city,
        responsibilities: result.responsibilities,
        requirements: result.requirements,
        applicationUrl: result.data.applicationUrl,
        deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
        isFeatured: result.data.isFeatured,
      },
    });
  } catch {
    return { status: "error", message: "A job with that slug already exists." };
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
  await prisma.job.delete({ where: { id } });
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
}
