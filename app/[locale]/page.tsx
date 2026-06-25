import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { AutomationCatalog } from "@/components/sections/AutomationCatalog";
import { Experience } from "@/components/sections/Experience";
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
      <About />
      <Skills />
      <Work />
      <AutomationCatalog />
      <Experience />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
