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
import { accentColor, accentTint } from "@/lib/utils";
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((n, i) => {
            const Icon = icons[n.slug] ?? ShoppingCart;
            const color = accentColor(n.accent);
            return (
              <Reveal key={n.slug} delay={Math.min(i * 0.05, 0.25)}>
                <Link
                  href={`/solutions/${n.slug}`}
                  className="card card-hover group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ color, backgroundColor: accentTint(n.accent) }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-[1.45rem] font-normal tracking-[-0.01em] text-ink">
                    {n.label[locale]}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">
                    {n.hero.title[locale]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    {t("explore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal delay={0.25}>
            <Link
              href="/automations"
              className="theme-ink card-hover group flex h-full flex-col justify-between rounded-2xl p-6 hover:-translate-y-1"
            >
              <div>
                <h3 className="font-display text-[1.45rem] font-normal tracking-[-0.01em] text-ink">
                  {t("viewAll")}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                  {t("viewAllText")}
                </p>
              </div>
              <span className="mt-6 grid h-11 w-11 place-items-center rounded-full bg-accent text-[#161512] transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
