import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { jobCategories } from "@/lib/mock-data";
import { getAllJobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Job Categories in Nigeria | PerfectCareers",
  description: "Browse Nigerian job openings by industry — technology, banking & finance, oil & gas, healthcare, education and more.",
  alternates: { canonical: "/jobs/categories" },
};

export default async function JobCategoriesPage() {
  const jobs = await getAllJobs();
  return (
    <>
      <PageHero
        eyebrow="Browse by industry"
        title="Job Categories"
        description="Find roles organized by the industries actively hiring in Nigeria right now."
        breadcrumbs={[{ label: "Jobs", href: "/jobs" }, { label: "Categories" }]}
        icon={Briefcase}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobCategories.map((category) => {
              const count = jobs.filter((j) => j.category === category.label).length;
              return (
                <Card key={category.slug} className="p-0">
                  <Link
                    href={`/jobs?category=${category.slug}`}
                    className="group flex items-center justify-between gap-3 p-5 hover:text-primary"
                  >
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground group-hover:text-primary">{category.label}</p>
                      <p className="text-sm text-muted-foreground">{count} open role{count === 1 ? "" : "s"}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
