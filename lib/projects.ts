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
      en: "File retrieval from a platform with no API",
      fr: "Récupération de fichiers sur une plateforme sans API",
    },
    domain: {
      en: "Distributed systems · Browser automation",
      fr: "Systèmes distribués · Automatisation navigateur",
    },
    tagline: {
      en: "A one-click internal service that retrieves large licensed assets from a no-API, anti-bot platform, using a fleet of browser agents with automatic failover.",
      fr: "Un service interne en un clic qui récupère de gros assets sous licence sur une plateforme sans API et anti-bot, grâce à une flotte d’agents navigateur avec bascule automatique.",
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
      en: "A team needed on-demand access to large licensed digital assets (videos up to several GB) on a third-party platform that exposes no public API and ships aggressive anti-bot protection. Manual downloads were slow, didn’t scale across the team, and broke whenever the platform shifted its front-end.",
      fr: "Une équipe avait besoin d’un accès à la demande à de gros assets sous licence (vidéos jusqu’à plusieurs Go) sur une plateforme tierce sans API publique et dotée d’une protection anti-bot agressive. Les téléchargements manuels étaient lents, ne passaient pas à l’échelle et cassaient à chaque évolution du front-end.",
    },
    approach: {
      en: [
        "An n8n orchestration layer receives requests from an internal form via webhook and issues a short-lived, single-use token per request.",
        "A fleet of headless Python agents (FastAPI + Playwright) runs the authenticated browser session on residential IPs, each exposed through its own Cloudflare Tunnel.",
        "The system captures the platform’s short-lived signed CDN URL at click-time (~45s validity) and streams the file straight from the CDN to the requester. The orchestrator never proxies the heavy payload.",
        "Ordered multi-agent failover: a health-checked rotation tries each agent until one succeeds, so a single offline machine never breaks the pipeline.",
        "Hardened against expiring URLs, per-item rate limits, and an SPA navigation quirk that broke page evaluation on certain asset types.",
      ],
      fr: [
        "Une couche d’orchestration n8n reçoit les demandes d’un formulaire interne via webhook et émet un jeton à usage unique et à courte durée de vie par demande.",
        "Une flotte d’agents Python headless (FastAPI + Playwright) exécute la session navigateur authentifiée sur IP résidentielle, chacun exposé via son propre tunnel Cloudflare.",
        "Le système capture l’URL CDN signée à courte durée de vie (~45 s) au moment du clic et diffuse le fichier directement du CDN vers le demandeur. L’orchestrateur ne relaie jamais la charge lourde.",
        "Bascule multi-agents ordonnée : une rotation avec health-check essaie chaque agent jusqu’au succès, donc une machine éteinte ne casse jamais le pipeline.",
        "Durci contre l’expiration des URL, les limites de débit par item et un comportement SPA qui cassait l’évaluation de page sur certains types d’assets.",
      ],
    },
    highlights: {
      en: [
        "Reduced a manual, error-prone task to a single internal click.",
        "Built to handle failures: health checks, ordered failover, single-use tokens, explicit error notifications.",
        "Handles every asset type automatically: archives, stock video with resolution selection, and photos.",
      ],
      fr: [
        "Une tâche manuelle et risquée réduite à un seul clic interne.",
        "Conçu pour gérer les pannes : health-checks, bascule ordonnée, jetons à usage unique, notifications d’erreur explicites.",
        "Gère automatiquement chaque type d’asset : archives, vidéo stock avec choix de résolution, photos.",
      ],
    },
    metrics: [
      {
        value: "$1.8k/mo",
        label: { en: "in manual labor saved", fr: "de main-d’œuvre économisée par mois" },
      },
      {
        value: "10×",
        label: { en: "faster than manual retrieval", fr: "plus rapide que le manuel" },
      },
      {
        value: "Auto",
        label: { en: "failover between agents", fr: "bascule entre agents" },
      },
    ],
    flow: [
      { label: { en: "Internal form", fr: "Formulaire interne" }, kind: "trigger" },
      { label: { en: "n8n orchestrator", fr: "Orchestrateur n8n" }, kind: "process" },
      { label: { en: "Agent fleet (failover)", fr: "Flotte d’agents (bascule)" }, kind: "process" },
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
      en: "Automatic SEO checks on published pages",
      fr: "Contrôle SEO automatique des pages publiées",
    },
    domain: {
      en: "Data pipelines · Applied AI",
      fr: "Pipelines de données · IA appliquée",
    },
    tagline: {
      en: "Turns a manual SEO QA checklist into a repeatable pipeline that crawls live pages, compares them to the brief with an LLM, and ships actionable fixes.",
      fr: "Transforme une checklist QA SEO manuelle en pipeline reproductible : crawl des pages en ligne, comparaison au brief via LLM, et recommandations actionnables.",
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
      en: "An agency manually checked whether published pages matched the SEO brief (titles, meta descriptions, H1s, target keywords) across many client sites with very different setups. It was slow and inconsistent, and it produced wrong results, with no error, whenever a spreadsheet column was reordered.",
      fr: "Une agence vérifiait manuellement si les pages publiées respectaient le brief SEO (titles, meta-descriptions, H1, mots-clés cibles) sur de nombreux sites clients aux configurations très différentes. C’était lent, irrégulier, et cela produisait de faux résultats, sans le moindre message d’erreur, dès qu’une colonne de tableur était réordonnée.",
    },
    approach: {
      en: [
        "A crawler discovers sitemaps across heterogeneous setups (pretty permalinks, query-string sitemaps, and www / non-www DNS variants), so both staging and production sites are covered.",
        "Brief data is read by column header, never by position, and the run fails loudly if a required column is missing. A moved column can no longer yield wrong-but-plausible output.",
        "An LLM compares each live page against its brief and returns structured, prioritized recommendations.",
        "Reliability in production: retry-with-backoff for rate-limited APIs, an Opus→Sonnet model fallback, and an in-workflow error sub-flow that emails failures instantly.",
      ],
      fr: [
        "Un crawler découvre les sitemaps sur des setups hétérogènes (permaliens jolis, sitemaps en query-string, variantes DNS www / sans-www) pour couvrir staging et production.",
        "Les données du brief sont lues par en-tête de colonne, jamais par position, et l’exécution échoue explicitement si une colonne requise manque. Une colonne déplacée ne peut plus produire de résultat faux mais plausible.",
        "Un LLM compare chaque page en ligne à son brief et renvoie des recommandations structurées et priorisées.",
        "Fiabilité en production : retry avec backoff sur les API limitées, fallback de modèle Opus→Sonnet, et sous-flux d’erreur qui notifie les échecs par email instantanément.",
      ],
    },
    highlights: {
      en: [
        "A manual QA checklist becomes a repeatable, auditable pipeline.",
        "Copes with messy real-world inputs: staging sites, reordered columns, DNS quirks.",
        "Handles provider outages and per-minute quota limits with retries and a fallback model.",
      ],
      fr: [
        "Une checklist QA manuelle devient un pipeline reproductible et auditable.",
        "Accepte les entrées réelles imparfaites : sites de staging, colonnes réordonnées, particularités DNS.",
        "Gère les pannes de fournisseur et les quotas par minute grâce aux retries et à un modèle de secours.",
      ],
    },
    metrics: [
      {
        value: "$2.5k/mo",
        label: { en: "in QA time saved", fr: "de temps de contrôle qualité économisé par mois" },
      },
      {
        value: "−90%",
        label: { en: "manual QA time", fr: "de QA manuel en moins" },
      },
      {
        value: "100s",
        label: { en: "of pages audited per run", fr: "de pages auditées à chaque passage" },
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
      en: "Google Ads campaigns prepared from a brief",
      fr: "Campagnes Google Ads préparées à partir d’un brief",
    },
    domain: {
      en: "Paid ads · Marketing automation",
      fr: "Publicité · Automatisation marketing",
    },
    tagline: {
      en: "Turns a one-line product brief into a ready-to-import Google Ads Search campaign: keyword themes, ad groups and RSAs written by AI, exported straight to Google Ads Editor.",
      fr: "Transforme un brief produit d’une ligne en campagne Google Ads Search prête à importer : thèmes de mots-clés, groupes d’annonces et RSA rédigés par l’IA, exportés directement vers Google Ads Editor.",
    },
    stack: [
      "n8n",
      "Claude API",
      "Google Ads Editor CSV",
      "Google Sheets",
      "Email",
    ],
    problem: {
      en: "Building a Search campaign by hand is slow and error-prone: dozens of keywords to group, and Responsive Search Ads whose 15 headlines and 4 descriptions must each respect strict character limits. One overflow and the whole import is rejected.",
      fr: "Construire une campagne Search à la main est lent et risqué : des dizaines de mots-clés à regrouper, et des annonces responsives dont les 15 titres et 4 descriptions doivent respecter des limites de caractères strictes. Un seul dépassement et tout l’import est rejeté.",
    },
    approach: {
      en: [
        "A product/service brief comes in from a form or Google Sheet; an LLM expands it into structured keyword themes and matching ad groups.",
        "For each ad group, Claude writes a full Responsive Search Ad (15 headlines and 4 descriptions) tuned to the offer and audience.",
        "Every asset is validated against Google’s exact character limits before export, so no asset is rejected at import for being too long.",
        "The workflow assembles a Google Ads Editor-ready CSV and emails it to the media buyer for a one-click bulk import, then logs the run.",
      ],
      fr: [
        "Un brief produit/service arrive d’un formulaire ou d’un Google Sheet ; un LLM le développe en thèmes de mots-clés structurés et groupes d’annonces correspondants.",
        "Pour chaque groupe, Claude rédige une annonce responsive complète (15 titres et 4 descriptions) adaptée à l’offre et à l’audience.",
        "Chaque élément est validé contre les limites de caractères exactes de Google avant export, pour qu’aucun ne soit rejeté à l’import pour cause de longueur.",
        "Le workflow assemble un CSV prêt pour Google Ads Editor et l’envoie par email au média-acheteur pour un import en un clic, puis journalise l’exécution.",
      ],
    },
    highlights: {
      en: [
        "A full Search campaign drafted from a one-line brief in minutes, where building it by hand takes hours.",
        "Character limits are checked before export, so the import isn’t rejected for length.",
        "Delivered as a Google Ads Editor CSV: import, review, launch.",
      ],
      fr: [
        "Une campagne Search complète rédigée en quelques minutes à partir d’un brief d’une ligne, là où le travail à la main prend des heures.",
        "Les limites de caractères sont vérifiées avant l’export : l’import n’est pas rejeté pour un texte trop long.",
        "Livré en CSV Google Ads Editor : importez, relisez, lancez.",
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
        label: { en: "import to Google Ads", fr: "d’import vers Google Ads" },
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
      en: "TikTok videos prepared and published automatically",
      fr: "Vidéos TikTok préparées et publiées automatiquement",
    },
    domain: {
      en: "Generative AI · Social media automation",
      fr: "IA générative · Automatisation réseaux sociaux",
    },
    tagline: {
      en: "Every three days, an n8n workflow turns the latest n8n & AI news into a 45-second talking-avatar video and publishes it to TikTok through the official API, without any manual step.",
      fr: "Tous les trois jours, un workflow n8n transforme l’actualité n8n & IA en une vidéo d’avatar parlant de 45 secondes et la publie sur TikTok via l’API officielle, sans intervention humaine.",
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
      en: "Keeping a social channel alive with fresh, on-topic short videos is time-consuming and hard to sustain manually, and brittle UI-automation ‘auto-posters’ break constantly and risk the account.",
      fr: "Maintenir une chaîne sociale active avec de courtes vidéos fraîches et pertinentes est chronophage et difficile à tenir manuellement. Quant aux « auto-posters » par automatisation d’UI, ils cassent sans cesse et mettent le compte en danger.",
    },
    approach: {
      en: [
        "A schedule trigger fires every three days and pulls the latest items from two RSS feeds (the n8n blog and an AI-news source), merged and sorted by date.",
        "A Google Sheet acts as a dedup log: the workflow skips any story already covered and picks the freshest unused one.",
        "Claude writes a catchy ~45-second script and returns strict JSON (script, title, caption, hashtags), which is parsed and validated.",
        "HeyGen renders a talking-photo avatar video; the workflow polls the render status in a loop until it’s complete, then downloads the MP4 and measures its exact byte size.",
        "The video is posted via TikTok’s official Content Posting API (init → chunked upload → status), then logged back to the Sheet. A self-referencing error workflow emails any failure.",
      ],
      fr: [
        "Un déclencheur planifié se lance tous les trois jours et récupère les derniers éléments de deux flux RSS (le blog n8n et une source d’actualité IA), fusionnés et triés par date.",
        "Un Google Sheet sert de journal anti-doublon : le workflow ignore les sujets déjà traités et choisit le plus récent encore inédit.",
        "Claude rédige un script accrocheur d’environ 45 secondes et renvoie un JSON strict (script, titre, légende, hashtags), parsé et validé.",
        "HeyGen génère une vidéo d’avatar parlant ; le workflow interroge le statut du rendu en boucle jusqu’à complétion, puis télécharge le MP4 et mesure sa taille exacte en octets.",
        "La vidéo est publiée via l’API officielle TikTok Content Posting (init → upload par chunk → statut), puis journalisée dans le Sheet. Un workflow d’erreur auto-référencé notifie tout échec par email.",
      ],
    },
    highlights: {
      en: [
        "Runs unattended on a 3-day cadence, from news item to published TikTok.",
        "Publishes through TikTok’s official API rather than fragile UI automation, with a full audit log in the Sheet.",
        "Built-in safeguards: render-status polling loop, model retries, and email alerts on any failure.",
      ],
      fr: [
        "Tourne sans intervention sur une cadence de 3 jours, de l’actualité à la publication TikTok.",
        "Publie via l’API officielle TikTok plutôt que par une automatisation d’UI fragile, avec un journal d’audit complet dans le Sheet.",
        "Garde-fous intégrés : boucle de polling du rendu, retries de modèle et alertes email en cas d’échec.",
      ],
    },
    metrics: [
      {
        value: "$1.2k/mo",
        label: { en: "in content costs saved", fr: "de coûts de contenu économisés par mois" },
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
      en: "Generated articles, with a backup model if the first one fails",
      fr: "Articles générés, avec un modèle de secours si le premier échoue",
    },
    domain: {
      en: "LLM reliability · Content ops",
      fr: "Fiabilité de l’IA · Production de contenu",
    },
    tagline: {
      en: "A scheduled content engine built around what actually goes wrong with LLMs in production: overload, quotas and malformed output. Every failure sends an email alert.",
      fr: "Un moteur de contenu planifié conçu autour des vrais problèmes des LLM en production : surcharge, quotas, sorties malformées. Chaque échec déclenche une alerte par email.",
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
      en: "Content jobs that rely on LLMs fail in production for boring reasons: provider overload (HTTP 529), quota limits, malformed responses. A single unhandled failure can break a scheduled job for days before anyone notices.",
      fr: "Les tâches de contenu qui reposent sur un LLM échouent en production pour des raisons banales : surcharge fournisseur (HTTP 529), quotas, réponses malformées. Un seul échec non géré peut casser un job planifié pendant des jours sans que personne ne s’en aperçoive.",
    },
    approach: {
      en: [
        "A multi-node LLM pipeline generates long-form content and matching imagery, then publishes to a CMS.",
        "Reliability patterns on every model call: retry-with-backoff, an Opus→Sonnet fallback branch when the primary model stays overloaded, and a self-referencing error workflow that emails any failure with full execution context.",
        "Secrets were moved out of node parameters into managed credentials, so nothing is hardcoded.",
      ],
      fr: [
        "Un pipeline LLM multi-nœuds génère du contenu long et l’imagerie associée, puis publie sur un CMS.",
        "Des patterns de fiabilité sur chaque appel modèle : retry avec backoff, branche de fallback Opus→Sonnet quand le modèle principal reste surchargé, et un workflow d’erreur auto-référencé qui notifie tout échec par email avec le contexte complet d’exécution.",
        "Les secrets ont été sortis des paramètres de nœud vers des credentials managés : rien n’est en dur.",
      ],
    },
    highlights: {
      en: [
        "Built to run on a schedule without supervision, with an email alert for every failure.",
        "Graceful degradation: quality-first primary model, automatic fallback under load.",
        "Security: keys are kept in managed credentials instead of being hardcoded.",
      ],
      fr: [
        "Conçu pour tourner de façon planifiée sans surveillance, avec une alerte email pour chaque échec.",
        "Dégradation gracieuse : modèle principal axé qualité, fallback automatique sous charge.",
        "Sécurité : les clés sont gardées dans des credentials managés au lieu d’être écrites en dur.",
      ],
    },
    metrics: [
      {
        value: "$1.5k/mo",
        label: { en: "in content ops saved", fr: "de production de contenu économisée par mois" },
      },
      {
        value: "24/7",
        label: { en: "unattended, with automatic model fallback", fr: "sans surveillance, avec modèle de secours automatique" },
      },
      {
        value: "0",
        label: { en: "failures without an alert", fr: "échec sans alerte" },
      },
    ],
    flow: [
      { label: { en: "Schedule", fr: "Planification" }, kind: "trigger" },
      { label: { en: "LLM (primary)", fr: "LLM (principal)" }, kind: "ai" },
      { label: { en: "Fallback model", fr: "Modèle de secours" }, kind: "ai" },
      { label: { en: "Image + CMS", fr: "Image + CMS" }, kind: "process" },
      { label: { en: "Error alerts", fr: "Alertes d’erreur" }, kind: "output" },
    ],
  },
  {
    slug: "rag-knowledge-assistant",
    screenshot: "/projects/rag-knowledge-assistant.png",
    accent: "violet",
    year: "2026",
    title: {
      en: "An assistant that answers from your documents",
      fr: "Un assistant qui répond à partir de vos documents",
    },
    domain: {
      en: "Applied AI · Retrieval-augmented generation",
      fr: "IA appliquée · Génération augmentée par récupération",
    },
    tagline: {
      en: "Answers staff questions from the company’s own documents: retrieval first, then a guard-railed LLM, with citations in every answer.",
      fr: "Répond aux questions des équipes à partir des documents de l’entreprise : récupération d’abord, puis un LLM encadré, avec des citations dans chaque réponse.",
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
      en: "LLMs are confident but don’t know a company’s private, ever-changing knowledge, so they hallucinate. Meanwhile, teams keep losing time digging through scattered docs, wikis, and PDFs.",
      fr: "Les LLM sont sûrs d’eux mais ignorent la connaissance privée et mouvante d’une entreprise, alors ils hallucinent. De leur côté, les équipes perdent du temps à fouiller des docs, wikis et PDF éparpillés.",
    },
    approach: {
      en: [
        "Documents are ingested, chunked, embedded, and stored in a vector database; a scheduled sync keeps the index fresh as content changes.",
        "On each question, the system retrieves the most relevant chunks and passes only that grounded context to the LLM.",
        "The model answers strictly from the retrieved context and returns citations; guardrails make it refuse, rather than guess, when nothing relevant is found.",
        "Unanswered questions are logged to reveal knowledge gaps, and the assistant is delivered where people already are: Slack and an embeddable web widget.",
      ],
      fr: [
        "Les documents sont ingérés, découpés, vectorisés et stockés dans une base vectorielle ; une synchro planifiée garde l’index à jour.",
        "À chaque question, le système récupère les passages les plus pertinents et ne transmet que ce contexte sourcé au LLM.",
        "Le modèle répond strictement à partir du contexte récupéré et renvoie des citations ; des garde-fous le font refuser, plutôt que deviner, quand rien de pertinent n’est trouvé.",
        "Les questions sans réponse sont journalisées pour révéler les lacunes, et l’assistant est livré là où les gens sont déjà : Slack et un widget web intégrable.",
      ],
    },
    highlights: {
      en: [
        "Answers drawn from your own documents, with sources. No model fine-tuning required.",
        "When no relevant passage is found, the assistant says it doesn’t know instead of guessing.",
        "Pluggable: swap the model, vector store, or sources without touching the flow.",
      ],
      fr: [
        "Des réponses tirées de vos propres documents, avec leurs sources, sans fine-tuning de modèle.",
        "Quand aucun passage pertinent n’est trouvé, l’assistant répond qu’il ne sait pas au lieu de deviner.",
        "Modulaire : changez le modèle, la base vectorielle ou les sources sans toucher au flux.",
      ],
    },
    metrics: [
      {
        value: "$2k/mo",
        label: { en: "in staff time saved", fr: "de temps équipe économisé par mois" },
      },
      {
        value: "−70%",
        label: { en: "time to find answers", fr: "de temps pour trouver une réponse" },
      },
      {
        value: "Cited",
        label: { en: "answers drawn from your documents", fr: "réponses tirées de vos documents" },
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
      en: "AI voice calling assistant",
      fr: "Assistant d’appels vocaux IA",
    },
    domain: {
      en: "Conversational AI · Outbound automation",
      fr: "IA conversationnelle · Automatisation d’appels",
    },
    tagline: {
      en: "An outbound-calling pipeline that reads your contacts, places real AI voice calls, analyses every conversation, logs it, and updates the CRM, with no human in the loop.",
      fr: "Un pipeline d’appels sortants qui lit vos contacts, passe de vrais appels vocaux IA, analyse chaque conversation, la journalise et met à jour le CRM, sans intervention humaine.",
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
      en: "Outbound calling (lead qualification, follow-ups, reminders) eats hours of repetitive dialing. Many calls go unanswered, reps forget to log outcomes, and CRM updates slip, so follow-ups are missed and the pipeline leaks.",
      fr: "Les appels sortants (qualification de leads, relances, rappels) engloutissent des heures de numérotation répétitive. Beaucoup d’appels restent sans réponse, les conclusions ne sont pas notées et les mises à jour CRM passent à la trappe : les relances sont manquées et le pipeline fuit.",
    },
    approach: {
      en: [
        "A scheduled n8n workflow reads the contact list (Google Sheets) and loops through every contact, automatically skipping anyone already called. It is idempotent, so re-runs never double-dial.",
        "For each contact it places a real outbound phone call through a voice-AI agent (Vapi) that holds a natural conversation toward a defined goal.",
        "A wait step holds execution until the call ends, then the full transcript and metadata are pulled back via API.",
        "An LLM analyses each transcript and extracts a structured result: outcome (interested / no-answer / voicemail / callback), sentiment, a summary, and the recommended next action.",
        "Every call is logged to a database (Supabase) with transcript and analysis, the contact’s status is auto-updated to ‘Called’, and the loop advances to the next contact, all unattended.",
      ],
      fr: [
        "Un workflow n8n planifié lit la liste de contacts (Google Sheets) et boucle sur chacun, en écartant automatiquement ceux déjà appelés. Il est idempotent : aucune ré-exécution ne rappelle deux fois.",
        "Pour chaque contact, il passe un vrai appel téléphonique sortant via un agent vocal IA (Vapi) qui mène une conversation naturelle vers un objectif défini.",
        "Une étape d’attente suspend l’exécution jusqu’à la fin de l’appel, puis le transcript complet et les métadonnées sont récupérés via API.",
        "Un LLM analyse chaque transcript et en extrait un résultat structuré : issue (intéressé / sans réponse / messagerie / à rappeler), sentiment, résumé et action recommandée.",
        "Chaque appel est journalisé en base (Supabase) avec transcript et analyse, le statut du contact passe à « Appelé », et la boucle avance au contact suivant, sans surveillance.",
      ],
    },
    highlights: {
      en: [
        "Runs unattended: reads contacts, calls, analyses, logs, updates the CRM, then moves on to the next contact, so every outcome is recorded for follow-up.",
        "Idempotent: already-called contacts are skipped, so it’s safe to re-run anytime.",
        "Structured, queryable outcomes (outcome + sentiment + next action) instead of unwritten call notes.",
      ],
      fr: [
        "Tourne sans surveillance : lit les contacts, appelle, analyse, journalise, met à jour le CRM puis passe au contact suivant, et chaque issue est notée pour la relance.",
        "Idempotent : les contacts déjà appelés sont ignorés, relançable à tout moment sans risque.",
        "Des résultats structurés et requêtables (issue + sentiment + action) au lieu de notes d’appel jamais écrites.",
      ],
    },
    metrics: [
      {
        value: "$3k/mo",
        label: { en: "in calling time saved", fr: "de temps d’appels économisé par mois" },
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
      en: "WhatsApp AI assistant for small businesses",
      fr: "Assistant WhatsApp IA pour PME",
    },
    domain: {
      en: "Conversational AI · Customer service",
      fr: "IA conversationnelle · Service client",
    },
    tagline: {
      en: "A WhatsApp assistant that answers customers day and night from the business’s own information, never invents a price, flags hot leads to the owner and hands over to a human when needed.",
      fr: "Un assistant WhatsApp qui répond aux clients jour et nuit à partir des informations de l’entreprise, n’invente jamais un prix, signale les prospects chauds au gérant et passe la main à un humain si besoin.",
    },
    stack: ["n8n", "Claude (Haiku)", "Meta WhatsApp Cloud API", "Evolution API", "Google Sheets", "Webhooks"],
    problem: {
      en: "Small businesses lose sales by not replying fast on WhatsApp, and building a bespoke bot for every client is slow and impossible to scale.",
      fr: "Les PME perdent des ventes faute de répondre vite sur WhatsApp, et construire un bot sur-mesure pour chaque client est lent et impossible à mettre à l’échelle.",
    },
    approach: {
      en: [
        "A single generic webhook normalizes inbound messages from both the Meta Cloud API and self-hosted Evolution, so the same bot serves either channel.",
        "Each client lives in a Google Sheet ‘profile’ (business info, hours, prices, FAQ, persona). The LLM answers strictly from it, never inventing prices, and hands off to a human on request.",
        "Detected leads are logged and the owner is notified instantly; updating prices or opening hours is just a matter of editing the sheet.",
      ],
      fr: [
        "Un webhook générique unique normalise les messages entrants de l’API Meta Cloud et d’Evolution auto-hébergé : le même bot sert les deux canaux.",
        "Chaque client tient dans une « fiche » Google Sheet (infos, horaires, prix, FAQ, persona). Le LLM répond strictement à partir d’elle, n’invente jamais de prix et passe la main à un humain sur demande.",
        "Les leads détectés sont journalisés et le gérant est prévenu immédiatement ; changer un prix ou un horaire se fait en modifiant simplement la fiche.",
      ],
    },
    highlights: {
      en: [
        "Set up in days: the business’s details live in a simple sheet the owner can edit.",
        "Answers come only from the sheet, so prices aren’t made up, and a human can take over cleanly.",
        "Dual-channel: official Meta API or the client’s existing number via Evolution.",
      ],
      fr: [
        "Mise en place en quelques jours : les infos de l’entreprise tiennent dans une fiche modifiable par le gérant.",
        "Les réponses viennent uniquement de la fiche, donc pas de prix inventé, et un humain peut reprendre la main proprement.",
        "Dual-canal : API officielle Meta ou le numéro existant du client via Evolution.",
      ],
    },
    metrics: [
      { value: "$2.4k/mo", label: { en: "in recovered sales", fr: "de ventes récupérées par mois" } },
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
      en: "Appointment reminder system",
      fr: "Système de rappels de rendez-vous",
    },
    domain: {
      en: "Scheduling automation · Anti no-show",
      fr: "Automatisation d’agenda · Rendez-vous manqués",
    },
    tagline: {
      en: "An automated engine that cuts no-shows by reminding clients 24 hours and 2 hours before their appointment, with duplicate-proof tracking.",
      fr: "Un moteur automatisé qui réduit les no-shows en rappelant les clients 24 h et 2 h avant leur rendez-vous, sans jamais doubler les envois.",
    },
    stack: ["n8n", "Google Sheets", "Scheduler", "Email / WhatsApp"],
    problem: {
      en: "No-shows cost service businesses real money, and manual reminders don’t scale across a busy calendar.",
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
        "Il envoie un rappel sur deux fenêtres (~24 h et ~2 h avant) et marque chacun comme envoyé, pour ne jamais doubler.",
        "Les rendez-vous annulés sont ignorés ; tout le flux est idempotent et peut tourner en continu sans risque.",
      ],
    },
    highlights: {
      en: [
        "Fewer no-shows, with no reminders to send by hand.",
        "Idempotent: each reminder is marked as sent, so it never goes out twice.",
        "Drops into any business with a simple appointments sheet.",
      ],
      fr: [
        "Moins de no-shows, sans rappel à envoyer à la main.",
        "Idempotent : chaque rappel est marqué comme envoyé et ne part jamais deux fois.",
        "S’intègre à toute entreprise avec une simple feuille de rendez-vous.",
      ],
    },
    metrics: [
      { value: "−40%", label: { en: "no-shows", fr: "de no-shows" } },
      { value: "$1.6k/mo", label: { en: "in recovered bookings", fr: "de RDV récupérés par mois" } },
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
      en: "Instant lead capture and response",
      fr: "Capture & relance de leads instantanée",
    },
    domain: {
      en: "Sales automation · Speed-to-lead",
      fr: "Automatisation commerciale · Réactivité",
    },
    tagline: {
      en: "Captures inbound leads, qualifies them with an LLM, auto-replies in under a minute, and alerts sales, because answering in 5 minutes instead of an hour wins the deal.",
      fr: "Capte les leads entrants, les qualifie via un LLM, répond automatiquement en moins d’une minute et alerte le commercial, car répondre en 5 min plutôt qu’en 1 h fait gagner l’affaire.",
    },
    stack: ["n8n", "Claude", "Google Sheets", "Webhooks", "Email"],
    problem: {
      en: "Speed-to-lead drives conversion, yet leads slip away when no one responds fast, and manual qualification is inconsistent.",
      fr: "La vitesse de réponse pilote la conversion, mais les leads s’évaporent quand personne ne répond vite, et la qualification manuelle est inconstante.",
    },
    approach: {
      en: [
        "A webhook receives leads from any form or ad platform and normalizes the fields.",
        "An LLM scores the lead (hot / warm / cold), summarizes it, and drafts a warm first reply in the lead’s language.",
        "The prospect gets an instant auto-reply, sales is notified with the qualification, and the lead is logged to the CRM sheet.",
      ],
      fr: [
        "Un webhook reçoit les leads de n’importe quel formulaire ou plateforme publicitaire et normalise les champs.",
        "Un LLM note le lead (chaud / tiède / froid), le résume et rédige une première réponse chaleureuse dans sa langue.",
        "Le prospect reçoit une réponse instantanée, le commercial est notifié avec la qualification, et le lead est journalisé dans le CRM.",
      ],
    },
    highlights: {
      en: [
        "Sub-minute first response, automatically.",
        "Every lead AI-scored and summarized for sales.",
        "Each new lead gets an instant reply and lands in the CRM sheet.",
      ],
      fr: [
        "Première réponse en moins d’une minute, automatiquement.",
        "Chaque lead noté et résumé par l’IA pour le commercial.",
        "Chaque nouveau lead reçoit une réponse immédiate et arrive dans le CRM.",
      ],
    },
    metrics: [
      { value: "3×", label: { en: "lead conversion", fr: "de conversion des leads" } },
      { value: "$3.5k/mo", label: { en: "in extra revenue", fr: "de revenus supplémentaires par mois" } },
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
      en: "Google review automation",
      fr: "Automatisation des avis Google",
    },
    domain: {
      en: "Reputation · Local marketing",
      fr: "Réputation · Marketing local",
    },
    tagline: {
      en: "After every sale, automatically asks happy customers for a Google review and routes unhappy ones to private feedback: more 5-star reviews, fewer public complaints.",
      fr: "Après chaque vente, demande automatiquement un avis Google aux clients satisfaits et oriente les mécontents vers un retour privé : plus d’avis 5 étoiles, moins de plaintes publiques.",
    },
    stack: ["n8n", "Webhooks", "Email / WhatsApp", "Google Sheets"],
    problem: {
      en: "More reviews mean more customers, but businesses forget to ask, and bad experiences go straight to public reviews.",
      fr: "Plus d’avis = plus de clients, mais les entreprises oublient de les demander, et les mauvaises expériences finissent directement en avis public.",
    },
    approach: {
      en: [
        "Fires right after a sale or visit (POS webhook, form, or manual trigger).",
        "Sends a friendly review request with the business’s Google link, and invites unhappy customers to reply privately first so issues are fixed before they become a 1-star.",
        "Every request is logged for follow-up and reporting.",
      ],
      fr: [
        "Se déclenche juste après une vente ou une visite (webhook caisse, formulaire ou déclenchement manuel).",
        "Envoie une demande d’avis sympathique avec le lien Google, et invite les clients mécontents à répondre en privé d’abord pour régler le souci avant qu’il ne devienne un avis 1 étoile.",
        "Chaque demande est journalisée pour le suivi et le reporting.",
      ],
    },
    highlights: {
      en: [
        "More reviews collected, on autopilot.",
        "Intercepts unhappy customers before a public bad review.",
        "Complete audit log of every request sent.",
      ],
      fr: [
        "Plus d’avis collectés, en pilote automatique.",
        "Intercepte les clients mécontents avant un mauvais avis public.",
        "Journal complet de chaque demande envoyée.",
      ],
    },
    metrics: [
      { value: "3×", label: { en: "more 5-star reviews", fr: "d’avis 5 étoiles en plus" } },
      { value: "$1.2k/mo", label: { en: "in new-customer value", fr: "de valeur nouveaux clients par mois" } },
      { value: "Auto", label: { en: "after every sale", fr: "après chaque vente" } },
    ],
    flow: [
      { label: { en: "Sale completed", fr: "Vente terminée" }, kind: "trigger" },
      { label: { en: "Normalize customer", fr: "Normaliser client" }, kind: "process" },
      { label: { en: "Send review request", fr: "Demande d’avis" }, kind: "output" },
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
      en: "Payment reminder engine",
      fr: "Moteur de relances de paiement",
    },
    domain: {
      en: "Finance automation · Cash flow",
      fr: "Automatisation financière · Trésorerie",
    },
    tagline: {
      en: "A daily engine that chases unpaid invoices with polite reminders that escalate, so you get paid faster without awkward manual follow-ups.",
      fr: "Un moteur quotidien qui relance les factures impayées avec des rappels polis et progressifs, pour être payé plus vite sans les relances manuelles gênantes.",
    },
    stack: ["n8n", "Google Sheets", "Scheduler", "Email"],
    problem: {
      en: "Chasing payments is awkward and time-consuming, and late invoices strangle a small business’s cash flow.",
      fr: "Relancer les paiements est gênant et chronophage, et les factures en retard étranglent la trésorerie d’une petite entreprise.",
    },
    approach: {
      en: [
        "A daily scheduler reads the invoices sheet and finds what’s unpaid.",
        "It reminds 3 days before the due date and again while overdue, with a tone that escalates politely as the delay grows.",
        "Each reminder is timestamped so customers are never spammed, and the flow stops the moment an invoice is marked paid.",
      ],
      fr: [
        "Un planificateur quotidien lit la feuille des factures et repère les impayées.",
        "Il relance 3 jours avant l’échéance puis tant que c’est en retard, avec un ton qui monte poliment à mesure que le délai s’allonge.",
        "Chaque relance est horodatée pour ne jamais spammer, et le flux s’arrête dès qu’une facture passe à « payée ».",
      ],
    },
    highlights: {
      en: [
        "Get paid faster without awkward manual chasing.",
        "Escalating tone matched to how overdue the invoice is.",
        "Spam-safe: one reminder per invoice per day, max.",
      ],
      fr: [
        "Être payé plus vite, sans relances manuelles gênantes.",
        "Ton progressif selon le retard de la facture.",
        "Anti-spam : une relance par facture et par jour, maximum.",
      ],
    },
    metrics: [
      { value: "$4k/mo", label: { en: "in cash flow recovered", fr: "de trésorerie récupérée par mois" } },
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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
