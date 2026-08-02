import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { AdSlot } from "@/components/layout/ad-slot";
import { BlogCard } from "@/components/content/blog-card";
import { Badge } from "@/components/ui/badge";
import { mockBlogPosts, blogCategories, blogCategoryImage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Career Advice & Blog — CV, LinkedIn, Interview & Study Abroad Tips | PerfectCareers",
  description:
    "Practical career advice for Nigerians: CV tips, LinkedIn strategy, interview prep, remote work, study abroad and scholarship guidance.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const posts = params.q
    ? mockBlogPosts.filter((p) => p.title.toLowerCase().includes(params.q!.toLowerCase()))
    : mockBlogPosts;

  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Career Advice"
        title="Advice That Actually Moves the Needle"
        description="CV tips, LinkedIn strategy, interview prep, remote work and study abroad guidance — written by people who've done the hiring."
        breadcrumbs={[{ label: "Blog" }]}
        icon={Newspaper}
        imageSrc="/images/blog-hub.png"
        imageAlt="Nigerian professional writing at a desk with a laptop and coffee"
      />

      <Section className="pt-0">
        <Container>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  {c.label}
                </Badge>
              </Link>
            ))}
          </div>

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative mt-8 flex flex-col gap-6 overflow-hidden rounded-3xl p-8 text-white sm:p-10 lg:flex-row lg:items-center"
            >
              <Image
                src={blogCategoryImage(featured.categorySlug)}
                alt={featured.category}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
              <div className="relative">
                <Badge className="bg-white/15 text-white hover:bg-white/15">{featured.category}</Badge>
                <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 max-w-2xl text-white/80">{featured.excerpt}</p>
                <p className="mt-4 text-sm text-white/70">
                  {featured.author} &middot; {featured.readingTimeMinutes} min read
                </p>
              </div>
            </Link>
          )}

          <AdSlot type="leaderboard" className="mt-10" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
