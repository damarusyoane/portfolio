"use client";

import { useLocale, useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/** Desktop only; on phones the MobileActionBar carries WhatsApp. */
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
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-10px_rgb(18_20_23/0.5)] transition-transform hover:scale-105 lg:grid"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
