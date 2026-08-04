import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { createBlogPost } from "@/lib/actions/admin-blog";
import { prisma } from "@/lib/prisma";

export default async function NewBlogPostPage() {
  const authors = await prisma.author.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <AdminPageHeader title="New Blog Post" description="Publishes immediately to the blog." />
      <BlogPostForm action={createBlogPost} authors={authors} submitLabel="Publish Post" />
    </div>
  );
}
