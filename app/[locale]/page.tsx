import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { Offers } from "@/components/sections/Offers";
import { Work } from "@/components/sections/Work";
import { Trust } from "@/components/sections/Trust";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { BookCall } from "@/components/sections/BookCall";
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
      {/* Hook → problem → solutions → proof → how → price → who → objections → act */}
      <Hero />
      <Pains />
      <Offers />
      <Work />
      <Trust />
      <Process />
      <Industries />
      <Pricing />
      <About />
      <Faq />
      <BookCall />
      <LeadMagnet />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
