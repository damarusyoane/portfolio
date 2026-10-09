"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** "FR / EN" as two text links; the current language is underlined. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: "en" | "fr") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium",
        isPending && "opacity-60",
        className,
      )}
      role="group"
      aria-label={t("language")}
    >
      {(["fr", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="text-faint" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={locale === l ? "true" : undefined}
            aria-label={l === "fr" ? t("switchToFr") : t("switchToEn")}
            className={cn(
              "uppercase underline-offset-4 transition-colors",
              locale === l
                ? "text-ink underline decoration-1"
                : "text-muted hover:text-ink",
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
