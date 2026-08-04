import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobCard } from "@/components/content/job-card";
import { ScholarshipCard } from "@/components/content/scholarship-card";
import { GrantCard } from "@/components/content/grant-card";
import { getAllJobs, getAllGrants, getAllScholarships } from "@/lib/data";

export async function Opportunities() {
  const [jobs, scholarships, grants] = await Promise.all([getAllJobs(), getAllScholarships(), getAllGrants()]);
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Fresh opportunities"
          title="Trending jobs, scholarships & grants"
          description="Hand-reviewed listings updated daily — from Lagos fintech roles to fully-funded UK master's programmes."
        />

        <Tabs defaultValue="jobs" className="mt-10">
          <TabsList className="h-auto rounded-full bg-muted p-1">
            <TabsTrigger value="jobs" className="rounded-full px-5 py-2">
              Jobs
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="rounded-full px-5 py-2">
              Scholarships
            </TabsTrigger>
            <TabsTrigger value="grants" className="rounded-full px-5 py-2">
              Grants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </TabsContent>
          <TabsContent value="scholarships" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scholarships.slice(0, 6).map((scholarship) => (
              <ScholarshipCard key={scholarship.slug} scholarship={scholarship} />
            ))}
          </TabsContent>
          <TabsContent value="grants" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {grants.slice(0, 6).map((grant) => (
              <GrantCard key={grant.slug} grant={grant} />
            ))}
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}
