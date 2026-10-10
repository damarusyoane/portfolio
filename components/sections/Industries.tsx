"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  ShoppingCart,
  Building2,
  HeartPulse,
  UtensilsCrossed,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { niches } from "@/lib/niches";
import { accentColor, accentTint, formatMetric } from "@/lib/utils";
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
    <section
      id="industries"
      className="relative scroll-mt-20 border-y border-border bg-bg-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-12 border-b border-border">
          {list.map((n, i) => {
            const Icon = icons[n.slug] ?? ShoppingCart;
            const color = accentColor(n.accent);
            const stat = n.stats[0];
            return (
              <li key={n.slug} className="border-t border-border">
                <Reveal delay={Math.min(i * 0.05, 0.25)}>
                  <Link
                    href={`/solutions/${n.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 transition-colors sm:gap-x-8 sm:py-7 md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1.3fr)_10rem_auto]"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full"
                      style={{ color, backgroundColor: accentTint(n.accent) }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.035em] text-ink transition-colors group-hover:text-accent-ink sm:text-[1.8rem]">
                      {n.label[locale]}
                    </h3>
                    <p className="col-start-2 row-start-2 text-[15px] leading-relaxed text-muted md:col-start-auto md:row-start-auto">
                      {n.hero.title[locale]}
                    </p>
                    <p className="hidden md:block">
                      <span className="hl font-display text-2xl font-extrabold leading-none tracking-[-0.03em] text-ink">
                        {formatMetric(stat.value, locale)}
                      </span>
                      <span className="mt-1.5 block text-[13px] text-faint">
                        {stat.label[locale]}
                      </span>
                    </p>
                    <span className="col-start-3 row-span-2 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-border-strong text-ink transition-[background-color,color,transform] group-hover:translate-x-1 group-hover:border-transparent group-hover:bg-accent group-hover:text-[#0c1f18] md:col-start-auto md:row-span-1 md:row-start-auto">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                      <span className="sr-only">{t("explore")}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8">
          <Link
            href="/automations"
            className="theme-ink group flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] px-6 py-5 sm:px-8"
          >
            <span>
              <span className="font-display text-xl font-bold tracking-[-0.02em]">{t("viewAll")}</span>{" "}
              <span className="mt-1 block text-[15px] text-muted sm:mt-0 sm:inline">
                {t("viewAllText")}
              </span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-[#0c1f18] transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
