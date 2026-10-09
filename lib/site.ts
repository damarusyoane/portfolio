import type { Locale } from "@/i18n/routing";

/**
 * Central identity / contact configuration.
 *
 * Everything under `assets` and `claims` defaults to null/false: the site
 * renders an honest fallback until the owner supplies the real thing.
 */
export const siteConfig = {
  name: "Ottomate",
  founder: "Damarus Ngankou",

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
    fr: "Fondateur, ingénieur IA & automatisation",
  } as Record<Locale, string>,

  // Shown with the live clock ("It's 23:12 in Cameroon"). Follows the +237
  // number; set a city here once confirmed.
  timezone: "Africa/Douala",
  place: {
    en: "in Cameroon",
    fr: "au Cameroun",
  } as Record<Locale, string>,
  city: null as string | null,
  // Usual reply hours, e.g. { fr: "de 8 h à 19 h", en: "8 am to 7 pm" }.
  hours: null as Record<Locale, string> | null,

  // Owner-supplied files (paths under /public). Null = not rendered at all.
  assets: {
    founderPhoto: null as string | null,
    signatureSvg: null as string | null,
  },

  // Statements the site may only make once the owner confirms them.
  claims: {
    // Ottomate's own WhatsApp is answered by its assistant.
    ownWhatsappAnsweredByAssistant: false,
    // Show a "recommended" label on the middle plan.
    popularPlan: false,
  },

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
};

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject?: string) {
  const base = `mailto:${siteConfig.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
