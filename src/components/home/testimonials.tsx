import { Star } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAllTestimonials } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function Testimonials() {
  const testimonials = await getAllTestimonials();
  return (
    <Section className="bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Success stories"
          title="Real people, real outcomes"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-border"
            >
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {initials(testimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
