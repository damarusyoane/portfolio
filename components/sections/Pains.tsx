"use client";

import { useTranslations } from "next-intl";
import {
  Clock,
  MailWarning,
  Receipt,
  Headset,
  Database,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

const icons: LucideIcon[] = [
  Clock,
  MailWarning,
  Receipt,
  Headset,
  Database,
  RefreshCw,
];

export function Pains() {
  const t = useTranslations("Pains");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="pains" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={it.title} delay={i * 0.05}>
                <div className="glass h-full rounded-2xl p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-red-500/5 text-red-300/80">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {it.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
