"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Pains() {
  const t = useTranslations("Pains");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="pains" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-4 font-display text-[2.15rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              {t("title")}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              {t("subtitle")}
            </p>
            <div className="mt-8 rounded-2xl bg-ink p-5 text-bg">
              <p className="text-[15px] leading-relaxed">{t("closing")}</p>
              <a
                href="#offers"
                className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                {t("closingLink")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <ol className="border-b border-border">
          {items.map((it, i) => (
            <li key={it.title} className="border-t border-border">
              <Reveal
                delay={Math.min(i * 0.04, 0.2)}
                className="grid grid-cols-[2.75rem_1fr] gap-x-4 py-7 sm:grid-cols-[3.5rem_1fr]"
              >
                <span className="font-display text-2xl italic leading-none text-accent sm:text-[1.75rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[1.4rem]">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">
                    {it.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
