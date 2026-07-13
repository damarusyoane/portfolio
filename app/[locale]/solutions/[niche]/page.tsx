import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  ShoppingCart,
  Clock,
  MessageSquare,
  Star,
  Headset,
  RefreshCw,
  Undo2,
  Repeat,
  CalendarCheck,
  ArrowUpRight,
  Check,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Trust } from "@/components/sections/Trust";
import { Pricing } from "@/components/sections/Pricing";
import { BookCall } from "@/components/sections/BookCall";
import { niches, getNiche } from "@/lib/niches";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { accentColor } from "@/lib/utils";

const painIcons: LucideIcon[] = [ShoppingCart, Clock, MessageSquare, Star];
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
      title: `${n.label[l]} automation — ${siteConfig.name}`,
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
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 aurora" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p
              className="font-mono text-sm font-medium uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {n.hero.eyebrow[l]}
            </p>
            <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl">
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
                }}
              >
                <CalendarCheck className="h-5 w-5" />
                {l === "fr" ? "Réserver un audit gratuit" : "Book a free audit"}
              </a>
              <a
                href="#automations"
                className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-border-strong"
              >
                {l === "fr" ? "Voir les automatisations" : "See the automations"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal className="mt-14">
            <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
              {n.stats.map((s) => (
                <div key={s.label[l]} className="bg-surface px-5 py-7 text-center">
                  <div className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                    {s.label[l]}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pains */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {l === "fr"
                ? "Là où votre boutique perd de l'argent"
                : "Where your store is leaking money"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {n.pains.map((p, i) => {
              const Icon = painIcons[i % painIcons.length];
              return (
                <Reveal key={p.title[l]} delay={i * 0.05}>
                  <div className="glass flex h-full gap-4 rounded-2xl p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-red-500/5 text-red-300/80">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {p.title[l]}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {p.text[l]}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automations */}
      <section id="automations" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p
              className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {l === "fr" ? "Ce que j'automatise" : "What I automate"}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {l === "fr"
                ? "Les automatisations qui récupèrent du chiffre"
                : "The automations that put money back in your pocket"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {n.automations.map((a, i) => {
              const Icon = autoIcons[i % autoIcons.length];
              return (
                <Reveal key={a.title[l]} delay={i * 0.05}>
                  <div className="glass card-hover flex h-full flex-col rounded-2xl p-5 hover:-translate-y-1 hover:border-border-strong">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border border-border"
                      style={{
                        color: accent,
                        backgroundColor:
                          "color-mix(in oklab, " + accent + " 12%, transparent)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-ink">
                      {a.title[l]}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                      {a.text[l]}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        color: accent,
                        backgroundColor:
                          "color-mix(in oklab, " + accent + " 12%, transparent)",
                      }}
                    >
                      {a.impact[l]}
                    </span>
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
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              FAQ
            </h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {n.faq.map((it, i) => (
              <Reveal key={it.q[l]} delay={i * 0.04}>
                <details className="group glass rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-ink">
                    {it.q[l]}
                    <Plus className="h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {it.a[l]}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
              }}
            >
              <Check className="h-5 w-5" />
              {l === "fr" ? "Réserver mon audit gratuit" : "Book my free audit"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
