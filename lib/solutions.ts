import type { Locale } from "@/i18n/routing";
import type { AccentKey } from "@/lib/utils";

export type Category = {
  id: string;
  label: Record<Locale, string>;
  accent: AccentKey;
};

export type Solution = {
  id: string;
  category: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  impact: Record<Locale, string>;
  stack: string[];
};

export const categories: Category[] = [
  { id: "ecommerce", label: { en: "E-commerce & Retail", fr: "E-commerce & Retail" }, accent: "cyan" },
  { id: "marketing", label: { en: "Marketing & Growth", fr: "Marketing & Croissance" }, accent: "violet" },
  { id: "sales", label: { en: "Sales & CRM", fr: "Ventes & CRM" }, accent: "indigo" },
  { id: "support", label: { en: "Customer Support", fr: "Support client" }, accent: "cyan" },
  { id: "finance", label: { en: "Finance & Ops", fr: "Finance & Ops" }, accent: "violet" },
  { id: "hr", label: { en: "HR & Recruiting", fr: "RH & Recrutement" }, accent: "indigo" },
  { id: "content", label: { en: "Content & Social", fr: "Contenu & Social" }, accent: "cyan" },
  { id: "data", label: { en: "Data & Reporting", fr: "Data & Reporting" }, accent: "violet" },
  { id: "realestate", label: { en: "Real Estate", fr: "Immobilier" }, accent: "indigo" },
  { id: "healthcare", label: { en: "Healthcare", fr: "Santé" }, accent: "cyan" },
  { id: "devops", label: { en: "DevOps & Monitoring", fr: "DevOps & Monitoring" }, accent: "violet" },
  { id: "ai", label: { en: "AI Agents & RAG", fr: "Agents IA & RAG" }, accent: "indigo" },
  { id: "legal", label: { en: "Legal & Compliance", fr: "Juridique & Conformité" }, accent: "cyan" },
  { id: "education", label: { en: "Education", fr: "Éducation" }, accent: "violet" },
];

export const solutions: Solution[] = [
  // ── E-commerce ──────────────────────────────────────────────
  {
    id: "abandoned-cart",
    category: "ecommerce",
    title: { en: "Abandoned-Cart Recovery", fr: "Récupération de paniers abandonnés" },
    description: {
      en: "Detects abandoned checkouts and triggers timed email + SMS win-back sequences.",
      fr: "Détecte les paniers abandonnés et déclenche des relances email + SMS minutées.",
    },
    impact: { en: "Recovers 10–15% of lost carts", fr: "Récupère 10–15 % des paniers perdus" },
    stack: ["Shopify", "Klaviyo", "Twilio", "n8n"],
  },
  {
    id: "order-stock-sync",
    category: "ecommerce",
    title: { en: "Multichannel Order & Stock Sync", fr: "Synchro commandes & stock multicanal" },
    description: {
      en: "Keeps orders and inventory in sync across store, marketplaces, and 3PL/ERP.",
      fr: "Garde commandes et stocks synchronisés entre boutique, marketplaces et 3PL/ERP.",
    },
    impact: { en: "Zero manual order entry", fr: "Zéro saisie manuelle de commande" },
    stack: ["Shopify", "Amazon", "WooCommerce", "Webhooks"],
  },
  {
    id: "review-reputation",
    category: "ecommerce",
    title: { en: "Post-Purchase Review & Reputation", fr: "Avis & réputation post-achat" },
    description: {
      en: "Requests reviews after delivery and routes feedback to the right channel.",
      fr: "Demande des avis après livraison et oriente les retours vers le bon canal.",
    },
    impact: { en: "3× more reviews collected", fr: "3× plus d'avis collectés" },
    stack: ["Shopify", "Trustpilot", "Google", "Slack"],
  },

  // ── Marketing ───────────────────────────────────────────────
  {
    id: "content-repurpose",
    category: "marketing",
    title: { en: "Content Repurposing Engine", fr: "Moteur de repurposing de contenu" },
    description: {
      en: "Turns one blog post into LinkedIn, X, and newsletter variants with an LLM.",
      fr: "Transforme un article en variantes LinkedIn, X et newsletter via un LLM.",
    },
    impact: { en: "1 post → 5 channels", fr: "1 post → 5 canaux" },
    stack: ["Claude", "LinkedIn", "Buffer", "n8n"],
  },
  {
    id: "ad-reporting",
    category: "marketing",
    title: { en: "Ad-Performance Reporting", fr: "Reporting de performance publicitaire" },
    description: {
      en: "Pulls Meta & Google Ads metrics into a daily dashboard and Slack digest.",
      fr: "Agrège les métriques Meta & Google Ads dans un dashboard quotidien + Slack.",
    },
    impact: { en: "Hours of reporting → 0", fr: "Des heures de reporting → 0" },
    stack: ["Meta Ads", "Google Ads", "Sheets", "Slack"],
  },
  {
    id: "newsletter",
    category: "marketing",
    title: { en: "Automated Newsletter", fr: "Newsletter automatisée" },
    description: {
      en: "Curates sources and drafts a ready-to-send newsletter on a schedule.",
      fr: "Sélectionne les sources et rédige une newsletter prête à envoyer, planifiée.",
    },
    impact: { en: "Weekly send, fully hands-off", fr: "Envoi hebdo, 100% mains libres" },
    stack: ["RSS", "Claude", "Mailchimp", "n8n"],
  },

  // ── Sales & CRM ─────────────────────────────────────────────
  {
    id: "lead-enrichment",
    category: "sales",
    title: { en: "Lead Enrichment & Routing", fr: "Enrichissement & routage de leads" },
    description: {
      en: "Enriches inbound leads and routes them to the right rep in the CRM.",
      fr: "Enrichit les leads entrants et les route vers le bon commercial dans le CRM.",
    },
    impact: { en: "Leads routed in seconds", fr: "Leads routés en quelques secondes" },
    stack: ["Apollo", "Clearbit", "HubSpot", "Webhooks"],
  },
  {
    id: "quote-generator",
    category: "sales",
    title: { en: "AI Proposal & Quote Generator", fr: "Générateur de devis & propositions IA" },
    description: {
      en: "Generates branded proposals from CRM data and sends them for e-signature.",
      fr: "Génère des propositions personnalisées depuis le CRM et les envoie en e-signature.",
    },
    impact: { en: "Quotes in minutes, not days", fr: "Devis en minutes, pas en jours" },
    stack: ["HubSpot", "Claude", "PDF", "DocuSign"],
  },
  {
    id: "meeting-followup",
    category: "sales",
    title: { en: "Meeting-to-CRM Follow-up", fr: "Suivi réunion → CRM" },
    description: {
      en: "Logs booked meetings to the CRM and starts an automated follow-up sequence.",
      fr: "Journalise les rendez-vous dans le CRM et lance une séquence de relance.",
    },
    impact: { en: "100% of meetings logged", fr: "100% des RDV journalisés" },
    stack: ["Calendly", "HubSpot", "Gmail", "n8n"],
  },

  // ── Support ─────────────────────────────────────────────────
  {
    id: "support-triage",
    category: "support",
    title: { en: "AI Ticket Triage & Auto-Reply", fr: "Triage & réponse auto par IA" },
    description: {
      en: "Classifies tickets, drafts grounded replies, and escalates edge cases.",
      fr: "Classe les tickets, rédige des réponses sourcées et escalade les cas limites.",
    },
    impact: { en: "~40% of tickets deflected", fr: "~40% des tickets déviés" },
    stack: ["Zendesk", "Claude", "RAG", "n8n"],
  },
  {
    id: "messaging-bot",
    category: "support",
    title: { en: "WhatsApp / Telegram Support Bot", fr: "Bot support WhatsApp / Telegram" },
    description: {
      en: "Answers FAQs and captures leads on messaging apps, around the clock.",
      fr: "Répond aux FAQ et capte des leads sur les messageries, en continu.",
    },
    impact: { en: "24/7 first response", fr: "Première réponse 24/7" },
    stack: ["WhatsApp", "Telegram", "Claude", "Webhooks"],
  },
  {
    id: "ticket-sync",
    category: "support",
    title: { en: "Support ↔ Issue Tracker Sync", fr: "Synchro support ↔ tracker" },
    description: {
      en: "Two-way sync between support tickets and engineering issues.",
      fr: "Synchronisation bidirectionnelle entre tickets support et issues d'ingénierie.",
    },
    impact: { en: "No more lost tickets", fr: "Plus de tickets perdus" },
    stack: ["Intercom", "Jira", "Linear", "Webhooks"],
  },

  // ── Finance & Ops ───────────────────────────────────────────
  {
    id: "invoice-ocr",
    category: "finance",
    title: { en: "Invoice OCR → Accounting", fr: "OCR de factures → compta" },
    description: {
      en: "Extracts invoice data from email/PDF and posts it to the accounting system.",
      fr: "Extrait les données de factures (email/PDF) et les pousse dans la compta.",
    },
    impact: { en: "~8h/week saved", fr: "~8 h/semaine gagnées" },
    stack: ["OCR", "Claude", "QuickBooks", "Xero"],
  },
  {
    id: "expense-approval",
    category: "finance",
    title: { en: "Expense Approval Workflow", fr: "Workflow d'approbation de dépenses" },
    description: {
      en: "Routes expense requests for approval in Slack with a full audit trail.",
      fr: "Achemine les demandes de dépenses pour validation dans Slack, avec traçabilité.",
    },
    impact: { en: "Approvals in minutes", fr: "Validations en minutes" },
    stack: ["Slack", "Sheets", "n8n"],
  },
  {
    id: "revenue-digest",
    category: "finance",
    title: { en: "Daily Revenue / MRR Digest", fr: "Digest CA / MRR quotidien" },
    description: {
      en: "Posts a daily revenue and MRR summary from Stripe to the team.",
      fr: "Publie un résumé quotidien du CA et du MRR depuis Stripe à l'équipe.",
    },
    impact: { en: "Daily, before standup", fr: "Quotidien, avant le standup" },
    stack: ["Stripe", "Slack", "Sheets"],
  },

  // ── HR & Recruiting ─────────────────────────────────────────
  {
    id: "resume-screening",
    category: "hr",
    title: { en: "AI Résumé Screening", fr: "Tri de CV par IA" },
    description: {
      en: "Scores and ranks applicants against a role with explainable criteria.",
      fr: "Note et classe les candidats face à un poste, avec des critères explicables.",
    },
    impact: { en: "Screen 100s of CVs fast", fr: "Trie des centaines de CV vite" },
    stack: ["Claude", "ATS", "Sheets", "n8n"],
  },
  {
    id: "onboarding",
    category: "hr",
    title: { en: "Onboarding / Offboarding Automation", fr: "Automatisation on/offboarding" },
    description: {
      en: "Provisions and de-provisions accounts and tasks across every tool.",
      fr: "Provisionne et déprovisionne comptes et tâches à travers tous les outils.",
    },
    impact: { en: "Day-one access, automatic", fr: "Accès jour-1, automatique" },
    stack: ["Google Workspace", "Slack", "Notion", "n8n"],
  },
  {
    id: "interview-scheduling",
    category: "hr",
    title: { en: "Interview Scheduling", fr: "Planification d'entretiens" },
    description: {
      en: "Coordinates interview slots between candidates and panels automatically.",
      fr: "Coordonne automatiquement les créneaux d'entretien entre candidats et jury.",
    },
    impact: { en: "Back-and-forth → 0", fr: "Allers-retours → 0" },
    stack: ["Calendly", "Gmail", "ATS", "n8n"],
  },

  // ── Content & Social ────────────────────────────────────────
  {
    id: "social-listening",
    category: "content",
    title: { en: "Social Listening & Brand Alerts", fr: "Veille sociale & alertes marque" },
    description: {
      en: "Monitors mentions and pings the team on sentiment spikes.",
      fr: "Surveille les mentions et alerte l'équipe sur les pics de sentiment.",
    },
    impact: { en: "Mentions caught in real time", fr: "Mentions captées en temps réel" },
    stack: ["Apify", "Claude", "Slack", "n8n"],
  },
  {
    id: "post-generator",
    category: "content",
    title: { en: "AI Post & Carousel Generator", fr: "Générateur de posts & carrousels IA" },
    description: {
      en: "Drafts on-brand posts with imagery and schedules them across channels.",
      fr: "Rédige des posts à la marque avec visuels et les programme sur plusieurs canaux.",
    },
    impact: { en: "Weeks of content in 1 run", fr: "Des semaines de contenu en 1 run" },
    stack: ["Claude", "Image gen", "Buffer", "LinkedIn"],
  },
  {
    id: "media-repurpose",
    category: "content",
    title: { en: "Podcast / Video → Clips & Blog", fr: "Podcast / vidéo → clips & blog" },
    description: {
      en: "Transcribes long-form media and spins out short clips and an article.",
      fr: "Transcrit les médias longs et en tire des clips courts et un article.",
    },
    impact: { en: "1 video → 5+ assets", fr: "1 vidéo → 5+ assets" },
    stack: ["Whisper", "Claude", "FFmpeg", "n8n"],
  },

  // ── Data & Reporting ────────────────────────────────────────
  {
    id: "etl-warehouse",
    category: "data",
    title: { en: "API → Warehouse ETL", fr: "ETL API → entrepôt" },
    description: {
      en: "Scheduled ETL from third-party APIs into a warehouse for BI.",
      fr: "ETL planifié depuis des API tierces vers un entrepôt pour la BI.",
    },
    impact: { en: "Fresh data every hour", fr: "Données fraîches chaque heure" },
    stack: ["n8n", "Postgres", "BigQuery", "REST"],
  },
  {
    id: "kpi-digest",
    category: "data",
    title: { en: "Automated KPI Digest", fr: "Digest KPI automatisé" },
    description: {
      en: "Compiles cross-tool KPIs into a scheduled executive summary.",
      fr: "Compile les KPI multi-outils en un résumé exécutif planifié.",
    },
    impact: { en: "KPIs auto-delivered daily", fr: "KPI livrés chaque jour" },
    stack: ["Sheets", "Slack", "Claude", "n8n"],
  },
  {
    id: "scraping-dataset",
    category: "data",
    title: { en: "Web Scraping → Structured Data", fr: "Scraping web → données structurées" },
    description: {
      en: "Crawls target sites (anti-bot aware) into clean, structured datasets.",
      fr: "Crawle des sites cibles (anti-bot) en jeux de données propres et structurés.",
    },
    impact: { en: "1000s of rows, structured", fr: "Des milliers de lignes structurées" },
    stack: ["Playwright", "Apify", "Proxies", "Python"],
  },

  // ── Real Estate ─────────────────────────────────────────────
  {
    id: "listing-alerts",
    category: "realestate",
    title: { en: "Listing Aggregation & Alerts", fr: "Agrégation d'annonces & alertes" },
    description: {
      en: "Aggregates new listings and pushes instant matches to buyers.",
      fr: "Agrège les nouvelles annonces et pousse les correspondances aux acheteurs.",
    },
    impact: { en: "Matches within minutes", fr: "Correspondances en minutes" },
    stack: ["Scraping", "n8n", "WhatsApp", "Sheets"],
  },
  {
    id: "property-nurture",
    category: "realestate",
    title: { en: "Property Lead Nurture", fr: "Nurturing de leads immobiliers" },
    description: {
      en: "Drips tailored follow-ups and books property viewings automatically.",
      fr: "Diffuse des relances ciblées et planifie les visites automatiquement.",
    },
    impact: { en: "Faster lead-to-viewing", fr: "Du lead à la visite plus vite" },
    stack: ["HubSpot", "Calendly", "Gmail", "n8n"],
  },

  // ── Healthcare ──────────────────────────────────────────────
  {
    id: "appointment-reminders",
    category: "healthcare",
    title: { en: "Appointment Reminders", fr: "Rappels de rendez-vous" },
    description: {
      en: "Sends SMS/WhatsApp reminders and confirmations to cut no-shows.",
      fr: "Envoie rappels et confirmations SMS/WhatsApp pour réduire les absences.",
    },
    impact: { en: "~30% fewer no-shows", fr: "~30% de no-shows en moins" },
    stack: ["Twilio", "WhatsApp", "Calendar", "n8n"],
  },
  {
    id: "patient-intake",
    category: "healthcare",
    title: { en: "Patient Intake → Records", fr: "Admission patient → dossier" },
    description: {
      en: "Turns intake forms into structured records in the practice system.",
      fr: "Transforme les formulaires d'admission en dossiers structurés.",
    },
    impact: { en: "Paperless intake", fr: "Admission sans papier" },
    stack: ["Forms", "Claude", "EHR", "n8n"],
  },

  // ── DevOps & Monitoring ─────────────────────────────────────
  {
    id: "uptime-monitoring",
    category: "devops",
    title: { en: "Uptime & Health Monitoring", fr: "Monitoring uptime & santé" },
    description: {
      en: "Probes endpoints and pages on-call with rich context on failure.",
      fr: "Sonde les endpoints et alerte l'astreinte avec un contexte riche en cas d'échec.",
    },
    impact: { en: "Issues caught before users", fr: "Pannes vues avant les users" },
    stack: ["n8n", "Netdata", "Slack", "PagerDuty"],
  },
  {
    id: "deploy-alerts",
    category: "devops",
    title: { en: "CI/CD & Incident Alerts", fr: "Alertes CI/CD & incidents" },
    description: {
      en: "Streams deploy and incident events to the right channels with summaries.",
      fr: "Diffuse les événements de déploiement et d'incident aux bons canaux, résumés.",
    },
    impact: { en: "Faster incident response", fr: "Réponse incident plus rapide" },
    stack: ["GitHub", "Slack", "Webhooks", "Claude"],
  },

  // ── AI Agents & RAG ─────────────────────────────────────────
  {
    id: "slack-copilot",
    category: "ai",
    title: { en: "Internal AI Slack Copilot", fr: "Copilote IA Slack interne" },
    description: {
      en: "A Slack assistant that answers from internal knowledge and runs actions.",
      fr: "Un assistant Slack qui répond depuis la base interne et exécute des actions.",
    },
    impact: { en: "Answers in seconds, in Slack", fr: "Réponses en secondes, dans Slack" },
    stack: ["Slack", "Claude", "RAG", "n8n"],
  },
  {
    id: "research-agent",
    category: "ai",
    title: { en: "Multi-Agent Research Assistant", fr: "Assistant de recherche multi-agents" },
    description: {
      en: "Coordinates agents to research a topic and produce a sourced report.",
      fr: "Coordonne des agents pour rechercher un sujet et produire un rapport sourcé.",
    },
    impact: { en: "Hours of research → minutes", fr: "Des heures de recherche → minutes" },
    stack: ["Claude", "Agents", "Web search", "n8n"],
  },

  // ── Legal & Compliance ──────────────────────────────────────
  {
    id: "contract-analysis",
    category: "legal",
    title: { en: "Contract Analysis & Clause Extraction", fr: "Analyse de contrats & extraction de clauses" },
    description: {
      en: "Flags risky clauses and extracts key terms from contracts with an LLM.",
      fr: "Repère les clauses à risque et extrait les termes clés des contrats via un LLM.",
    },
    impact: { en: "Review time cut sharply", fr: "Temps de revue fortement réduit" },
    stack: ["Claude", "OCR", "Sheets", "n8n"],
  },

  // ── Education ───────────────────────────────────────────────
  {
    id: "course-automation",
    category: "education",
    title: { en: "Course Drip & Certificates", fr: "Diffusion de cours & certificats" },
    description: {
      en: "Delivers lessons on schedule and issues certificates on completion.",
      fr: "Diffuse les leçons planifiées et délivre les certificats à la complétion.",
    },
    impact: { en: "Hands-off course delivery", fr: "Diffusion de cours mains libres" },
    stack: ["n8n", "Email", "PDF", "Webhooks"],
  },
];

export function categoryById(id: string) {
  return categories.find((c) => c.id === id);
}
