"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/lib/projects";
import { getGallery } from "@/lib/galleries";
import { accentColor, formatMetric } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

// What a small-business owner recognises first: customer-facing systems.
// The remaining (more technical) projects are listed compactly below.
const FEATURED = [
  "whatsapp-ai-assistant",
  "instant-lead-response",
  "payment-reminder-engine",
  "appointment-reminder-system",
  "ai-voice-calling-assistant",
  "review-reputation-automation",
];

/** Prefer the "what the customer sees" screenshot over the workflow canvas. */
function thumbnail(p: Project, locale: Locale) {
  const gallery = getGallery(p.slug);
  const step = gallery[1] ?? gallery[0];
  if (step) return typeof step.src === "string" ? step.src : step.src[locale];
  return p.screenshot;
}

export function Work() {
  const t = useTranslations("Work");
  const locale = useLocale() as Locale;

  const featured = FEATURED.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is Project => Boolean(p));
  const others = projects.filter((p) => !FEATURED.includes(p.slug));

  return (
    <section id="work" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => {
            const src = thumbnail(p, locale);
            const metric = p.metrics[0];
            return (
              <Reveal key={p.slug} delay={Math.min(i * 0.05, 0.25)}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-2">
                    {src && (
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p
                    className="mt-5 text-[13px] font-medium"
                    style={{ color: accentColor(p.accent) }}
                  >
                    {p.domain[locale]}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.4rem] font-normal leading-snug tracking-[-0.01em] text-ink">
                    {p.title[locale]}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">
                    {p.tagline[locale]}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                    <p className="text-sm text-ink-soft">
                      <span className="font-display text-2xl text-ink">
                        {formatMetric(metric.value, locale)}
                      </span>{" "}
                      {metric.label[locale]}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ink">
                      {t("viewCase")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {others.length > 0 && (
          <Reveal className="mt-20">
            <h3 className="text-sm font-medium text-faint">{t("moreTitle")}</h3>
            <ul className="mt-4 border-b border-border">
              {others.map((p) => (
                <li key={p.slug} className="border-t border-border">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group grid items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[1.4fr_1fr_auto]"
                  >
                    <span className="font-display text-lg text-ink transition-colors group-hover:text-accent-ink">
                      {p.title[locale]}
                    </span>
                    <span className="text-sm text-muted">
                      {p.domain[locale]}
                    </span>
                    <span className="hidden items-center gap-2 text-sm text-ink-soft sm:inline-flex">
                      {formatMetric(p.metrics[0].value, locale)}
                      <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/automations"
              className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-ink"
            >
              {t("allAutomations")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
