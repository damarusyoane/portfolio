"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Brandmark } from "@/components/Brandmark";
import { LiveClock, LiveDot } from "@/components/LiveClock";
import { buttonClass } from "@/components/ui/Button";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

const sectionLinks = [
  { key: "services", href: "/#offers" },
  { key: "results", href: "/#work" },
  { key: "process", href: "/#process" },
  { key: "industries", href: "/#industries" },
  { key: "automations", href: "/automations" },
  { key: "pricing", href: "/#pricing" },
  { key: "faq", href: "/#faq" },
  { key: "blog", href: "/blog" },
] as const;

type FooterPost = { slug: string; title: string; date: string };

function reopenCookieBanner() {
  try {
    localStorage.removeItem("cookie-consent");
  } catch {
    // storage unavailable: nothing to reset
  }
  window.dispatchEvent(new Event("consent-updated"));
}

export function Footer({ posts = [] }: { posts?: FooterPost[] }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  const date = (d: string) => {
    try {
      return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-CA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(d));
    } catch {
      return d;
    }
  };

  const contacts = [
    {
      label: "WhatsApp",
      value: siteConfig.phoneDisplay,
      href: whatsappUrl(siteConfig.whatsappMessage[locale]),
      external: true,
    },
    {
      label: t("Book.email"),
      value: siteConfig.email,
      href: mailtoUrl(siteConfig.emailSubject[locale]),
      external: false,
    },
    {
      label: "LinkedIn",
      value: siteConfig.founder,
      href: siteConfig.links.linkedin,
      external: true,
    },
  ];

  return (
    <footer className="theme-night">
      {/* Closing line */}
      <div className="wrap border-b border-border pb-16 pt-20 lg:pb-20 lg:pt-28">
        <p className="max-w-[22ch] font-display text-[2.25rem] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
          {t("Footer.line")}
        </p>
        <p className="mt-6 flex items-center gap-2.5 text-[15px] text-muted">
          <LiveDot />
          <span>
            {t.rich("Footer.clock", {
              time: () => <LiveClock />,
              place: siteConfig.place[locale],
            })}
          </span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("accent", "md")}
          >
            {t("Nav.bookAuditLong")}
          </a>
          <a
            href={whatsappUrl(siteConfig.whatsappMessage[locale])}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-[15px] text-ink"
          >
            {t("Nav.whatsapp")}
          </a>
        </div>
      </div>

      <div className="wrap grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 text-ink">
            <Brandmark size={28} />
            <span className="font-display text-[22px] font-medium">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted">
            {t("Footer.tagline")}
          </p>
        </div>

        <div className="md:col-span-2 md:col-start-5">
          <h2 className="ts text-note text-faint">{t("Footer.sections")}</h2>
          <ul className="mt-4 space-y-2">
            {sectionLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="link-underline text-[15px] text-ink-soft hover:text-ink"
                >
                  {t(`Nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="ts text-note text-faint">{t("Footer.contact")}</h2>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group block text-[15px]"
                >
                  <span className="block text-faint">{c.label}</span>
                  <span className="link-underline text-ink-soft group-hover:text-ink">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {posts.length > 0 && (
          <div className="md:col-span-3">
            <h2 className="ts text-note text-faint">{t("Footer.articles")}</h2>
            <ul className="mt-4 space-y-4">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <span className="ts block text-note text-faint">
                      {date(p.date)}
                    </span>
                    <span className="mt-0.5 block text-[15px] leading-snug text-ink-soft group-hover:text-ink">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-border py-7 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. {t("Footer.rights")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-ink">
            {t("Footer.privacy")}
          </Link>
          <Link href="/legal" className="hover:text-ink">
            {t("Footer.legal")}
          </Link>
          <button
            type="button"
            onClick={reopenCookieBanner}
            className="hover:text-ink"
          >
            {t("Footer.cookies")}
          </button>
          <a href="#top" className="hover:text-ink">
            {t("Footer.backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
