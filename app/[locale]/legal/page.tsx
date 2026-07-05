import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr" ? "Mentions légales" : "Legal Notice";
  return {
    title: `${title} — ${siteConfig.name}`,
    robots: { index: false, follow: true },
  };
}

type Section = { h: string; p: string[] };

const data: Record<Locale, { title: string; sections: Section[] }> = {
  en: {
    title: "Legal Notice",
    sections: [
      {
        h: "Publisher",
        p: [
          `This website is published by ${siteConfig.name}, independent AI & Automation engineer (Automation Studio).`,
          `Contact: ${siteConfig.email} · ${siteConfig.phone}`,
        ],
      },
      {
        h: "Hosting",
        p: [
          "This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          `All content on this site (text, design, code, graphics) is the property of ${siteConfig.name} unless stated otherwise, and may not be reused without permission.`,
        ],
      },
      {
        h: "Liability",
        p: [
          "Information on this site is provided for general purposes. Every engagement is scoped and quoted individually before any work begins.",
        ],
      },
    ],
  },
  fr: {
    title: "Mentions légales",
    sections: [
      {
        h: "Éditeur",
        p: [
          `Ce site est édité par ${siteConfig.name}, ingénieur IA & automatisation indépendant (Automation Studio).`,
          `Contact : ${siteConfig.email} · ${siteConfig.phone}`,
        ],
      },
      {
        h: "Hébergement",
        p: [
          "Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          `L'ensemble du contenu de ce site (textes, design, code, graphismes) est la propriété de ${siteConfig.name}, sauf mention contraire, et ne peut être réutilisé sans autorisation.`,
        ],
      },
      {
        h: "Responsabilité",
        p: [
          "Les informations de ce site sont fournies à titre général. Chaque prestation est cadrée et chiffrée individuellement avant tout démarrage.",
        ],
      },
    ],
  },
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const d = data[locale as Locale];

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          {d.title}
        </h1>
        <div className="prose-tech mt-8">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
