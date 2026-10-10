import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

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
    // `absolute` skips the "· Ottomate" template so long article titles stay
    // under the ~70-char search-result limit.
    title: { absolute: post.meta.title },
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
    <article className="relative pt-28 sm:pt-32">
      <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToList")}
        </Link>

        <Reveal className="mt-10">
          <p className="text-sm text-faint">
            {formatDate(post.meta.date, l)},{" "}
            {t("readingTime", { minutes: post.meta.readingMinutes })}
          </p>
          <h1 className="mt-4 font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
            {post.meta.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="prose-tech mt-10 border-t border-border pt-10">
          <MDXRemote source={post.content} />
        </div>

        <div className="theme-ink my-16 rounded-[var(--radius-card)] p-8 sm:p-10">
          <h2 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.04em] text-ink">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("ctaText")}</p>
          <Button
            href={siteConfig.links.cal}
            external
            variant="accent"
            size="lg"
            arrow
            className="mt-6"
          >
            {t("ctaButton")}
          </Button>
        </div>
      </div>
    </article>
  );
}
