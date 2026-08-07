"use client";

import { useActionState } from "react";
import { resetPassword, type ResetPasswordState } from "@/lib/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm({ token }: { token: string }) {
  const action = resetPassword.bind(null, token) as (
    prevState: ResetPasswordState,
    formData: FormData
  ) => Promise<ResetPasswordState>;
  const [state, formAction, pending] = useActionState(action, { status: "idle" });

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      {state.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">{state.message}</p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">New Password</Label>
        <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
        {pending ? "Saving..." : "Set New Password"}
      </Button>
    </form>
  );
}
