import type { Locale } from "@/i18n/routing";

/**
 * Central identity / contact configuration.
 * NOTE: values marked `// TODO` are placeholders to confirm with Damarus.
 */
export const siteConfig = {
  name: "Damarus Ngankou",
  initials: "DN",
  roleKey: "role", // resolved from messages per-locale

  email: "damarusngankou@gmail.com",
  // Digits only, international format, no "+".
  whatsapp: "237674411479",
  // E.164 for tel:.
  phone: "+237674411479",

  links: {
    linkedin: "https://www.linkedin.com/in/damarus-ngankou-aaab6622a",
  },

  locationLabel: {
    en: "Open to relocation & remote work",
    fr: "Ouvert à la relocalisation & au télétravail",
  } as Record<Locale, string>,

  availability: {
    en: "Available for roles & freelance",
    fr: "Disponible — emploi & freelance",
  } as Record<Locale, string>,

  // Public base URL (overridden by env in production).
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://damarus-ngankou.vercel.app",
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject?: string) {
  const base = `mailto:${siteConfig.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
