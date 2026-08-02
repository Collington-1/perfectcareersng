import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <span className="text-xs font-semibold tracking-wider text-secondary uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-1.5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-muted-foreground">{description}</p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
