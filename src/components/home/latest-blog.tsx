import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { BlogCard } from "@/components/content/blog-card";
import { getAllBlogPosts } from "@/lib/data";

export async function LatestBlog() {
  const posts = await getAllBlogPosts();
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Career resources"
          title="Advice that actually moves the needle"
          description="CV tips, LinkedIn strategy, remote work guidance and study-abroad advice — written by people who've done the hiring."
          cta={{ label: "Visit the blog", href: "/blog" }}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
