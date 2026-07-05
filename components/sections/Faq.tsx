"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.04}>
              <details className="group glass rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-ink">
                  {it.q}
                  <Plus className="h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
