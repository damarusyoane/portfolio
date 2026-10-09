"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  const t = useTranslations("Pricing");
  const plans = t.raw("plans") as {
    name: string;
    tagline: string;
    price: string;
    priceSuffix: string;
    features: string[];
    popular?: boolean;
  }[];

  return (
    <section id="pricing" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 sm:p-8",
                  p.popular
                    ? "theme-ink border-transparent shadow-[var(--shadow-lift)]"
                    : "border-border bg-surface",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-normal text-ink">
                    {p.name}
                  </h3>
                  {p.popular && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-[#161512]">
                      {t("popular")}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[15px] text-muted">{p.tagline}</p>

                <div className="mt-7 border-t border-border pt-6">
                  <p className="font-display text-[2.6rem] font-normal leading-none tracking-[-0.02em] text-ink">
                    {p.price}
                  </p>
                  <p className="mt-2 text-sm text-faint">{p.priceSuffix}</p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-[15px] text-ink-soft"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          p.popular ? "text-accent" : "text-accent-2",
                        )}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={siteConfig.links.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass(
                    p.popular ? "accent" : "secondary",
                    "md",
                    "mt-8 w-full",
                  )}
                >
                  {t("cta")}
                  <ButtonArrow />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-sm text-faint">{t("note")}</p>
      </div>
    </section>
  );
}
