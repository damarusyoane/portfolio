"use client";

import { useTranslations } from "next-intl";
import { CalendarCheck, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export function BookCall() {
  const t = useTranslations("BookCall");
  const points = t.raw("points") as string[];

  return (
    <section id="book" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border p-8 sm:p-12"
            style={{
              borderColor: "rgba(139,92,246,.35)",
              background:
                "linear-gradient(120deg, rgba(34,211,238,.10), rgba(139,92,246,.15))",
            }}
          >
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-bg"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
              }}
            >
              {t("badge")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.5rem]">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {t("subtitle")}
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-8 text-base font-semibold text-bg shadow-[0_12px_44px_-12px_rgba(139,92,246,0.7)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
              }}
            >
              <CalendarCheck className="h-5 w-5" />
              {t("cta")}
            </a>
            <p className="mt-3 text-xs text-faint">{t("note")}</p>

            <div
              className="mt-8 overflow-hidden rounded-2xl border border-border"
              style={{ background: "#0a0b12" }}
            >
              <iframe
                src={`${siteConfig.links.cal}?theme=dark`}
                title={t("cta")}
                loading="lazy"
                className="h-[640px] w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
