export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Content files still tag items with their original accent keys; they now map
// onto the warm palette (orange / green / blue) defined in globals.css.
export const accentVar = {
  cyan: "--color-accent-ink",
  violet: "--color-accent-2",
  indigo: "--color-accent-3",
} as const;

export type AccentKey = keyof typeof accentVar;

export function accentColor(accent: AccentKey) {
  return `var(${accentVar[accent]})`;
}

/** Soft tinted background for an accent (chips, icon tiles). */
export function accentTint(accent: AccentKey, percent = 12) {
  return `color-mix(in oklab, ${accentColor(accent)} ${percent}%, transparent)`;
}

// Metric values in the content files are written once, in English shorthand
// ("$2.4k/mo", "−40%", "Daily"). French readers get "2 400 $", "−40 %", etc.
const FR_METRIC_WORDS: Record<string, string> = {
  Zero: "Zéro",
  Cited: "Citées",
  Daily: "Chaque jour",
  Auto: "Automatique",
  "1-click": "1 clic",
  "100s": "Des centaines",
  "10h+/wk": "10\u00a0h+",
};

export function formatMetric(value: string, locale: string) {
  if (locale !== "fr") return value;
  if (FR_METRIC_WORDS[value]) return FR_METRIC_WORDS[value];
  const money = value.match(/^\$(\d+(?:\.\d+)?)k(\+?)(?:\/mo)?$/);
  if (money) {
    const amount = Math.round(parseFloat(money[1]) * 1000);
    return `${amount.toLocaleString("fr-FR")}\u00a0$${money[2]}`;
  }
  return value
    .replace(/^([<>])(\d)/, "$1\u00a0$2")
    .replace(/(\d)(%|h)$/, "$1\u00a0$2");
}
