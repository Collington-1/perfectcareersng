import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { popularCategories } from "@/lib/mock-data";

export function PopularCategories() {
  return (
    <section className="border-b border-border bg-white py-10">
      <Container>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Popular:</span>
          {popularCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              {category.label}
              <span className="text-xs text-muted-foreground group-hover:text-primary">
                {category.count}
              </span>
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
