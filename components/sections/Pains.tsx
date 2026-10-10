"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  PhoneMissed,
  MessageSquareDashed,
  Receipt,
  CalendarX,
  MessagesSquare,
  Copy,
  type LucideIcon,
} from "lucide-react";
import { Kicker, hl } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

const icons: LucideIcon[] = [
  PhoneMissed,
  MessageSquareDashed,
  Receipt,
  CalendarX,
  MessagesSquare,
  Copy,
];

export function Pains() {
  const t = useTranslations("Pains");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="pains" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem] md:text-[3.4rem]">
              {t.rich("title", hl)}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted sm:text-lg">
              {t("subtitle")}
            </p>
            <div className="theme-ink mt-8 rounded-[var(--radius-card)] p-6">
              <p className="text-[16px] font-medium leading-relaxed text-ink">
                {t("closing")}
              </p>
              <a
                href="#offers"
                className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-bold text-accent"
              >
                {t("closingLink")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="border-b border-border">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={it.title} className="border-t border-border">
                <Reveal
                  delay={Math.min(i * 0.04, 0.2)}
                  className="grid grid-cols-[3rem_1fr] gap-x-5 py-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-[#0c1f18]">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.3rem] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[1.45rem]">
                      {it.title}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-muted">
                      {it.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
