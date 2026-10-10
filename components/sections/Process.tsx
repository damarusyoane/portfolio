"use client";

import { useTranslations } from "next-intl";
import { SectionHeading, hl } from "@/components/ui/SectionHeading";
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
          title={t.rich("title", hl)}
          subtitle={t("subtitle")}
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal
                delay={i * 0.07}
                className="relative h-full"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent font-display text-xl font-extrabold text-[#0c1f18]">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className="hidden h-px flex-1 border-t-2 border-dashed border-border-strong lg:block"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-5 inline-block rounded-md bg-bg-soft px-2 py-0.5 text-[13px] font-semibold text-accent-ink">
                  {s.when}
                </p>
                <h3 className="mt-3 font-display text-[1.45rem] font-bold leading-snug tracking-[-0.025em] text-ink">
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
