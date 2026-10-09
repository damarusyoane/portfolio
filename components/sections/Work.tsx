import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { CanvasImage } from "@/components/CanvasImage";
import { WorkIndex, type IndexRow } from "@/components/sections/WorkIndex";
import { getProject, type Project } from "@/lib/projects";
import { getCanvas } from "@/lib/canvases";
import { formatMetric } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const LEAD = "instant-lead-response";
const LEAD_FRONT: Record<
  Locale,
  { src: string; width: number; height: number }
> = {
  fr: {
    src: "/projects/instant-lead-response/02-reponse-client-fr-card.png",
    width: 730,
    height: 649,
  },
  en: {
    src: "/projects/instant-lead-response/02-reponse-client-en-card.png",
    width: 730,
    height: 357,
  },
};

// Customer-facing systems first, then the more technical builds.
const INDEX = [
  "whatsapp-ai-assistant",
  "payment-reminder-engine",
  "appointment-reminder-system",
  "ai-voice-calling-assistant",
  "review-reputation-automation",
  "rag-knowledge-assistant",
  "seo-audit-engine",
  "google-ads-campaign-agent",
  "ai-content-pipeline",
  "resilient-llm-automation",
  "distributed-automation",
];

export function Work() {
  const t = useTranslations("Work");
  const locale = useLocale() as Locale;
  const lead = getProject(LEAD) as Project;
  const leadCanvas = getCanvas(LEAD);
  const front = LEAD_FRONT[locale];
  const leadMetric = lead.metrics[0];

  const rows: IndexRow[] = INDEX.map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p))
    .map((p) => {
      const canvas = getCanvas(p.slug);
      return {
        slug: p.slug,
        title: p.title[locale],
        purpose: t(`purpose.${p.slug}`),
        result: `${formatMetric(p.metrics[0].value, locale)} ${p.metrics[0].label[locale]}`,
        canvas: canvas ?? null,
      };
    });

  return (
    <section id="work" className="scroll-mt-16 py-24 lg:py-40">
      <div className="wrap">
        <SectionHeading title={t("title")} lead={t("lead")} />

        {/* Lead case */}
        <article className="mt-16 lg:mt-20">
          <h3 className="max-w-[24ch] font-display text-[2rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.75rem]">
            {t("leadTitle")}
          </h3>
          <p className="mt-5 max-w-[46ch] text-lead text-muted">
            {t("leadStandfirst")}
          </p>

          <div className="mt-10">
            <ComparisonSlider
              front={
                <Image
                  src={front.src}
                  width={front.width}
                  height={front.height}
                  alt={t("front")}
                  sizes="(min-width: 1024px) 600px, 90vw"
                  className="h-auto max-h-full w-auto max-w-full rounded-md shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
                />
              }
              back={
                leadCanvas ? (
                  <CanvasImage
                    canvas={leadCanvas}
                    alt={t("back")}
                    sizes="(min-width: 1024px) 1150px, 100vw"
                    className="rounded"
                  />
                ) : null
              }
              frontLabel={t("front")}
              backLabel={t("back")}
              ariaLabel={t("sliderLabel")}
              valueTemplate={t.raw("sliderValue") as string}
            />
          </div>

          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-3 md:gap-6">
            <div>
              <h4 className="ts text-note text-faint">{t("problemLabel")}</h4>
              <p className="mt-2 text-body text-ink-soft">{t("problemText")}</p>
            </div>
            <div>
              <h4 className="ts text-note text-faint">{t("builtLabel")}</h4>
              <p className="mt-2 text-body text-ink-soft">{t("builtText")}</p>
            </div>
            <div>
              <h4 className="ts text-note text-faint">{t("resultLabel")}</h4>
              <p className="figures mt-1 font-display text-[4rem] leading-none text-ink">
                {formatMetric(leadMetric.value, locale)}
              </p>
              <p className="mt-2 text-[15px] text-ink-soft">
                {leadMetric.label[locale]}
              </p>
              <Link
                href={`/projects/${LEAD}`}
                className="group mt-4 inline-flex items-center gap-2 text-[16px] text-ink"
              >
                <span className="text-link">{t("readCase")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </article>

        {/* Every other project */}
        <WorkIndex
          rows={rows}
          labels={{
            project: t("colProject"),
            purpose: t("colFor"),
            result: t("colResult"),
            previewAlt: t.raw("previewAlt") as string,
          }}
        />

        <Link
          href="/automations"
          className="group mt-8 inline-flex items-center gap-2 text-[16px] text-ink"
        >
          <span className="text-link">{t("catalogLink")}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
