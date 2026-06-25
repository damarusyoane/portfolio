export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const accentVar = {
  cyan: "--color-accent",
  violet: "--color-accent-2",
  indigo: "--color-accent-3",
} as const;

export type AccentKey = keyof typeof accentVar;

export function accentColor(accent: AccentKey) {
  return `var(${accentVar[accent]})`;
}

export function accentGradient(accent: AccentKey) {
  const map: Record<AccentKey, string> = {
    cyan: "linear-gradient(135deg, var(--color-accent), var(--color-accent-3))",
    violet: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))",
    indigo: "linear-gradient(135deg, var(--color-accent-3), var(--color-accent-2))",
  };
  return map[accent];
}
