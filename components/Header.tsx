"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Brandmark } from "@/components/Brandmark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "work", href: "/#work" },
  { key: "catalog", href: "/#catalog" },
  { key: "skills", href: "/#skills" },
  { key: "experience", href: "/#experience" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={siteConfig.name}
        >
          <Brandmark size={34} />
          <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 md:inline-flex"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
            }}
          >
            {t("hireMe")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base text-ink-soft transition-colors hover:bg-white/5"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-base font-medium text-bg"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
            }}
          >
            {t("hireMe")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="mt-3 px-1">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
