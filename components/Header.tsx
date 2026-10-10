"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/Brandmark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "services", href: "/#offers" },
  { key: "results", href: "/#work" },
  { key: "process", href: "/#process" },
  { key: "pricing", href: "/#pricing" },
  { key: "faq", href: "/#faq" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
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
        "theme-ink fixed inset-x-0 top-0 z-50 transition-shadow duration-300",
        (scrolled || open) && "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center text-ink"
          aria-label={siteConfig.name}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-accent"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapped so `hidden` doesn't fight the components' own display class */}
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSwitcher />
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("accent", "sm")}
            >
              {t("bookAudit")}
              <ButtonArrow />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border-strong text-ink lg:hidden"
            aria-label={open ? tc("close") : tc("menu")}
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden bg-bg transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[calc(100svh-68px)] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 pb-6 pt-2 sm:px-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rule py-4 font-display text-2xl font-bold tracking-[-0.02em] text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={buttonClass("accent", "lg", "mt-4 w-full")}
          >
            {t("bookAuditLong")}
            <ButtonArrow />
          </a>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
