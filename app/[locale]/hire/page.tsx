import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Download, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hire" });
  return {
    title: `${t("title")} — ${siteConfig.founder}`,
    description: t("subtitle"),
  };
}

export default async function HirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hire");

  const cvs = [
    { label: t("downloadEn"), href: "/cv/Damarus-Ngankou-CV-EN.pdf" },
    { label: t("downloadFr"), href: "/cv/Damarus-Ngankou-CV-FR.pdf" },
  ];

  return (
    <main className="pt-28">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backHome")}
          </Link>

          <div className="mt-6 max-w-2xl">
            <Badge dot>{t("badge")}</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {t("subtitle")}
            </p>
          </div>

          {/* CV download card */}
          <div className="glass mt-8 max-w-2xl rounded-3xl p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-ink">
              {t("cvTitle")}
            </h2>
            <p className="mt-1.5 text-sm text-muted">{t("cvText")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {cvs.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-white/25"
                >
                  <Download className="h-4 w-4 text-accent" />
                  {cv.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Experience />
      <Skills />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
            }}
          >
            {t("contactCta")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

export const dynamic = "force-static";
