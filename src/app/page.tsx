import { Hero } from "@/components/home/hero";
import { PopularCategories } from "@/components/home/popular-categories";
import { Opportunities } from "@/components/home/opportunities";
import { ServicesStrip } from "@/components/home/services-strip";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { EmployerCta } from "@/components/home/employer-cta";
import { Testimonials } from "@/components/home/testimonials";
import { LatestBlog } from "@/components/home/latest-blog";
import { Newsletter } from "@/components/home/newsletter";
import { Faq } from "@/components/home/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <Opportunities />
      <ServicesStrip />
      <WhyChooseUs />
      <EmployerCta />
      <Testimonials />
      <LatestBlog />
      <Newsletter />
      <Faq />
    </>
  );
}
