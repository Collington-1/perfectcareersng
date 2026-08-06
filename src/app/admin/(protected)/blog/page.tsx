import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "@/lib/actions/admin-blog";
import { formatRelativeDate } from "@/lib/format";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader title="Blog Posts" description={`${posts.length} published`} newHref="/admin/blog/new" newLabel="New Post" />

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-3 font-medium text-foreground">{post.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{post.author.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{post.category.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatRelativeDate(post.publishedAt.toISOString())}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      aria-label={`Edit ${post.title}`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton itemLabel={post.title} action={deleteBlogPost.bind(null, post.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
