"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { categories, solutions } from "@/lib/solutions";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

/**
 * The catalog as a typographic index grouped by business area, with plain
 * text filters. No icons, no cards.
 */
export function AutomationCatalog() {
  const t = useTranslations("Catalog");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<string>("all");

  const groups = categories
    .filter((c) => active === "all" || c.id === active)
    .map((c) => ({
      category: c,
      items: solutions.filter((s) => s.category === c.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="catalog" className="scroll-mt-24 pb-24 pt-10 lg:pb-32">
      <div className="wrap">
        <h1 className="max-w-[22ch] font-display text-display font-normal text-ink">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[52ch] text-lead text-muted">
          {t("subtitle")}
        </p>
        <p className="ts mt-4 text-note text-faint">
          {t("count", { count: solutions.length, domains: categories.length })}
        </p>

        {/* Filters */}
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-4 text-[15px]"
        >
          {[
            { id: "all", label: t("all") },
            ...categories.map((c) => ({ id: c.id, label: c.label[locale] })),
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={cn(
                "underline-offset-4 transition-colors",
                active === f.id
                  ? "text-ink underline decoration-accent decoration-2"
                  : "text-muted hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {groups.map(({ category, items }) => (
            <section
              key={category.id}
              className="grid gap-x-6 border-b border-border py-10 lg:grid-cols-12"
            >
              <h2 className="font-display text-[1.75rem] leading-tight text-ink lg:col-span-3">
                {category.label[locale]}
              </h2>
              <ul className="mt-4 lg:col-span-9 lg:mt-0">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className="grid gap-x-6 gap-y-1.5 border-t border-border py-5 first:border-t-0 first:pt-1 md:grid-cols-[1fr_1.3fr]"
                  >
                    <h3 className="font-display text-[1.25rem] leading-snug text-ink">
                      {s.title[locale]}
                    </h3>
                    <div>
                      <p className="text-[15px] leading-relaxed text-muted">
                        {s.description[locale]}
                      </p>
                      <p className="ts mt-2 text-note text-ink-soft">
                        {s.impact[locale]}
                        <span className="text-faint">
                          {" "}
                          · {s.stack.join(", ")}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
