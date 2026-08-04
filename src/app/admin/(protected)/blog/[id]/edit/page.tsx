import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { updateBlogPost } from "@/lib/actions/admin-blog";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, authors] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id }, include: { author: true, category: true, tags: true } }),
    prisma.author.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  const action = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${post.title}`} />
      <BlogPostForm
        action={action}
        authors={authors}
        submitLabel="Save Changes"
        defaults={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          categorySlug: post.category.slug,
          authorSlug: post.author.slug,
          tags: post.tags.map((t) => t.name).join(", "),
          readingTimeMinutes: post.readingTimeMinutes,
          featuredImageUrl: post.featuredImageUrl ?? "",
          isFeatured: post.isFeatured,
          contentJson: post.content,
          contentHtml: post.contentHtml,
        }}
      />
    </div>
  );
}
