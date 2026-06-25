import { siteConfig } from "@/lib/site";

export function Brandmark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl font-display font-bold text-bg shadow-lg"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background:
          "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
      }}
      aria-hidden
    >
      {siteConfig.initials}
    </span>
  );
}
