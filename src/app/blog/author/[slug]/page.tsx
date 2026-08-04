import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogCard } from "@/components/content/blog-card";
import { getAllAuthors, getAllBlogPosts } from "@/lib/data";

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const author = authors.find((a) => a.slug === slug);
  if (!author) return {};
  return { title: `${author.name} — ${author.role} | PerfectCareers`, description: author.bio, alternates: { canonical: `/blog/author/${author.slug}` } };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [authors, allPosts] = await Promise.all([getAllAuthors(), getAllBlogPosts()]);
  const author = authors.find((a) => a.slug === slug);
  if (!author) notFound();

  const posts = allPosts.filter((p) => p.authorSlug === author.slug);

  return (
    <>
      <Section className="bg-gradient-to-b from-[#F9F5FA] to-white pb-8">
        <Container>
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: author.name }]} />
          <div className="mt-6 flex items-start gap-5">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              {author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{author.name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-secondary">
                <UserRound className="size-4" />
                {author.role}
              </p>
              <p className="mt-3 max-w-2xl text-muted-foreground">{author.bio}</p>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="pt-8">
        <Container>
          <h2 className="font-heading text-xl font-semibold text-foreground">Articles by {author.name}</h2>
          {posts.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-muted-foreground">No published articles yet.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
