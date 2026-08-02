import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;

// While a page's ChatGPT-generated image is pending, `icon` renders a
// branded gradient panel instead — never a stock photo stand-in.
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  imageSrc,
  imageAlt,
  icon: Icon,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  imageSrc?: string;
  imageAlt?: string;
  icon?: IconComponent;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-b from-[#F9F5FA] to-white", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-primary/10 blur-3xl"
      />
      <Container
        className={cn(
          "relative grid gap-10 py-12 sm:py-16",
          imageSrc || Icon ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : ""
        )}
      >
        <div className={align === "center" && !imageSrc && !Icon ? "mx-auto max-w-2xl text-center" : ""}>
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && (
            <span className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {description && <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
        </div>

        {imageSrc ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted shadow-xl shadow-primary/10 ring-1 ring-border">
            <Image src={imageSrc} alt={imageAlt ?? title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        ) : Icon ? (
          <div className="relative hidden aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/20 lg:flex">
            <Icon className="size-24 text-white/25" strokeWidth={1.25} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
