"use client";

import { useActionState } from "react";
import { grantCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-grants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type GrantFormDefaults = {
  title: string;
  slug: string;
  categorySlug: string;
  provider: string;
  fundingAmount: string;
  industry: string;
  country: string;
  businessStage: string;
  description: string;
  eligibility: string[];
  requirements: string[];
  applicationUrl: string;
  deadline: string;
  isFeatured: boolean;
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
          <select id="categorySlug" name="categorySlug" required defaultValue={defaults?.categorySlug} className={selectClass}>
            <option value="">Select a category</option>
            {grantCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="provider">Provider</Label>
          <Input id="provider" name="provider" required defaultValue={defaults?.provider} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fundingAmount">Funding Amount</Label>
          <Input id="fundingAmount" name="fundingAmount" placeholder="e.g. ₦2,000,000" defaultValue={defaults?.fundingAmount} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="industry">Industry Label</Label>
          <Input id="industry" name="industry" placeholder="e.g. Women-led Business" defaultValue={defaults?.industry} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" required defaultValue={defaults?.country ?? "Nigeria"} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="businessStage">Business Stage</Label>
          <Input id="businessStage" name="businessStage" placeholder="e.g. Early-stage" defaultValue={defaults?.businessStage} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" name="deadline" type="date" defaultValue={defaults?.deadline} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} required defaultValue={defaults?.description} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="eligibility">Eligibility (one per line)</Label>
        <Textarea id="eligibility" name="eligibility" rows={4} defaultValue={defaults?.eligibility?.join("\n")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="requirements">Requirements (one per line)</Label>
        <Textarea id="requirements" name="requirements" rows={3} defaultValue={defaults?.requirements?.join("\n")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="applicationUrl">Application Link</Label>
        <Input id="applicationUrl" name="applicationUrl" required defaultValue={defaults?.applicationUrl ?? "#"} />
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
