import type { Metadata } from "next";
import Link from "next/link";
import { HandCoins, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Card } from "@/components/ui/card";
import { grantCategories } from "@/lib/mock-data";
import { getAllGrants } from "@/lib/data";

export const metadata: Metadata = {
  title: "Grant Categories by Industry | PerfectCareers",
  description: "Browse Nigerian business grants by industry — technology, agriculture, fashion, health, trade and renewable energy.",
  alternates: { canonical: "/grants/categories" },
};

export default async function GrantCategoriesPage() {
  const grants = await getAllGrants();
  return (
    <>
      <PageHero
        eyebrow="Browse by industry"
        title="Grant Categories"
        description="Find funding organized by the industries most active grant programmes support."
        breadcrumbs={[{ label: "Grants", href: "/grants" }, { label: "Categories" }]}
        icon={HandCoins}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grantCategories.map((category) => {
              const count = grants.filter((g) => g.industry.toLowerCase().includes(category.label.split(" ")[0].toLowerCase())).length;
              return (
                <Card key={category.slug} className="p-0">
                  <Link href={`/grants?industry=${category.slug}`} className="group flex items-center justify-between gap-3 p-5 hover:text-primary">
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground group-hover:text-primary">{category.label}</p>
                      <p className="text-sm text-muted-foreground">{count} grant{count === 1 ? "" : "s"}</p>
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
