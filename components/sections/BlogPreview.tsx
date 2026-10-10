"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import type { PostMeta } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  const t = useTranslations("BlogPreview");
  const locale = useLocale() as Locale;

  if (posts.length === 0) return null;

  const fmt = (date: string) => {
    try {
      return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return date;
    }
  };

  return (
    <section id="blog" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Reveal>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink"
            >
              <span className="link-underline">{t("viewAll")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 border-b border-border">
          {posts.map((post, i) => (
            <li key={post.slug} className="border-t border-border">
              <Reveal delay={Math.min(i * 0.06, 0.2)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[10rem_1fr_auto] md:items-baseline"
                >
                  <p className="text-[13px] text-faint">
                    {fmt(post.date)}
                    <span className="md:block">
                      <span className="md:hidden"> · </span>
                      {t("readingTime", { minutes: post.readingMinutes })}
                    </span>
                  </p>
                  <div>
                    <h3 className="font-display text-[1.45rem] font-normal leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-ink sm:text-[1.6rem]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink md:mt-0">
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
