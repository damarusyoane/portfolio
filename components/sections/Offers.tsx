"use client";

import { useTranslations } from "next-intl";
import {
  TrendingUp,
  Headset,
  Wallet,
  Cog,
  Megaphone,
  Check,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

const icons: LucideIcon[] = [TrendingUp, Headset, Wallet, Cog, Megaphone];

export function Offers() {
  const t = useTranslations("Offers");
  const items = t.raw("items") as {
    name: string;
    outcome: string;
    points: string[];
  }[];

  return (
    <section id="offers" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={it.name} delay={i * 0.05}>
                <div className="glass card-hover flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 hover:border-border-strong">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {it.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{it.outcome}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.25}>
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col items-start justify-center rounded-2xl border p-6 transition-transform hover:-translate-y-1"
              style={{
                borderColor: "rgba(139,92,246,.35)",
                background:
                  "linear-gradient(135deg, rgba(34,211,238,.10), rgba(139,92,246,.15))",
              }}
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {t("ctaTitle")}
              </h3>
              <p className="mt-1 text-sm text-muted">{t("ctaText")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {t("cta")}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
