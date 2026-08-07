"use client";

import { useActionState, useRef, useEffect } from "react";
import { inviteAdmin } from "@/lib/actions/admin-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InviteAdminForm() {
  const [state, formAction, pending] = useActionState(inviteAdmin, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Their full name" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="them@example.com" />
      </div>
      <Button type="submit" disabled={pending} className="shrink-0">
        {pending ? "Sending..." : "Send Invite"}
      </Button>
      {state.status !== "idle" && (
        <p className={`text-sm sm:basis-full ${state.status === "error" ? "text-destructive" : "text-primary"}`}>{state.message}</p>
      )}
    </form>
  );
}
