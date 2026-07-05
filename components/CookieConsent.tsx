"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function CookieConsent() {
  const t = useTranslations("Cookies");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);

  const decide = (value: "granted" | "denied") => {
    localStorage.setItem("cookie-consent", value);
    window.dispatchEvent(new Event("consent-updated"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl">
      <div className="glass-strong rounded-2xl border border-border-strong p-4 shadow-2xl sm:p-5">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-ink-soft">
            {t("text")}{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2">
              {t("learnMore")}
            </Link>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="h-10 rounded-full border border-border px-5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="h-10 rounded-full px-5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
            }}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
