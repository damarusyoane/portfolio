import type { Locale } from "@/i18n/routing";

export type SkillGroup = {
  id: string;
  title: Record<Locale, string>;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "automation",
    title: { en: "Automation & Orchestration", fr: "Automatisation & Orchestration" },
    skills: [
      "n8n",
      "Workflow design",
      "Webhooks",
      "Schedulers",
      "Event pipelines",
      "Error sub-flows",
    ],
  },
  {
    id: "ai",
    title: { en: "AI / LLM Integration", fr: "Intégration IA / LLM" },
    skills: [
      "Claude & OpenAI APIs",
      "Prompt engineering",
      "Structured output",
      "RAG",
      "Vector databases",
      "Fine-tuning",
    ],
  },
  {
    id: "aitools",
    title: { en: "Agentic AI & Dev Tooling", fr: "IA agentique & Outils de dev" },
    skills: [
      "LangChain",
      "LangGraph",
      "AI agents",
      "MCP / tool calling",
      "LLM observability",
      "Claude Code",
      "OpenClaw",
      "Hermes Agent",
    ],
  },
  {
    id: "backend",
    title: { en: "Backend & Languages", fr: "Backend & Langages" },
    skills: ["Python", "FastAPI", "Node.js", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    id: "scraping",
    title: { en: "Scraping & Browser Automation", fr: "Scraping & Automatisation navigateur" },
    skills: ["Playwright", "Apify", "Puppeteer", "Anti-bot strategies", "Headless browsers", "Proxies"],
  },
  {
    id: "integrations",
    title: { en: "Integrations", fr: "Intégrations" },
    skills: ["OAuth 2.0", "Slack API", "Google Workspace", "WordPress", "Social APIs", "SMTP / Email"],
  },
  {
    id: "selfhost",
    title: { en: "Self-Hosting & Monitoring", fr: "Self-Hosting & Monitoring" },
    skills: [
      "n8n (self-hosted)",
      "Hetzner",
      "Cloudron",
      "Netdata",
      "Docker",
      "Linux / VPS",
    ],
  },
  {
    id: "infra",
    title: { en: "Cloud & Tooling", fr: "Cloud & Outils" },
    skills: ["AWS / GCP / Azure", "Vercel", "Cloudflare Tunnels", "Git", "CI/CD", "PostgreSQL"],
  },
];

export type ExperienceItem = {
  period: Record<Locale, string>;
  role: Record<Locale, string>;
  org: Record<Locale, string>;
  description: Record<Locale, string>;
  points: Record<Locale, string[]>;
};

export const experience: ExperienceItem[] = [
  {
    period: { en: "Mar 2026 — Present", fr: "Mars 2026 — Présent" },
    role: { en: "AI & Automation Engineer", fr: "Ingénieur IA & Automatisation" },
    org: { en: "Digital agency", fr: "Agence digitale" },
    description: {
      en: "Design, build, and operate production automation systems across SEO, content, and data pipelines.",
      fr: "Conception, développement et exploitation de systèmes d'automatisation en production : SEO, contenu et pipelines de données.",
    },
    points: {
      en: [
        "Built and run multiple production n8n workflows with retry, model-fallback, and error-alerting baked in.",
        "Engineered a distributed browser-automation system with ordered multi-agent failover.",
        "Integrated LLMs (Claude) into content and audit pipelines with reliability-first patterns.",
      ],
      fr: [
        "Conception et exploitation de plusieurs workflows n8n en production avec retry, fallback de modèle et alertes d'erreur intégrés.",
        "Développement d'un système d'automatisation navigateur distribué avec bascule multi-agents ordonnée.",
        "Intégration de LLM (Claude) dans des pipelines de contenu et d'audit selon des patterns axés fiabilité.",
      ],
    },
  },
  {
    period: { en: "Jan 2024 — Feb 2026", fr: "Janv. 2024 — Févr. 2026" },
    role: { en: "Automation & Integrations Developer", fr: "Développeur Automatisation & Intégrations" },
    org: { en: "Freelance / Independent", fr: "Freelance / Indépendant" },
    description: {
      en: "Delivered automation and integration projects connecting third-party APIs, CMS platforms, and AI services.",
      fr: "Réalisation de projets d'automatisation et d'intégration connectant API tierces, plateformes CMS et services d'IA.",
    },
    points: {
      en: [
        "Productized a suite of resellable SMB automations on n8n — a WhatsApp AI assistant, appointment-reminder system, instant lead capture, Google-review automation, and a payment-reminder engine — each config-driven and deployed per client.",
        "Connected social, CMS, storage, and messaging APIs into reliable end-to-end flows.",
        "Moved hardcoded secrets into managed credentials and added monitoring to existing automations.",
      ],
      fr: [
        "Productisation d'une suite d'automatisations PME revendables sur n8n — assistant WhatsApp IA, système de rappels de RDV, capture de leads instantanée, automatisation d'avis Google et moteur de relances de paiement — chacune pilotée par configuration et déployée par client.",
        "Connexion d'API sociales, CMS, stockage et messagerie en flux fiables de bout en bout.",
        "Migration de secrets en dur vers des credentials managés et ajout de monitoring aux automatisations existantes.",
      ],
    },
  },
];

export type Fact = {
  value: string;
  label: Record<Locale, string>;
};

export const facts: Fact[] = [
  { value: "30+", label: { en: "automations shipped", fr: "automatisations livrées" } },
  { value: "EN / FR", label: { en: "fully bilingual", fr: "parfaitement bilingue" } },
  { value: "AI-first", label: { en: "LLM-native engineering", fr: "ingénierie LLM-native" } },
  { value: "24/7", label: { en: "self-healing systems", fr: "systèmes auto-réparants" } },
];
