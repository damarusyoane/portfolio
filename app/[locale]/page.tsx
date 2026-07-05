import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { Outcomes } from "@/components/sections/Outcomes";
import { Trust } from "@/components/sections/Trust";
import { Offers } from "@/components/sections/Offers";
import { Pricing } from "@/components/sections/Pricing";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { BookCall } from "@/components/sections/BookCall";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts(locale as Locale).slice(0, 3);

  return (
    <>
      <Hero />
      <Pains />
      <Outcomes />
      <Trust />
      <Offers />
      <Industries />
      <Pricing />
      <Process />
      <Work />
      <BookCall />
      <About />
      <Faq />
      <LeadMagnet />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
