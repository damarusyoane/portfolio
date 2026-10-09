import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr" ? "Politique de confidentialité" : "Privacy Policy";
  return {
    title,
    robots: { index: false, follow: true },
  };
}

type Section = { h: string; p: string[] };

const data: Record<Locale, { title: string; updated: string; sections: Section[] }> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "1. Introduction",
        p: [
          `This Privacy Policy explains how ${siteConfig.name} ("I", "me") collects and uses your personal data when you use this website. I take your privacy seriously and only collect what is needed to run this site and respond to you.`,
        ],
      },
      {
        h: "2. Data I collect",
        p: [
          "Contact form: your name, email, subject and message — so I can reply to your enquiry.",
          "Booking: when you book a call, scheduling data is handled by Cal.com.",
          "Analytics & marketing: with your consent, cookies from Google Analytics, Google Ads and the Meta (Facebook) Pixel help me understand traffic and measure advertising. These are not loaded until you accept.",
          "Technical: standard server logs (IP, browser) kept briefly for security.",
        ],
      },
      {
        h: "3. Why I use it",
        p: [
          "To respond to your messages and provide my services, to improve the website, and — only with your consent — to measure and improve advertising.",
        ],
      },
      {
        h: "4. Service providers",
        p: [
          "I use trusted providers who process data on my behalf: Brevo (contact emails), Google (Analytics & Ads), Meta (Pixel), Cal.com (bookings) and Vercel (hosting). Each has its own privacy policy.",
        ],
      },
      {
        h: "5. Cookies & consent",
        p: [
          "Essential cookies keep the site working. Analytics and marketing cookies only run after you click “Accept” in the cookie banner — you can decline, and the site works fully either way.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          `You can ask to access, correct or delete your data, or object to its use, at any time. Just email me at ${siteConfig.email}.`,
        ],
      },
      {
        h: "7. Retention & security",
        p: [
          "I keep contact data only as long as needed to handle your request, and apply reasonable measures (managed credentials, least-access) to protect it.",
        ],
      },
      {
        h: "8. Contact",
        p: [`Questions about this policy? Email ${siteConfig.email}.`],
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : juillet 2026",
    sections: [
      {
        h: "1. Introduction",
        p: [
          `Cette politique explique comment ${siteConfig.name} (« je », « moi ») collecte et utilise vos données personnelles lorsque vous utilisez ce site. Je prends votre vie privée au sérieux et ne collecte que le nécessaire pour faire fonctionner le site et vous répondre.`,
        ],
      },
      {
        h: "2. Données collectées",
        p: [
          "Formulaire de contact : vos nom, email, sujet et message — pour répondre à votre demande.",
          "Réservation : lorsque vous réservez un appel, les données de planification sont gérées par Cal.com.",
          "Analytics & marketing : avec votre consentement, des cookies Google Analytics, Google Ads et le Pixel Meta (Facebook) m'aident à comprendre le trafic et à mesurer la publicité. Ils ne se chargent qu'après acceptation.",
          "Techniques : journaux serveur standard (IP, navigateur) conservés brièvement pour la sécurité.",
        ],
      },
      {
        h: "3. Finalités",
        p: [
          "Pour répondre à vos messages et fournir mes services, améliorer le site, et — uniquement avec votre consentement — mesurer et améliorer la publicité.",
        ],
      },
      {
        h: "4. Prestataires",
        p: [
          "J'utilise des prestataires de confiance qui traitent des données pour mon compte : Brevo (emails de contact), Google (Analytics & Ads), Meta (Pixel), Cal.com (réservations) et Vercel (hébergement). Chacun a sa propre politique de confidentialité.",
        ],
      },
      {
        h: "5. Cookies & consentement",
        p: [
          "Les cookies essentiels font fonctionner le site. Les cookies d'analyse et de marketing ne s'activent qu'après avoir cliqué « Accepter » dans le bandeau — vous pouvez refuser, le site fonctionne pleinement dans les deux cas.",
        ],
      },
      {
        h: "6. Vos droits",
        p: [
          `Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou vous opposer à leur usage, à tout moment. Écrivez-moi à ${siteConfig.email}.`,
        ],
      },
      {
        h: "7. Conservation & sécurité",
        p: [
          "Je conserve les données de contact seulement le temps nécessaire au traitement de votre demande, et applique des mesures raisonnables (identifiants managés, moindre accès) pour les protéger.",
        ],
      },
      {
        h: "8. Contact",
        p: [`Une question sur cette politique ? Écrivez à ${siteConfig.email}.`],
      },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const d = data[locale as Locale];

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="font-display text-4xl font-normal tracking-[-0.02em] text-ink sm:text-5xl">
          {d.title}
        </h1>
        <p className="mt-2 text-sm text-faint">{d.updated}</p>
        <div className="prose-tech mt-8">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
