import type { Locale } from "@/i18n/routing";

/**
 * Central identity / contact configuration.
 */
export const siteConfig = {
  name: "Ottomate",
  founder: "Damarus Ngankou",
  initials: "Ot",

  email: "contact@ottomateagency.com",
  // Digits only, international format, no "+".
  whatsapp: "237674411479",
  // E.164 for tel:.
  phone: "+237674411479",
  phoneDisplay: "+237 674 41 14 79",

  links: {
    linkedin: "https://www.linkedin.com/in/damarus-ngankou-aaab6622a",
    // Cal.com free-audit booking link (30-min event).
    cal: "https://cal.com/ottomateagency/30min",
  },

  founderRole: {
    en: "Founder, AI & automation engineer",
    fr: "Fondateur, ingénieur IA et automatisation",
  } as Record<Locale, string>,

  locationLabel: {
    en: "Working remotely with clients worldwide.",
    fr: "À distance, avec des clients partout dans le monde.",
  } as Record<Locale, string>,

  availability: {
    en: "Taking on new projects",
    fr: "Ouvert aux nouveaux projets",
  } as Record<Locale, string>,

  // Pre-filled WhatsApp opener, in the visitor's language.
  whatsappMessage: {
    en: "Hello Ottomate, I'd like to automate part of my business. Can we talk?",
    fr: "Bonjour Ottomate, j'aimerais automatiser une partie de mon activité. On peut en parler ?",
  } as Record<Locale, string>,

  emailSubject: {
    en: "Automation project",
    fr: "Projet d'automatisation",
  } as Record<Locale, string>,

  // Public base URL (overridden by env in production).
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://ottomateagency.com",
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject?: string) {
  const base = `mailto:${siteConfig.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
