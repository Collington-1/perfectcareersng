"use client";

import { useActionState } from "react";
import type { AdminFormState } from "@/lib/actions/admin-testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type TestimonialFormDefaults = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
};

export function TestimonialForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  defaults?: Partial<TestimonialFormDefaults>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });

  return (
    <form action={formAction} className="mt-6 flex max-w-xl flex-col gap-6">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required defaultValue={defaults?.name} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role">Role / Outcome</Label>
        <Input id="role" name="role" placeholder="e.g. Hired at a Lagos fintech" defaultValue={defaults?.role} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" name="company" defaultValue={defaults?.company} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="quote">Quote</Label>
        <Textarea id="quote" name="quote" rows={4} required defaultValue={defaults?.quote} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input id="rating" name="rating" type="number" min={1} max={5} defaultValue={defaults?.rating ?? 5} />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults?.isFeatured ?? true} className="size-4 rounded border-border" />
        Feature on the homepage
      </label>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
