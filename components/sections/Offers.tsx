"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading, hl } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Offer = {
  tab: string;
  title: string;
  text: string;
  points: string[];
  metric: string;
  metricText: string;
};

// Screenshots rebuilt from delivered projects, one per offer (same order as the
// `Offers.items` messages), plus the case study each one links to.
const visuals: {
  slug: string;
  image: string | Record<Locale, string>;
}[] = [
  {
    slug: "instant-lead-response",
    image: {
      fr: "/projects/instant-lead-response/02-reponse-client-v2-fr.png",
      en: "/projects/instant-lead-response/02-reponse-client-v2-en.png",
    },
  },
  {
    slug: "whatsapp-ai-assistant",
    image: {
      fr: "/projects/whatsapp-ai-assistant/02-reponse-client-v2-fr.png",
      en: "/projects/whatsapp-ai-assistant/02-reponse-client-v2-en.png",
    },
  },
  {
    slug: "payment-reminder-engine",
    image: {
      fr: "/projects/payment-reminder-engine/02-relance-client-v2-fr.png",
      en: "/projects/payment-reminder-engine/02-relance-client-v2-en.png",
    },
  },
  {
    slug: "appointment-reminder-system",
    image: {
      fr: "/projects/appointment-reminder-system/02-rappel-client-v2-fr.png",
      en: "/projects/appointment-reminder-system/02-rappel-client-v2-en.png",
    },
  },
  {
    slug: "ai-content-pipeline",
    image: "/projects/ai-content-pipeline-v2.png",
  },
];

export function Offers() {
  const t = useTranslations("Offers");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const items = t.raw("items") as Offer[];
  const [active, setActive] = useState(0);
  const baseId = useId();

  const item = items[active];
  const visual = visuals[active];
  const src =
    typeof visual.image === "string" ? visual.image : visual.image[locale];

  return (
    <section id="offers" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t.rich("title", hl)}
          subtitle={t("subtitle")}
        />

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[270px_1fr] lg:gap-8">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label={t("kicker")}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-1 lg:overflow-visible"
          >
            {items.map((it, i) => {
              const selected = i === active;
              return (
                <button
                  key={it.tab}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[15px] font-semibold transition-colors lg:border-transparent lg:px-4 lg:py-3.5",
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-border-strong text-ink-soft hover:bg-bg-soft hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "hidden font-display text-sm font-bold tabular-nums lg:inline",
                      selected ? "text-accent" : "text-faint",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {it.tab}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active}`}
            className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="grid gap-8 p-6 sm:p-9 md:grid-cols-[1.35fr_0.65fr]">
                  <div>
                    <h3 className="font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-2.5 text-[15px] text-ink-soft"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
                            strokeWidth={3}
                            aria-hidden
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between gap-6 rounded-xl bg-accent p-6 text-[#0c1f18]">
                    <div>
                      <p className="font-display text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl">
                        {item.metric}
                      </p>
                      <p className="mt-2 text-[15px] font-semibold">
                        {item.metricText}
                      </p>
                      <p className="mt-1 text-sm opacity-70">
                        {t("metricLabel")}
                      </p>
                    </div>
                    <Link
                      href={`/projects/${visual.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-bold"
                    >
                      <span className="link-underline">{t("caseLink")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-border bg-bg-soft p-3 sm:p-5">
                  <div className="relative aspect-[2.1/1] overflow-hidden rounded-xl border border-border bg-white">
                    <Image
                      src={src}
                      alt={t("screenshotAlt", { name: item.title })}
                      fill
                      sizes="(min-width: 1024px) 820px, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-card)] bg-bg-soft px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-[16px] text-ink-soft">{t("ctaText")}</p>
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-accent-ink"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
