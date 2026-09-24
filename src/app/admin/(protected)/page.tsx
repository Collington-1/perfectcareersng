import Link from "next/link";
import { Briefcase, GraduationCap, HandCoins, Newspaper, Mail, MessageSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getOpportunityAnalytics } from "@/lib/analytics-data";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";

export default async function AdminDashboardPage() {
  const [
    jobCount,
    scholarshipCount,
    grantCount,
    postCount,
    subscriberCount,
    unreadMessages,
    leadCount,
    analyticsData,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.scholarship.count(),
    prisma.grant.count(),
    prisma.blogPost.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.whatsAppLead.count(),
    getOpportunityAnalytics(),
  ]);

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
    <div className="pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">A quick overview of website content and audience engagement.</p>
      </div>

      {/* Content Counts Overview */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Rich Opportunity Analytics Section */}
      <AnalyticsDashboard
        overview={analyticsData.overview}
        topOpportunities={analyticsData.topOpportunities}
        topCountries={analyticsData.topCountries}
        topCities={analyticsData.topCities}
        typeDistribution={analyticsData.typeDistribution}
        recentActivity={analyticsData.recentActivity}
      />
    </div>
  );
}
