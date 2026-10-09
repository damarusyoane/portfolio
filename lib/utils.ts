export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Content files still tag items with an accent key. The site no longer
// colour-codes categories, but the field is kept so the data stays stable.
export type AccentKey = "cyan" | "violet" | "indigo";

// Metric values in the content files are written once, in English shorthand
// ("$2.4k/mo", "−40%", "Daily"). French readers get "2 400 USD", "−40 %", etc.
const FR_METRIC_WORDS: Record<string, string> = {
  Zero: "Zéro",
  Cited: "Citées",
  Daily: "Chaque jour",
  Auto: "Automatique",
  "1-click": "1 clic",
  "100s": "Des centaines",
  "10h+/wk": "10 h+",
};

export function formatMetric(value: string, locale: string) {
  if (locale !== "fr") return value;
  if (FR_METRIC_WORDS[value]) return FR_METRIC_WORDS[value];
  const money = value.match(/^\$(\d+(?:\.\d+)?)k(\+?)(?:\/mo)?$/);
  if (money) {
    const amount = Math.round(parseFloat(money[1]) * 1000);
    return `${amount.toLocaleString("fr-FR")} USD${money[2]}`;
  }
  return value.replace(/(\d)(%|h)$/, "$1 $2");
}
