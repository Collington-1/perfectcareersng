"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const postSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  excerpt: z.string().min(10, "Excerpt is required."),
  categorySlug: z.string().min(1, "Choose a category."),
  authorSlug: z.string().min(1, "Choose an author."),
  tags: z.string().optional(),
  readingTimeMinutes: z.coerce.number().min(1).default(5),
  featuredImageUrl: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
  content: z.string().min(1, "Post content can't be empty."),
  contentHtml: z.string().min(1, "Post content can't be empty."),
});

export type AdminFormState = { status: "idle" | "error"; message?: string };

async function parseForm(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    excerpt: formData.get("excerpt"),
    categorySlug: formData.get("categorySlug"),
    authorSlug: formData.get("authorSlug"),
    tags: formData.get("tags") || undefined,
    readingTimeMinutes: formData.get("readingTimeMinutes") || 5,
    featuredImageUrl: formData.get("featuredImageUrl") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    content: formData.get("content"),
    contentHtml: formData.get("contentHtml"),
  };
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;

  const [category, author] = await Promise.all([
    prisma.category.findUnique({ where: { type_slug: { type: "BLOG", slug: parsed.data.categorySlug } } }),
    prisma.author.findUnique({ where: { slug: parsed.data.authorSlug } }),
  ]);
  if (!category) return { error: "Invalid category." } as const;
  if (!author) return { error: "Invalid author." } as const;

  const tagNames = (parsed.data.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const tagIds: string[] = [];
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { slug: slugify(name), name },
    });
    tagIds.push(tag.id);
  }

  return {
    data: parsed.data,
    categoryId: category.id,
    authorId: author.id,
    tagIds,
  } as const;
}

export async function createBlogPost(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  try {
    await prisma.blogPost.create({
      data: {
        title: result.data.title,
        slug: result.data.slug,
        excerpt: result.data.excerpt,
        content: JSON.parse(result.data.content),
        contentHtml: result.data.contentHtml,
        categoryId: result.categoryId,
        authorId: result.authorId,
        tags: { connect: result.tagIds.map((id) => ({ id })) },
        readingTimeMinutes: result.data.readingTimeMinutes,
        featuredImageUrl: result.data.featuredImageUrl || undefined,
        isFeatured: result.data.isFeatured,
        publishedAt: new Date(),
      },
    });
  } catch {
    return { status: "error", message: "A post with that slug already exists." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const result = await parseForm(formData);
  if ("error" in result) return { status: "error", message: result.error };

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title: result.data.title,
        slug: result.data.slug,
        excerpt: result.data.excerpt,
        content: JSON.parse(result.data.content),
        contentHtml: result.data.contentHtml,
        categoryId: result.categoryId,
        authorId: result.authorId,
        tags: { set: result.tagIds.map((id) => ({ id })) },
        readingTimeMinutes: result.data.readingTimeMinutes,
        featuredImageUrl: result.data.featuredImageUrl || undefined,
        isFeatured: result.data.isFeatured,
      },
    });
  } catch {
    return { status: "error", message: "A post with that slug already exists." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
