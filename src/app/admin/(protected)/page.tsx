import Link from "next/link";
import { Briefcase, GraduationCap, HandCoins, Newspaper, Mail, MessageSquare, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const now = new Date();
  const soon = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [
    jobCount,
    scholarshipCount,
    grantCount,
    postCount,
    subscriberCount,
    unreadMessages,
    leadCount,
    expiringJobs,
    expiringScholarships,
    expiringGrants,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.scholarship.count(),
    prisma.grant.count(),
    prisma.blogPost.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.whatsAppLead.count(),
    prisma.job.count({ where: { expiresAt: { gte: now, lte: soon } } }),
    prisma.scholarship.count({ where: { expiresAt: { gte: now, lte: soon } } }),
    prisma.grant.count({ where: { expiresAt: { gte: now, lte: soon } } }),
  ]);
  const expiringSoon = expiringJobs + expiringScholarships + expiringGrants;

  const stats = [
    { label: "Jobs", value: jobCount, href: "/admin/jobs", icon: Briefcase },
    { label: "Scholarships", value: scholarshipCount, href: "/admin/scholarships", icon: GraduationCap },
    { label: "Grants", value: grantCount, href: "/admin/grants", icon: HandCoins },
    { label: "Blog Posts", value: postCount, href: "/admin/blog", icon: Newspaper },
    { label: "Newsletter Subscribers", value: subscriberCount, href: "/admin/newsletter", icon: Mail },
    { label: "Unread Messages", value: unreadMessages, href: "/admin/contact-messages", icon: MessageSquare },
    { label: "WhatsApp Leads", value: leadCount, href: "/admin/whatsapp-leads", icon: Users },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">A quick overview of everything on the site.</p>

      {expiringSoon > 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary/10 px-4 py-3 text-sm text-secondary">
          <Clock className="size-4 shrink-0" />
          <span>
            <strong>{expiringSoon}</strong> listing{expiringSoon === 1 ? "" : "s"} will auto-expire (30 days) within the next 7 days.
          </span>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="flex flex-row items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
