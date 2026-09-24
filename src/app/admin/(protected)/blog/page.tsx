import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/prisma";
import { BlogTable, AdminBlogPostRow } from "@/components/admin/blog-table";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" },
  });

  const formattedPosts: AdminBlogPostRow[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    isPublished: p.isPublished,
    publishedAt: p.publishedAt.toISOString(),
    author: { name: p.author.name },
    category: { name: p.category.name },
  }));

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description={`${posts.length} published`}
        newHref="/admin/blog/new"
        newLabel="New Post"
      />
      <BlogTable initialPosts={formattedPosts} />
    </div>
  );
}
