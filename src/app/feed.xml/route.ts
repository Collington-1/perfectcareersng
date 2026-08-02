import { mockBlogPosts } from "@/lib/mock-data";
import { siteConfig } from "@/lib/site-config";

function escapeXml(text: string) {
  return text.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

export async function GET() {
  const items = mockBlogPosts
    .slice()
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.siteUrl}/blog/${post.slug}</link>
      <guid>${siteConfig.siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.siteUrl}/blog</link>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <language>en-ng</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
