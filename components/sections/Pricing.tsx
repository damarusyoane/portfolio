import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  example: string;
  features: string[];
  popular?: boolean;
};

export function Pricing() {
  const t = useTranslations("Pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="pricing" className="scroll-mt-16 py-20 lg:py-32">
      <div className="wrap">
        <SectionHeading title={t("title")} lead={t("lead")} />

        <div className="sheet mt-12 grid lg:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={
                "flex flex-col p-7 sm:p-9" +
                (i > 0
                  ? " border-t border-border lg:border-l lg:border-t-0"
                  : "")
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.625rem] text-ink">
                  {p.name}
                </h3>
                {p.popular && siteConfig.claims.popularPlan && (
                  <span className="ts text-note text-muted">
                    {t("recommended")}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[15px] text-muted">{p.tagline}</p>

              <p className="figures mt-8 whitespace-nowrap font-display text-[2.6rem] leading-none tracking-[-0.02em] text-ink xl:text-[2.9rem]">
                {p.price}
              </p>
              <p className="ts mt-3 text-note text-faint">{p.priceSuffix}</p>

              {p.example && (
                <p className="mt-6 text-[15px] text-ink-soft">
                  <span className="ts text-note text-faint">
                    {t("exampleLabel")}
                  </span>{" "}
                  {p.example}
                </p>
              )}

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-[15px] text-ink-soft"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-ink"
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
                className={buttonClass("outline", "md", "mt-8 w-full")}
              >
                {t("cta")}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[62ch] text-[15px] text-ink-soft">
          {t("guarantees")}
        </p>
        <p className="mt-2 text-sm text-faint">{t("note")}</p>
      </div>
    </section>
  );
}
