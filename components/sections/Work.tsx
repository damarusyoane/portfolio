"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { accentColor, accentGradient } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function Work() {
  const t = useTranslations("Work");
  const locale = useLocale() as Locale;

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.07, 0.4)}>
              <Link
                href={`/projects/${p.slug}`}
                className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 hover:-translate-y-1 hover:border-border-strong"
              >
                {/* Accent glow on hover */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: accentColor(p.accent) }}
                  aria-hidden
                />

                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: accentColor(p.accent) }}
                    />
                    {p.domain[locale]}
                  </span>
                  <span className="font-mono text-xs text-faint">{p.year}</span>
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  {p.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.tagline[locale]}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-white/[0.02] px-2 py-0.5 text-[11px] text-ink-soft"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="rounded-md px-2 py-0.5 text-[11px] text-faint">
                      +{p.stack.length - 5}
                    </span>
                  )}
                </div>

                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-5">
                  {p.metrics.map((m) => (
                    <div key={m.value}>
                      <div
                        className="font-display text-base font-bold"
                        style={{ color: accentColor(p.accent) }}
                      >
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-tight text-faint">
                        {m.label[locale]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  <span
                    className="bg-clip-text"
                    style={{
                      backgroundImage: accentGradient(p.accent),
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t("viewCase")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
