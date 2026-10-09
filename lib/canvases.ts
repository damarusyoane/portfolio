/**
 * Real n8n workflow screenshots, per project, with the height of the n8n
 * top bar + Editor tabs to crop away (px, from the top of the image).
 */
export type Canvas = {
  src: string;
  width: number;
  height: number;
  cropTop: number;
};

export const canvases: Record<string, Canvas> = {
  "whatsapp-ai-assistant": {
    src: "/projects/whatsapp-ai-assistant/01-workflow.png",
    width: 1790,
    height: 646,
    cropTop: 98,
  },
  "instant-lead-response": {
    src: "/projects/instant-lead-response/01-workflow.png",
    width: 1787,
    height: 685,
    cropTop: 99,
  },
  "payment-reminder-engine": {
    src: "/projects/payment-reminder-engine/01-workflow.png",
    width: 1751,
    height: 632,
    cropTop: 101,
  },
  "appointment-reminder-system": {
    src: "/projects/appointment-reminder-system/01-workflow.png",
    width: 1728,
    height: 644,
    cropTop: 91,
  },
  "ai-voice-calling-assistant": {
    src: "/projects/ai-voice-calling-assistant/01-workflow.png",
    width: 1761,
    height: 671,
    cropTop: 93,
  },
  "review-reputation-automation": {
    src: "/projects/review-reputation-automation/01-workflow.png",
    width: 1752,
    height: 712,
    cropTop: 96,
  },
  "rag-knowledge-assistant": {
    src: "/projects/rag-knowledge-assistant/01-workflow.png",
    width: 1754,
    height: 689,
    cropTop: 96,
  },
  "seo-audit-engine": {
    src: "/projects/seo-audit-engine/01-workflow.png",
    width: 1770,
    height: 698,
    cropTop: 16,
  },
  "google-ads-campaign-agent": {
    src: "/projects/google-ads-campaign-agent/02-workflow.png",
    width: 1765,
    height: 704,
    cropTop: 90,
  },
  "distributed-automation": {
    src: "/projects/distributed-automation/02-workflow.png",
    width: 1788,
    height: 563,
    cropTop: 97,
  },
  "ai-content-pipeline": {
    src: "/projects/ai-content-pipeline.png",
    width: 1361,
    height: 655,
    cropTop: 16,
  },
  "resilient-llm-automation": {
    src: "/projects/resilient-llm-automation.png",
    width: 1312,
    height: 613,
    cropTop: 0,
  },
};

export function getCanvas(slug: string): Canvas | undefined {
  return canvases[slug];
}
