"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Clock } from "lucide-react";
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
        month: "short",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return date;
    }
  };

  return (
    <section id="blog" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Reveal>
            <Link
              href="/blog"
              className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {t("viewAll")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 0.08, 0.3)}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 hover:-translate-y-1 hover:border-border-strong"
              >
                <div className="flex items-center gap-3 text-xs text-faint">
                  <span>{fmt(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {t("readingTime", { minutes: post.readingMinutes })}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 text-[11px] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {t("readMore")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
