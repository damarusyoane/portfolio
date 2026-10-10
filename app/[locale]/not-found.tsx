"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="grid min-h-[80svh] place-items-center px-5 pt-16">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold tracking-[-0.05em] text-brand sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">{t("text")}</p>
        <Link href="/" className={buttonClass("primary", "md", "mt-8")}>
          {t("home")}
          <ButtonArrow />
        </Link>
      </div>
    </div>
  );
}
