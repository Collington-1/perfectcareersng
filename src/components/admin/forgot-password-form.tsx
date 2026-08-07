"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, { status: "idle" });

  if (state.status === "success") {
    return <p className="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-center text-sm text-primary">{state.message}</p>;
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">{state.message}</p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@perfectcareersng.com" />
      </div>
      <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
        {pending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
