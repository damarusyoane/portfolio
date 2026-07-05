# 🚀 Checklist — Lancer tes pubs (Facebook & Google Ads)

Guide pas-à-pas pour lancer tes campagnes vers tes **landings de niche**. Ton site est déjà prêt (tracking, Cal.com, pages ciblées) — il reste à connecter les comptes et à lancer intelligemment.

> ⚠️ **Règle d'or** : les pubs *amplifient* une offre qui marche déjà. Idéalement, décroche **1-3 premiers clients** (via le playbook outbound) et récupère **2-3 vrais avis** avant de dépenser gros. Sinon tu peux cramer ton budget.

---

## ✅ Phase 0 — Prérequis (à faire AVANT de payer)
- [ ] **Acheter le domaine** (ex. `damarusngankou.com`) et le brancher sur Vercel.
- [ ] Mettre `NEXT_PUBLIC_SITE_URL` = ton domaine dans Vercel → **Redeploy**.
- [ ] Ajouter tes **vrais avis** Upwork/Fiverr dans la section Confiance (`messages/*.json` → `Trust.testimonials`).
- [ ] Vérifier que **Cal.com** fonctionne (le bouton « Réserver un audit » ouvre bien ton calendrier 30 min).
- [ ] Enregistrer tes **démos Loom** (au moins la niche e-commerce).

---

## ✅ Phase 1 — Installer le tracking (obligatoire avant toute pub)
Sans ça, tu es **aveugle** : tu ne sais pas quelle pub amène des RDV. Le code est déjà prêt, il ne manque que les IDs.

### 1.1 Créer les comptes
- [ ] **Google Analytics 4** (analytics.google.com) → récupère l'ID `G-XXXXXXX`.
- [ ] **Google Ads** (ads.google.com) → crée une **action de conversion** « Réservation audit » → récupère l'ID `AW-XXXXXXXXX` **et** le **label** de conversion.
- [ ] **Meta Business / Events Manager** (business.facebook.com) → crée un **Pixel** → récupère l'ID.

### 1.2 Mettre les IDs dans Vercel (Settings → Environment Variables)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_GADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GADS_LABEL=xxxxxxxxxxxx
NEXT_PUBLIC_FB_PIXEL_ID=xxxxxxxxxxxxxxx
```
- [ ] **Redeploy** après ajout (les variables ne sont lues qu'au build).

### 1.3 Vérifier
- [ ] Installe l'extension **Meta Pixel Helper** (Chrome) → visite ton site → le pixel doit s'allumer.
- [ ] Clique « Réserver un audit » → un événement **Lead** (Meta) et **generate_lead / conversion** (Google) part automatiquement. *(C'est déjà codé : tout clic vers Cal.com / WhatsApp / email est tracké comme conversion.)*

---

## ✅ Phase 2 — Google Ads (à lancer EN PREMIER)
Les gens qui cherchent « automatiser [X] » sont **déjà chauds** → meilleur retour pour démarrer.

- [ ] Type de campagne : **Search** (Réseau de Recherche).
- [ ] Objectif : **Prospects (Leads)**, conversion = ta « Réservation audit ».
- [ ] **Landing = la niche** : envoie vers `…/solutions/ecommerce` (jamais la home).
- [ ] **Mots-clés** (e-commerce), en exact/expression :
  - `automatisation e-commerce`, `automatiser ma boutique shopify`, `récupération paniers abandonnés`, `chatbot support e-commerce`, `automatisation shopify`, `n8n consultant`, `ecommerce automation agency`.
- [ ] **Mots-clés à exclure** : `emploi`, `formation`, `gratuit`, `tutoriel`, `cours`, `stage`.
- [ ] **Annonces** (3 titres + 2 descriptions) orientées résultat :
  - Titres : « Automatisez votre boutique » · « Récupérez 10-15 % des paniers » · « Audit d'automatisation gratuit »
  - Description : « Support 24/7, relance paniers, avis auto. Audit gratuit, sans engagement. »
- [ ] **Budget test** : 10-20 $/jour pendant 7-10 jours. Ne juge pas avant ~20-30 clics/mot-clé.

---

## ✅ Phase 3 — Facebook / Meta Ads (ensuite)
Public plus « froid » → il faut une **accroche + offre fortes** et un bon visuel.

- [ ] Objectif : **Prospects** ou **Trafic** vers ta landing de niche.
- [ ] **Audience e-commerce** : centres d'intérêt `Shopify`, `WooCommerce`, `Dropshipping`, `Ecommerce`, `Klaviyo` + intitulés `Fondateur / e-commerce`.
- [ ] **Créa** : ton **flyer** ou un court **Loom/vidéo** montrant une automatisation en action.
- [ ] **Accroche** : « Votre boutique perd des ventes chaque nuit. Voici comment récupérer 10-15 % de paniers — automatiquement. »
- [ ] **CTA** : « En savoir plus » → landing → « Réserver un audit gratuit ».
- [ ] **Budget test** : 10-15 $/jour, 1 seule audience au départ.

---

## ✅ Phase 4 — Mesurer & optimiser
Le seul chiffre qui compte au début : le **coût par appel d'audit réservé (CPA)**.

- [ ] Suis chaque jour : dépense · impressions · clics · **CTR** · coût par clic (**CPC**) · **RDV réservés** · **CPA**.
- [ ] Après ~7 jours : coupe les mots-clés/audiences sans conversion, mets plus de budget sur ceux qui convertissent.
- [ ] Calcule ta rentabilité : si un client vaut ~1 000-3 000 $ et que ton CPA est 30-80 $, tu peux scaler.
- [ ] Ne change qu'**une variable à la fois** (sinon tu ne sais pas ce qui marche).

---

## ✅ Phase 5 — Retargeting (quand tu as du trafic)
- [ ] Crée une audience **« visiteurs qui n'ont pas réservé »** (Meta Pixel / Google).
- [ ] Montre-leur une pub de rappel : un **témoignage** + « Audit gratuit, sans engagement ».
- [ ] C'est souvent le **meilleur ROI** (ils te connaissent déjà).

---

## 📎 Annexe

### Tes landings (destinations des pubs)
| Niche | URL |
|---|---|
| E-commerce | `…/en/solutions/ecommerce` · `/fr/…` |
| Immobilier | `…/solutions/real-estate` |
| Cliniques / Santé | `…/solutions/clinics` |
| Restaurants | `…/solutions/restaurants` |
| Coachs | `…/solutions/coaches` |
| Catalogue complet | `…/automations` |

> 1 campagne = 1 niche = 1 landing. Envoie chaque pub vers la page qui parle à SON audience.

### KPI cibles (repères de départ)
- **CTR** Search > 4 % · Facebook > 1 %
- **CPC** : très variable (0,3-3 $ selon pays/niche)
- **Taux landing → RDV** : vise 5-10 %
- **CPA (coût/RDV)** : acceptable si < 10-20 % de la valeur d'un client

### Erreurs à éviter
- ❌ Envoyer les pubs vers la **home** au lieu de la landing de niche.
- ❌ Lancer **sans tracking** (tu ne sauras jamais quoi optimiser).
- ❌ Juger trop tôt (laisse tourner 7-10 jours, assez de données).
- ❌ Cibler **trop large** (« tout le monde ») → argent gaspillé.
- ❌ Payer les ads **avant** d'avoir une offre/preuve qui convertit.

### Ordre conseillé
1. Domaine + tracking + avis → 2. **Outbound** (playbook) pour les 1ers clients → 3. **Google Ads** e-commerce (petit budget) → 4. **Facebook Ads** → 5. **Retargeting** → 6. Scaler ce qui marche + ajouter d'autres niches.
