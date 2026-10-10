"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";

function subscribe(onChange: () => void) {
  window.addEventListener("consent-updated", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("consent-updated", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function CookieConsent() {
  const t = useTranslations("Cookies");
  // null = no choice stored yet. On the server we render nothing.
  const consent = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("cookie-consent"),
    () => "pending-hydration",
  );

  const decide = (value: "granted" | "denied") => {
    localStorage.setItem("cookie-consent", value);
    window.dispatchEvent(new Event("consent-updated"));
  };

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[25rem]">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Cookies"
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-[var(--shadow-lift)] min-[480px]:flex-row min-[480px]:items-center sm:flex-col sm:items-stretch"
      >
        <p className="text-[13px] leading-snug text-ink-soft">
          {t("text")}{" "}
          <Link
            href="/privacy"
            className="font-medium text-ink underline underline-offset-2"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("granted")}
            className={buttonClass("primary", "sm", "flex-1 sm:flex-none")}
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className={buttonClass("secondary", "sm", "flex-1 sm:flex-none")}
          >
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}
