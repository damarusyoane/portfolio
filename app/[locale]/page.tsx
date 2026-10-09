import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { NightStory } from "@/components/sections/NightStory";
import { Offers } from "@/components/sections/Offers";
import { Work } from "@/components/sections/Work";
import { Trust } from "@/components/sections/Trust";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { Faq, faqJsonLd } from "@/components/sections/Faq";
import { About } from "@/components/sections/About";
import { BookCall } from "@/components/sections/BookCall";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations({ locale, namespace: "Faq" });
  const faq = faqJsonLd(tFaq.raw("items") as { q: string; a: string }[]);

  return (
    <>
      {/* claim → cost → the night it happens → offers → proof → how → price → doubts → who → book */}
      <Hero />
      <Pains />
      <NightStory />
      <Offers />
      <Work />
      <Trust />
      <Process />
      <Industries />
      <Pricing />
      <Faq />
      <About />
      <BookCall />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
