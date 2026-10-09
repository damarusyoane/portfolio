import type { Locale } from "@/i18n/routing";

type L = Record<Locale, string>;

export type GalleryStep = {
  /**
   * Public path of the screenshot. Drop the PNG at `public/<src>`.
   * - a single string  → one shared image (language-neutral: canvas, data tables…)
   * - a { fr, en } map → one image per language (customer-facing replies/emails).
   */
  src: string | L;
  /** Short step title. */
  title: L;
  /** One-sentence explanation of what this screenshot shows. */
  caption: L;
};

/**
 * FR/EN variant helper: `/projects/<slug>/<base>-fr<suffix>.png` and `-en<suffix>.png`.
 * `-clean` files are cropped copies of the raw captures (mail client chrome and
 * personal addresses removed); the raw captures live in captures-raw/, outside
 * public/, and are never deployed.
 */
function bi(slug: string, base: string, suffix = ""): L {
  return {
    fr: `/projects/${slug}/${base}-fr${suffix}.png`,
    en: `/projects/${slug}/${base}-en${suffix}.png`,
  };
}

/**
 * Per-project "how it works, in pictures" walkthroughs.
 * Keyed by project slug. Each step points to a screenshot the user drops into
 * `public/projects/<slug>/`. Until the file exists, a clean placeholder shows.
 */
export const galleries: Record<string, GalleryStep[]> = {
  "instant-lead-response": [
    {
      src: "/projects/instant-lead-response/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "The full flow in n8n: a lead comes in, the AI qualifies it, then the reply and the alert go out, automatically.",
        fr: "Le parcours complet dans n8n : un lead arrive, l’IA le qualifie, puis la réponse et l’alerte partent, automatiquement.",
      },
    },
    {
      src: bi("instant-lead-response", "02-reponse-client", "-clean"),
      title: { en: "What the customer receives", fr: "Ce que reçoit le client" },
      caption: {
        en: "In under a minute, the prospect gets a warm, tailored reply, in their own language.",
        fr: "En moins d’une minute, le prospect reçoit une réponse chaleureuse et personnalisée, dans sa langue.",
      },
    },
    {
      src: bi("instant-lead-response", "03-alerte-entreprise", "-clean"),
      title: { en: "What the business receives", fr: "Ce que reçoit l’entreprise" },
      caption: {
        en: "The team is alerted with the score, a summary and the request, by email, WhatsApp or straight into the CRM.",
        fr: "L’équipe est alertée avec le score, un résumé et la demande, par email, WhatsApp ou directement dans le CRM.",
      },
    },
  ],
  "whatsapp-ai-assistant": [
    {
      src: "/projects/whatsapp-ai-assistant/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "Inbound WhatsApp message → answer grounded in the business profile → buying-intent detection.",
        fr: "Message WhatsApp entrant → réponse ancrée sur la fiche entreprise → détection d’intention d’achat.",
      },
    },
    {
      src: bi("whatsapp-ai-assistant", "02-reponse-client", "-clean"),
      title: { en: "The reply to the customer", fr: "La réponse au client" },
      caption: {
        en: "The customer gets an instant answer with the real business info (never an invented price), in their language.",
        fr: "Le client reçoit une réponse instantanée avec les vraies infos de l’entreprise (jamais de prix inventé), dans sa langue.",
      },
    },
    {
      src: bi("whatsapp-ai-assistant", "03-alerte-lead", "-clean"),
      title: { en: "The lead alert", fr: "L’alerte lead" },
      caption: {
        en: "The moment a customer shows they want to buy, the owner is notified.",
        fr: "Dès qu’un client montre qu’il veut acheter, le patron est notifié.",
      },
    },
  ],
  "rag-knowledge-assistant": [
    {
      src: "/projects/rag-knowledge-assistant/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "Question → retrieval of the relevant passages → grounded answer with citations.",
        fr: "Question → récupération des passages pertinents → réponse ancrée avec citations.",
      },
    },
    {
      src: bi("rag-knowledge-assistant", "02-question", "-clean"),
      title: { en: "The customer’s question", fr: "La question du client" },
      caption: {
        en: "The customer asks a plain-language question (French or English).",
        fr: "Le client pose une question en langage naturel (français ou anglais).",
      },
    },
    {
      src: bi("rag-knowledge-assistant", "03-reponse-sourcee", "-clean"),
      title: { en: "The sourced answer", fr: "La réponse sourcée" },
      caption: {
        en: "The assistant answers strictly from your documents, with the sources cited, and admits it when it doesn’t know.",
        fr: "L’assistant répond uniquement à partir de vos documents, avec les sources citées, et l’avoue quand il ne sait pas.",
      },
    },
  ],
  "appointment-reminder-system": [
    {
      src: "/projects/appointment-reminder-system/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "It reads the appointments, computes the time left, and sends reminders 24h and 2h before.",
        fr: "Il lit les rendez-vous, calcule le temps restant et envoie les rappels 24 h et 2 h avant.",
      },
    },
    {
      src: bi("appointment-reminder-system", "02-rappel-client", "-clean"),
      title: { en: "The reminder the client gets", fr: "Le rappel reçu par le client" },
      caption: {
        en: "A clear reminder with the exact slot, in the client’s language.",
        fr: "Un rappel clair avec le créneau exact, dans la langue du client.",
      },
    },
    {
      src: "/projects/appointment-reminder-system/03-agenda-clean.png",
      title: { en: "The appointments source", fr: "La source des rendez-vous" },
      caption: {
        en: "A simple sheet or calendar feeds the whole flow: cancelled slots are skipped, no one is reminded twice.",
        fr: "Un simple tableau ou agenda alimente tout le flux : les annulations sont ignorées, personne n’est relancé deux fois.",
      },
    },
  ],
  "payment-reminder-engine": [
    {
      src: "/projects/payment-reminder-engine/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "It reads the invoices, skips the paid ones, and chases the rest with an escalating tone.",
        fr: "Il lit les factures, ignore les payées et relance le reste avec un ton progressif.",
      },
    },
    {
      src: bi("payment-reminder-engine", "02-relance-client", "-clean"),
      title: { en: "The reminder received", fr: "La relance reçue" },
      caption: {
        en: "A polite reminder with the invoice and amount, in the client’s language (friendly, firm or urgent depending on the delay).",
        fr: "Une relance polie avec la facture et le montant, dans la langue du client (amicale, ferme ou urgente selon le retard).",
      },
    },
    {
      src: "/projects/payment-reminder-engine/03-factures-clean.png",
      title: { en: "The invoices source", fr: "La source des factures" },
      caption: {
        en: "Invoice tracking drives the tone automatically: nobody has to chase payments by hand anymore.",
        fr: "Le suivi des factures pilote le ton automatiquement : personne n’a plus à relancer à la main.",
      },
    },
  ],
  "review-reputation-automation": [
    {
      src: "/projects/review-reputation-automation/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "After a sale: a happy customer is routed to a Google review, an unhappy one to private feedback.",
        fr: "Après une vente : un client satisfait est orienté vers un avis Google, un mécontent vers un retour privé.",
      },
    },
    {
      src: bi("review-reputation-automation", "02-demande-avis", "-clean"),
      title: { en: "The review request", fr: "La demande d’avis" },
      caption: {
        en: "The happy customer gets a one-click invitation to leave a Google review.",
        fr: "Le client satisfait reçoit une invitation en un clic à laisser un avis Google.",
      },
    },
    {
      src: bi("review-reputation-automation", "03-alerte-mecontent", "-clean"),
      title: { en: "Catching an unhappy customer", fr: "L’interception d’un mécontent" },
      caption: {
        en: "The unhappy customer is caught privately and the owner is alerted, before it becomes a public 1-star.",
        fr: "Le client insatisfait est capté en privé et le patron est alerté, avant que ça ne devienne un avis 1 étoile public.",
      },
    },
  ],
  "ai-voice-calling-assistant": [
    {
      src: "/projects/ai-voice-calling-assistant/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "A finished call → AI analysis of the transcript → logging and a follow-up notification.",
        fr: "Un appel terminé → analyse IA du transcript → journalisation et notification de suivi.",
      },
    },
    {
      src: bi("ai-voice-calling-assistant", "02-analyse", "-clean"),
      title: { en: "The call analysis", fr: "L’analyse de l’appel" },
      caption: {
        en: "The AI extracts the outcome, sentiment, a summary and the recommended next action.",
        fr: "L’IA extrait l’issue, le sentiment, un résumé et l’action recommandée.",
      },
    },
    {
      src: bi("ai-voice-calling-assistant", "03-notif-suivi", "-clean"),
      title: { en: "The follow-up notification", fr: "La notification de suivi" },
      caption: {
        en: "The business is notified whenever a call-back is needed, so nothing slips through.",
        fr: "L’entreprise est prévenue dès qu’un rappel s’impose : rien ne passe à la trappe.",
      },
    },
  ],
  "distributed-automation": [
    {
      src: "/projects/distributed-automation/01-formulaire-clean.png",
      title: { en: "The request", fr: "La demande" },
      caption: {
        en: "An internal form: paste the link, one click.",
        fr: "Un formulaire interne : coller le lien, un clic.",
      },
    },
    {
      src: "/projects/distributed-automation/02-workflow.png",
      title: { en: "The orchestration", fr: "L’orchestration" },
      caption: {
        en: "n8n drives a fleet of browser agents with health checks and automatic failover.",
        fr: "n8n pilote une flotte d’agents navigateur avec health-checks et bascule automatique.",
      },
    },
    {
      src: "/projects/distributed-automation/03-telechargement.png",
      title: { en: "The delivered file", fr: "Le fichier livré" },
      caption: {
        en: "The asset’s signed URL is captured and the file is downloaded automatically.",
        fr: "L’URL signée de l’asset est capturée et le fichier est téléchargé automatiquement.",
      },
    },
  ],
  "seo-audit-engine": [
    {
      src: "/projects/seo-audit-engine/01-workflow.png",
      title: { en: "The workflow", fr: "Le workflow" },
      caption: {
        en: "Sitemap discovery → crawl → LLM comparison against the brief.",
        fr: "Découverte du sitemap → crawl → comparaison LLM au brief.",
      },
    },
    {
      src: "/projects/seo-audit-engine/02-formulaire-clean.png",
      title: { en: "The trigger form", fr: "Le formulaire de déclenchement" },
      caption: {
        en: "A simple form kicks off the audit: you enter the site and its SEO brief targets, and the engine takes over.",
        fr: "Un simple formulaire lance l’audit : on saisit le site et les cibles du brief SEO, puis le moteur prend le relais.",
      },
    },
    {
      src: "/projects/seo-audit-engine/03-score.png",
      title: { en: "The overall score", fr: "Le score global" },
      caption: {
        en: "The engine grades each page against the brief and returns a clear compliance score, so you see exactly where the site stands.",
        fr: "Le moteur note chaque page par rapport au brief et renvoie un score de conformité clair : vous voyez précisément où en est le site.",
      },
    },
  ],
  "google-ads-campaign-agent": [
    {
      src: "/projects/google-ads-campaign-agent/01-brief.png",
      title: { en: "The brief", fr: "Le brief" },
      caption: {
        en: "Website + keywords + a note: a single simple form.",
        fr: "Site + mots-clés + un commentaire : un simple formulaire.",
      },
    },
    {
      src: "/projects/google-ads-campaign-agent/02-workflow.png",
      title: { en: "The AI agent", fr: "L’agent IA" },
      caption: {
        en: "The AI generates keyword themes, ad groups and RSAs, validated against Google’s character limits.",
        fr: "L’IA génère les thèmes de mots-clés, les groupes et les annonces RSA, validés contre les limites de caractères de Google.",
      },
    },
    {
      src: "/projects/google-ads-campaign-agent/03-export-clean.png",
      title: { en: "The Google Ads CSV", fr: "Le CSV Google Ads" },
      caption: {
        en: "A ready-to-import file, emailed to the media buyer for a one-click bulk import.",
        fr: "Un fichier prêt à importer, envoyé par email au média-acheteur pour un import en un clic.",
      },
    },
  ],
};

export function getGallery(slug: string): GalleryStep[] {
  return galleries[slug] ?? [];
}
