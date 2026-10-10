"use client";

import { useLocale, useTranslations } from "next-intl";
import { Mail, ArrowUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/Brandmark";
import { LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

const sectionLinks = [
  { key: "services", href: "/#offers" },
  { key: "results", href: "/#work" },
  { key: "industries", href: "/#industries" },
  { key: "automations", href: "/automations" },
  { key: "pricing", href: "/#pricing" },
  { key: "faq", href: "/#faq" },
  { key: "blog", href: "/blog" },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  const contacts = [
    {
      label: "WhatsApp",
      value: siteConfig.phoneDisplay,
      href: whatsappUrl(siteConfig.whatsappMessage[locale]),
      icon: WhatsappIcon,
      external: true,
    },
    {
      label: t("Contact.emailDirect"),
      value: siteConfig.email,
      href: mailtoUrl(siteConfig.emailSubject[locale]),
      icon: Mail,
      external: false,
    },
    {
      label: "LinkedIn",
      value: siteConfig.founder,
      href: siteConfig.links.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
  ];

  return (
    <footer className="theme-ink relative">
      {/* Closing call to action */}
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border pb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.045em] text-ink sm:text-[4.2rem]">
              {t("Footer.ctaTitle")}
            </p>
            <p className="mt-4 text-lg text-muted">{t("Footer.ctaText")}</p>
          </div>
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("accent", "lg", "shrink-0")}
          >
            {t("Nav.bookAuditLong")}
            <ButtonArrow />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.8fr_1.2fr]">
          <div>
            <Wordmark className="text-ink" />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              {t("Footer.tagline")}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
              {t("Footer.sections")}
            </h2>
            <ul className="space-y-2.5">
              {sectionLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="link-underline text-[15px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {t(`Nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
              {t("Footer.elsewhere")}
            </h2>
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-[15px] text-ink-soft transition-colors hover:text-ink"
                  >
                    <c.icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                    <span>
                      <span className="sr-only">{c.label}: </span>
                      {c.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. {t("Footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              {t("Footer.privacy")}
            </Link>
            <Link href="/legal" className="transition-colors hover:text-ink">
              {t("Footer.legal")}
            </Link>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              {t("Footer.backToTop")}
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
