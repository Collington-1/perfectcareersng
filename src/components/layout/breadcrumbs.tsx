import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", item: siteConfig.siteUrl }, ...items.map((i) => ({ name: i.label, item: i.href ? `${siteConfig.siteUrl}${i.href}` : undefined }))].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(item.item ? { item: item.item } : {}),
      })
    ),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/" className="flex items-center gap-1 hover:text-primary" aria-label="Home">
        <Home className="size-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 shrink-0" />
          {item.href && index !== items.length - 1 ? (
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
