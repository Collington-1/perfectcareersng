"use client";

import { useActionState } from "react";
import { jobCategories } from "@/lib/mock-data";
import type { AdminFormState } from "@/lib/actions/admin-jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type JobFormDefaults = {
  title: string;
  slug: string;
  company: string;
  categorySlug: string;
  employmentType: string;
  workMode: string;
  experienceLevel: string;
  qualification: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  country: string;
  state: string;
  city: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicationUrl: string;
  deadline: string;
  isFeatured: boolean;
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
          <select id="categorySlug" name="categorySlug" required defaultValue={defaults?.categorySlug} className={selectClass}>
            <option value="">Select a category</option>
            {jobCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
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
          <Label htmlFor="qualification">Qualification</Label>
          <Input id="qualification" name="qualification" placeholder="e.g. B.Sc in a relevant field" defaultValue={defaults?.qualification} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="salaryMin">Salary Min (optional)</Label>
          <Input id="salaryMin" name="salaryMin" type="number" defaultValue={defaults?.salaryMin ?? undefined} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="salaryMax">Salary Max (optional)</Label>
          <Input id="salaryMax" name="salaryMax" type="number" defaultValue={defaults?.salaryMax ?? undefined} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="salaryCurrency">Currency</Label>
          <Input id="salaryCurrency" name="salaryCurrency" defaultValue={defaults?.salaryCurrency ?? "NGN"} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" required defaultValue={defaults?.country ?? "Nigeria"} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" defaultValue={defaults?.state} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={defaults?.city} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input id="deadline" name="deadline" type="date" defaultValue={defaults?.deadline} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} required defaultValue={defaults?.description} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
        <Textarea id="responsibilities" name="responsibilities" rows={4} defaultValue={defaults?.responsibilities?.join("\n")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="requirements">Requirements (one per line)</Label>
        <Textarea id="requirements" name="requirements" rows={4} defaultValue={defaults?.requirements?.join("\n")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="applicationUrl">Application Link</Label>
        <Input
          id="applicationUrl"
          name="applicationUrl"
          required
          placeholder="#apply-whatsapp or a real URL"
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
