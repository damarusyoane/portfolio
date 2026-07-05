"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  ShoppingCart,
  Building2,
  HeartPulse,
  UtensilsCrossed,
  GraduationCap,
  ArrowUpRight,
  LayoutGrid,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { niches } from "@/lib/niches";
import { accentColor } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const icons: Record<string, LucideIcon> = {
  ecommerce: ShoppingCart,
  "real-estate": Building2,
  clinics: HeartPulse,
  restaurants: UtensilsCrossed,
  coaches: GraduationCap,
};

export function Industries() {
  const t = useTranslations("Industries");
  const locale = useLocale() as Locale;
  const list = Object.values(niches);

  return (
    <section id="industries" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((n, i) => {
            const Icon = icons[n.slug] ?? ShoppingCart;
            const color = accentColor(n.accent);
            return (
              <Reveal key={n.slug} delay={i * 0.05}>
                <Link
                  href={`/solutions/${n.slug}`}
                  className="glass card-hover group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 hover:border-border-strong"
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border"
                    style={{
                      color,
                      backgroundColor:
                        "color-mix(in oklab, " + color + " 12%, transparent)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {n.label[locale]}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-muted">
                    {n.hero.eyebrow[locale]}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color }}
                  >
                    {t("explore")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal delay={list.length * 0.05}>
            <Link
              href="/automations"
              className="group flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border-strong p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
            >
              <LayoutGrid className="h-6 w-6 text-accent" />
              <span className="mt-3 font-display text-base font-semibold text-ink">
                {t("viewAll")}
              </span>
              <ArrowRight className="mt-2 h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
