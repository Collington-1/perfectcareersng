"use client";

import { useActionState } from "react";
import { requestAdminAccess } from "@/lib/actions/admin-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function RequestAccessForm() {
  const [state, formAction, pending] = useActionState(requestAdminAccess, { status: "idle" });

  if (state.status === "success") {
    return <p className="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-center text-sm text-primary">{state.message}</p>;
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">{state.message}</p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Why do you need access? (optional)</Label>
        <Textarea id="message" name="message" rows={3} placeholder="e.g. Writing blog posts for the Career Advice section" />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
        {pending ? "Sending..." : "Request Access"}
      </Button>
    </form>
  );
}
