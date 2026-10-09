"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Brandmark } from "@/components/Brandmark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { buttonClass } from "@/components/ui/Button";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const navItems = [
  { key: "services", href: "/#offers" },
  { key: "results", href: "/#work" },
  { key: "pricing", href: "/#pricing" },
  { key: "faq", href: "/#faq" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-bg transition-[border-color] duration-200",
        scrolled || open ? "border-border" : "border-transparent",
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink"
          aria-label={siteConfig.name}
          onClick={() => setOpen(false)}
        >
          <Brandmark size={28} />
          <span className="font-display text-[22px] font-medium tracking-[-0.01em]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="link-underline text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher />
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("accent", "sm")}
          >
            {t("bookAudit")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid h-11 w-11 place-items-center text-ink lg:hidden"
          aria-label={open ? tc("close") : tc("menu")}
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-bg lg:hidden"
      >
        <nav className="wrap flex flex-col pb-10 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-display text-[28px] leading-tight text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={buttonClass("accent", "lg", "mt-8 w-full")}
          >
            {t("bookAuditLong")}
          </a>
          <a
            href={whatsappUrl(siteConfig.whatsappMessage[locale])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={buttonClass("outline", "lg", "mt-3 w-full")}
          >
            {t("whatsapp")}
          </a>
          <LanguageSwitcher className="mt-8 text-base" />
        </nav>
      </div>
    </header>
  );
}
