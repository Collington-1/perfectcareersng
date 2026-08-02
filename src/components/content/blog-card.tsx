import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/format";
import { blogCategoryImage, type MockBlogPost } from "@/lib/mock-data";

export function BlogCard({ post }: { post: MockBlogPost }) {
  return (
    <Card className="p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/5">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-3 p-5">
        <div className="relative -mx-5 -mt-5 aspect-video overflow-hidden">
          <Image
            src={blogCategoryImage(post.categorySlug)}
            alt={post.category}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, 90vw"
          />
        </div>
        <Badge className="w-fit bg-secondary/10 text-secondary hover:bg-secondary/10">{post.category}</Badge>
        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-secondary">
          {post.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTimeMinutes} min read &middot; {formatRelativeDate(post.publishedAt)}
          </span>
        </div>
      </Link>
    </Card>
  );
}
