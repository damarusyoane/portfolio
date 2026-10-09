"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as {
    when: string;
    title: string;
    text: string;
  }[];

  return (
    <section id="process" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal
                delay={i * 0.07}
                className="h-full border-t-2 border-ink pt-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-3xl italic leading-none text-accent">
                    {i + 1}
                  </span>
                  <span className="text-right text-[13px] font-medium text-faint">
                    {s.when}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.4rem] font-normal leading-snug tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {s.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
