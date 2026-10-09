"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const tn = useTranslations("Nav");
  const locale = useLocale() as Locale;
  return (
    <div className="wrap flex min-h-[80svh] flex-col justify-center pb-24 pt-32">
      <p className="ts text-note text-faint">404</p>
      <h1 className="mt-4 max-w-[18ch] font-display text-display font-normal text-ink">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-[44ch] text-lead text-muted">{t("text")}</p>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/" className={buttonClass("primary", "md")}>
          {t("home")}
        </Link>
        <a
          href={whatsappUrl(siteConfig.whatsappMessage[locale])}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-[16px] text-ink"
        >
          {tn("whatsapp")}
        </a>
      </div>
    </div>
  );
}
