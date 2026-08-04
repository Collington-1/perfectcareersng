import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newspaper } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { BlogCard } from "@/components/content/blog-card";
import { blogCategories } from "@/lib/mock-data";
import { getAllBlogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return { title: `${category.label} — Career Advice | PerfectCareers`, description: category.description, alternates: { canonical: `/blog/category/${category.slug}` } };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const allPosts = await getAllBlogPosts();
  const posts = allPosts.filter((p) => p.categorySlug === slug);

  return (
    <>
      <PageHero
        eyebrow="Career Advice"
        title={category.label}
        description={category.description}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: category.label }]}
        icon={Newspaper}
        imageSrc={category.image}
        imageAlt={category.label}
      />
      <Section className="pt-0">
        <Container>
          {posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No articles in this category yet — check back soon.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
