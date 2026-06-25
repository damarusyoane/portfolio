import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, fr: `/fr/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.excerpt,
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const post = getPost(l, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <article className="relative pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] grid-bg opacity-50" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[620px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-accent-2)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToList")}
        </Link>

        <Reveal className="mt-8">
          <div className="flex items-center gap-3 text-xs text-faint">
            <span>{formatDate(post.meta.date, l)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {t("readingTime", { minutes: post.meta.readingMinutes })}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.meta.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-[11px] text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="prose-tech mt-10">
          <MDXRemote source={post.content} />
        </div>

        <div className="my-16 glass rounded-3xl p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-ink">
            {t("ctaTitle")}
          </h2>
          <div className="mt-5 flex justify-center">
            <Button href="/#contact">{t("ctaButton")}</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
