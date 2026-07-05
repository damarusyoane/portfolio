import type { Locale } from "@/i18n/routing";
import type { AccentKey } from "@/lib/utils";

type L = Record<Locale, string>;

export type Niche = {
  slug: string;
  accent: AccentKey;
  label: L;
  hero: { eyebrow: L; title: L; subtitle: L };
  stats: { value: string; label: L }[];
  pains: { title: L; text: L }[];
  automations: { title: L; text: L; impact: L }[];
  faq: { q: L; a: L }[];
};

export const niches: Record<string, Niche> = {
  ecommerce: {
    slug: "ecommerce",
    accent: "cyan",
    label: { en: "E-commerce", fr: "E-commerce" },
    hero: {
      eyebrow: {
        en: "Automation for online stores",
        fr: "Automatisation pour boutiques en ligne",
      },
      title: {
        en: "Recover lost sales. Delight buyers. On autopilot.",
        fr: "Récupérez les ventes perdues. Ravissez vos clients. En pilote automatique.",
      },
      subtitle: {
        en: "You spend money driving traffic — I make sure you don't lose it. AI automations that win back abandoned carts, answer customers 24/7, and turn buyers into 5-star reviews.",
        fr: "Vous dépensez pour attirer du trafic — je m'assure que vous ne le perdiez pas. Des automatisations IA qui récupèrent les paniers abandonnés, répondent aux clients 24/7 et transforment les acheteurs en avis 5 étoiles.",
      },
    },
    stats: [
      { value: "10-15%", label: { en: "of carts recovered", fr: "de paniers récupérés" } },
      { value: "24/7", label: { en: "customer support", fr: "de support client" } },
      { value: "3×", label: { en: "more 5-star reviews", fr: "d'avis 5 étoiles" } },
      { value: "$3k+/mo", label: { en: "in recovered revenue", fr: "de revenus récupérés /mois" } },
    ],
    pains: [
      {
        title: { en: "Abandoned carts you never chase", fr: "Des paniers abandonnés jamais relancés" },
        text: { en: "7 out of 10 carts are abandoned — and most stores never send a single recovery message.", fr: "7 paniers sur 10 sont abandonnés — et la plupart des boutiques n'envoient aucune relance." },
      },
      {
        title: { en: "After-hours messages = lost sales", fr: "Messages hors horaires = ventes perdues" },
        text: { en: "A customer asks a question at 11pm; by morning they've bought from whoever answered first.", fr: "Un client pose une question à 23h ; au matin, il a acheté chez celui qui a répondu en premier." },
      },
      {
        title: { en: "\"Where's my order?\" tickets pile up", fr: "Les tickets « où est ma commande ? » s'accumulent" },
        text: { en: "Your inbox drowns in the same repetitive questions instead of real work.", fr: "Votre boîte mail se noie sous les mêmes questions répétitives au lieu du vrai travail." },
      },
      {
        title: { en: "Barely any reviews", fr: "Presque aucun avis" },
        text: { en: "Few reviews means lower trust and lower conversion — but nobody remembers to ask.", fr: "Peu d'avis = moins de confiance et de conversion — mais personne ne pense à les demander." },
      },
    ],
    automations: [
      {
        title: { en: "Abandoned-cart recovery", fr: "Récupération de paniers abandonnés" },
        text: { en: "Automatic email + SMS + WhatsApp sequences that win back shoppers who left.", fr: "Séquences email + SMS + WhatsApp automatiques pour récupérer les acheteurs partis." },
        impact: { en: "Recover 10-15% of lost carts", fr: "Récupère 10-15 % des paniers perdus" },
      },
      {
        title: { en: "24/7 AI support assistant", fr: "Assistant support IA 24/7" },
        text: { en: "Answers FAQs, order status and sizing on WhatsApp & chat, day and night.", fr: "Répond aux FAQ, au statut de commande et aux tailles sur WhatsApp & chat, jour et nuit." },
        impact: { en: "Capture sales after hours", fr: "Capte les ventes hors horaires" },
      },
      {
        title: { en: "Post-purchase review requests", fr: "Demandes d'avis post-achat" },
        text: { en: "Ask happy buyers for a review at the perfect moment, route unhappy ones privately.", fr: "Demande un avis aux clients satisfaits au bon moment, oriente les mécontents en privé." },
        impact: { en: "3× more 5-star reviews", fr: "3× plus d'avis 5 étoiles" },
      },
      {
        title: { en: "Order & stock sync", fr: "Synchro commandes & stock" },
        text: { en: "Keep orders, inventory and fulfillment in sync across your store and tools.", fr: "Garde commandes, stock et expédition synchronisés entre boutique et outils." },
        impact: { en: "Zero manual data entry", fr: "Zéro saisie manuelle" },
      },
      {
        title: { en: "Returns & refunds automation", fr: "Automatisation retours & remboursements" },
        text: { en: "Self-serve returns flow that handles the back-and-forth for you.", fr: "Flux de retour en self-service qui gère les allers-retours à votre place." },
        impact: { en: "Fewer tickets, happier buyers", fr: "Moins de tickets, clients plus contents" },
      },
      {
        title: { en: "Win-back & VIP flows", fr: "Relances winback & VIP" },
        text: { en: "Bring past customers back and reward your best ones — automatically.", fr: "Faites revenir les anciens clients et récompensez les meilleurs — automatiquement." },
        impact: { en: "More repeat purchases", fr: "Plus d'achats répétés" },
      },
    ],
    faq: [
      {
        q: { en: "Does it work with Shopify / WooCommerce?", fr: "Ça marche avec Shopify / WooCommerce ?" },
        a: { en: "Yes — plus Klaviyo, WhatsApp, your helpdesk, and hundreds of other tools. No need to replatform.", fr: "Oui — et aussi Klaviyo, WhatsApp, votre helpdesk et des centaines d'autres outils. Pas besoin de changer de plateforme." },
      },
      {
        q: { en: "How fast can it be live?", fr: "En combien de temps c'est en ligne ?" },
        a: { en: "Cart recovery or a support bot can be live in days. You approve a fixed quote first.", fr: "La relance panier ou un bot de support peut être en ligne en quelques jours. Vous validez un devis fixe d'abord." },
      },
      {
        q: { en: "Is my store data safe?", fr: "Les données de ma boutique sont-elles en sécurité ?" },
        a: { en: "Yes — self-hosted options, managed credentials, least-access. Your data stays yours.", fr: "Oui — options auto-hébergées, identifiants managés, moindre accès. Vos données restent les vôtres." },
      },
    ],
  },

  "real-estate": {
    slug: "real-estate",
    accent: "violet",
    label: { en: "Real Estate", fr: "Immobilier" },
    hero: {
      eyebrow: { en: "Automation for real-estate agents", fr: "Automatisation pour agents immobiliers" },
      title: {
        en: "Answer every lead in seconds. Book more viewings. Close more deals.",
        fr: "Répondez à chaque lead en secondes. Plus de visites. Plus de ventes.",
      },
      subtitle: {
        en: "Speed-to-lead wins listings and buyers. AI automations that respond instantly, qualify prospects, book viewings, and follow up — so no commission ever slips away.",
        fr: "La vitesse de réponse gagne mandats et acheteurs. Des automatisations IA qui répondent instantanément, qualifient les prospects, planifient les visites et relancent — pour ne jamais laisser filer une commission.",
      },
    },
    stats: [
      { value: "<1 min", label: { en: "first response to leads", fr: "de réponse aux leads" } },
      { value: "3×", label: { en: "more viewings booked", fr: "de visites réservées" } },
      { value: "24/7", label: { en: "lead capture", fr: "de capture de leads" } },
      { value: "$5k+", label: { en: "per commission protected", fr: "par commission protégée" } },
    ],
    pains: [
      { title: { en: "Leads that go cold", fr: "Des leads qui refroidissent" }, text: { en: "Reply in 5 minutes vs an hour and you win the deal — but nobody's that fast by hand.", fr: "Répondre en 5 min plutôt qu'en 1 h fait gagner l'affaire — mais personne n'est aussi rapide à la main." } },
      { title: { en: "After-hours enquiries lost", fr: "Demandes hors horaires perdues" }, text: { en: "Buyers browse at night; the agent who answers first gets the viewing.", fr: "Les acheteurs cherchent le soir ; l'agent qui répond en premier décroche la visite." } },
      { title: { en: "Follow-up that never happens", fr: "Des relances jamais faites" }, text: { en: "Most deals need 5+ touches, but manual follow-up dies after one.", fr: "La plupart des ventes demandent 5+ relances, mais le suivi manuel s'arrête après une." } },
      { title: { en: "No-shows to viewings", fr: "Des visites manquées" }, text: { en: "Unconfirmed viewings waste your day and your fuel.", fr: "Les visites non confirmées gâchent votre journée et votre essence." } },
    ],
    automations: [
      { title: { en: "Instant lead response", fr: "Réponse instantanée aux leads" }, text: { en: "Auto-reply to leads from your site, portals and ads within seconds.", fr: "Réponse automatique aux leads du site, portails et pubs en quelques secondes." }, impact: { en: "Reply in under a minute", fr: "Réponse en moins d'une minute" } },
      { title: { en: "AI lead qualification", fr: "Qualification IA des leads" }, text: { en: "Budget, timeline and intent captured before you pick up the phone.", fr: "Budget, échéance et intention captés avant même de décrocher." }, impact: { en: "Only serious buyers", fr: "Que des acheteurs sérieux" } },
      { title: { en: "Viewing scheduling + reminders", fr: "Planification de visites + rappels" }, text: { en: "Self-serve booking with automatic confirmations and reminders.", fr: "Réservation en self-service avec confirmations et rappels automatiques." }, impact: { en: "Fewer no-shows", fr: "Moins de visites manquées" } },
      { title: { en: "Listing alerts to matched buyers", fr: "Alertes annonces aux acheteurs" }, text: { en: "New listings pushed instantly to buyers who match.", fr: "Nouvelles annonces poussées instantanément aux acheteurs correspondants." }, impact: { en: "Match buyers instantly", fr: "Matching acheteurs instantané" } },
      { title: { en: "Nurture sequences", fr: "Séquences de relance" }, text: { en: "Automated email/WhatsApp follow-ups that keep you top of mind.", fr: "Relances email/WhatsApp automatiques pour rester dans leur esprit." }, impact: { en: "Stay top of mind", fr: "Rester en tête" } },
      { title: { en: "Post-viewing feedback", fr: "Retour post-visite" }, text: { en: "Collect feedback and next steps right after each viewing.", fr: "Collecte du feedback et des prochaines étapes juste après la visite." }, impact: { en: "Close faster", fr: "Conclure plus vite" } },
    ],
    faq: [
      { q: { en: "Does it work with my CRM & portals?", fr: "Ça marche avec mon CRM & les portails ?" }, a: { en: "Yes — I connect your CRM, listing portals, WhatsApp, and calendar. No switching tools.", fr: "Oui — je connecte votre CRM, portails d'annonces, WhatsApp et agenda. Sans changer d'outils." } },
      { q: { en: "How fast can it be live?", fr: "En combien de temps c'est en ligne ?" }, a: { en: "Instant lead response can be live in days, after you approve a fixed quote.", fr: "La réponse instantanée peut être en ligne en quelques jours, après un devis fixe validé." } },
      { q: { en: "Is my data safe?", fr: "Mes données sont-elles en sécurité ?" }, a: { en: "Yes — self-hosted options, managed credentials, least-access by default.", fr: "Oui — options auto-hébergées, identifiants managés, moindre accès par défaut." } },
    ],
  },

  clinics: {
    slug: "clinics",
    accent: "cyan",
    label: { en: "Clinics & Health", fr: "Cliniques & Santé" },
    hero: {
      eyebrow: { en: "Automation for clinics & practices", fr: "Automatisation pour cliniques & cabinets" },
      title: {
        en: "Cut no-shows. Fill your calendar. Free your front desk.",
        fr: "Réduisez les no-shows. Remplissez votre agenda. Libérez votre accueil.",
      },
      subtitle: {
        en: "Every no-show and missed call is lost revenue. AI automations that remind patients, book appointments 24/7, and handle intake — so your team focuses on care, not admin.",
        fr: "Chaque no-show et appel manqué est un revenu perdu. Des automatisations IA qui rappellent les patients, prennent les RDV 24/7 et gèrent l'admission — pour que votre équipe se concentre sur le soin, pas l'administratif.",
      },
    },
    stats: [
      { value: "−40%", label: { en: "no-shows", fr: "de no-shows" } },
      { value: "24/7", label: { en: "online booking", fr: "de réservation en ligne" } },
      { value: "$2k+/mo", label: { en: "in recovered revenue", fr: "de revenus récupérés /mois" } },
      { value: "0", label: { en: "manual reminders", fr: "rappel manuel" } },
    ],
    pains: [
      { title: { en: "No-shows cost you daily", fr: "Les no-shows vous coûtent chaque jour" }, text: { en: "Empty slots from unconfirmed appointments are pure lost income.", fr: "Les créneaux vides des RDV non confirmés sont un revenu pur perdu." } },
      { title: { en: "The phone never stops", fr: "Le téléphone ne s'arrête jamais" }, text: { en: "Booking and rescheduling calls swallow your front desk's day.", fr: "Les appels de prise et report de RDV engloutissent la journée de l'accueil." } },
      { title: { en: "Manual reminders eat time", fr: "Les rappels manuels prennent du temps" }, text: { en: "Someone texting every patient by hand is time not spent on care.", fr: "Quelqu'un qui écrit à chaque patient à la main, c'est du temps volé au soin." } },
      { title: { en: "Paperwork done by hand", fr: "De la paperasse à la main" }, text: { en: "Intake forms re-typed into records — slow and error-prone.", fr: "Formulaires d'admission ressaisis dans les dossiers — lent et source d'erreurs." } },
    ],
    automations: [
      { title: { en: "Appointment reminders", fr: "Rappels de rendez-vous" }, text: { en: "Automatic SMS/WhatsApp reminders and confirmations before each visit.", fr: "Rappels et confirmations SMS/WhatsApp automatiques avant chaque visite." }, impact: { en: "−40% no-shows", fr: "−40 % de no-shows" } },
      { title: { en: "24/7 online booking", fr: "Réservation en ligne 24/7" }, text: { en: "Patients book and reschedule themselves; cancellations refill automatically.", fr: "Les patients réservent et reportent seuls ; les annulations se remplissent automatiquement." }, impact: { en: "Fill cancellations", fr: "Remplir les annulations" } },
      { title: { en: "Patient intake to records", fr: "Admission patient vers dossier" }, text: { en: "Intake forms turn into structured records — paperless.", fr: "Les formulaires d'admission deviennent des dossiers structurés — sans papier." }, impact: { en: "Paperless & faster", fr: "Sans papier & plus rapide" } },
      { title: { en: "Recall & follow-up", fr: "Rappels & suivi" }, text: { en: "Automated recalls bring patients back for check-ups.", fr: "Des relances automatiques ramènent les patients pour leurs contrôles." }, impact: { en: "Bring patients back", fr: "Faire revenir les patients" } },
      { title: { en: "Review requests after visits", fr: "Demandes d'avis après visite" }, text: { en: "Ask happy patients for a Google review at the right moment.", fr: "Demandez un avis Google aux patients satisfaits au bon moment." }, impact: { en: "More 5-star reviews", fr: "Plus d'avis 5 étoiles" } },
      { title: { en: "Missed-call text-back", fr: "Rappel auto des appels manqués" }, text: { en: "Every missed call gets an instant text so no patient is lost.", fr: "Chaque appel manqué reçoit un SMS instantané : aucun patient perdu." }, impact: { en: "Never lose a caller", fr: "Ne perdre aucun appel" } },
    ],
    faq: [
      { q: { en: "Does it work with my booking system?", fr: "Ça marche avec mon système de RDV ?" }, a: { en: "Yes — I connect your calendar/PMS, SMS, WhatsApp and email. No switching software.", fr: "Oui — je connecte votre agenda/logiciel, SMS, WhatsApp et email. Sans changer de logiciel." } },
      { q: { en: "Is patient data private and safe?", fr: "Les données patients sont-elles privées et sûres ?" }, a: { en: "Yes — I can self-host on your own servers with managed credentials and least-access, so sensitive data never leaves your control.", fr: "Oui — je peux auto-héberger sur vos serveurs avec identifiants managés et moindre accès : les données sensibles ne quittent jamais votre contrôle." } },
      { q: { en: "How fast can it be live?", fr: "En combien de temps c'est en ligne ?" }, a: { en: "Reminders can be live within days after a fixed quote.", fr: "Les rappels peuvent être en ligne en quelques jours après un devis fixe." } },
    ],
  },

  restaurants: {
    slug: "restaurants",
    accent: "indigo",
    label: { en: "Restaurants & Hospitality", fr: "Restauration & Hôtellerie" },
    hero: {
      eyebrow: { en: "Automation for restaurants & hospitality", fr: "Automatisation pour la restauration & l'hôtellerie" },
      title: {
        en: "Fill tables. Win reviews. Take orders on autopilot.",
        fr: "Remplissez vos tables. Gagnez des avis. Prenez les commandes en pilote automatique.",
      },
      subtitle: {
        en: "Turn every message into a booking and every guest into a 5-star review. AI automations for reservations, reminders, WhatsApp orders, and your online reputation.",
        fr: "Transformez chaque message en réservation et chaque client en avis 5 étoiles. Des automatisations IA pour les réservations, rappels, commandes WhatsApp et votre réputation en ligne.",
      },
    },
    stats: [
      { value: "−30%", label: { en: "no-shows", fr: "de no-shows" } },
      { value: "3×", label: { en: "more Google reviews", fr: "d'avis Google" } },
      { value: "24/7", label: { en: "bookings & orders", fr: "de réservations & commandes" } },
      { value: "$2k+/mo", label: { en: "in recovered revenue", fr: "de revenus récupérés /mois" } },
    ],
    pains: [
      { title: { en: "No-shows on reservations", fr: "Des no-shows sur les réservations" }, text: { en: "Unconfirmed tables sit empty on your busiest nights.", fr: "Les tables non confirmées restent vides les soirs de rush." } },
      { title: { en: "Missed DMs = missed bookings", fr: "DM manqués = réservations manquées" }, text: { en: "Guests message on Instagram/WhatsApp and wait too long for a reply.", fr: "Les clients écrivent sur Instagram/WhatsApp et attendent trop longtemps une réponse." } },
      { title: { en: "Too few Google reviews", fr: "Trop peu d'avis Google" }, text: { en: "Reviews drive local ranking and walk-ins — but nobody asks.", fr: "Les avis pilotent le référencement local et les passages — mais personne ne les demande." } },
      { title: { en: "Manual bookings & orders", fr: "Réservations & commandes à la main" }, text: { en: "Staff stuck taking bookings and orders instead of serving.", fr: "Le personnel coincé à prendre réservations et commandes au lieu de servir." } },
    ],
    automations: [
      { title: { en: "Reservation booking + reminders", fr: "Réservations + rappels" }, text: { en: "Guests book themselves; automatic confirmations and reminders cut no-shows.", fr: "Les clients réservent seuls ; confirmations et rappels automatiques réduisent les no-shows." }, impact: { en: "−30% no-shows", fr: "−30 % de no-shows" } },
      { title: { en: "WhatsApp ordering & booking bot", fr: "Bot de commande & réservation WhatsApp" }, text: { en: "Take orders and bookings on WhatsApp 24/7, no app needed.", fr: "Prenez commandes et réservations sur WhatsApp 24/7, sans appli." }, impact: { en: "Orders 24/7", fr: "Commandes 24/7" } },
      { title: { en: "Google review requests", fr: "Demandes d'avis Google" }, text: { en: "Ask happy guests for a review right after their visit.", fr: "Demandez un avis aux clients satisfaits juste après leur visite." }, impact: { en: "3× more reviews", fr: "3× plus d'avis" } },
      { title: { en: "Missed-call / DM text-back", fr: "Rappel auto appels / DM" }, text: { en: "Every missed message gets an instant reply so no guest is lost.", fr: "Chaque message manqué reçoit une réponse instantanée : aucun client perdu." }, impact: { en: "Capture every guest", fr: "Capter chaque client" } },
      { title: { en: "Waitlist & rebooking", fr: "Liste d'attente & re-réservation" }, text: { en: "Automatically fill cancellations from your waitlist.", fr: "Remplissez automatiquement les annulations depuis votre liste d'attente." }, impact: { en: "Fill empty tables", fr: "Remplir les tables vides" } },
      { title: { en: "Loyalty & win-back", fr: "Fidélité & winback" }, text: { en: "Bring past guests back with automated offers.", fr: "Faites revenir les anciens clients avec des offres automatiques." }, impact: { en: "More repeat guests", fr: "Plus de clients fidèles" } },
    ],
    faq: [
      { q: { en: "Does it work with my booking / POS?", fr: "Ça marche avec ma réservation / caisse ?" }, a: { en: "Yes — I connect your booking tool, WhatsApp, Google and POS. No switching.", fr: "Oui — je connecte votre outil de réservation, WhatsApp, Google et la caisse. Sans changer." } },
      { q: { en: "Can it handle multiple languages?", fr: "Ça gère plusieurs langues ?" }, a: { en: "Yes — the AI replies in your guest's language automatically.", fr: "Oui — l'IA répond automatiquement dans la langue du client." } },
      { q: { en: "How fast can it be live?", fr: "En combien de temps c'est en ligne ?" }, a: { en: "A reservation or review flow can be live within days after a fixed quote.", fr: "Un flux de réservation ou d'avis peut être en ligne en quelques jours après un devis fixe." } },
    ],
  },

  coaches: {
    slug: "coaches",
    accent: "violet",
    label: { en: "Coaches & Consultants", fr: "Coachs & Consultants" },
    hero: {
      eyebrow: { en: "Automation for coaches & consultants", fr: "Automatisation pour coachs & consultants" },
      title: {
        en: "Capture leads, book calls, and follow up — while you focus on clients.",
        fr: "Captez des leads, remplissez votre agenda, relancez — pendant que vous vous concentrez sur vos clients.",
      },
      subtitle: {
        en: "Stop losing prospects to slow follow-up. AI automations that qualify leads, book discovery calls, nurture, and onboard — so your calendar stays full without the admin.",
        fr: "Arrêtez de perdre des prospects à cause d'un suivi lent. Des automatisations IA qui qualifient les leads, réservent les appels découverte, relancent et onboardent — pour garder votre agenda plein, sans l'administratif.",
      },
    },
    stats: [
      { value: "<1 min", label: { en: "lead response", fr: "de réponse aux leads" } },
      { value: "3×", label: { en: "more booked calls", fr: "d'appels réservés" } },
      { value: "24/7", label: { en: "lead capture", fr: "de capture de leads" } },
      { value: "10h+/wk", label: { en: "saved on admin", fr: "gagnées sur l'admin /sem" } },
    ],
    pains: [
      { title: { en: "Leads slip through slow follow-up", fr: "Des leads perdus faute de suivi" }, text: { en: "A prospect fills your form and hears nothing for hours — they move on.", fr: "Un prospect remplit votre formulaire et n'a aucune nouvelle pendant des heures — il passe à autre chose." } },
      { title: { en: "Back-and-forth to book a call", fr: "Des allers-retours pour caler un appel" }, text: { en: "Endless emails just to find a time kill your momentum.", fr: "Des emails sans fin juste pour trouver un créneau tuent l'élan." } },
      { title: { en: "No nurture = cold leads", fr: "Pas de nurturing = leads froids" }, text: { en: "Leads that aren't nurtured forget you and never convert.", fr: "Les leads non nourris vous oublient et ne convertissent jamais." } },
      { title: { en: "Manual onboarding & admin", fr: "Onboarding & admin à la main" }, text: { en: "Contracts, intake and scheduling done by hand eat your week.", fr: "Contrats, questionnaires et planning à la main bouffent votre semaine." } },
    ],
    automations: [
      { title: { en: "Instant lead capture + reply", fr: "Capture de leads + réponse instantanée" }, text: { en: "Every enquiry gets a warm, instant reply and lands in your CRM.", fr: "Chaque demande reçoit une réponse chaleureuse instantanée et arrive dans votre CRM." }, impact: { en: "Reply in under a minute", fr: "Réponse en moins d'une minute" } },
      { title: { en: "AI qualification + booking", fr: "Qualification IA + réservation" }, text: { en: "Qualify prospects and let them book straight into your calendar.", fr: "Qualifiez les prospects et laissez-les réserver directement dans votre agenda." }, impact: { en: "Only serious calls", fr: "Que des appels sérieux" } },
      { title: { en: "Nurture sequences", fr: "Séquences de nurturing" }, text: { en: "Automated email/WhatsApp sequences that warm leads until they buy.", fr: "Séquences email/WhatsApp automatiques qui réchauffent les leads jusqu'à l'achat." }, impact: { en: "Warm leads convert", fr: "Les leads chauds convertissent" } },
      { title: { en: "Discovery-call reminders", fr: "Rappels d'appels découverte" }, text: { en: "Automatic reminders so prospects actually show up.", fr: "Rappels automatiques pour que les prospects soient au rendez-vous." }, impact: { en: "Fewer no-shows", fr: "Moins de no-shows" } },
      { title: { en: "Client onboarding automation", fr: "Onboarding client automatisé" }, text: { en: "Contracts, intake forms and welcome flows handled for you.", fr: "Contrats, questionnaires et flux de bienvenue gérés à votre place." }, impact: { en: "Smooth & hands-off", fr: "Fluide & mains libres" } },
      { title: { en: "Content repurposing", fr: "Repurposing de contenu" }, text: { en: "Turn one idea into posts and a newsletter, automatically.", fr: "Transformez une idée en posts et newsletter, automatiquement." }, impact: { en: "Stay visible effortlessly", fr: "Rester visible sans effort" } },
    ],
    faq: [
      { q: { en: "Does it work with Calendly / my tools?", fr: "Ça marche avec Calendly / mes outils ?" }, a: { en: "Yes — I connect your calendar, forms, email, WhatsApp and CRM. No switching.", fr: "Oui — je connecte votre agenda, formulaires, email, WhatsApp et CRM. Sans changer." } },
      { q: { en: "Do I need technical skills?", fr: "Faut-il des compétences techniques ?" }, a: { en: "None — I build and run everything; you just get more booked calls.", fr: "Aucune — je construis et gère tout ; vous récupérez juste plus d'appels réservés." } },
      { q: { en: "How fast can it be live?", fr: "En combien de temps c'est en ligne ?" }, a: { en: "A lead-capture-and-booking flow can be live within days after a fixed quote.", fr: "Un flux capture + réservation peut être en ligne en quelques jours après un devis fixe." } },
    ],
  },
};

export function getNiche(slug: string) {
  return niches[slug];
}
