"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section id="process" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-border bg-surface/60 p-6">
                <div className="text-gradient font-display text-4xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
