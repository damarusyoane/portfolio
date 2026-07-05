"use client";

import { useTranslations } from "next-intl";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

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
    <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 aurora opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-7 ${
                  p.popular
                    ? "border-accent-2/50 bg-white/[0.04]"
                    : "border-border bg-surface/50"
                }`}
              >
                {p.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-bg"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg,var(--color-accent),var(--color-accent-2))",
                    }}
                  >
                    {t("popular")}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-ink">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <div className="mt-5">
                  <span className="text-gradient font-display text-3xl font-bold">
                    {p.price}
                  </span>
                  <span className="ml-1.5 text-sm text-faint">
                    {p.priceSuffix}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.links.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    p.popular
                      ? "text-bg"
                      : "border border-border-strong text-ink hover:bg-white/5"
                  }`}
                  style={
                    p.popular
                      ? {
                          backgroundImage:
                            "linear-gradient(100deg,var(--color-accent),var(--color-accent-2))",
                        }
                      : undefined
                  }
                >
                  {t("cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-faint">{t("note")}</p>
      </div>
    </section>
  );
}
