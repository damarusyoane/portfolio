"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function BookCall() {
  const t = useTranslations("BookCall");
  const points = t.raw("points") as string[];

  return (
    <section id="book" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="theme-ink flex flex-col p-7 sm:p-10 lg:p-12">
              <p className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-2.5 py-1 text-[13px] font-bold text-[#0c1f18]">
                {t("badge")}
              </p>
              <h2 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[2.8rem]">
                {t("title")}
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-muted">
                {t("subtitle")}
              </p>

              <ul className="mt-7 space-y-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[15px] text-ink-soft"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[#0c1f18]">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <a
                  href={siteConfig.links.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("accent", "lg")}
                >
                  {t("cta")}
                  <ButtonArrow />
                </a>
                <p className="mt-3 text-sm text-faint">{t("note")}</p>
              </div>
            </div>

            <div className="border-t border-border bg-bg-soft lg:border-l lg:border-t-0">
              <iframe
                src={`${siteConfig.links.cal}?theme=light`}
                title={t("embedTitle")}
                loading="lazy"
                className="h-[640px] w-full lg:h-full lg:min-h-[640px]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
