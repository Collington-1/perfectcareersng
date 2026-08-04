import Link from "next/link";
import { Search, Home, Briefcase } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-primary/10">
          <span className="font-heading text-3xl font-bold text-primary">404</span>
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">This page took a wrong turn</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist, may have moved, or the listing may have expired.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" /> Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/jobs">
              <Briefcase className="size-4" /> Browse Jobs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/search">
              <Search className="size-4" /> Search the Site
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
