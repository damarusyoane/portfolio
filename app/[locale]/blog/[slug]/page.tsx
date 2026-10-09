import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
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
    <article className="pt-28 sm:pt-32">
      <div className="wrap">
        <div className="mx-auto max-w-[44rem]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToList")}
          </Link>

          <header className="mt-10 border-b border-border pb-8">
            <p className="ts text-note text-faint">
              {formatDate(post.meta.date, l)} ·{" "}
              {t("readingTime", { minutes: post.meta.readingMinutes })}
            </p>
            <h1 className="mt-4 font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.025em] text-ink sm:text-[3.25rem]">
              {post.meta.title}
            </h1>
            <p className="mt-5 text-[15px] text-muted">
              {t("byline", { name: siteConfig.founder })}
              {post.meta.tags.length > 0 && (
                <span className="ts text-note text-faint">
                  {" "}
                  · {post.meta.tags.join(", ")}
                </span>
              )}
            </p>
          </header>

          <div className="prose-tech mt-10">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-16">
            <LeadMagnet />
          </div>

          <div className="theme-night mb-24 mt-6 rounded-lg p-8 sm:p-10">
            <p className="max-w-[28ch] font-display text-[1.75rem] leading-snug text-ink">
              {t("ctaTitle")}
            </p>
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
      </div>
    </article>
  );
}
