import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { en: "/en/blog", fr: "/fr/blog" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getAllPosts(l);

  return (
    <div className="relative pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] aurora opacity-40" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t("back")}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{t("subtitle")}</p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted">{t("empty")}</p>
        ) : (
          <div className="mt-12 mb-24 space-y-4">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 text-xs text-faint">
                      <span>{formatDate(post.date, l)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2 py-0.5 text-[11px] text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent sm:block" />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
