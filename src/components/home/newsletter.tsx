"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle" };

export function Newsletter() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-muted/60 px-8 py-14 text-center ring-1 ring-border sm:px-16">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <Mail className="size-6" />
          </div>
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Never miss an opportunity
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get the best new jobs, scholarships, grants and career tips delivered to your
              inbox weekly. No spam.
            </p>
          </div>
          <form action={formAction} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="h-11 flex-1 bg-white"
              aria-label="Email address"
            />
            <Button type="submit" size="lg" disabled={pending} className="shrink-0">
              {pending ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
          {state.message && (
            <p
              role="status"
              className={state.status === "success" ? "text-sm text-primary" : "text-sm text-destructive"}
            >
              {state.message}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
