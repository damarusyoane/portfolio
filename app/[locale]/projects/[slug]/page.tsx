import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { Reveal } from "@/components/Reveal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { routing, type Locale } from "@/i18n/routing";
import { projects, getProject } from "@/lib/projects";
import { getGallery } from "@/lib/galleries";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
import { accentColor, formatMetric } from "@/lib/utils";
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
  const accent = accentColor(project.accent);
  const gallery = getGallery(slug);

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="relative pt-28 sm:pt-32">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <Reveal className="mt-10">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium" style={{ color: accent }}>
              {project.domain[l]}
            </span>
            <span className="text-faint">{project.year}</span>
          </p>
          <h1 className="mt-4 font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[3.4rem]">
            {project.title[l]}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {project.tagline[l]}
          </p>
        </Reveal>

        {/* Metrics */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <div
                key={m.value}
                className={
                  "p-6 sm:p-7" +
                  (i > 0
                    ? " border-t border-border sm:border-l sm:border-t-0"
                    : "")
                }
              >
                <p className="hl inline font-display text-4xl font-extrabold tracking-[-0.04em] text-ink">
                  {formatMetric(m.value, l)}
                </p>
                <p className="mt-2 text-sm leading-snug text-muted">
                  {m.label[l]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Problem */}
        <Section title={t("problem")}>
          <p className="prose-tech">{project.problem[l]}</p>
        </Section>

        {/* Step-by-step walkthrough in screenshots */}
        {gallery.length > 0 ? (
          <Section title={t("walkthrough")}>
            <p className="-mt-1 mb-8 max-w-2xl text-[16px] leading-relaxed text-muted">
              {t("walkthroughIntro")}
            </p>
            <ProcessGallery steps={gallery} locale={l} accent={accent} />
          </Section>
        ) : project.loomUrl ? (
          <Reveal className="mt-12">
            <VideoEmbed
              url={project.loomUrl}
              title={`${t("demo")}: ${project.title[l]}`}
              playLabel={t("demo")}
            />
          </Reveal>
        ) : project.screenshot ? (
          <Reveal className="mt-12">
            <ScreenshotFrame
              src={project.screenshot}
              alt={project.title[l]}
              caption={project.title[l]}
            />
          </Reveal>
        ) : null}

        {/* Architecture */}
        <Section title={t("architecture")}>
          <FlowDiagram
            locale={l}
            nodes={project.flow.map((n) => ({
              label: n.label[l],
              kind: n.kind,
            }))}
          />
        </Section>

        {/* Approach */}
        <Section title={t("approach")}>
          <ol className="border-b border-border">
            {project.approach[l].map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-border py-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent font-display text-[15px] font-extrabold text-[#0c1f18]">
                  {i + 1}
                </span>
                <p className="text-[16px] leading-relaxed text-ink-soft">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Highlights */}
        <Section title={t("highlights")}>
          <ul className="space-y-3.5">
            {project.highlights[l].map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-[16px] leading-relaxed text-ink-soft"
              >
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent-2" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Stack */}
        <Section title={t("stack")}>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border-strong px-3.5 py-1.5 text-sm text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Reveal className="mt-20">
          <div className="theme-ink flex flex-col items-start gap-6 rounded-[var(--radius-card)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-ink">
                {t("ctaTitle")}
              </h2>
              <p className="mt-2 max-w-md text-muted">{t("ctaText")}</p>
            </div>
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
        </Reveal>

        {/* Next project */}
        <Link
          href={`/projects/${next.slug}`}
          className="group mb-24 mt-6 flex items-center justify-between gap-6 border-y border-border py-7"
        >
          <div>
            <p className="text-sm text-faint">{t("nextLabel")}</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-[-0.025em] text-ink transition-colors group-hover:text-accent-ink">
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
    <Reveal className="mt-16">
      <h2 className="mb-6 font-display text-[1.75rem] font-extrabold tracking-[-0.04em] text-ink sm:text-[2rem]">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
