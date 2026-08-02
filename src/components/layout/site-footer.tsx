import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { footerColumns, legalLinks } from "@/lib/nav-links";
import { Container } from "@/components/layout/container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "X", href: siteConfig.social.twitter, icon: XIcon },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#201524] text-white/80">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-12">
          <div className="max-w-xs">
            <Link href="/" aria-label={`${siteConfig.name} home`}>
              <Image
                src={siteConfig.logo.reversed}
                alt={siteConfig.name}
                width={170}
                height={46}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-white/70">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-white">
                <span className="mt-0.5 inline-block size-4 shrink-0 rounded-full bg-[#25D366]" aria-hidden />
                WhatsApp: {siteConfig.contact.whatsapp}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-2 hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state},{" "}
                {siteConfig.contact.address.country}
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-secondary hover:text-white"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-sm font-semibold tracking-wide text-white">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName} ({siteConfig.rcNumber}). All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/80">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
