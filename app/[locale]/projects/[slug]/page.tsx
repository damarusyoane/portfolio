import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import Image from "next/image";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { CanvasImage } from "@/components/CanvasImage";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { routing, type Locale } from "@/i18n/routing";
import { projects, getProject } from "@/lib/projects";
import { getGallery } from "@/lib/galleries";
import { getCanvas } from "@/lib/canvases";
import { pngSize } from "@/lib/imageSize";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
import { formatMetric } from "@/lib/utils";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const l = locale as Locale;
  return {
    title: project.title[l],
    description: project.tagline[l],
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        fr: `/fr/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title[l],
      description: project.tagline[l],
      url: `/${locale}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "CaseStudy" });
  const tw = await getTranslations({ locale, namespace: "Work" });
  const gallery = getGallery(slug);
  const canvas = getCanvas(slug);

  // Customer-facing capture (step 2 of the walkthrough) vs. the workflow.
  const customer = gallery[1];
  const customerSrc = customer
    ? typeof customer.src === "string"
      ? customer.src
      : customer.src[l]
    : null;
  const customerSize = customerSrc ? pngSize(customerSrc) : null;
  const showSlider = Boolean(canvas && customerSrc && customerSize);

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const [headline, ...otherMetrics] = project.metrics;

  return (
    <article className="pt-28 sm:pt-32">
      <div className="wrap">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-8">
            <p className="ts text-note text-faint">
              {project.domain[l]} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-[2.5rem] font-normal leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.5rem]">
              {project.title[l]}
            </h1>
            <p className="mt-6 max-w-[48ch] text-lead text-muted">
              {project.tagline[l]}
            </p>
          </div>
          <div className="border-t border-border pt-6 lg:col-span-3 lg:col-start-10 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1">
            <p className="figures font-display text-[3.5rem] leading-none text-ink">
              {formatMetric(headline.value, l)}
            </p>
            <p className="mt-2 text-[15px] text-ink-soft">
              {headline.label[l]}
            </p>
            <ul className="ts mt-6 space-y-1.5 text-note text-muted">
              {otherMetrics.map((m) => (
                <li key={m.value}>
                  <span className="text-ink">{formatMetric(m.value, l)}</span>{" "}
                  {m.label[l]}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Both sides of the system */}
        {showSlider && canvas && customerSrc && customerSize ? (
          <div className="mt-14">
            <ComparisonSlider
              front={
                <Image
                  src={customerSrc}
                  width={customerSize.width}
                  height={customerSize.height}
                  alt={tw("front")}
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="h-auto max-h-full w-auto max-w-full rounded-md"
                />
              }
              back={
                <CanvasImage
                  canvas={canvas}
                  alt={tw("back")}
                  sizes="(min-width: 1024px) 1150px, 100vw"
                  className="rounded"
                />
              }
              frontLabel={tw("front")}
              backLabel={tw("back")}
              ariaLabel={tw("sliderLabel")}
              valueTemplate={tw.raw("sliderValue") as string}
            />
            <p className="ts mt-2 text-note text-faint">{t("demoNote")}</p>
          </div>
        ) : project.loomUrl ? (
          <div className="mt-14">
            <VideoEmbed
              url={project.loomUrl}
              title={`${t("demo")} · ${project.title[l]}`}
              playLabel={t("demo")}
            />
          </div>
        ) : null}

        <div className="mt-20 grid gap-x-6 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <Section title={t("problem")}>
              <p className="prose-tech">{project.problem[l]}</p>
            </Section>

            {gallery.length > 0 && (
              <Section title={t("walkthrough")}>
                <p className="-mt-2 mb-8 max-w-[62ch] text-body text-muted">
                  {t("walkthroughIntro")}
                </p>
                <ProcessGallery
                  steps={gallery}
                  locale={l}
                  labels={{
                    figure: t("figure"),
                    demoNote: t("demoNote"),
                    realCapture: t("realCapture"),
                  }}
                />
              </Section>
            )}

            <Section title={t("architecture")}>
              <FlowDiagram
                locale={l}
                nodes={project.flow.map((n) => ({
                  label: n.label[l],
                  kind: n.kind,
                }))}
              />
            </Section>

            <Section title={t("approach")}>
              <ol className="border-b border-border">
                {project.approach[l].map((step, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-border py-5"
                  >
                    <span className="ts pt-1 text-sm text-faint">{i + 1}</span>
                    <p className="text-body text-ink-soft">{step}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title={t("highlights")}>
              <ul className="space-y-3">
                {project.highlights[l].map((h, i) => (
                  <li key={i} className="flex gap-3 text-body text-ink-soft">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ink" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={t("stack")}>
              <p className="ts text-sm leading-relaxed text-muted">
                {project.stack.join(" · ")}
              </p>
            </Section>

            <div className="mt-16">
              <LeadMagnet />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="theme-night mt-16 flex flex-col items-start gap-6 rounded-lg p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[30ch] font-display text-[1.75rem] leading-snug text-ink">
            {t("ctaTitle")}
          </p>
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("accent", "lg", "shrink-0")}
          >
            {t("ctaButton")}
            <ButtonArrow />
          </a>
        </div>

        {/* Next project */}
        <Link
          href={`/projects/${next.slug}`}
          className="group mb-24 mt-6 flex items-center justify-between gap-6 border-y border-border py-7"
        >
          <div>
            <p className="ts text-note text-faint">{t("nextLabel")}</p>
            <p className="mt-1 font-display text-[1.75rem] text-ink">
              {next.title[l]}
            </p>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 first:mt-0">
      <h2 className="mb-6 font-display text-[2rem] font-normal leading-tight tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
