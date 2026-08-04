"use client";

import { useActionState } from "react";
import { scholarshipCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-scholarships";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ScholarshipFormDefaults = {
  title: string;
  slug: string;
  categorySlug: string;
  country: string;
  university: string;
  amount: string;
  fundingType: string;
  description: string;
  eligibility: string[];
  requirements: string[];
  documents: string[];
  howToApply: string;
  officialUrl: string;
  deadline: string;
  isFeatured: boolean;
};

const selectClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary";

export function ScholarshipForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  defaults?: Partial<ScholarshipFormDefaults>;
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
          <Label htmlFor="title">Scholarship Title</Label>
          <Input id="title" name="title" required defaultValue={defaults?.title} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" name="slug" placeholder="auto-generated if left blank" defaultValue={defaults?.slug} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categorySlug">Destination Category</Label>
          <select id="categorySlug" name="categorySlug" required defaultValue={defaults?.categorySlug} className={selectClass}>
            <option value="">Select a category</option>
            {scholarshipCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="university">University</Label>
          <Input id="university" name="university" required defaultValue={defaults?.university} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" required defaultValue={defaults?.country} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="amount" placeholder="e.g. Full tuition + stipend" defaultValue={defaults?.amount} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fundingType">Funding Type</Label>
          <select id="fundingType" name="fundingType" defaultValue={defaults?.fundingType ?? "Fully Funded"} className={selectClass}>
            <option value="Fully Funded">Fully Funded</option>
            <option value="Partial Funding">Partial Funding</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" name="deadline" type="date" defaultValue={defaults?.deadline} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="officialUrl">Official Link</Label>
          <Input id="officialUrl" name="officialUrl" required defaultValue={defaults?.officialUrl ?? "#"} />
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
        <Label htmlFor="documents">Documents Needed (one per line)</Label>
        <Textarea id="documents" name="documents" rows={3} defaultValue={defaults?.documents?.join("\n")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="howToApply">How to Apply</Label>
        <Textarea id="howToApply" name="howToApply" rows={3} defaultValue={defaults?.howToApply} />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults?.isFeatured} className="size-4 rounded border-border" />
        Feature this scholarship on the homepage
      </label>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
