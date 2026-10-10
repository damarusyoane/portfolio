import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
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
    <div className="relative pt-28 sm:pt-32">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <h1 className="font-display text-5xl font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted">{t("empty")}</p>
        ) : (
          <ul className="mb-24 mt-14 border-b border-border">
            {posts.map((post, i) => (
              <li key={post.slug} className="border-t border-border">
                <Reveal delay={Math.min(i * 0.04, 0.2)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:gap-10"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] text-faint">
                        {formatDate(post.date, l)},{" "}
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold leading-snug tracking-[-0.025em] text-ink transition-colors group-hover:text-accent-ink sm:text-[1.75rem]">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-[16px] leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-faint transition-colors group-hover:text-ink sm:block" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
