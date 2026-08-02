import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { scholarshipCategories, mockScholarships } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Scholarship Categories by Country | PerfectCareers",
  description: "Browse scholarships for Nigerian students by destination country — UK, US, Canada, Europe, Asia Pacific and Nigeria.",
  alternates: { canonical: "/scholarships/categories" },
};

const countryGroups: Record<string, string[]> = {
  "united-kingdom": ["United Kingdom"],
  "united-states": ["United States"],
  canada: ["Canada"],
  europe: ["Germany", "Ireland", "Netherlands"],
  "asia-pacific": ["Australia", "Japan"],
  nigeria: ["Nigeria"],
};

export default function ScholarshipCategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Browse by destination"
        title="Scholarship Categories"
        description="Find scholarships organized by where you want to study."
        breadcrumbs={[{ label: "Scholarships", href: "/scholarships" }, { label: "Categories" }]}
        icon={GraduationCap}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scholarshipCategories.map((category) => {
              const countries = countryGroups[category.slug] ?? [];
              const count = mockScholarships.filter((s) => countries.includes(s.country)).length;
              return (
                <Card key={category.slug} className="p-0">
                  <Link href={`/scholarships?country=${category.slug}`} className="group flex items-center justify-between gap-3 p-5 hover:text-secondary">
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground group-hover:text-secondary">{category.label}</p>
                      <p className="text-sm text-muted-foreground">{count} scholarship{count === 1 ? "" : "s"}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-secondary" />
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
