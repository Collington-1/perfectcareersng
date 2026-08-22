import Link from "next/link";
import { HandCoins, CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDeadline } from "@/lib/format";
import type { GrantView } from "@/lib/data";

export function GrantCard({ grant }: { grant: GrantView }) {
  return (
    <Card className="p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/grants/${grant.slug}`} className="group flex h-full flex-col gap-3 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HandCoins className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary">
            {grant.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{grant.provider}</p>
        </div>
        <Badge variant="outline" className="w-fit">{grant.industry}</Badge>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-medium text-foreground">{grant.fundingAmount}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <CalendarClock className="size-3.5" />
            {formatDeadline(grant.deadline)}
          </span>
        </div>
      </Link>
    </Card>
  );
}
