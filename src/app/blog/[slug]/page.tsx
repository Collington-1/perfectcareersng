import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AdSlot } from "@/components/layout/ad-slot";
import { ShareButtons } from "@/components/content/share-buttons";
import { BlogCard } from "@/components/content/blog-card";
import { Badge } from "@/components/ui/badge";
import { formatDeadline } from "@/lib/format";
import { blogCategoryImage } from "@/lib/mock-data";
import { getAllBlogPosts, getAllAuthors } from "@/lib/data";
import { extractHeadings, injectHeadingIds } from "@/lib/toc";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | PerfectCareers Blog`, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [posts, authors] = await Promise.all([getAllBlogPosts(), getAllAuthors()]);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const author = authors.find((a) => a.slug === post.authorSlug);
  const headings = extractHeadings(post.contentHtml);
  const html = injectHeadingIds(post.contentHtml);
  const related = posts.filter((p) => p.slug !== post.slug && p.categorySlug === post.categorySlug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: author ? { "@type": "Person", name: author.name } : undefined,
    publisher: { "@type": "Organization", name: "PerfectCareers" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section className="pb-0">
        <Container className="max-w-4xl">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.category, href: `/blog/category/${post.categorySlug}` }, { label: post.title }]} />

          <Link href={`/blog/category/${post.categorySlug}`}>
            <Badge className="mt-5 bg-secondary/10 text-secondary hover:bg-secondary/10">{post.category}</Badge>
          </Link>
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold text-foreground sm:text-4xl">{post.title}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
            {author && (
              <Link href={`/blog/author/${author.slug}`} className="font-medium text-foreground hover:text-primary">
                {author.name}
              </Link>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formatDeadline(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readingTimeMinutes} min read
            </span>
          </div>
        </Container>
      </Section>

      <Section className="pt-8 pb-0">
        <Container className="max-w-4xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-muted shadow-lg shadow-black/5">
            <Image src={blogCategoryImage(post.categorySlug)} alt={post.category} fill priority className="object-cover" sizes="(min-width: 1024px) 60vw, 90vw" />
          </div>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container className="max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0">
              <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: html }} />

              <div className="mt-8 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <AdSlot type="in-article" className="mt-10" />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <ShareButtons path={`/blog/${post.slug}`} title={post.title} />
              </div>

              {author && (
                <Link
                  href={`/blog/author/${author.slug}`}
                  className="mt-10 flex items-start gap-4 rounded-2xl bg-muted/40 p-6 hover:bg-muted/60"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {author.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-heading text-base font-semibold text-foreground">{author.name}</p>
                    <p className="text-xs font-medium text-secondary">{author.role}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{author.bio}</p>
                  </div>
                </Link>
              )}
            </div>

            <aside className="hidden lg:block">
              {headings.length > 0 && (
                <nav className="sticky top-24 rounded-2xl bg-muted/40 p-5 text-sm">
                  <p className="font-heading text-xs font-semibold tracking-wide text-foreground uppercase">On this page</p>
                  <ul className="mt-3 space-y-2">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-muted-foreground hover:text-primary">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container>
            <h2 className="font-heading text-2xl font-bold text-foreground">More in {post.category}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
