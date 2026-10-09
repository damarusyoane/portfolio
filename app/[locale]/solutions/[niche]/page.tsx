import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  ShoppingCart,
  Star,
  Headset,
  RefreshCw,
  Undo2,
  Repeat,
  ArrowLeft,
  Check,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/SectionHeading";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { Trust } from "@/components/sections/Trust";
import { Pricing } from "@/components/sections/Pricing";
import { BookCall } from "@/components/sections/BookCall";
import { niches, getNiche } from "@/lib/niches";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { accentColor, accentTint, formatMetric } from "@/lib/utils";

const autoIcons: LucideIcon[] = [
  ShoppingCart,
  Headset,
  Star,
  RefreshCw,
  Undo2,
  Repeat,
];

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
  const accent = accentColor(n.accent);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div
          className="paper-grain pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <Link
              href="/#industries"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              {l === "fr" ? "Tous les secteurs" : "All industries"}
            </Link>
            <p className="mt-8 text-sm font-medium" style={{ color: accent }}>
              {n.hero.eyebrow[l]}
            </p>
            <h1 className="mt-4 font-display text-[2.5rem] font-normal leading-[1.04] tracking-[-0.025em] text-ink sm:text-6xl">
              {n.hero.title[l]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {n.hero.subtitle[l]}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.links.cal}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "lg")}
              >
                {l === "fr" ? "Réserver un audit gratuit" : "Book a free audit"}
                <ButtonArrow />
              </a>
              <a href="#automations" className={buttonClass("secondary", "lg")}>
                {l === "fr"
                  ? "Voir les automatisations"
                  : "See the automations"}
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal className="mt-14">
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-4">
              {n.stats.map((st, i) => (
                <div
                  key={st.label[l]}
                  className={
                    "p-6 sm:p-7" +
                    (i % 2 === 1 ? " border-l border-border" : "") +
                    (i >= 2 ? " border-t border-border md:border-t-0" : "") +
                    (i === 2 ? " md:border-l" : "")
                  }
                >
                  <p className="font-display text-3xl font-normal tracking-[-0.02em] text-ink sm:text-4xl">
                    {formatMetric(st.value, l)}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted">
                    {st.label[l]}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pains */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>{l === "fr" ? "Le constat" : "The problem"}</Kicker>
            <h2 className="mt-4 font-display text-[2.1rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {l === "fr"
                ? "Là où votre activité perd de l'argent"
                : "Where your business is leaking money"}
            </h2>
          </Reveal>
          <ol className="border-b border-border">
            {n.pains.map((p, i) => (
              <li key={p.title[l]} className="border-t border-border">
                <Reveal
                  delay={Math.min(i * 0.04, 0.2)}
                  className="grid grid-cols-[2.75rem_1fr] gap-x-4 py-6"
                >
                  <span className="font-display text-2xl italic leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">
                      {p.title[l]}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-muted">
                      {p.text[l]}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Automations */}
      <section
        id="automations"
        className="scroll-mt-24 border-y border-border bg-bg-soft py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <Kicker>
              {l === "fr" ? "Ce que nous automatisons" : "What we automate"}
            </Kicker>
            <h2 className="mt-4 font-display text-[2.1rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {l === "fr"
                ? "Les automatisations qui vous font gagner du chiffre"
                : "The automations that put money back in your pocket"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {n.automations.map((a, i) => {
              const Icon = autoIcons[i % autoIcons.length];
              return (
                <Reveal key={a.title[l]} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="card flex h-full flex-col rounded-2xl p-6">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{
                        color: accent,
                        backgroundColor: accentTint(n.accent),
                      }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-normal text-ink">
                      {a.title[l]}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                      {a.text[l]}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-ink">
                      <Check className="h-4 w-4 text-accent-2" aria-hidden />
                      {a.impact[l]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Trust />
      <Pricing />
      <BookCall />

      {/* Niche FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-normal tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {l === "fr"
                ? "Questions fréquentes"
                : "Frequently asked questions"}
            </h2>
          </Reveal>
          <div className="mt-8 border-b border-border">
            {n.faq.map((it, i) => (
              <Reveal key={it.q[l]} delay={Math.min(i * 0.03, 0.15)}>
                <details className="group border-t border-border [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[1.2rem] leading-snug text-ink">
                    {it.q[l]}
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-open:border-ink group-open:bg-ink group-open:text-bg">
                      <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="-mt-1 pb-6 pr-12 text-[16px] leading-relaxed text-muted">
                    {it.a[l]}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
