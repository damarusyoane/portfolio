/**
 * The night story is told on the real WhatsApp assistant workflow
 * (public/projects/whatsapp-ai-assistant/01-workflow.png, 1790×646).
 *
 * The n8n top bar and tabs (first 98px) is cropped away, so node positions are given
 * as percentages of the cropped canvas (1790×548), measured on the image.
 */
export const STORY_CANVAS = {
  src: "/projects/whatsapp-ai-assistant/01-workflow.png",
  width: 1790,
  height: 646,
  cropTop: 98,
};

export const STORY_CANVAS_RATIO =
  STORY_CANVAS.width / (STORY_CANVAS.height - STORY_CANVAS.cropTop);

/** Highlighted node per step (null = no node for that step). */
export const STORY_NODES: ({ x: number; y: number } | null)[] = [
  { x: 23.7, y: 68.8 }, // Webhook — WhatsApp entrant (Meta/Evolution)
  { x: 43.7, y: 54.4 }, // Fiche entreprise (config client)
  { x: 53.1, y: 54.4 }, // Claude — Répondre (ancré sur la fiche)
  { x: 81.2, y: 54.4 }, // Est-ce un lead ?
  { x: 90.6, y: 40.1 }, // Notifier le patron (nouveau lead)
  null, // 08:00, the owner arrives
];

/** How many chat messages are visible at each step. */
export const STORY_VISIBLE_MESSAGES = [1, 1, 2, 3, 4, 4];

/** Step from which the owner's alert card is shown. */
export const STORY_ALERT_FROM = 4;
