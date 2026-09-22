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
  /** Loom demo URL (share or embed). When set, shown instead of the screenshot. */
  loomUrl?: string;
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
        value: "$1.8k/mo",
        label: { en: "in manual labor saved", fr: "de main-d'œuvre économisée /mois" },
      },
      {
        value: "10×",
        label: { en: "faster than manual retrieval", fr: "plus rapide que le manuel" },
      },
      {
        value: "Zero",
        label: { en: "downtime, self-healing", fr: "d'indisponibilité, auto-réparant" },
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
        value: "$2.5k/mo",
        label: { en: "in QA time saved", fr: "de temps de QA économisé /mois" },
      },
      {
        value: "−90%",
        label: { en: "manual QA time", fr: "de QA manuel en moins" },
      },
      {
        value: "100s",
        label: { en: "of pages audited per run", fr: "de pages auditées par run" },
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
    slug: "google-ads-campaign-agent",
    accent: "indigo",
    year: "2026",
    title: {
      en: "AI Google Ads Campaign Builder",
      fr: "Agent IA de création de campagnes Google Ads",
    },
    domain: {
      en: "Paid ads · Marketing automation",
      fr: "Publicité · Automatisation marketing",
    },
    tagline: {
      en: "Turns a one-line product brief into a ready-to-import Google Ads Search campaign — keyword themes, ad groups and RSAs written by AI, exported straight to Google Ads Editor.",
      fr: "Transforme un brief produit d'une ligne en campagne Google Ads Search prête à importer — thèmes de mots-clés, groupes d'annonces et RSA rédigés par l'IA, exportés directement vers Google Ads Editor.",
    },
    stack: [
      "n8n",
      "Claude API",
      "Google Ads Editor CSV",
      "Google Sheets",
      "Email",
    ],
    problem: {
      en: "Building a Search campaign by hand is slow and error-prone: dozens of keywords to group, and Responsive Search Ads whose 15 headlines and 4 descriptions must each respect strict character limits — one overflow and the whole import is rejected.",
      fr: "Construire une campagne Search à la main est lent et risqué : des dizaines de mots-clés à regrouper, et des annonces responsives dont les 15 titres et 4 descriptions doivent respecter des limites de caractères strictes — un seul dépassement et tout l'import est rejeté.",
    },
    approach: {
      en: [
        "A product/service brief comes in from a form or Google Sheet; an LLM expands it into structured keyword themes and matching ad groups.",
        "For each ad group, Claude writes a full Responsive Search Ad — 15 headlines and 4 descriptions — tuned to the offer and audience.",
        "Every asset is validated against Google's exact character limits before export, so nothing gets rejected at import.",
        "The workflow assembles a Google Ads Editor-ready CSV and emails it to the media buyer for a one-click bulk import, then logs the run.",
      ],
      fr: [
        "Un brief produit/service arrive d'un formulaire ou d'un Google Sheet ; un LLM le développe en thèmes de mots-clés structurés et groupes d'annonces correspondants.",
        "Pour chaque groupe, Claude rédige une annonce responsive complète — 15 titres et 4 descriptions — adaptée à l'offre et à l'audience.",
        "Chaque élément est validé contre les limites de caractères exactes de Google avant export, pour qu'aucun import ne soit rejeté.",
        "Le workflow assemble un CSV prêt pour Google Ads Editor et l'envoie par email au média-acheteur pour un import en un clic, puis journalise l'exécution.",
      ],
    },
    highlights: {
      en: [
        "A full Search campaign drafted from a one-line brief in minutes, not hours.",
        "Character-limit validation baked in — imports never bounce.",
        "Delivered as a Google Ads Editor CSV: import, review, launch.",
      ],
      fr: [
        "Une campagne Search complète rédigée depuis un brief d'une ligne en minutes, pas en heures.",
        "Validation des limites de caractères intégrée — les imports ne sont jamais rejetés.",
        "Livré en CSV Google Ads Editor : importez, relisez, lancez.",
      ],
    },
    metrics: [
      {
        value: "~4h",
        label: { en: "saved per campaign", fr: "gagnées par campagne" },
      },
      {
        value: "100%",
        label: { en: "within ad character limits", fr: "dans les limites de caractères" },
      },
      {
        value: "1-click",
        label: { en: "import to Google Ads", fr: "d'import vers Google Ads" },
      },
    ],
    flow: [
      { label: { en: "Product brief", fr: "Brief produit" }, kind: "trigger" },
      { label: { en: "Keywords + ad groups", fr: "Mots-clés + groupes" }, kind: "ai" },
      { label: { en: "RSA copy (AI)", fr: "Annonces RSA (IA)" }, kind: "ai" },
      { label: { en: "Validate limits", fr: "Valider les limites" }, kind: "process" },
      { label: { en: "Google Ads Editor CSV", fr: "CSV Google Ads Editor" }, kind: "output" },
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
        value: "$1.2k/mo",
        label: { en: "in content costs saved", fr: "de coûts de contenu économisés /mois" },
      },
      {
        value: "~5h",
        label: { en: "saved per video vs. manual", fr: "gagnées par vidéo vs manuel" },
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
        value: "$1.5k/mo",
        label: { en: "in content ops saved", fr: "d'ops contenu économisées /mois" },
      },
      {
        value: "24/7",
        label: { en: "unattended, self-healing", fr: "sans surveillance, auto-réparant" },
      },
      {
        value: "0",
        label: { en: "silent failures", fr: "échec silencieux" },
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
        value: "$2k/mo",
        label: { en: "in staff time saved", fr: "de temps équipe économisé /mois" },
      },
      {
        value: "−70%",
        label: { en: "time to find answers", fr: "de temps pour trouver une réponse" },
      },
      {
        value: "Cited",
        label: { en: "grounded, no hallucination", fr: "sourcées, sans hallucination" },
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
        value: "$3k/mo",
        label: { en: "in calling time saved", fr: "de temps d'appels économisé /mois" },
      },
      {
        value: "100%",
        label: { en: "calls logged & analysed", fr: "appels journalisés & analysés" },
      },
      {
        value: "24/7",
        label: { en: "unattended outreach", fr: "prospection sans surveillance" },
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
  {
    slug: "whatsapp-ai-assistant",
    screenshot: "/projects/whatsapp-ai-assistant.png",
    accent: "violet",
    year: "2026",
    title: {
      en: "WhatsApp AI Assistant (Productized)",
      fr: "Assistant WhatsApp IA (productisé)",
    },
    domain: {
      en: "Conversational AI · Productized automation",
      fr: "IA conversationnelle · Automatisation productisée",
    },
    tagline: {
      en: "A resellable, config-driven WhatsApp assistant that answers customers 24/7, captures leads, and runs on both the official Meta API and self-hosted Evolution — one template, infinite clients.",
      fr: "Un assistant WhatsApp revendable et piloté par configuration qui répond aux clients 24/7, capte les leads et tourne aussi bien sur l'API officielle Meta que sur Evolution auto-hébergé — un template, une infinité de clients.",
    },
    stack: ["n8n", "Claude (Haiku)", "Meta WhatsApp Cloud API", "Evolution API", "Google Sheets", "Webhooks"],
    problem: {
      en: "Small businesses lose sales by not replying fast on WhatsApp, and building a bespoke bot for every client is slow and impossible to scale.",
      fr: "Les PME perdent des ventes faute de répondre vite sur WhatsApp, et construire un bot sur-mesure pour chaque client est lent et impossible à mettre à l'échelle.",
    },
    approach: {
      en: [
        "A single generic webhook normalizes inbound messages from both the Meta Cloud API and self-hosted Evolution, so the same bot serves either channel.",
        "Each client lives in a Google Sheet 'profile' (business info, hours, prices, FAQ, persona) — the LLM answers strictly from it, never inventing prices, and hands off to a human on request.",
        "Detected leads are logged and the owner is notified instantly; reselling is just swapping the config sheet and credentials.",
      ],
      fr: [
        "Un webhook générique unique normalise les messages entrants de l'API Meta Cloud et d'Evolution auto-hébergé : le même bot sert les deux canaux.",
        "Chaque client tient dans une 'fiche' Google Sheet (infos, horaires, prix, FAQ, persona) — le LLM répond strictement à partir d'elle, n'invente jamais de prix et passe la main à un humain sur demande.",
        "Les leads détectés sont journalisés et le patron notifié instantanément ; la revente se résume à changer la fiche et les credentials.",
      ],
    },
    highlights: {
      en: [
        "One template, resold to unlimited clients by changing a config sheet.",
        "Grounded answers with guardrails — no hallucinated prices, clean human handoff.",
        "Dual-channel: official Meta API or the client's existing number via Evolution.",
      ],
      fr: [
        "Un template, revendu à une infinité de clients en changeant une fiche.",
        "Réponses sourcées avec garde-fous — aucun prix inventé, passation humaine propre.",
        "Dual-canal : API officielle Meta ou le numéro existant du client via Evolution.",
      ],
    },
    metrics: [
      { value: "$2.4k/mo", label: { en: "in recovered sales", fr: "de ventes récupérées /mois" } },
      { value: "24/7", label: { en: "instant responses", fr: "réponses instantanées" } },
      { value: "~30%", label: { en: "more enquiries captured", fr: "de demandes captées en plus" } },
    ],
    flow: [
      { label: { en: "WhatsApp message", fr: "Message WhatsApp" }, kind: "trigger" },
      { label: { en: "Normalize (Meta/Evo)", fr: "Normaliser (Meta/Evo)" }, kind: "process" },
      { label: { en: "Config + LLM", fr: "Fiche + LLM" }, kind: "ai" },
      { label: { en: "Reply", fr: "Réponse" }, kind: "output" },
      { label: { en: "Lead + notify", fr: "Lead + notif" }, kind: "store" },
    ],
  },
  {
    slug: "appointment-reminder-system",
    screenshot: "/projects/appointment-reminder-system.png",
    accent: "cyan",
    year: "2026",
    title: {
      en: "Appointment Reminder System",
      fr: "Système de rappels de rendez-vous",
    },
    domain: {
      en: "Scheduling automation · Anti no-show",
      fr: "Automatisation d'agenda · Anti no-show",
    },
    tagline: {
      en: "An automated engine that cuts no-shows by reminding clients 24 hours and 2 hours before their appointment, with duplicate-proof tracking.",
      fr: "Un moteur automatisé qui réduit les no-shows en rappelant les clients 24 h et 2 h avant leur rendez-vous, sans jamais doubler les envois.",
    },
    stack: ["n8n", "Google Sheets", "Scheduler", "Email / WhatsApp"],
    problem: {
      en: "No-shows cost service businesses real money, and manual reminders don't scale across a busy calendar.",
      fr: "Les no-shows coûtent cher aux entreprises de service, et les rappels manuels ne tiennent pas sur un agenda chargé.",
    },
    approach: {
      en: [
        "An hourly scheduler reads the appointments sheet and computes the time until each booking.",
        "It sends a reminder in two windows (~24h and ~2h before) and marks each one sent, so reminders never double-fire.",
        "Cancelled appointments are skipped; the whole flow is idempotent and safe to run continuously.",
      ],
      fr: [
        "Un planificateur horaire lit la feuille des rendez-vous et calcule le temps restant avant chaque réservation.",
        "Il envoie un rappel sur deux fenêtres (~24 h et ~2 h avant) et marque chacun comme envoyé, pour ne jamais doubler.",
        "Les rendez-vous annulés sont ignorés ; tout le flux est idempotent et peut tourner en continu sans risque.",
      ],
    },
    highlights: {
      en: [
        "Fewer no-shows with zero manual effort.",
        "Idempotent by design — never sends a reminder twice.",
        "Drops into any business with a simple appointments sheet.",
      ],
      fr: [
        "Moins de no-shows, sans aucun effort manuel.",
        "Idempotent par conception — jamais deux fois le même rappel.",
        "S'intègre à toute entreprise avec une simple feuille de rendez-vous.",
      ],
    },
    metrics: [
      { value: "−40%", label: { en: "no-shows", fr: "de no-shows" } },
      { value: "$1.6k/mo", label: { en: "in recovered bookings", fr: "de RDV récupérés /mois" } },
      { value: "0", label: { en: "manual reminders", fr: "rappel manuel" } },
    ],
    flow: [
      { label: { en: "Hourly schedule", fr: "Planif. horaire" }, kind: "trigger" },
      { label: { en: "Read appointments", fr: "Lire les RDV" }, kind: "process" },
      { label: { en: "Filter due", fr: "Filtrer à rappeler" }, kind: "process" },
      { label: { en: "Send reminder", fr: "Envoyer rappel" }, kind: "output" },
      { label: { en: "Mark sent", fr: "Marquer envoyé" }, kind: "store" },
    ],
  },
  {
    slug: "instant-lead-response",
    screenshot: "/projects/instant-lead-response.png",
    accent: "indigo",
    year: "2026",
    title: {
      en: "Instant Lead Capture & Response",
      fr: "Capture & relance de leads instantanée",
    },
    domain: {
      en: "Sales automation · Speed-to-lead",
      fr: "Automatisation commerciale · Speed-to-lead",
    },
    tagline: {
      en: "Captures inbound leads, qualifies them with an LLM, auto-replies in under a minute, and alerts sales — because answering in 5 minutes instead of an hour wins the deal.",
      fr: "Capte les leads entrants, les qualifie via un LLM, répond automatiquement en moins d'une minute et alerte le commercial — car répondre en 5 min plutôt qu'en 1 h fait gagner l'affaire.",
    },
    stack: ["n8n", "Claude", "Google Sheets", "Webhooks", "Email"],
    problem: {
      en: "Speed-to-lead drives conversion, yet leads slip away when no one responds fast — and manual qualification is inconsistent.",
      fr: "La vitesse de réponse pilote la conversion, mais les leads s'évaporent quand personne ne répond vite — et la qualification manuelle est inconstante.",
    },
    approach: {
      en: [
        "A webhook receives leads from any form or ad platform and normalizes the fields.",
        "An LLM scores the lead (hot / warm / cold), summarizes it, and drafts a warm first reply in the lead's language.",
        "The prospect gets an instant auto-reply, sales is notified with the qualification, and the lead is logged to the CRM sheet.",
      ],
      fr: [
        "Un webhook reçoit les leads de n'importe quel formulaire ou plateforme publicitaire et normalise les champs.",
        "Un LLM note le lead (chaud / tiède / froid), le résume et rédige une première réponse chaleureuse dans sa langue.",
        "Le prospect reçoit une réponse instantanée, le commercial est notifié avec la qualification, et le lead est journalisé dans le CRM.",
      ],
    },
    highlights: {
      en: [
        "Sub-minute first response, automatically.",
        "Every lead AI-scored and summarized for sales.",
        "No lead ever falls through the cracks.",
      ],
      fr: [
        "Première réponse en moins d'une minute, automatiquement.",
        "Chaque lead noté et résumé par l'IA pour le commercial.",
        "Plus aucun lead ne passe à la trappe.",
      ],
    },
    metrics: [
      { value: "3×", label: { en: "lead conversion", fr: "de conversion des leads" } },
      { value: "$3.5k/mo", label: { en: "in extra revenue", fr: "de revenus supplémentaires /mois" } },
      { value: "<1 min", label: { en: "first reply", fr: "première réponse" } },
    ],
    flow: [
      { label: { en: "Form / ad lead", fr: "Lead formulaire / pub" }, kind: "trigger" },
      { label: { en: "Normalize", fr: "Normaliser" }, kind: "process" },
      { label: { en: "LLM qualify + reply", fr: "LLM qualifie + répond" }, kind: "ai" },
      { label: { en: "Auto-reply + notify", fr: "Réponse auto + notif" }, kind: "output" },
      { label: { en: "Log to CRM", fr: "Journal CRM" }, kind: "store" },
    ],
  },
  {
    slug: "review-reputation-automation",
    screenshot: "/projects/review-reputation-automation.png",
    accent: "violet",
    year: "2026",
    title: {
      en: "Google Review Automation",
      fr: "Automatisation des avis Google",
    },
    domain: {
      en: "Reputation · Local marketing",
      fr: "Réputation · Marketing local",
    },
    tagline: {
      en: "After every sale, automatically asks happy customers for a Google review and routes unhappy ones to private feedback — more 5-star reviews, fewer public complaints.",
      fr: "Après chaque vente, demande automatiquement un avis Google aux clients satisfaits et oriente les mécontents vers un retour privé — plus d'avis 5 étoiles, moins de plaintes publiques.",
    },
    stack: ["n8n", "Webhooks", "Email / WhatsApp", "Google Sheets"],
    problem: {
      en: "More reviews mean more customers, but businesses forget to ask — and bad experiences go straight to public reviews.",
      fr: "Plus d'avis = plus de clients, mais les entreprises oublient de les demander — et les mauvaises expériences finissent directement en avis public.",
    },
    approach: {
      en: [
        "Fires right after a sale or visit (POS webhook, form, or manual trigger).",
        "Sends a friendly review request with the business's Google link, and invites unhappy customers to reply privately first so issues are fixed before they become a 1-star.",
        "Every request is logged for follow-up and reporting.",
      ],
      fr: [
        "Se déclenche juste après une vente ou une visite (webhook caisse, formulaire ou déclenchement manuel).",
        "Envoie une demande d'avis sympathique avec le lien Google, et invite les clients mécontents à répondre en privé d'abord pour régler le souci avant qu'il ne devienne un avis 1 étoile.",
        "Chaque demande est journalisée pour le suivi et le reporting.",
      ],
    },
    highlights: {
      en: [
        "More reviews collected, fully on autopilot.",
        "Intercepts unhappy customers before a public bad review.",
        "Complete audit log of every request sent.",
      ],
      fr: [
        "Plus d'avis collectés, en pilote automatique.",
        "Intercepte les clients mécontents avant un mauvais avis public.",
        "Journal complet de chaque demande envoyée.",
      ],
    },
    metrics: [
      { value: "3×", label: { en: "more 5-star reviews", fr: "d'avis 5 étoiles en plus" } },
      { value: "$1.2k/mo", label: { en: "in new-customer value", fr: "de valeur nouveaux clients /mois" } },
      { value: "Auto", label: { en: "after every sale", fr: "après chaque vente" } },
    ],
    flow: [
      { label: { en: "Sale completed", fr: "Vente terminée" }, kind: "trigger" },
      { label: { en: "Normalize customer", fr: "Normaliser client" }, kind: "process" },
      { label: { en: "Send review request", fr: "Demande d'avis" }, kind: "output" },
      { label: { en: "Private feedback path", fr: "Voie retour privé" }, kind: "process" },
      { label: { en: "Log request", fr: "Journaliser" }, kind: "store" },
    ],
  },
  {
    slug: "payment-reminder-engine",
    screenshot: "/projects/payment-reminder-engine.png",
    accent: "cyan",
    year: "2026",
    title: {
      en: "Payment Reminder Engine",
      fr: "Moteur de relances de paiement",
    },
    domain: {
      en: "Finance automation · Cash flow",
      fr: "Automatisation financière · Trésorerie",
    },
    tagline: {
      en: "A daily engine that chases unpaid invoices with escalating, polite reminders — get paid faster without the awkward manual follow-ups.",
      fr: "Un moteur quotidien qui relance les factures impayées avec des rappels polis et progressifs — être payé plus vite sans les relances manuelles gênantes.",
    },
    stack: ["n8n", "Google Sheets", "Scheduler", "Email"],
    problem: {
      en: "Chasing payments is awkward and time-consuming, and late invoices quietly strangle a small business's cash flow.",
      fr: "Relancer les paiements est gênant et chronophage, et les factures en retard étranglent discrètement la trésorerie d'une petite entreprise.",
    },
    approach: {
      en: [
        "A daily scheduler reads the invoices sheet and finds what's unpaid.",
        "It reminds 3 days before the due date and again while overdue, with a tone that escalates politely as the delay grows.",
        "Each reminder is timestamped so customers are never spammed, and the flow stops the moment an invoice is marked paid.",
      ],
      fr: [
        "Un planificateur quotidien lit la feuille des factures et repère les impayées.",
        "Il relance 3 jours avant l'échéance puis tant que c'est en retard, avec un ton qui monte poliment à mesure que le délai s'allonge.",
        "Chaque relance est horodatée pour ne jamais spammer, et le flux s'arrête dès qu'une facture passe à 'payée'.",
      ],
    },
    highlights: {
      en: [
        "Get paid faster with zero awkward manual chasing.",
        "Escalating tone matched to how overdue the invoice is.",
        "Spam-safe: one reminder per invoice per day, max.",
      ],
      fr: [
        "Être payé plus vite, sans aucune relance manuelle gênante.",
        "Ton progressif selon le retard de la facture.",
        "Anti-spam : une relance par facture et par jour, maximum.",
      ],
    },
    metrics: [
      { value: "$4k/mo", label: { en: "in cash flow recovered", fr: "de trésorerie récupérée /mois" } },
      { value: "−50%", label: { en: "late payments", fr: "de retards de paiement" } },
      { value: "Daily", label: { en: "automated chasing", fr: "relance automatisée" } },
    ],
    flow: [
      { label: { en: "Daily schedule", fr: "Planif. quotidienne" }, kind: "trigger" },
      { label: { en: "Read invoices", fr: "Lire les factures" }, kind: "process" },
      { label: { en: "Filter unpaid/due", fr: "Filtrer impayées" }, kind: "process" },
      { label: { en: "Send reminder", fr: "Envoyer relance" }, kind: "output" },
      { label: { en: "Mark reminded", fr: "Marquer relancé" }, kind: "store" },
    ],
  },
  {
    slug: "google-ads-performance-analyst",
    accent: "indigo",
    year: "2026",
    title: {
      en: "AI Google Ads Performance Analyst",
      fr: "Analyste de performance Google Ads propulsé par l'IA",
    },
    domain: {
      en: "Paid ads · Applied AI",
      fr: "Publicité · IA appliquée",
    },
    tagline: {
      en: "A multi-account reporting engine and live chat agent that turn raw Google Ads data into prioritized, plain-English recommendations — with every number computed in code, never guessed by the model.",
      fr: "Un moteur de reporting multi-comptes et un agent de chat en direct qui transforment les données brutes Google Ads en recommandations priorisées et en langage clair — chaque chiffre est calculé en code, jamais deviné par le modèle.",
    },
    stack: ["n8n", "Claude (Agent + tool calling)", "Google Ads API (GAQL)", "Google Sheets", "Email"],
    problem: {
      en: "Agencies managing dozens of ad accounts under one manager account spend hours every week pulling reports by hand, and answering a simple 'how is this campaign doing?' means opening the platform and digging through tabs.",
      fr: "Les agences qui gèrent des dizaines de comptes publicitaires sous un même compte manager perdent des heures chaque semaine à sortir des rapports à la main, et répondre à un simple « comment va cette campagne ? » veut dire ouvrir la plateforme et fouiller dans les onglets.",
    },
    approach: {
      en: [
        "A scheduled workflow pulls performance data across every sub-account under the manager account via the Ads API, filtered to the campaigns that matter.",
        "Budget pacing, quality scores, and search-term hygiene are computed deterministically in code — the LLM never invents a number, it only explains what the code already calculated.",
        "Claude turns the structured findings into a prioritized, plain-English report per account and emails it automatically, skipping accounts with nothing new to report.",
        "A separate conversational agent, wired to the same underlying data through callable tools, answers ad-hoc questions instantly in a chat interface instead of waiting for the next scheduled report.",
      ],
      fr: [
        "Un workflow planifié récupère les performances de tous les sous-comptes du compte manager via l'API Ads, filtré sur les campagnes pertinentes.",
        "Le rythme de dépense du budget, le quality score et l'hygiène des termes de recherche sont calculés de façon déterministe en code — le LLM n'invente jamais un chiffre, il se contente d'expliquer ce que le code a déjà calculé.",
        "Claude transforme ces constats structurés en rapport priorisé et en langage clair par compte, envoyé automatiquement par email, en sautant les comptes sans nouveauté à signaler.",
        "Un agent conversationnel distinct, connecté aux mêmes données via des outils appelables, répond instantanément aux questions ponctuelles dans une interface de chat, sans attendre le prochain rapport planifié.",
      ],
    },
    highlights: {
      en: [
        "Numbers are computed in code and only narrated by the LLM — no hallucinated metrics.",
        "Scales across a multi-account manager structure without per-account setup.",
        "Two ways in: scheduled email reports and an always-on chat agent for instant answers.",
      ],
      fr: [
        "Les chiffres sont calculés en code et seulement racontés par le LLM — aucune métrique hallucinée.",
        "Passe à l'échelle sur une structure multi-comptes manager sans configuration par compte.",
        "Deux points d'entrée : rapports email planifiés et un agent de chat toujours disponible pour des réponses instantanées.",
      ],
    },
    metrics: [
      { value: "Multi-account", label: { en: "scales across a manager account", fr: "passe à l'échelle sur un compte manager" } },
      { value: "24/7", label: { en: "instant answers via chat agent", fr: "réponses instantanées via l'agent de chat" } },
      { value: "0", label: { en: "hand-pulled reports", fr: "rapport tiré à la main" } },
    ],
    flow: [
      { label: { en: "Scheduled trigger", fr: "Déclencheur planifié" }, kind: "trigger" },
      { label: { en: "Multi-account data pull", fr: "Extraction multi-comptes" }, kind: "process" },
      { label: { en: "Deterministic scoring", fr: "Notation déterministe" }, kind: "process" },
      { label: { en: "Claude synthesis", fr: "Synthèse Claude" }, kind: "ai" },
      { label: { en: "Report + chat agent", fr: "Rapport + agent de chat" }, kind: "output" },
    ],
  },
  {
    slug: "agentic-voice-concierge",
    accent: "violet",
    year: "2026",
    title: {
      en: "Agentic Multi-Tool Voice Concierge",
      fr: "Concierge conversationnel agentique multi-outils",
    },
    domain: {
      en: "Conversational AI · Agentic tool use",
      fr: "IA conversationnelle · Usage agentique d'outils",
    },
    tagline: {
      en: "A customer-facing assistant that takes both text and voice messages and calls dedicated tools for live data — checking today's menu or booking a table — instead of guessing.",
      fr: "Un assistant client qui reçoit aussi bien des messages texte que vocaux et appelle des outils dédiés pour obtenir des données en direct — consulter le menu du jour ou réserver une table — plutôt que d'improviser.",
    },
    stack: ["n8n", "Claude (AI Agent)", "Whisper (speech-to-text)", "Google Sheets", "Gmail"],
    problem: {
      en: "Text-only FAQ bots can't handle voice messages or real actions like checking live availability or making a booking — so businesses still need a human for anything beyond the simplest question.",
      fr: "Les bots FAQ purement textuels ne gèrent ni les messages vocaux ni les vraies actions comme vérifier une disponibilité en direct ou effectuer une réservation — les entreprises ont donc toujours besoin d'un humain dès que la question sort du strict basique.",
    },
    approach: {
      en: [
        "Every incoming message is normalized first; voice notes are transcribed through Whisper before they ever reach the conversational agent, so the same flow handles text and audio identically.",
        "The core agent is wired with dedicated tools, each an isolated, independently testable sub-workflow: one reads live availability from a source of truth, one records a booking, one alerts a human for anything the agent shouldn't decide alone.",
        "Session memory keyed per contact keeps multi-turn conversations coherent without mixing up different customers.",
        "The agent is instructed to answer only from what its tools return — never inventing availability, prices, or details it wasn't given.",
      ],
      fr: [
        "Chaque message entrant est normalisé en premier ; les notes vocales sont transcrites via Whisper avant même d'atteindre l'agent conversationnel, si bien que le même flux traite texte et audio de façon identique.",
        "L'agent central est connecté à des outils dédiés, chacun un sous-workflow isolé et testable indépendamment : l'un lit une disponibilité en direct depuis une source de vérité, l'un enregistre une réservation, l'un alerte un humain pour tout ce que l'agent ne doit pas décider seul.",
        "Une mémoire de session par contact garde les conversations à plusieurs tours cohérentes sans mélanger les clients.",
        "L'agent a pour consigne de ne répondre qu'à partir de ce que ses outils renvoient — jamais d'inventer une disponibilité, un prix ou un détail qu'il n'a pas reçu.",
      ],
    },
    highlights: {
      en: [
        "One entry point handles both voice and text messages.",
        "Tool-calling architecture keeps the agent grounded — no invented answers.",
        "Each tool is an isolated sub-workflow, easy to test and extend independently.",
      ],
      fr: [
        "Un seul point d'entrée gère aussi bien la voix que le texte.",
        "L'architecture à base d'outils garde l'agent ancré dans le réel — aucune réponse inventée.",
        "Chaque outil est un sous-workflow isolé, facile à tester et à faire évoluer indépendamment.",
      ],
    },
    metrics: [
      { value: "Voice + text", label: { en: "one flow handles both channels", fr: "un flux gère les deux canaux" } },
      { value: "3 tools", label: { en: "live data & actions, not guesses", fr: "données & actions en direct, jamais devinées" } },
      { value: "24/7", label: { en: "unattended availability", fr: "disponibilité sans surveillance" } },
    ],
    flow: [
      { label: { en: "Message (text/voice)", fr: "Message (texte/voix)" }, kind: "trigger" },
      { label: { en: "Transcribe if audio", fr: "Transcription si audio" }, kind: "process" },
      { label: { en: "AI Agent + tools", fr: "Agent IA + outils" }, kind: "ai" },
      { label: { en: "Live data / action", fr: "Donnée / action en direct" }, kind: "process" },
      { label: { en: "Reply", fr: "Réponse" }, kind: "output" },
    ],
  },
  {
    slug: "seo-content-engine",
    accent: "cyan",
    year: "2026",
    title: {
      en: "Automated Blog SEO Content Engine",
      fr: "Moteur de publication de contenu SEO automatisé",
    },
    domain: {
      en: "Content ops · Applied AI",
      fr: "Content ops · IA appliquée",
    },
    tagline: {
      en: "Turns a rotating list of client sectors into fully researched, illustrated, quality-checked WordPress drafts — every keyword backed by real market data, every article measured before it's allowed to publish.",
      fr: "Transforme une liste tournante de secteurs clients en brouillons WordPress entièrement recherchés, illustrés et contrôlés — chaque mot-clé s'appuie sur des données de marché réelles, chaque article est mesuré avant d'être autorisé à publier.",
    },
    stack: ["n8n", "Claude", "Keyword research API", "AI image generation", "WordPress REST API", "Google Sheets"],
    problem: {
      en: "Producing SEO content at scale usually means either generic AI output built on invented keyword volumes, or slow manual writing — and multi-site agencies have no reliable way to guarantee every article actually respects internal-linking and quality rules without a human re-checking each one.",
      fr: "Produire du contenu SEO à grande échelle veut souvent dire soit un texte IA générique bâti sur des volumes de mots-clés inventés, soit une rédaction manuelle lente — et les agences multi-sites n'ont aucun moyen fiable de garantir que chaque article respecte vraiment les règles de maillage et de qualité sans qu'un humain revérifie chacun.",
    },
    approach: {
      en: [
        "A scheduled orchestrator rotates through client sectors and calls a real keyword-research API for every target term, rejecting anything not backed by actual volume and competition data.",
        "A generator workflow drafts the article and its imagery, then runs a deterministic quality gate in code — measuring keyword density, heading hierarchy, internal-link count, and anchor-text variation programmatically instead of trusting the model's own judgment.",
        "Articles that fail the gate are automatically revised within a bounded number of attempts; anything still failing is routed to a human with the exact reason, never silently published.",
        "Each client site is published through its own small gateway sub-workflow, so onboarding a new site means duplicating one workflow, not touching the core pipeline.",
        "Everything lands as a draft — a human always reviews before anything goes live.",
      ],
      fr: [
        "Un orchestrateur planifié parcourt les secteurs clients et interroge une vraie API de recherche de mots-clés pour chaque terme visé, en rejetant tout ce qui n'est pas appuyé par un volume et une concurrence réels.",
        "Un workflow générateur rédige l'article et son imagerie, puis fait passer une porte de qualité déterministe en code — mesurant programmatiquement densité de mots-clés, hiérarchie des titres, nombre de liens internes et variation des ancres, plutôt que de faire confiance au jugement du modèle.",
        "Les articles recalés sont corrigés automatiquement dans la limite d'un nombre borné de tentatives ; ce qui échoue encore est envoyé à un humain avec la raison exacte, jamais publié en silence.",
        "Chaque site client est publié via sa propre petite passerelle en sous-workflow, si bien qu'ajouter un site revient à dupliquer un workflow, sans toucher au pipeline central.",
        "Tout atterrit en brouillon — un humain relit toujours avant toute mise en ligne.",
      ],
    },
    highlights: {
      en: [
        "Quality is measured by code, not hoped for from the model.",
        "Keyword choices are grounded in real market data an LLM can't hallucinate around.",
        "Multi-site by design; always publishes as a draft pending human review.",
      ],
      fr: [
        "La qualité est mesurée par le code, pas espérée du modèle.",
        "Les choix de mots-clés s'appuient sur des données de marché réelles, impossibles à halluciner pour un LLM.",
        "Multi-site par conception ; publie toujours en brouillon en attente de relecture humaine.",
      ],
    },
    metrics: [
      { value: "~$0.40", label: { en: "cost per finished article, all-in", fr: "coût par article fini, tout compris" } },
      { value: "2 tries", label: { en: "bounded auto-revision, never a silent failure", fr: "correction auto bornée, jamais d'échec silencieux" } },
      { value: "Draft-only", label: { en: "always awaits human review", fr: "attend toujours une relecture humaine" } },
    ],
    flow: [
      { label: { en: "Scheduled orchestrator", fr: "Orchestrateur planifié" }, kind: "trigger" },
      { label: { en: "Real keyword research", fr: "Recherche de mots-clés réelle" }, kind: "process" },
      { label: { en: "AI draft + imagery", fr: "Brouillon + imagerie IA" }, kind: "ai" },
      { label: { en: "Deterministic QA gate", fr: "Porte qualité déterministe" }, kind: "process" },
      { label: { en: "WordPress draft", fr: "Brouillon WordPress" }, kind: "output" },
    ],
  },
  {
    slug: "automated-prospecting-agent",
    accent: "indigo",
    year: "2026",
    title: {
      en: "Automated Prospecting & Outreach Agent",
      fr: "Agent de prospection et de relance automatisé",
    },
    domain: {
      en: "Sales automation · Applied AI",
      fr: "Automatisation commerciale · IA appliquée",
    },
    tagline: {
      en: "Finds local businesses, reads each one's actual website to spot real automation opportunities, drafts a genuinely personalized outreach email — then follows up on its own three days later.",
      fr: "Trouve des commerces locaux, lit le site réel de chacun pour repérer de vraies opportunités d'automatisation, rédige un email de prospection réellement personnalisé — puis relance seul trois jours plus tard.",
    },
    stack: ["n8n", "Claude", "Business directory scraping", "Email", "Google Sheets"],
    problem: {
      en: "Cold outreach at scale is usually generic templated spam that gets ignored, because writing a genuinely personalized email to every prospect one by one doesn't scale — and a lead that doesn't reply to the first email is typically just forgotten.",
      fr: "La prospection à froid à grande échelle finit généralement en spam générique ignoré, car rédiger un email vraiment personnalisé pour chaque prospect un par un ne passe pas à l'échelle — et un lead qui ne répond pas au premier email est en général tout simplement oublié.",
    },
    approach: {
      en: [
        "A form-triggered workflow searches a target city and business category, then filters down to businesses that actually have a website worth analyzing.",
        "It visits each site and extracts real signals — services offered, visible gaps, missing functionality — instead of working from the business's name and category alone.",
        "An LLM turns those signals into 2-4 concrete, specific automation ideas and drafts an outreach email that references the business by name and by what it actually saw on the site — not a generic template.",
        "Every prospect is logged to a tracking sheet, and a second scheduled workflow automatically follows up on day 3 for anyone who hasn't replied, then marks them as followed-up so no one is ever double-emailed.",
      ],
      fr: [
        "Un workflow déclenché par formulaire cherche une ville et une catégorie de commerce cibles, puis filtre sur les commerces qui ont effectivement un site web à analyser.",
        "Il visite chaque site et en extrait de vrais signaux — services proposés, manques visibles, fonctionnalités absentes — plutôt que de se baser uniquement sur le nom et la catégorie du commerce.",
        "Un LLM transforme ces signaux en 2 à 4 idées d'automatisation concrètes et spécifiques, puis rédige un email de prospection qui cite le commerce par son nom et par ce qu'il a réellement vu sur le site — jamais un modèle générique.",
        "Chaque prospect est journalisé dans une feuille de suivi, et un second workflow planifié relance automatiquement à J+3 ceux qui n'ont pas répondu, puis les marque comme relancés pour qu'aucun ne reçoive deux emails.",
      ],
    },
    highlights: {
      en: [
        "Personalization grounded in each prospect's real website content, not a mail-merge.",
        "Automatic day-3 follow-up with zero manual tracking.",
        "Sheet-backed dedup keeps every prospect at exactly one email per step.",
      ],
      fr: [
        "Une personnalisation ancrée dans le contenu réel du site de chaque prospect, pas un simple publipostage.",
        "Relance automatique à J+3 sans aucun suivi manuel.",
        "Une dédup appuyée sur une feuille garde chaque prospect à exactement un email par étape.",
      ],
    },
    metrics: [
      { value: "2-4", label: { en: "automation ideas drafted per prospect", fr: "idées d'automatisation rédigées par prospect" } },
      { value: "J+3", label: { en: "automatic follow-up, no manual tracking", fr: "relance automatique, aucun suivi manuel" } },
      { value: "0", label: { en: "manual research per lead", fr: "recherche manuelle par lead" } },
    ],
    flow: [
      { label: { en: "Form trigger (city/category)", fr: "Déclencheur formulaire (ville/catégorie)" }, kind: "trigger" },
      { label: { en: "Find businesses", fr: "Recherche de commerces" }, kind: "process" },
      { label: { en: "Extract site signals", fr: "Extraction de signaux du site" }, kind: "process" },
      { label: { en: "AI-personalized email", fr: "Email personnalisé par IA" }, kind: "ai" },
      { label: { en: "Log + auto follow-up", fr: "Journal + relance auto" }, kind: "output" },
    ],
  },
  {
    slug: "marketplace-listing-automation",
    accent: "cyan",
    year: "2026",
    title: {
      en: "Marketplace Listing Automation",
      fr: "Automatisation d'annonces marketplace",
    },
    domain: {
      en: "Forms & data · Marketplace integrations",
      fr: "Formulaires & données · Intégrations marketplace",
    },
    tagline: {
      en: "A public form submission becomes a fully published, correctly categorized marketplace listing in seconds — no one manually retypes fields into the CMS again.",
      fr: "Une soumission de formulaire public devient une annonce marketplace publiée et correctement catégorisée en quelques secondes — plus personne ne retape les champs à la main dans le CMS.",
    },
    stack: ["n8n", "Webhooks", "Custom REST API", "WordPress"],
    problem: {
      en: "Manually transcribing a public seller's submission into a marketplace CMS is slow and error-prone: dozens of fields, category-specific taxonomy, a photo gallery to build — and if the process is retried on a slow request, the same submission can get published twice.",
      fr: "Retranscrire à la main la soumission d'un vendeur dans un CMS marketplace est lent et source d'erreurs : des dizaines de champs, une taxonomie propre à chaque catégorie, une galerie photo à construire — et si le traitement est relancé sur une requête lente, la même soumission peut être publiée deux fois.",
    },
    approach: {
      en: [
        "A webhook receives the raw form payload and normalizes it immediately, matching values by their human-readable label rather than brittle field IDs — form platforms often route real answers under confusing, mismatched keys.",
        "A companion API endpoint on the marketplace side takes the normalized listing and creates it directly — category taxonomy, geographic mapping, photo gallery, and pricing fields all handled in one call.",
        "The workflow acknowledges the form platform immediately, inside its timeout window, before doing any of the heavier processing.",
        "The publish step deliberately never auto-retries, because it isn't idempotent — a slow, multi-photo submission must never be re-sent and published twice. Any failure alerts a human by email with the exact reason instead of vanishing silently.",
      ],
      fr: [
        "Un webhook reçoit la charge brute du formulaire et la normalise immédiatement, en faisant correspondre les valeurs par leur libellé lisible plutôt que par des identifiants de champ fragiles — les plateformes de formulaire rangent souvent les vraies réponses sous des clés trompeuses.",
        "Un point d'API compagnon côté marketplace prend l'annonce normalisée et la crée directement — taxonomie de catégorie, correspondance géographique, galerie photo et champs de prix, tout géré en un seul appel.",
        "Le workflow accuse réception immédiatement au formulaire, dans sa fenêtre de timeout, avant tout traitement plus lourd.",
        "L'étape de publication ne relance délibérément jamais automatiquement, car elle n'est pas idempotente — une soumission lente avec plusieurs photos ne doit jamais être renvoyée et publiée deux fois. Tout échec alerte un humain par email avec la raison exacte plutôt que de disparaître en silence.",
      ],
    },
    highlights: {
      en: [
        "Zero manual data entry from form submission to live listing.",
        "Built to survive messy real-world payloads — inconsistent field keys, malformed price ranges.",
        "Duplicate-safe by design, after a real production incident made the lesson concrete.",
      ],
      fr: [
        "Aucune saisie manuelle entre la soumission du formulaire et l'annonce en ligne.",
        "Conçu pour survivre à des charges réelles imparfaites — clés de champ incohérentes, plages de prix malformées.",
        "Anti-doublon par conception, après un incident réel de production qui a rendu la leçon très concrète.",
      ],
    },
    metrics: [
      { value: "Seconds", label: { en: "from submission to published listing", fr: "de la soumission à l'annonce publiée" } },
      { value: "0", label: { en: "manual data entry", fr: "saisie manuelle" } },
      { value: "Fail-safe", label: { en: "email alert on any failure, never silent", fr: "alerte email sur tout échec, jamais silencieux" } },
    ],
    flow: [
      { label: { en: "Form submission", fr: "Soumission formulaire" }, kind: "trigger" },
      { label: { en: "Normalize by label", fr: "Normaliser par libellé" }, kind: "process" },
      { label: { en: "Create listing (API)", fr: "Créer l'annonce (API)" }, kind: "process" },
      { label: { en: "Published listing", fr: "Annonce publiée" }, kind: "output" },
    ],
  },
  {
    slug: "recurring-event-graphics-generator",
    accent: "violet",
    year: "2026",
    title: {
      en: "Automated Event Graphics Generator",
      fr: "Générateur automatique de visuels d'événements",
    },
    domain: {
      en: "Generative AI · Design automation",
      fr: "IA générative · Automatisation du design",
    },
    tagline: {
      en: "Turns a simple event submission into a ready-to-post, on-brand graphic — template, photo, and text assembled automatically, always reviewed by a human before anything goes out.",
      fr: "Transforme une simple soumission d'événement en visuel prêt à publier et fidèle à la marque — gabarit, photo et texte assemblés automatiquement, toujours relus par un humain avant toute publication.",
    },
    stack: ["n8n", "Task management (Asana)", "AI image generation (Flux)", "Template-based compositing", "Google Drive"],
    problem: {
      en: "Organizations that post frequent event announcements — classes, socials, concerts, save-the-dates — need a fresh on-brand graphic every time, but redoing the same layout by hand for each one is repetitive, and briefing a designer for every single post doesn't scale.",
      fr: "Les organisations qui publient de fréquentes annonces d'événements — cours, soirées, concerts, save-the-date — ont besoin d'un visuel neuf et fidèle à la marque à chaque fois, mais refaire la même mise en page à la main à chaque publication est répétitif, et briefer un graphiste pour chaque post ne passe pas à l'échelle.",
    },
    approach: {
      en: [
        "A new event request comes in through a simple task entry: which template to use, the key details (title, date, time, guests), and a photo if one is available.",
        "When no photo is supplied, one is generated on brief by an AI image model instead of leaving the slot empty or blocking the request.",
        "Each field is placed onto its matching template through an auto-sizing compositing engine: titles and secondary text scale and wrap to stay legible and never overlap, whatever the length of the real event details.",
        "The finished visual is attached back to the originating task for a human to approve — nothing is ever posted automatically, so brand control always stays with the team.",
      ],
      fr: [
        "Une nouvelle demande d'événement arrive via une simple tâche : le gabarit à utiliser, les informations clés (titre, date, horaires, intervenants) et une photo si elle existe.",
        "Si aucune photo n'est fournie, une image est générée sur mesure par un modèle d'IA plutôt que de laisser l'emplacement vide ou de bloquer la demande.",
        "Chaque champ est placé sur son gabarit via un moteur de compositing à ajustement automatique : titres et textes secondaires s'adaptent et se replient pour rester lisibles et ne jamais se chevaucher, quelle que soit la longueur des informations réelles.",
        "Le visuel final est rattaché à la tâche d'origine pour validation humaine — rien n'est jamais publié automatiquement, le contrôle de la marque reste toujours entre les mains de l'équipe.",
      ],
    },
    highlights: {
      en: [
        "Turns a form/task submission into a ready-to-post visual without opening a design tool.",
        "Auto-sizing text engine keeps every visual legible and on-brand regardless of content length.",
        "Human approval built into the loop — no visual goes out unreviewed.",
      ],
      fr: [
        "Transforme une soumission de formulaire/tâche en visuel prêt à publier sans ouvrir d'outil de design.",
        "Un moteur de texte auto-ajustable garde chaque visuel lisible et fidèle à la marque, quelle que soit la longueur du contenu.",
        "Validation humaine intégrée à la boucle — aucun visuel ne part sans relecture.",
      ],
    },
    metrics: [
      { value: "Minutes", label: { en: "from event details to a ready visual", fr: "des informations d'événement au visuel prêt" } },
      { value: "0", label: { en: "manual design work per post", fr: "de travail de design manuel par post" } },
      { value: "Always", label: { en: "reviewed by a human before publishing", fr: "relu par un humain avant publication" } },
    ],
    flow: [
      { label: { en: "Event details submitted", fr: "Informations d'événement soumises" }, kind: "trigger" },
      { label: { en: "AI photo if none provided", fr: "Photo IA si absente" }, kind: "ai" },
      { label: { en: "Auto-fit template compositing", fr: "Compositing gabarit auto-ajusté" }, kind: "process" },
      { label: { en: "Human review", fr: "Relecture humaine" }, kind: "output" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
