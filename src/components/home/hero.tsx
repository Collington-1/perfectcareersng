"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 5-slide rotation. Add the remaining ChatGPT-generated images to
// /public/images/ and list them here — the slider logic doesn't change.
const heroSlides = [
  { src: "/images/hero-professionals.png", alt: "Premium Nigerian professionals celebrating career success" },
];

const stats = [
  { value: "500+", label: "Live job openings" },
  { value: "80+", label: "Scholarships & grants" },
  { value: "10,000+", label: "Careers supported" },
  { value: "2,400+", label: "Successful placements" },
];

const SLIDE_DURATION = 5500;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden sm:min-h-[640px] lg:min-h-[760px]">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[index].src}
              alt={heroSlides[index].alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-primary/75" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/45" aria-hidden />
      </div>

      <Container className="relative flex flex-col items-center gap-6 py-16 text-center text-white sm:py-24">
        <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
          Nigeria&apos;s Premium Career Platform
        </span>
        <h1 className="max-w-3xl font-heading text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem]">
          Your next job, scholarship or grant starts <span className="text-secondary">right here.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/85">
          PerfectCareers curates verified jobs, scholarships, business grants and expert career guidance for
          ambitious Nigerians — plus the CV, LinkedIn and interview support to help you actually get chosen.
        </p>

        <form
          action="/jobs"
          method="get"
          className="mt-2 flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-2 px-3 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Job title, scholarship, or keyword"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="lg" className="shrink-0">
            Search
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/jobs">
              Browse Jobs <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15">
            <Link href="/services">Explore Career Services</Link>
          </Button>
        </div>

        <dl className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-4 border-t border-white/20 pt-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-heading text-2xl font-bold">{stat.value}</dd>
              <p className="mt-0.5 text-xs text-white/70">{stat.label}</p>
            </div>
          ))}
        </dl>

        {heroSlides.length > 1 && (
          <div className="mt-2 flex gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
