import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Consultation } from "@/components/sections/Consultation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Project Consultation & Assessment",
    description:
      "Submit a structured consultation request before booking a call — project requirements, current tools, automation opportunities, and next steps.",
  },
  fr: {
    title: "Consultation & évaluation de projet",
    description:
      "Soumettez une demande de consultation structurée avant de réserver un appel — besoins du projet, outils actuels, opportunités d'automatisation et prochaines étapes.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = metaByLocale[locale as Locale];
  return {
    title: `${m.title} — ${siteConfig.name}`,
    description: m.description,
    alternates: {
      canonical: `/${locale}/consultation`,
      languages: { en: "/en/consultation", fr: "/fr/consultation" },
    },
  };
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Consultation />;
}
