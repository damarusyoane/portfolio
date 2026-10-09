"use client";

import { useLocale, useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export function WhatsAppFab() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Common");

  return (
    <a
      href={whatsappUrl(siteConfig.whatsappMessage[locale])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappLabel")}
      title={t("whatsappLabel")}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-10px_rgba(22,21,18,0.55)] transition-transform hover:scale-105"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
