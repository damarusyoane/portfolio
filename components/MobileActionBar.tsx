"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { WhatsappIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui/Button";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const BAR_HEIGHT = 64;

/**
 * Phones only: a fixed "Free audit / WhatsApp" bar that appears once the
 * hero CTA has scrolled away and steps aside while the booking section is
 * on screen (it has the same buttons).
 */
export function MobileActionBar() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [heroGone, setHeroGone] = useState(false);
  // Remember which page the "booking section visible" reading belongs to,
  // so it never carries over after a client-side navigation.
  const [book, setBook] = useState({ path: "", visible: false });

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const book = document.getElementById("book");
    const observers: IntersectionObserver[] = [];
    let onScroll: (() => void) | null = null;

    if (hero) {
      const io = new IntersectionObserver(([e]) =>
        setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0),
      );
      io.observe(hero);
      observers.push(io);
    } else {
      onScroll = () => setHeroGone(window.scrollY > 400);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Pages without a booking section never hide the bar for it.
    if (book) {
      const io = new IntersectionObserver(([e]) =>
        setBook({ path: pathname, visible: e.isIntersecting }),
      );
      io.observe(book);
      observers.push(io);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const bookVisible = book.path === pathname && book.visible;
  const show = heroGone && !bookVisible;

  // Keep the page's last lines reachable while the bar is up (phones only).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    document.body.style.paddingBottom =
      show && mq.matches ? `${BAR_HEIGHT}px` : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [show]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg pb-[env(safe-area-inset-bottom)] transition-transform duration-200 ease-[var(--ease-out-soft)] lg:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!show}
    >
      <div className="grid h-16 grid-cols-2 gap-2 px-3 py-2">
        <a
          href={siteConfig.links.cal}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className={buttonClass("accent", "sm", "h-full")}
        >
          {t("bookAudit")}
        </a>
        <a
          href={whatsappUrl(siteConfig.whatsappMessage[locale])}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className={buttonClass("outline", "sm", "h-full")}
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
