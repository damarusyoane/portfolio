import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { routing, type Locale } from "@/i18n/routing";
import { projects, getProject } from "@/lib/projects";
import { accentColor, accentGradient } from "@/lib/utils";

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

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="relative pt-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] grid-bg opacity-60" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: accent }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1"
              style={{
                color: accent,
                backgroundColor: "color-mix(in oklab, " + accent + " 12%, transparent)",
              }}
            >
              {project.domain[l]}
            </span>
            <span>{project.year}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {project.title[l]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {project.tagline[l]}
          </p>
        </Reveal>

        {/* Metrics */}
        <Reveal className="mt-10">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {project.metrics.map((m) => (
              <div key={m.value} className="bg-surface p-5 text-center">
                <div
                  className="font-display text-2xl font-bold sm:text-3xl"
                  style={{ color: accent }}
                >
                  {m.value}
                </div>
                <div className="mt-1 text-xs leading-tight text-faint">
                  {m.label[l]}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Workflow screenshot */}
        {project.screenshot && (
          <Reveal className="mt-10">
            <ScreenshotFrame
              src={project.screenshot}
              alt={`${project.title[l]} — n8n workflow`}
              caption={`workflow · ${project.slug}`}
            />
          </Reveal>
        )}

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

        {/* Problem */}
        <Section title={t("problem")}>
          <p className="prose-tech text-base">{project.problem[l]}</p>
        </Section>

        {/* Approach */}
        <Section title={t("approach")}>
          <ol className="space-y-4">
            {project.approach[l].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-semibold"
                  style={{ color: accent, borderColor: accent }}
                >
                  {i + 1}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-ink-soft">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Highlights */}
        <Section title={t("highlights")}>
          <ul className="space-y-3">
            {project.highlights[l].map((h, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                <Check className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} />
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
                className="rounded-lg border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Reveal className="mt-16">
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{ background: accentGradient(project.accent) }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {t("ctaTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted">{t("ctaText")}</p>
              <div className="mt-6 flex justify-center">
                <Button href="/#contact">{t("ctaButton")}</Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next project */}
        <Link
          href={`/projects/${next.slug}`}
          className="group mb-24 mt-8 flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-faint">
              {t("nextLabel")}
            </div>
            <div className="mt-1 font-display text-lg font-semibold text-ink">
              {next.title[l]}
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
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
    <Reveal className="mt-14">
      <h2 className="mb-5 font-display text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
