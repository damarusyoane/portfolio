"use client";

import { useLocale, useTranslations } from "next-intl";
import { Mail, MessageCircle, ArrowUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Brandmark } from "@/components/Brandmark";
import { LinkedinIcon } from "@/components/icons";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

const sectionLinks = [
  { key: "work", href: "/#work" },
  { key: "catalog", href: "/#catalog" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "experience", href: "/#experience" },
  { key: "blog", href: "/blog" },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  const socials = [
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon, external: true },
    { label: t("Contact.emailDirect"), href: mailtoUrl(), icon: Mail, external: false },
    { label: "WhatsApp", href: whatsappUrl(), icon: MessageCircle, external: true },
  ];

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="aurora pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Brandmark size={36} />
              <span className="font-display text-base font-semibold text-ink">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("Footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {t("Footer.sections")}
            </h3>
            <ul className="space-y-2.5">
              {sectionLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {t(`Nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {t("Footer.elsewhere")}
            </h3>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. {t("Footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              {t("Footer.backToTop")}
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      <span className="sr-only">{locale}</span>
    </footer>
  );
}
