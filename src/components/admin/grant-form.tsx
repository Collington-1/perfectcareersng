"use client";

import { useActionState, useState } from "react";
import { grantCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-grants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/admin/tiptap-editor";

export type GrantFormDefaults = {
  title: string;
  slug: string;
  categorySlug: string;
  customCategory: string;
  provider: string;
  fundingAmount: string;
  country: string;
  businessStage: string;
  applicationUrl: string;
  deadline: string;
  isFeatured: boolean;
  contentJson?: unknown;
  contentHtml?: string;
};

const selectClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary";

export function GrantForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  defaults?: Partial<GrantFormDefaults>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const [category, setCategory] = useState(defaults?.categorySlug ?? "");

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="title">Grant Title</Label>
          <Input id="title" name="title" required defaultValue={defaults?.title} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" name="slug" placeholder="auto-generated if left blank" defaultValue={defaults?.slug} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categorySlug">Industry Category</Label>
          <select
            id="categorySlug"
            name="categorySlug"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={selectClass}
          >
            <option value="">Select a category</option>
            {grantCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {category === "other" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customCategory">Custom Industry Name</Label>
            <Input id="customCategory" name="customCategory" required placeholder="e.g. Logistics" defaultValue={defaults?.customCategory} />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="provider">Provider</Label>
          <Input id="provider" name="provider" required defaultValue={defaults?.provider} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fundingAmount">Funding Amount</Label>
          <Input id="fundingAmount" name="fundingAmount" placeholder="e.g. ₦2,000,000" defaultValue={defaults?.fundingAmount} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" required defaultValue={defaults?.country ?? "Nigeria"} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="businessStage">Business Stage</Label>
          <Input id="businessStage" name="businessStage" placeholder="e.g. Early-stage" defaultValue={defaults?.businessStage} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" name="deadline" type="date" defaultValue={defaults?.deadline} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Description, Eligibility & Requirements</Label>
        <p className="text-xs text-muted-foreground">
          Use Heading 2/3 to create section titles (e.g. &ldquo;Eligibility&rdquo;) and Bold within the text.
        </p>
        <TiptapEditor initialJson={defaults?.contentJson} initialHtml={defaults?.contentHtml} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="applicationUrl">Application Link or Email</Label>
        <Input id="applicationUrl" name="applicationUrl" required placeholder="https://... or apply@org.com" defaultValue={defaults?.applicationUrl ?? "#"} />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults?.isFeatured} className="size-4 rounded border-border" />
        Feature this grant on the homepage
      </label>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
