import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { mockJobs, mockScholarships, mockGrants, mockBlogPosts, mockAuthors, jobCategories, scholarshipCategories, grantCategories, blogCategories } from "@/lib/mock-data";
import { services } from "@/lib/services-data";

const staticRoutes = [
  "",
  "/jobs",
  "/jobs/categories",
  "/scholarships",
  "/scholarships/categories",
  "/grants",
  "/grants/categories",
  "/blog",
  "/services",
  "/study-abroad",
  "/about",
  "/our-process",
  "/success-stories",
  "/partners",
  "/contact",
  "/advertise",
  "/employers/post-a-job",
  "/pricing",
  "/faqs",
  "/newsletter",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/cookie-policy",
  "/editorial-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${siteConfig.siteUrl}${path}`;

  return [
    ...staticRoutes.map((path) => ({ url: url(path), lastModified: now })),
    ...mockJobs.map((j) => ({ url: url(`/jobs/${j.slug}`), lastModified: new Date(j.publishedAt) })),
    ...mockScholarships.map((s) => ({ url: url(`/scholarships/${s.slug}`), lastModified: new Date(s.publishedAt) })),
    ...mockGrants.map((g) => ({ url: url(`/grants/${g.slug}`), lastModified: new Date(g.publishedAt) })),
    ...mockBlogPosts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: new Date(p.publishedAt) })),
    ...mockAuthors.map((a) => ({ url: url(`/blog/author/${a.slug}`), lastModified: now })),
    ...jobCategories.map((c) => ({ url: url(`/jobs?category=${c.slug}`), lastModified: now })),
    ...scholarshipCategories.map((c) => ({ url: url(`/scholarships?country=${c.slug}`), lastModified: now })),
    ...grantCategories.map((c) => ({ url: url(`/grants?industry=${c.slug}`), lastModified: now })),
    ...blogCategories.map((c) => ({ url: url(`/blog/category/${c.slug}`), lastModified: now })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), lastModified: now })),
  ];
}
