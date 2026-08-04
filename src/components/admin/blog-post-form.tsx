"use client";

import { useActionState } from "react";
import { blogCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TiptapEditor } from "@/components/admin/tiptap-editor";

export type BlogPostFormDefaults = {
  title: string;
  slug: string;
  excerpt: string;
  categorySlug: string;
  authorSlug: string;
  tags: string;
  readingTimeMinutes: number;
  featuredImageUrl: string;
  isFeatured: boolean;
  contentJson?: unknown;
  contentHtml?: string;
};

const selectClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary";

export function BlogPostForm({
  action,
  defaults,
  authors,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  defaults?: Partial<BlogPostFormDefaults>;
  authors: { slug: string; name: string }[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="title">Post Title</Label>
          <Input id="title" name="title" required defaultValue={defaults?.title} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" name="slug" placeholder="auto-generated if left blank" defaultValue={defaults?.slug} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categorySlug">Category</Label>
          <select id="categorySlug" name="categorySlug" required defaultValue={defaults?.categorySlug} className={selectClass}>
            <option value="">Select a category</option>
            {blogCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="authorSlug">Author</Label>
          <select id="authorSlug" name="authorSlug" required defaultValue={defaults?.authorSlug} className={selectClass}>
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="readingTimeMinutes">Reading Time (minutes)</Label>
          <Input id="readingTimeMinutes" name="readingTimeMinutes" type="number" min={1} defaultValue={defaults?.readingTimeMinutes ?? 5} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" placeholder="CV Writing, Job Search" defaultValue={defaults?.tags} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
          <Input id="featuredImageUrl" name="featuredImageUrl" placeholder="defaults to the category image if left blank" defaultValue={defaults?.featuredImageUrl} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} required defaultValue={defaults?.excerpt} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Content</Label>
        <TiptapEditor initialJson={defaults?.contentJson} initialHtml={defaults?.contentHtml} />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults?.isFeatured} className="size-4 rounded border-border" />
        Feature this post
      </label>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
