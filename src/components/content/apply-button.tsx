"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";

function resolveTarget(applicationUrl: string, whatsappMessage: string) {
  if (!applicationUrl || applicationUrl === "#apply-whatsapp") {
    return { kind: "whatsapp" as const, href: whatsappLink(whatsappMessage), display: "Chat with us on WhatsApp" };
  }
  if (applicationUrl.includes("@") && !applicationUrl.startsWith("http")) {
    return { kind: "email" as const, href: `mailto:${applicationUrl}`, display: applicationUrl };
  }
  return { kind: "link" as const, href: applicationUrl, display: applicationUrl };
}

// "Apply" reveals the actual destination (link, email, or WhatsApp) instead
// of navigating immediately — so applicants can see exactly where they're
// being sent before they click through.
export function ApplyButton({
  applicationUrl,
  whatsappMessage,
  label = "Apply Now",
}: {
  applicationUrl: string;
  whatsappMessage: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const target = resolveTarget(applicationUrl, whatsappMessage);
  const Icon = target.kind === "email" ? Mail : target.kind === "whatsapp" ? MessageCircle : ExternalLink;

  return (
    <div className="w-full">
      <Button type="button" size="lg" className="w-full" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {label}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open && (
        <a
          href={target.href}
          target={target.kind === "email" ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2.5 text-sm text-foreground hover:bg-muted"
        >
          <Icon className="size-4 shrink-0 text-primary" />
          <span className="truncate">{target.display}</span>
        </a>
      )}
    </div>
  );
}
