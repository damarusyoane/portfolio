import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { niches } from "@/lib/niches";
import type { Locale } from "@/i18n/routing";

const ORDER = ["real-estate", "clinics", "restaurants", "ecommerce", "coaches"];

export function Industries() {
  const t = useTranslations("Industries");
  const locale = useLocale() as Locale;
  const list = ORDER.map((slug) => niches[slug]).filter(Boolean);

  return (
    <section
      id="industries"
      className="scroll-mt-16 border-y border-border bg-bg-soft py-16 lg:py-24"
    >
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <SectionHeading title={t("title")} lead={t("lead")} />
        </div>
        <ul className="border-t border-border lg:col-span-7 lg:col-start-6">
          {list.map((n) => (
            <li key={n.slug} className="border-b border-border">
              <Link
                href={`/solutions/${n.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <span>
                  <span className="font-display text-[1.5rem] leading-tight text-ink">
                    {n.label[locale]}
                  </span>
                  <span className="mt-1 block text-[17px] text-muted sm:ml-2 sm:mt-0 sm:inline">
                    {t(`scenes.${n.slug}`)}
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
              </Link>
            </li>
          ))}
          <li className="border-b border-border">
            <Link
              href="/automations"
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <span className="text-[17px] text-muted">
                {t("catalogRow")}
                {locale === "fr" ? "\u00a0: " : ": "}
                <span className="text-link text-ink">{t("catalogText")}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
