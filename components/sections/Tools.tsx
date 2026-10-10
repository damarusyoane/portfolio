"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function Tools() {
  const t = useTranslations("Tools");
  // Tools already wired into delivered projects. Plain wordmarks on purpose:
  // no borrowed logos, and it reads as a list rather than a banner ad.
  const tools = t.raw("items") as string[];
  return (
    <section aria-labelledby="tools-title" className="relative pb-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid gap-6 border-y border-border py-9 md:grid-cols-[0.8fr_2fr] md:gap-10">
          <div>
            <h2
              id="tools-title"
              className="font-display text-[1.45rem] leading-snug tracking-[-0.01em] text-ink"
            >
              {t("title")}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {t("text")}
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-2.5 self-center">
            {tools.map((name) => (
              <li
                key={name}
                className="rounded-full border border-border-strong px-3.5 py-1.5 text-[14px] font-medium text-ink-soft"
              >
                {name}
              </li>
            ))}
            <li className="px-1.5 py-1.5 text-[14px] italic text-muted">
              {t("more")}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
