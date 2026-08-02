import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRelativeDate, formatSalary } from "@/lib/format";
import type { MockJob } from "@/lib/mock-data";

export function JobCard({ job }: { job: MockJob }) {
  return (
    <Card className="p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/jobs/${job.slug}`} className="group flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Briefcase className="size-5" />
          </div>
          <span className="text-xs text-muted-foreground">{formatRelativeDate(job.publishedAt)}</span>
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">{job.employmentType}</Badge>
          <Badge variant="outline">{job.workMode}</Badge>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-3.5" />
            {job.city === "Remote" ? "Remote" : `${job.city}, ${job.state}`}
          </span>
          <span className="font-medium text-foreground">
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
        </div>
      </Link>
    </Card>
  );
}
