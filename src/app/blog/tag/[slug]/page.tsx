import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag as TagIcon } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { BlogCard } from "@/components/content/blog-card";
import { mockBlogPosts } from "@/lib/mock-data";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  const tags = new Set(mockBlogPosts.flatMap((p) => p.tags.map(slugify)));
  return [...tags].map((slug) => ({ slug }));
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = mockBlogPosts.filter((p) => p.tags.some((t) => slugify(t) === slug));
  if (posts.length === 0) notFound();
  const tagLabel = posts[0].tags.find((t) => slugify(t) === slug)!;

  return (
    <>
      <PageHero
        eyebrow="Tag"
        title={`#${tagLabel}`}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: tagLabel }]}
        icon={TagIcon}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = mockBlogPosts.filter((p) => p.tags.some((t) => slugify(t) === slug));
  const tagLabel = posts[0]?.tags.find((t) => slugify(t) === slug) ?? slug;
  return { title: `#${tagLabel} — PerfectCareers Blog`, description: `Articles tagged ${tagLabel} on the PerfectCareers blog.`, alternates: { canonical: `/blog/tag/${slug}` } };
}
