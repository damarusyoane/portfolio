"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
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
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-white/[0.03] p-0.5 text-xs font-medium",
        isPending && "opacity-60",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-white/10 text-ink"
              : "text-faint hover:text-ink-soft",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
