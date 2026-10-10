import type { Locale } from "@/i18n/routing";

/**
 * Central identity / contact configuration.
 */
export const siteConfig = {
  name: "Ottomate",
  founder: "Damarus Ngankou",
  initials: "Ot",

  email: "contact@ottomateagency.com",

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

  emailSubject: {
    en: "Automation project",
    fr: "Projet d'automatisation",
  } as Record<Locale, string>,

  // Public base URL (overridden by env in production).
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://ottomateagency.com",
} as const;

export function mailtoUrl(subject?: string) {
  const base = `mailto:${siteConfig.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
