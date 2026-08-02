import { Container, Section } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updatedAt}</p>
        <div className="prose prose-neutral mt-8 max-w-none">{children}</div>
      </Container>
    </Section>
  );
}
