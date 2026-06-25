"use client";

import { useLocale, useTranslations } from "next-intl";
import { MapPin, Languages, CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { facts } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          {/* Text */}
          <div>
            <Reveal>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {t("kicker")}
                </span>
              </div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
                <p className="text-ink-soft">{t("p3")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 text-accent" />
                  {siteConfig.locationLabel[locale]}
                </span>
                <span className="inline-flex items-center gap-2 text-muted">
                  <Languages className="h-4 w-4 text-accent" />
                  {t("languages")}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Profile card */}
          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--color-accent-2)" }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint">
                    {t("factsTitle")}
                  </h3>
                  <Sparkles className="h-4 w-4 text-accent-2" />
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                  {facts.map((f) => (
                    <div key={f.value} className="bg-surface p-4 text-center">
                      <dt className="text-gradient font-display text-2xl font-bold">
                        {f.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-faint">
                        {f.label[locale]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-ink-soft">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {siteConfig.availability[locale]}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
