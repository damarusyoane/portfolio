"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export function Experience() {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative mt-12 max-w-3xl">
          {/* vertical line */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={i} delay={Math.min(i * 0.08, 0.3)}>
                <div className="relative pl-9">
                  <span className="absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-accent bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>

                  <span className="font-mono text-xs uppercase tracking-wider text-faint">
                    {item.period[locale]}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
                    {item.role[locale]}
                    <span className="text-muted"> · {item.org[locale]}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description[locale]}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.points[locale].map((pt, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
