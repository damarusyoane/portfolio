"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

// Real screenshots from delivered projects, one per offer (same order as the
// `Offers.items` messages), plus the case study each one links to.
const visuals: {
  slug: string;
  image: string | Record<Locale, string>;
}[] = [
  {
    slug: "instant-lead-response",
    image: {
      fr: "/projects/instant-lead-response/02-reponse-client-fr.png",
      en: "/projects/instant-lead-response/02-reponse-client-en.png",
    },
  },
  {
    slug: "whatsapp-ai-assistant",
    image: {
      fr: "/projects/whatsapp-ai-assistant/02-reponse-client-fr.png",
      en: "/projects/whatsapp-ai-assistant/02-reponse-client-en.png",
    },
  },
  {
    slug: "payment-reminder-engine",
    image: {
      fr: "/projects/payment-reminder-engine/02-relance-client-fr.png",
      en: "/projects/payment-reminder-engine/02-relance-client-en.png",
    },
  },
  {
    slug: "appointment-reminder-system",
    image: {
      fr: "/projects/appointment-reminder-system/02-rappel-client-fr.png",
      en: "/projects/appointment-reminder-system/02-rappel-client-en.png",
    },
  },
  {
    slug: "ai-content-pipeline",
    image: "/projects/ai-content-pipeline.png",
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
          title={t("title")}
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
                    "flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left text-[15px] font-medium transition-colors lg:rounded-xl lg:border-transparent lg:px-4 lg:py-3.5",
                    selected
                      ? "border-ink bg-ink text-bg"
                      : "border-border-strong text-ink-soft hover:bg-surface hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "hidden font-display text-sm italic lg:inline",
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
            className="overflow-hidden rounded-3xl border border-border bg-surface"
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
                    <h3 className="font-display text-[1.7rem] font-normal leading-[1.12] tracking-[-0.015em] text-ink sm:text-[2.1rem]">
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
                            aria-hidden
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between gap-6 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <div>
                      <p className="font-display text-5xl font-normal tracking-[-0.03em] text-accent-ink sm:text-6xl">
                        {item.metric}
                      </p>
                      <p className="mt-2 text-[15px] font-medium text-ink">
                        {item.metricText}
                      </p>
                      <p className="mt-1 text-sm text-faint">
                        {t("metricLabel")}
                      </p>
                    </div>
                    <Link
                      href={`/projects/${visual.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                    >
                      <span className="link-underline">{t("caseLink")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-border bg-surface-2 p-3 sm:p-5">
                  <div className="relative aspect-[2.1/1] overflow-hidden rounded-xl border border-border bg-[#f3f2ee]">
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

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-border-strong px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-[16px] text-ink-soft">{t("ctaText")}</p>
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-accent-ink"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
