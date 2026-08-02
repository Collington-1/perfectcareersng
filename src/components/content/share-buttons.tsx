import { FacebookIcon, XIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { MessageCircle } from "lucide-react";

export function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = `${siteConfig.siteUrl}${path}`;
  const links = [
    { label: "WhatsApp", href: whatsappLink(`${title} — ${url}`), icon: MessageCircle, color: "hover:bg-[#25D366]/10 hover:text-[#25D366]" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: FacebookIcon, color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]" },
    { label: "X", href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, icon: XIcon, color: "hover:bg-foreground/10" },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: LinkedInIcon, color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className={`flex size-8 items-center justify-center rounded-full text-muted-foreground ring-1 ring-border transition-colors ${link.color}`}
        >
          <link.icon className="size-3.5" />
        </a>
      ))}
    </div>
  );
}
