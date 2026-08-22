"use client";

import { useActionState, useState } from "react";
import { jobCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/admin/tiptap-editor";

export type JobFormDefaults = {
  title: string;
  slug: string;
  company: string;
  categorySlug: string;
  customCategory: string;
  employmentType: string;
  workMode: string;
  experienceLevel: string;
  salary: string;
  location: string;
  applicationUrl: string;
  deadline: string;
  isFeatured: boolean;
  contentJson?: unknown;
  contentHtml?: string;
};

const selectClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary";

export function JobForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  defaults?: Partial<JobFormDefaults>;
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
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" required defaultValue={defaults?.title} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" name="slug" placeholder="auto-generated if left blank" defaultValue={defaults?.slug} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" name="company" required defaultValue={defaults?.company} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categorySlug">Category</Label>
          <select
            id="categorySlug"
            name="categorySlug"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={selectClass}
          >
            <option value="">Select a category</option>
            {jobCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {category === "other" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customCategory">Custom Category Name</Label>
            <Input id="customCategory" name="customCategory" required placeholder="e.g. Aviation" defaultValue={defaults?.customCategory} />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="employmentType">Employment Type</Label>
          <select id="employmentType" name="employmentType" required defaultValue={defaults?.employmentType ?? "FULL_TIME"} className={selectClass}>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="workMode">Work Mode</Label>
          <select id="workMode" name="workMode" required defaultValue={defaults?.workMode ?? "ONSITE"} className={selectClass}>
            <option value="ONSITE">Onsite</option>
            <option value="REMOTE">Remote</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Input id="experienceLevel" name="experienceLevel" placeholder="e.g. Mid-level (3-5 years)" defaultValue={defaults?.experienceLevel} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required placeholder="e.g. Lagos, Nigeria or Remote" defaultValue={defaults?.location} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="salary">Salary</Label>
          <Input id="salary" name="salary" placeholder="e.g. ₦500,000 - ₦800,000/month or Negotiable" defaultValue={defaults?.salary} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input id="deadline" name="deadline" type="date" defaultValue={defaults?.deadline} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Description, Qualifications, Requirements & Responsibilities</Label>
        <p className="text-xs text-muted-foreground">
          Use Heading 2/3 to create section titles (e.g. &ldquo;Requirements&rdquo;) and Bold within the text.
        </p>
        <TiptapEditor initialJson={defaults?.contentJson} initialHtml={defaults?.contentHtml} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="applicationUrl">Application Link or Email</Label>
        <Input
          id="applicationUrl"
          name="applicationUrl"
          required
          placeholder="https://... or apply@company.com — leave as #apply-whatsapp to use WhatsApp"
          defaultValue={defaults?.applicationUrl ?? "#apply-whatsapp"}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults?.isFeatured} className="size-4 rounded border-border" />
        Feature this job on the homepage
      </label>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
