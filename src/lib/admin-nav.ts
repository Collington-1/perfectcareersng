import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  HandCoins,
  Newspaper,
  Star,
  Mail,
  MessageSquare,
  Users,
  ShieldCheck,
} from "lucide-react";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; superAdminOnly?: boolean };

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Scholarships", href: "/admin/scholarships", icon: GraduationCap },
  { label: "Grants", href: "/admin/grants", icon: HandCoins },
  { label: "Blog Posts", href: "/admin/blog", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Newsletter Subscribers", href: "/admin/newsletter", icon: Mail },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquare },
  { label: "WhatsApp Leads", href: "/admin/whatsapp-leads", icon: Users },
  { label: "Admin Users & Access", href: "/admin/users", icon: ShieldCheck, superAdminOnly: true },
];
