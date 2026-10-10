"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, BadgeCheck, Lock, type LucideIcon } from "lucide-react";
import { Kicker, hl } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

const gIcons: LucideIcon[] = [BadgeCheck, ShieldCheck, Lock];

type Testimonial = {
  headline: string;
  quote: string;
  name: string;
  role: string;
  result: string;
  resultLabel: string;
};

function Author({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-[15px] font-extrabold text-[#0c1f18]">
        {name.charAt(0)}
      </span>
      <span className="text-sm leading-tight">
        <span className="block font-bold text-ink">{name}</span>
        <span className="block text-muted">{role}</span>
      </span>
    </figcaption>
  );
}

export function Trust() {
  const t = useTranslations("Trust");
  const [featured, ...others] = t.raw("testimonials") as Testimonial[];
  const guarantees = t.raw("guarantees") as { title: string; text: string }[];

  return (
    <section
      id="trust"
      className="theme-ink relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-3 max-w-2xl font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem] md:text-[3.4rem]">
            {t.rich("title", hl)}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* The headline result */}
          <Reveal className="h-full">
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-7 sm:p-10">
              <div className="flex items-end gap-4 border-b border-border pb-7">
                <span className="font-display text-[5.5rem] font-extrabold leading-[0.8] tracking-[-0.06em] text-accent sm:text-[7rem]">
                  {featured.result}
                </span>
                <span className="pb-1 text-[15px] font-semibold leading-snug text-ink-soft">
                  {featured.resultLabel}
                </span>
              </div>
              <blockquote className="mt-7 flex-1">
                <p className="font-display text-[1.7rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.1rem]">
                  {featured.headline}
                </p>
                <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">
                  {featured.quote}
                </p>
              </blockquote>
              <div className="mt-8">
                <Author name={featured.name} role={featured.role} />
              </div>
            </figure>
          </Reveal>

          <div className="grid gap-5">
            {others.map((tm, i) => (
              <Reveal key={tm.name} delay={0.06 * (i + 1)} className="h-full">
                <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-border-strong p-7">
                  <span className="w-fit rounded-md bg-accent px-2.5 py-1 text-[13px] font-semibold text-[#0c1f18]">
                    <b className="font-extrabold">{tm.result}</b> {tm.resultLabel}
                  </span>
                  <blockquote className="mt-5 flex-1">
                    <p className="font-display text-[1.35rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
                      {tm.headline}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {tm.quote}
                    </p>
                  </blockquote>
                  <div className="mt-6">
                    <Author name={tm.name} role={tm.role} />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 rounded-[var(--radius-card)] border border-border-strong p-6 sm:p-8">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
            {t("guaranteesTitle")}
          </h3>
          <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
            {guarantees.map((g, i) => {
              const Ic = gIcons[i % gIcons.length];
              return (
                <div
                  key={g.title}
                  className="flex gap-3.5 md:px-6 md:first:pl-0 md:last:pr-0"
                >
                  <Ic
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <p className="text-[15px] font-bold text-ink">{g.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {g.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
