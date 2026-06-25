"use client";

import { useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="relative grid min-h-[80svh] place-items-center px-5">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-0 aurora opacity-40" />
      <div className="relative text-center">
        <p className="text-gradient-animated font-display text-7xl font-bold sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">{t("text")}</p>
        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-bg"
          style={{
            backgroundImage:
              "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
          }}
        >
          <Home className="h-4 w-4" />
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
