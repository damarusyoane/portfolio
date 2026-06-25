"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ShoppingCart,
  Megaphone,
  TrendingUp,
  LifeBuoy,
  Banknote,
  Users,
  Share2,
  Database,
  Building2,
  HeartPulse,
  Activity,
  Bot,
  Scale,
  GraduationCap,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, solutions } from "@/lib/solutions";
import { accentColor } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const categoryIcons: Record<string, LucideIcon> = {
  ecommerce: ShoppingCart,
  marketing: Megaphone,
  sales: TrendingUp,
  support: LifeBuoy,
  finance: Banknote,
  hr: Users,
  content: Share2,
  data: Database,
  realestate: Building2,
  healthcare: HeartPulse,
  devops: Activity,
  ai: Bot,
  legal: Scale,
  education: GraduationCap,
};

const accentByCategory = Object.fromEntries(
  categories.map((c) => [c.id, c.accent]),
);

export function AutomationCatalog() {
  const t = useTranslations("Catalog");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? solutions
        : solutions.filter((s) => s.category === active),
    [active],
  );

  return (
    <section id="catalog" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <p className="mt-4 font-mono text-xs text-faint">
          {t("count", { count: solutions.length, domains: categories.length })}
        </p>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          <FilterChip
            label={t("all")}
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              label={c.label[locale]}
              active={active === c.id}
              accent={accentColor(c.accent)}
              onClick={() => setActive(c.id)}
            />
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => {
              const cat = categories.find((c) => c.id === s.category);
              const Icon = categoryIcons[s.category] ?? Bot;
              const color = accentColor(accentByCategory[s.category] ?? "cyan");
              return (
                <motion.article
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="card-hover glass group flex h-full flex-col rounded-2xl p-5 hover:-translate-y-1 hover:border-border-strong"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, " + color + " 12%, transparent)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{ color }}
                    >
                      {cat?.label[locale]}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold leading-snug text-ink">
                    {s.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.description[locale]}
                  </p>

                  <div
                    className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      color,
                      backgroundColor:
                        "color-mix(in oklab, " + color + " 12%, transparent)",
                    }}
                  >
                    <Zap className="h-3 w-3" />
                    {s.impact[locale]}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {s.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-white/[0.02] px-2 py-0.5 text-[11px] text-ink-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  accent,
  onClick,
}: {
  label: string;
  active: boolean;
  accent?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all"
      style={
        active
          ? {
              color: accent ?? "var(--color-accent)",
              borderColor: accent ?? "var(--color-accent)",
              backgroundColor:
                "color-mix(in oklab, " +
                (accent ?? "var(--color-accent)") +
                " 14%, transparent)",
            }
          : {
              color: "var(--color-muted)",
              borderColor: "var(--color-border)",
            }
      }
    >
      {label}
    </button>
  );
}
