import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { Trust } from "@/components/sections/Trust";
import { Pricing } from "@/components/sections/Pricing";
import { BookCall } from "@/components/sections/BookCall";
import { niches, getNiche } from "@/lib/niches";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { formatMetric } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(niches).map((niche) => ({ locale, niche })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; niche: string }>;
}): Promise<Metadata> {
  const { locale, niche } = await params;
  const n = getNiche(niche);
  if (!n) return {};
  const l = locale as Locale;
  return {
    title: n.hero.eyebrow[l],
    description: n.hero.subtitle[l],
    alternates: {
      canonical: `/${locale}/solutions/${niche}`,
      languages: {
        en: `/en/solutions/${niche}`,
        fr: `/fr/solutions/${niche}`,
      },
    },
    openGraph: {
      title: n.hero.eyebrow[l],
      description: n.hero.subtitle[l],
      url: `/${locale}/solutions/${niche}`,
    },
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ locale: string; niche: string }>;
}) {
  const { locale, niche } = await params;
  setRequestLocale(locale);
  const n = getNiche(niche);
  if (!n) notFound();
  const l = locale as Locale;
  const fr = l === "fr";

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="pb-16 pt-14 sm:pt-20 lg:pb-24">
        <div className="wrap">
          <Link
            href="/#industries"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {fr ? "Tous les métiers" : "All industries"}
          </Link>
          <p className="ts mt-10 text-note text-faint">{n.hero.eyebrow[l]}</p>
          <h1 className="mt-4 max-w-[18ch] font-display text-display font-normal text-ink">
            {n.hero.title[l]}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lead text-muted">
            {n.hero.subtitle[l]}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("accent", "lg")}
            >
              {fr ? "Réserver un audit gratuit" : "Book a free audit"}
              <ButtonArrow />
            </a>
            <a href="#automations" className="text-link text-[16px] text-ink">
              {fr ? "Voir les automatisations" : "See the automations"} ↓
            </a>
          </div>

          {/* Stats */}
          <dl className="sheet mt-14 grid grid-cols-2 md:grid-cols-4">
            {n.stats.map((st, i) => (
              <div
                key={st.label[l]}
                className={
                  "p-6" +
                  (i % 2 === 1 ? " border-l border-border" : "") +
                  (i >= 2 ? " border-t border-border md:border-t-0" : "") +
                  (i === 2 ? " md:border-l" : "")
                }
              >
                <dt className="sr-only">{st.label[l]}</dt>
                <dd>
                  <span className="figures block font-display text-[2.25rem] leading-none text-ink">
                    {formatMetric(st.value, l)}
                  </span>
                  <span className="mt-2 block text-sm text-muted">
                    {st.label[l]}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="ts mt-3 text-note text-faint">
            {fr
              ? "Ordres de grandeur indicatifs. Votre estimation est faite avec vos chiffres pendant l’audit."
              : "Indicative orders of magnitude. Your estimate is made with your own numbers during the audit."}
          </p>
        </div>
      </section>

      {/* Pains */}
      <section className="border-y border-border bg-bg-soft py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="font-display text-h2 font-normal text-ink lg:col-span-4">
            {fr
              ? "Là où votre activité perd de l’argent"
              : "Where your business is leaking money"}
          </h2>
          <ol className="border-b border-border lg:col-span-7 lg:col-start-6">
            {n.pains.map((p) => (
              <li key={p.title[l]} className="border-t border-border py-6">
                <h3 className="font-display text-[1.375rem] leading-snug text-ink">
                  {p.title[l]}
                </h3>
                <p className="mt-1.5 text-body text-muted">{p.text[l]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Automations */}
      <section id="automations" className="scroll-mt-20 py-20 lg:py-28">
        <div className="wrap">
          <h2 className="max-w-[24ch] font-display text-h2 font-normal text-ink">
            {fr
              ? "Les automatisations qui vous font gagner du chiffre"
              : "The automations that put money back in your pocket"}
          </h2>
          <ul className="sheet mt-12">
            {n.automations.map((a) => (
              <li
                key={a.title[l]}
                className="grid gap-x-8 gap-y-2 border-t border-border p-6 first:border-t-0 sm:p-7 lg:grid-cols-[1fr_1.2fr_14rem] lg:items-baseline"
              >
                <h3 className="font-display text-[1.375rem] leading-snug text-ink">
                  {a.title[l]}
                </h3>
                <p className="text-body text-muted">{a.text[l]}</p>
                <p className="ts text-sm text-ink lg:text-right">
                  {a.impact[l]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Trust />
      <Pricing />

      {/* Niche FAQ */}
      <section className="py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="font-display text-h2 font-normal text-ink lg:col-span-4">
            {fr ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>
          <dl className="lg:col-span-7 lg:col-start-6">
            {n.faq.map((it) => (
              <div key={it.q[l]} className="border-t border-border py-6">
                <dt className="font-display text-[1.25rem] leading-snug text-ink">
                  {it.q[l]}
                </dt>
                <dd className="mt-2 text-body text-muted">{it.a[l]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <BookCall />
    </div>
  );
}
