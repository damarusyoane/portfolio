"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { Kicker, hl } from "@/components/ui/SectionHeading";
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
            <h2 className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem]">
              {t.rich("title", hl)}
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
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-[#0c1f18]">
                  {initials}
                </span>
                <div>
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
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
                className="group inline-flex items-center gap-2 text-sm font-bold text-ink"
              >
                <LinkedinIcon className="h-4 w-4 text-[#0a66c2]" />
                <span className="link-underline">{t("linkedin")}</span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-14">
          <div className="theme-ink rounded-[var(--radius-card)] p-7 sm:p-9">
            <ul>
              {facts.map((f) => (
                <li
                  key={f.label}
                  className="flex items-baseline gap-5 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="w-[6.75rem] shrink-0 whitespace-nowrap font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-accent">
                    {f.value}
                  </span>
                  <span className="text-[15px] leading-snug text-ink-soft">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-ink">
                {siteConfig.availability[locale]}.
              </span>{" "}
              {siteConfig.locationLabel[locale]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
