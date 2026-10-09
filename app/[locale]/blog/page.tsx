import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

  const [lead, ...rest] = posts;

  return (
    <div className="pt-28 sm:pt-32">
      <div className="wrap">
        <h1 className="font-display text-display font-normal text-ink">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[52ch] text-lead text-muted">
          {t("subtitle")}
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted">{t("empty")}</p>
        ) : (
          <div className="mb-24 mt-14">
            {/* Latest article, set large */}
            <Link
              href={`/blog/${lead.slug}`}
              className="group grid gap-6 border-t border-ink py-10 lg:grid-cols-12 lg:gap-x-6"
            >
              <p className="ts text-note text-faint lg:col-span-3">
                {t("latest")} · {formatDate(lead.date, l)} ·{" "}
                {t("readingTime", { minutes: lead.readingMinutes })}
              </p>
              <div className="lg:col-span-8 lg:col-start-5">
                <h2 className="font-display text-[2.25rem] leading-[1.1] tracking-[-0.015em] text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:text-[2.75rem]">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-[60ch] text-lead text-muted">
                  {lead.excerpt}
                </p>
              </div>
            </Link>

            {/* Everything else, as a dated list */}
            <ul className="border-t border-border">
              {rest.map((post) => (
                <li key={post.slug} className="border-b border-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-2 py-6 lg:grid-cols-12 lg:gap-x-6"
                  >
                    <span className="ts pt-1.5 text-note text-faint lg:col-span-3">
                      {formatDate(post.date, l)}
                    </span>
                    <span className="lg:col-span-8 lg:col-start-5">
                      <span className="block font-display text-[1.5rem] leading-snug text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block max-w-[62ch] text-[15px] text-muted">
                        {post.excerpt}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
