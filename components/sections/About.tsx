"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;
  const facts = t.raw("facts") as { value: string; label: string }[];
  const initials = siteConfig.founder
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-4 font-display text-[2.15rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-7 space-y-4 text-[17px] leading-relaxed text-muted">
              <p className="text-ink-soft">{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-7">
              <div className="flex items-center gap-3.5">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink font-display text-lg text-bg">
                  {initials}
                </span>
                <div>
                  <p className="font-display text-xl italic text-ink">
                    {siteConfig.founder}
                  </p>
                  <p className="text-sm text-muted">
                    {siteConfig.founderRole[locale]}
                  </p>
                </div>
              </div>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <LinkedinIcon className="h-4 w-4 text-[#0a66c2]" />
                <span className="link-underline">{t("linkedin")}</span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-14">
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-surface">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={[
                  "p-6 sm:p-8",
                  i % 2 === 0 ? "border-r border-border" : "",
                  i < 2 ? "border-b border-border" : "",
                ].join(" ")}
              >
                <p className="font-display text-4xl font-normal tracking-[-0.02em] text-ink sm:text-5xl">
                  {f.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-muted">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden />
            {siteConfig.availability[locale]} ·{" "}
            {siteConfig.locationLabel[locale]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
