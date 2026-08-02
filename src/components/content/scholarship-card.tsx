import Link from "next/link";
import { GraduationCap, CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatDeadline } from "@/lib/format";
import type { MockScholarship } from "@/lib/mock-data";

export function ScholarshipCard({ scholarship }: { scholarship: MockScholarship }) {
  return (
    <Card className="p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/5">
      <Link href={`/scholarships/${scholarship.slug}`} className="group flex h-full flex-col gap-3 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <GraduationCap className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-secondary">
            {scholarship.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {scholarship.university} &middot; {scholarship.country}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-medium text-foreground">{scholarship.amount}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <CalendarClock className="size-3.5" />
            {formatDeadline(scholarship.deadline)}
          </span>
        </div>
      </Link>
    </Card>
  );
}
