"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function Outcomes() {
  const t = useTranslations("Outcomes");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="relative py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {items.map((it) => (
              <div key={it.label} className="bg-surface px-5 py-7 text-center">
                <div className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                  {it.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                  {it.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-faint">{t("note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
