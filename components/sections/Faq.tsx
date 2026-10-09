"use client";

import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsappIcon } from "@/components/icons";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export function Faq() {
  const t = useTranslations("Faq");
  const tc = useTranslations("Common");
  const locale = useLocale() as Locale;
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-display text-[2.15rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
            {t("title")}
          </h2>
          <a
            href={whatsappUrl(siteConfig.whatsappMessage[locale])}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-border-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            <WhatsappIcon className="h-4 w-4 text-[#1fa855]" />
            {tc("whatsappLabel")}
          </a>
        </Reveal>

        <div className="border-b border-border">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={Math.min(i * 0.03, 0.15)}>
              <details className="group border-t border-border [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[1.25rem] font-normal leading-snug text-ink">
                  {it.q}
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-open:border-ink group-open:bg-ink group-open:text-bg">
                    <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="-mt-1 max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-muted">
                  {it.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
