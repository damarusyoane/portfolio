import type { Locale } from "@/i18n/routing";

export type Accent = "cyan" | "violet" | "indigo";

export type FlowNode = {
  label: Record<Locale, string>;
  kind?: "trigger" | "process" | "ai" | "output" | "store";
};

export type Metric = {
  value: string;
  label: Record<Locale, string>;
};

export type Project = {
  slug: string;
  accent: Accent;
  year: string;
  title: Record<Locale, string>;
  domain: Record<Locale, string>;
  tagline: Record<Locale, string>;
  stack: string[];
  problem: Record<Locale, string>;
  approach: Record<Locale, string[]>;
  highlights: Record<Locale, string[]>;
  metrics: Metric[];
  flow: FlowNode[];
  screenshot?: string;
};

export const projects: Project[] = [
  {
    slug: "distributed-automation",
    screenshot: "/projects/distributed-automation.png",
    accent: "cyan",
    year: "2024",
    title: {
      en: "Distributed Asset Automation System",
      fr: "Système distribué d'automatisation d'assets",
    },
    domain: {
      en: "Distributed systems · Browser automation",
      fr: "Systèmes distribués · Automatisation navigateur",
    },
    tagline: {
      en: "A one-click internal service that retrieves large licensed assets from a no-API, anti-bot platform — backed by a self-healing fleet of browser agents.",
      fr: "Un service interne en un clic qui récupère de gros assets sous licence sur une plateforme sans API et anti-bot — porté par une flotte d'agents navigateur auto-réparante.",
    },
    stack: [
      "n8n",
      "Python",
      "FastAPI",
      "Playwright",
      "Cloudflare Tunnel",
      "Webhooks",
      "REST",
    ],
    problem: {
      en: "A team needed on-demand access to large licensed digital assets (videos up to several GB) on a third-party platform that exposes no public API and ships aggressive anti-bot protection. Manual downloads were slow, didn't scale across the team, and broke whenever the platform shifted its front-end.",
      fr: "Une équipe avait besoin d'un accès à la demande à de gros assets sous licence (vidéos jusqu'à plusieurs Go) sur une plateforme tierce sans API publique et dotée d'une protection anti-bot agressive. Les téléchargements manuels étaient lents, ne passaient pas à l'échelle et cassaient à chaque évolution du front-end.",
    },
    approach: {
      en: [
        "An n8n orchestration layer receives requests from an internal form via webhook and issues a short-lived, single-use token per request.",
        "A fleet of headless Python agents (FastAPI + Playwright) runs the authenticated browser session on residential IPs, each exposed through its own Cloudflare Tunnel.",
        "The system captures the platform's short-lived signed CDN URL at click-time (~45s validity) and streams the file straight from the CDN to the requester — the orchestrator never proxies the heavy payload.",
        "Ordered multi-agent failover: a health-checked rotation tries each agent until one succeeds, so a single offline machine never breaks the pipeline.",
        "Hardened against expiring URLs, per-item rate limits, and an SPA navigation quirk that broke page evaluation on certain asset types.",
      ],
      fr: [
        "Une couche d'orchestration n8n reçoit les demandes d'un formulaire interne via webhook et émet un jeton à usage unique et à courte durée de vie par demande.",
        "Une flotte d'agents Python headless (FastAPI + Playwright) exécute la session navigateur authentifiée sur IP résidentielle, chacun exposé via son propre tunnel Cloudflare.",
        "Le système capture l'URL CDN signée à courte durée de vie (~45 s) au moment du clic et diffuse le fichier directement du CDN vers le demandeur — l'orchestrateur ne relaie jamais la charge lourde.",
        "Bascule multi-agents ordonnée : une rotation avec health-check essaie chaque agent jusqu'au succès, donc une machine éteinte ne casse jamais le pipeline.",
        "Durci contre l'expiration des URL, les limites de débit par item et un comportement SPA qui cassait l'évaluation de page sur certains types d'assets.",
      ],
    },
    highlights: {
      en: [
        "Reduced a manual, error-prone task to a single internal click.",
        "Resilient by design: health checks, ordered failover, single-use tokens, explicit error notifications.",
        "Handles every asset type automatically — archives, stock video with resolution selection, and photos.",
      ],
      fr: [
        "Une tâche manuelle et risquée réduite à un seul clic interne.",
        "Résilient par conception : health-checks, bascule ordonnée, jetons à usage unique, notifications d'erreur explicites.",
        "Gère automatiquement chaque type d'asset — archives, vidéo stock avec choix de résolution, photos.",
      ],
    },
    metrics: [
      {
        value: "10×",
        label: { en: "faster than manual retrieval", fr: "plus rapide que le manuel" },
      },
      {
        value: "~45s",
        label: { en: "signed-URL window handled", fr: "fenêtre d'URL signée gérée" },
      },
      {
        value: "4",
        label: { en: "agents, no single point of failure", fr: "agents, aucun point de défaillance" },
      },
    ],
    flow: [
      { label: { en: "Internal form", fr: "Formulaire interne" }, kind: "trigger" },
      { label: { en: "n8n orchestrator", fr: "Orchestrateur n8n" }, kind: "process" },
      { label: { en: "Agent fleet (failover)", fr: "Flotte d'agents (bascule)" }, kind: "process" },
      { label: { en: "Signed CDN URL", fr: "URL CDN signée" }, kind: "store" },
      { label: { en: "Direct download", fr: "Téléchargement direct" }, kind: "output" },
    ],
  },
  {
    slug: "seo-audit-engine",
    screenshot: "/projects/seo-audit-engine.png",
    accent: "violet",
    year: "2025",
    title: {
      en: "AI-Powered SEO Audit Engine",
      fr: "Moteur d'audit SEO propulsé par l'IA",
    },
    domain: {
      en: "Data pipelines · Applied AI",
      fr: "Pipelines de données · IA appliquée",
    },
    tagline: {
      en: "Turns a manual SEO QA checklist into a repeatable pipeline that crawls live pages, compares them to the brief with an LLM, and ships actionable fixes.",
      fr: "Transforme une checklist QA SEO manuelle en pipeline reproductible : crawl des pages en ligne, comparaison au brief via LLM, et recommandations actionnables.",
    },
    stack: [
      "n8n",
      "Apify",
      "LLM (Claude)",
      "Google Sheets API",
      "Web crawling",
      "JavaScript",
    ],
    problem: {
      en: "An agency manually checked whether published pages matched the SEO brief — titles, meta descriptions, H1s, target keywords — across many client sites with wildly different setups. It was slow, inconsistent, and quietly produced wrong results when a spreadsheet column was reordered.",
      fr: "Une agence vérifiait manuellement si les pages publiées respectaient le brief SEO — titles, meta-descriptions, H1, mots-clés cibles — sur de nombreux sites clients aux configurations très différentes. Lent, inconsistant, et générant silencieusement de faux résultats dès qu'une colonne de tableur était réordonnée.",
    },
    approach: {
      en: [
        "A crawler discovers sitemaps robustly across heterogeneous setups — pretty permalinks, query-string sitemaps, and www / non-www DNS variants — so both staging and production sites are covered.",
        "Brief data is read by column header, never by position, and fails loudly if a required column is missing — so silent column drift never yields wrong-but-plausible output.",
        "An LLM compares each live page against its brief and returns structured, prioritized recommendations.",
        "Production-grade reliability: retry-with-backoff for rate-limited APIs, an Opus→Sonnet model fallback, and an in-workflow error sub-flow that emails failures instantly.",
      ],
      fr: [
        "Un crawler découvre les sitemaps de façon robuste sur des setups hétérogènes — permaliens jolis, sitemaps en query-string, variantes DNS www / sans-www — pour couvrir staging et production.",
        "Les données du brief sont lues par en-tête de colonne, jamais par position, et échouent explicitement si une colonne requise manque — aucune dérive silencieuse ne produit de résultat faux mais plausible.",
        "Un LLM compare chaque page en ligne à son brief et renvoie des recommandations structurées et priorisées.",
        "Fiabilité de production : retry avec backoff sur les API limitées, fallback de modèle Opus→Sonnet, et sous-flux d'erreur qui notifie les échecs par email instantanément.",
      ],
    },
    highlights: {
      en: [
        "A manual QA checklist becomes a repeatable, auditable pipeline.",
        "Robust to messy real-world inputs: staging sites, reordered columns, DNS quirks.",
        "Resilient to provider outages and per-minute quota limits.",
      ],
      fr: [
        "Une checklist QA manuelle devient un pipeline reproductible et auditable.",
        "Robuste aux entrées réelles imparfaites : sites de staging, colonnes réordonnées, particularités DNS.",
        "Résilient aux pannes de fournisseur et aux quotas par minute.",
      ],
    },
    metrics: [
      {
        value: "~90%",
        label: { en: "less manual QA time", fr: "de temps de QA manuel en moins" },
      },
      {
        value: "100s",
        label: { en: "of pages audited per run", fr: "de pages auditées par run" },
      },
      {
        value: "8",
        label: { en: "sitemap discovery strategies", fr: "stratégies de découverte de sitemap" },
      },
    ],
    flow: [
      { label: { en: "Schedule / brief", fr: "Planif. / brief" }, kind: "trigger" },
      { label: { en: "Sitemap discovery", fr: "Découverte sitemap" }, kind: "process" },
      { label: { en: "Crawl + extract", fr: "Crawl + extraction" }, kind: "process" },
      { label: { en: "LLM comparison", fr: "Comparaison LLM" }, kind: "ai" },
      { label: { en: "Recommendations", fr: "Recommandations" }, kind: "output" },
    ],
  },
  {
    slug: "ai-content-pipeline",
    screenshot: "/projects/ai-content-pipeline.png",
    accent: "indigo",
    year: "2025",
    title: {
      en: "Autonomous TikTok Video Publisher",
      fr: "Publication TikTok autonome",
    },
    domain: {
      en: "Generative AI · Social media automation",
      fr: "IA générative · Automatisation réseaux sociaux",
    },
    tagline: {
      en: "Every three days, an n8n workflow turns the latest n8n & AI news into a 45-second talking-avatar video and publishes it to TikTok through the official API — with no human in the loop.",
      fr: "Tous les trois jours, un workflow n8n transforme l'actualité n8n & IA en une vidéo d'avatar parlant de 45 secondes et la publie sur TikTok via l'API officielle — sans intervention humaine.",
    },
    stack: [
      "n8n",
      "Claude API",
      "HeyGen",
      "TikTok Content Posting API",
      "RSS",
      "Google Sheets",
    ],
    problem: {
      en: "Keeping a social channel alive with fresh, on-topic short videos is time-consuming and hard to sustain manually — and brittle UI-automation 'auto-posters' break constantly and risk the account.",
      fr: "Maintenir une chaîne sociale active avec de courtes vidéos fraîches et pertinentes est chronophage et difficile à tenir manuellement — et les « auto-posters » par automatisation d'UI cassent sans cesse et mettent le compte en danger.",
    },
    approach: {
      en: [
        "A schedule trigger fires every three days and pulls the latest items from two RSS feeds (the n8n blog and an AI-news source), merged and sorted by date.",
        "A Google Sheet acts as a dedup log: the workflow skips any story already covered and picks the freshest unused one.",
        "Claude writes a scroll-stopping ~45-second script and returns strict JSON (script, title, caption, hashtags), which is parsed and validated.",
        "HeyGen renders a talking-photo avatar video; the workflow polls the render status in a loop until it's complete, then downloads the MP4 and measures its exact byte size.",
        "The video is posted via TikTok's official Content Posting API (init → chunked upload → status), then logged back to the Sheet. A self-referencing error workflow emails any failure.",
      ],
      fr: [
        "Un déclencheur planifié se lance tous les trois jours et récupère les derniers éléments de deux flux RSS (le blog n8n et une source d'actualité IA), fusionnés et triés par date.",
        "Un Google Sheet sert de journal anti-doublon : le workflow ignore les sujets déjà traités et choisit le plus récent encore inédit.",
        "Claude rédige un script accrocheur d'environ 45 secondes et renvoie un JSON strict (script, titre, légende, hashtags), parsé et validé.",
        "HeyGen génère une vidéo d'avatar parlant ; le workflow interroge le statut du rendu en boucle jusqu'à complétion, puis télécharge le MP4 et mesure sa taille exacte en octets.",
        "La vidéo est publiée via l'API officielle TikTok Content Posting (init → upload par chunk → statut), puis journalisée dans le Sheet. Un workflow d'erreur auto-référencé notifie tout échec par email.",
      ],
    },
    highlights: {
      en: [
        "Runs completely unattended on a 3-day cadence, from news item to published TikTok.",
        "Publishes through TikTok's official API — no fragile UI automation — with a full Sheet audit log.",
        "Resilient: render-status polling loop, model retries, and email alerts on any failure.",
      ],
      fr: [
        "Tourne en totale autonomie sur une cadence de 3 jours, de l'actualité à la publication TikTok.",
        "Publie via l'API officielle TikTok — pas d'automatisation d'UI fragile — avec journal d'audit complet dans le Sheet.",
        "Résilient : boucle de polling du rendu, retries de modèle et alertes email en cas d'échec.",
      ],
    },
    metrics: [
      {
        value: "~5h",
        label: { en: "saved per video vs. manual", fr: "gagnées par vidéo vs manuel" },
      },
      {
        value: "Every 3 days",
        label: { en: "published, fully unattended", fr: "publiée, en totale autonomie" },
      },
      {
        value: "0",
        label: { en: "manual steps per post", fr: "étape manuelle par publication" },
      },
    ],
    flow: [
      { label: { en: "RSS feeds", fr: "Flux RSS" }, kind: "trigger" },
      { label: { en: "Dedup log (Sheets)", fr: "Journal anti-doublon" }, kind: "store" },
      { label: { en: "Claude script", fr: "Script Claude" }, kind: "ai" },
      { label: { en: "HeyGen avatar", fr: "Avatar HeyGen" }, kind: "process" },
      { label: { en: "TikTok API", fr: "API TikTok" }, kind: "output" },
    ],
  },
  {
    slug: "resilient-llm-automation",
    screenshot: "/projects/resilient-llm-automation.png",
    accent: "cyan",
    year: "2026",
    title: {
      en: "Resilient LLM Content Automation",
      fr: "Automatisation de contenu LLM résiliente",
    },
    domain: {
      en: "LLM reliability · Content ops",
      fr: "Fiabilité LLM · Content ops",
    },
    tagline: {
      en: "A scheduled content engine engineered around the unglamorous reality of LLMs in production: overload, quotas, and malformed output — with no silent failures.",
      fr: "Un moteur de contenu planifié conçu autour de la réalité ingrate des LLM en production : surcharge, quotas, sorties malformées — sans aucun échec silencieux.",
    },
    stack: [
      "n8n",
      "LLM (Claude)",
      "Image generation",
      "CMS (WordPress)",
      "OAuth",
      "Webhooks",
    ],
    problem: {
      en: "LLM-powered content jobs fail in production for boring reasons — provider overload (HTTP 529), quota limits, malformed responses — and a single unhandled failure can quietly break a scheduled job for days before anyone notices.",
      fr: "Les tâches de contenu propulsées par LLM échouent en production pour des raisons banales — surcharge fournisseur (HTTP 529), quotas, réponses malformées — et un seul échec non géré peut casser silencieusement un job planifié pendant des jours.",
    },
    approach: {
      en: [
        "A multi-node LLM pipeline generates long-form content and matching imagery, then publishes to a CMS.",
        "Reliability patterns on every model call: retry-with-backoff, an Opus→Sonnet fallback branch when the primary model stays overloaded, and a self-referencing error workflow that emails any failure with full execution context.",
        "Secrets were moved out of node parameters into managed credentials — nothing hardcoded.",
      ],
      fr: [
        "Un pipeline LLM multi-nœuds génère du contenu long et l'imagerie associée, puis publie sur un CMS.",
        "Des patterns de fiabilité sur chaque appel modèle : retry avec backoff, branche de fallback Opus→Sonnet quand le modèle principal reste surchargé, et un workflow d'erreur auto-référencé qui notifie tout échec par email avec le contexte complet d'exécution.",
        "Les secrets ont été sortis des paramètres de nœud vers des credentials managés — rien en dur.",
      ],
    },
    highlights: {
      en: [
        "Built for unattended, scheduled operation with no silent failures.",
        "Graceful degradation: quality-first primary model, automatic fallback under load.",
        "Security-conscious: managed credentials, never hardcoded keys.",
      ],
      fr: [
        "Conçu pour un fonctionnement planifié et autonome, sans échec silencieux.",
        "Dégradation gracieuse : modèle principal axé qualité, fallback automatique sous charge.",
        "Soucieux de sécurité : credentials managés, jamais de clés en dur.",
      ],
    },
    metrics: [
      {
        value: "24/7",
        label: { en: "unattended scheduled runs", fr: "exécutions planifiées sans surveillance" },
      },
      {
        value: "0",
        label: { en: "silent failures", fr: "échec silencieux" },
      },
      {
        value: "529-proof",
        label: { en: "model fallback under load", fr: "fallback de modèle sous charge" },
      },
    ],
    flow: [
      { label: { en: "Schedule", fr: "Planification" }, kind: "trigger" },
      { label: { en: "LLM (primary)", fr: "LLM (principal)" }, kind: "ai" },
      { label: { en: "Fallback model", fr: "Modèle de secours" }, kind: "ai" },
      { label: { en: "Image + CMS", fr: "Image + CMS" }, kind: "process" },
      { label: { en: "Error alerts", fr: "Alertes d'erreur" }, kind: "output" },
    ],
  },
  {
    slug: "rag-knowledge-assistant",
    screenshot: "/projects/rag-knowledge-assistant.png",
    accent: "violet",
    year: "2026",
    title: {
      en: "RAG Knowledge Assistant",
      fr: "Assistant de connaissances RAG",
    },
    domain: {
      en: "Applied AI · Retrieval-augmented generation",
      fr: "IA appliquée · Génération augmentée par récupération",
    },
    tagline: {
      en: "An assistant that answers staff questions grounded in the company's own documents — retrieval first, then a guard-railed LLM, always with citations.",
      fr: "Un assistant qui répond aux questions des équipes en s'appuyant sur les documents de l'entreprise — récupération d'abord, puis un LLM encadré, toujours avec citations.",
    },
    stack: [
      "Claude API",
      "Vector DB",
      "Embeddings",
      "n8n",
      "Webhooks",
      "Slack",
    ],
    problem: {
      en: "LLMs are confident but don't know a company's private, ever-changing knowledge — so they hallucinate, and teams keep losing time digging through scattered docs, wikis, and PDFs.",
      fr: "Les LLM sont sûrs d'eux mais ignorent la connaissance privée et mouvante d'une entreprise — ils hallucinent, et les équipes perdent du temps à fouiller des docs, wikis et PDF éparpillés.",
    },
    approach: {
      en: [
        "Documents are ingested, chunked, embedded, and stored in a vector database; a scheduled sync keeps the index fresh as content changes.",
        "On each question, the system retrieves the most relevant chunks and passes only that grounded context to the LLM.",
        "The model answers strictly from the retrieved context and returns citations; guardrails make it refuse — rather than guess — when nothing relevant is found.",
        "Unanswered questions are logged to reveal knowledge gaps, and the assistant is delivered where people already are: Slack and an embeddable web widget.",
      ],
      fr: [
        "Les documents sont ingérés, découpés, vectorisés et stockés dans une base vectorielle ; une synchro planifiée garde l'index à jour.",
        "À chaque question, le système récupère les passages les plus pertinents et ne transmet que ce contexte sourcé au LLM.",
        "Le modèle répond strictement à partir du contexte récupéré et renvoie des citations ; des garde-fous le font refuser — plutôt que deviner — quand rien de pertinent n'est trouvé.",
        "Les questions sans réponse sont journalisées pour révéler les lacunes, et l'assistant est livré là où les gens sont déjà : Slack et un widget web intégrable.",
      ],
    },
    highlights: {
      en: [
        "Grounded, cited answers from your own knowledge — no model fine-tuning required.",
        "Guardrails prevent hallucination: no relevant context means an honest 'I don't know'.",
        "Pluggable: swap the model, vector store, or sources without touching the flow.",
      ],
      fr: [
        "Des réponses sourcées et citées depuis votre propre savoir — sans fine-tuning de modèle.",
        "Des garde-fous contre l'hallucination : pas de contexte pertinent = un honnête « je ne sais pas ».",
        "Modulaire : changez le modèle, la base vectorielle ou les sources sans toucher au flux.",
      ],
    },
    metrics: [
      {
        value: "Seconds",
        label: { en: "to find any answer", fr: "pour trouver une réponse" },
      },
      {
        value: "100%",
        label: { en: "answers cited & grounded", fr: "réponses citées et sourcées" },
      },
      {
        value: "0",
        label: { en: "fine-tuning required", fr: "fine-tuning requis" },
      },
    ],
    flow: [
      { label: { en: "Documents", fr: "Documents" }, kind: "trigger" },
      { label: { en: "Embeddings", fr: "Embeddings" }, kind: "process" },
      { label: { en: "Vector store", fr: "Base vectorielle" }, kind: "store" },
      { label: { en: "Retrieval + LLM", fr: "Récupération + LLM" }, kind: "ai" },
      { label: { en: "Slack / Web answer", fr: "Réponse Slack / Web" }, kind: "output" },
    ],
  },
  {
    slug: "ai-voice-calling-assistant",
    screenshot: "/projects/ai-voice-calling-assistant.png",
    accent: "indigo",
    year: "2026",
    title: {
      en: "AI Voice Calling Assistant",
      fr: "Assistant d'appels vocaux IA",
    },
    domain: {
      en: "Conversational AI · Outbound automation",
      fr: "IA conversationnelle · Automatisation d'appels",
    },
    tagline: {
      en: "A fully autonomous outbound-calling pipeline: it reads your contacts, places real AI voice calls, analyses every conversation, logs it, and updates the CRM — with no human in the loop.",
      fr: "Un pipeline d'appels sortants entièrement autonome : il lit vos contacts, passe de vrais appels vocaux IA, analyse chaque conversation, la journalise et met à jour le CRM — sans intervention humaine.",
    },
    stack: [
      "n8n",
      "Vapi (Voice AI)",
      "LLM",
      "Supabase",
      "Google Sheets",
      "Webhooks",
    ],
    problem: {
      en: "Outbound calling — lead qualification, follow-ups, reminders — eats hours of repetitive dialing. Many calls go unanswered, reps forget to log outcomes, and CRM updates slip, so follow-ups are missed and the pipeline leaks.",
      fr: "Les appels sortants — qualification de leads, relances, rappels — engloutissent des heures de numérotation répétitive. Beaucoup d'appels restent sans réponse, les conclusions ne sont pas notées et les mises à jour CRM passent à la trappe : les relances sont manquées et le pipeline fuit.",
    },
    approach: {
      en: [
        "A scheduled n8n workflow reads the contact list (Google Sheets) and loops through every contact, automatically skipping anyone already called — idempotent, so re-runs never double-dial.",
        "For each contact it places a real outbound phone call through a voice-AI agent (Vapi) that holds a natural conversation toward a defined goal.",
        "A wait step holds execution until the call ends, then the full transcript and metadata are pulled back via API.",
        "An LLM analyses each transcript and extracts a structured result — outcome (interested / no-answer / voicemail / callback), sentiment, a summary, and the recommended next action.",
        "Every call is logged to a database (Supabase) with transcript and analysis, the contact's status is auto-updated to 'Called', and the loop advances to the next contact — fully unattended.",
      ],
      fr: [
        "Un workflow n8n planifié lit la liste de contacts (Google Sheets) et boucle sur chacun, en écartant automatiquement ceux déjà appelés — idempotent, donc aucune ré-exécution ne rappelle deux fois.",
        "Pour chaque contact, il passe un vrai appel téléphonique sortant via un agent vocal IA (Vapi) qui mène une conversation naturelle vers un objectif défini.",
        "Une étape d'attente suspend l'exécution jusqu'à la fin de l'appel, puis le transcript complet et les métadonnées sont récupérés via API.",
        "Un LLM analyse chaque transcript et en extrait un résultat structuré — issue (intéressé / sans réponse / messagerie / à rappeler), sentiment, résumé et action recommandée.",
        "Chaque appel est journalisé en base (Supabase) avec transcript et analyse, le statut du contact passe à « Appelé », et la boucle avance au contact suivant — en totale autonomie.",
      ],
    },
    highlights: {
      en: [
        "Fully autonomous: reads contacts, calls, analyses, logs, updates the CRM, repeats — no human, no missed follow-ups.",
        "Idempotent by design: already-called contacts are skipped, so it's safe to re-run anytime.",
        "Structured, queryable outcomes (outcome + sentiment + next action) instead of unwritten call notes.",
      ],
      fr: [
        "Totalement autonome : lit les contacts, appelle, analyse, journalise, met à jour le CRM, recommence — sans humain, sans relance oubliée.",
        "Idempotent par conception : les contacts déjà appelés sont ignorés, relançable à tout moment sans risque.",
        "Des résultats structurés et requêtables (issue + sentiment + action) au lieu de notes d'appel jamais écrites.",
      ],
    },
    metrics: [
      {
        value: "0",
        label: { en: "manual dialing or note-taking", fr: "numérotation/prise de notes manuelle" },
      },
      {
        value: "100%",
        label: { en: "calls transcribed & analysed", fr: "appels transcrits & analysés" },
      },
      {
        value: "24/7",
        label: { en: "unattended outreach loop", fr: "boucle d'appels sans surveillance" },
      },
    ],
    flow: [
      { label: { en: "Contact list", fr: "Liste de contacts" }, kind: "trigger" },
      { label: { en: "Skip already-called", fr: "Ignorer déjà appelés" }, kind: "process" },
      { label: { en: "AI voice call", fr: "Appel vocal IA" }, kind: "process" },
      { label: { en: "Transcript analysis", fr: "Analyse du transcript" }, kind: "ai" },
      { label: { en: "Log + CRM update", fr: "Journal + MAJ CRM" }, kind: "output" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
