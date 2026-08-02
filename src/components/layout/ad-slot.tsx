import { cn } from "@/lib/utils";

// Reserved, CLS-safe ad placements. Fixed min-height prevents layout shift
// whether or not an ad fills the slot. Swap the inner div for real AdSense
// <ins> markup once the publisher ID is available — sizes/positions stay.
const sizes = {
  leaderboard: "min-h-[90px] max-w-[728px]",
  sidebar: "min-h-[250px] max-w-[300px]",
  "in-article": "min-h-[250px] max-w-[336px]",
  "mobile-sticky": "min-h-[50px] max-w-full",
  footer: "min-h-[90px] max-w-[728px]",
} as const;

export function AdSlot({
  type = "in-article",
  className,
}: {
  type?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto flex w-full items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/30 text-xs font-medium tracking-wide text-muted-foreground/60 uppercase",
        sizes[type],
        className
      )}
    >
      Advertisement
    </div>
  );
}
