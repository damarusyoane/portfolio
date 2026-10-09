import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProject } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Offer = {
  title: string;
  text: string;
  metric: string;
  metricText: string;
};

// The delivered project each offer's figure comes from (same order as
// `Offers.items` in the messages).
const SOURCES = [
  "instant-lead-response",
  "whatsapp-ai-assistant",
  "payment-reminder-engine",
  "appointment-reminder-system",
  "ai-content-pipeline",
];

export function Offers() {
  const t = useTranslations("Offers");
  const locale = useLocale() as Locale;
  const items = t.raw("items") as Offer[];

  return (
    <section id="offers" className="scroll-mt-16 py-20 lg:py-32">
      <div className="wrap">
        <SectionHeading title={t("title")} lead={t("lead")} />

        <ol className="sheet mt-12 overflow-hidden">
          {items.map((it, i) => {
            const project = getProject(SOURCES[i]);
            return (
              <li
                key={it.title}
                className="grid gap-x-8 gap-y-3 border-t border-border p-6 first:border-t-0 sm:p-8 lg:grid-cols-[1fr_1.05fr_13rem] lg:items-baseline"
              >
                <h3 className="font-display text-[1.625rem] leading-[1.15] text-ink">
                  {it.title}
                </h3>
                <p className="text-body text-muted">{it.text}</p>
                <div className="lg:text-right">
                  <p className="figures font-display text-[2.5rem] leading-none text-ink">
                    {it.metric}
                  </p>
                  <p className="mt-1.5 text-[15px] text-ink-soft">
                    {it.metricText}
                  </p>
                  {project && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="ts mt-2 inline-block text-[12px] text-faint underline-offset-4 hover:text-ink hover:underline"
                    >
                      {t("sourcePrefix")} {project.title[locale]} →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-lg text-ink">
          {t("ctaText")}
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-[16px]"
          >
            {t("cta")} →
          </a>
        </p>
      </div>
    </section>
  );
}
