"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, BadgeCheck, Lock, type LucideIcon } from "lucide-react";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

const gIcons: LucideIcon[] = [BadgeCheck, ShieldCheck, Lock];

export function Trust() {
  const t = useTranslations("Trust");
  const testimonials = t.raw("testimonials") as {
    quote: string;
    name: string;
    role: string;
  }[];
  const guarantees = t.raw("guarantees") as { title: string; text: string }[];

  return (
    <section
      id="trust"
      className="theme-ink relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 max-w-2xl font-display text-[2.15rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem] md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col border-t border-border-strong pt-6">
                <span
                  className="font-display text-6xl leading-[0.6] text-accent"
                  aria-hidden
                >
                  “
                </span>
                <blockquote className="mt-4 flex-1 font-display text-[1.25rem] font-normal leading-[1.45] text-ink">
                  {tm.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-sm font-semibold text-ink">
                    {tm.name.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-ink">
                      {tm.name}
                    </span>
                    <span className="block text-muted">{tm.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="text-sm font-medium text-faint">
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
                    <p className="text-[15px] font-semibold text-ink">
                      {g.title}
                    </p>
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
