import { cn } from "@/lib/utils";

type Kind = "trigger" | "process" | "ai" | "output" | "store";

const colorFor: Record<Kind, string> = {
  trigger: "var(--color-accent)",
  process: "var(--color-accent-3)",
  ai: "var(--color-accent-2)",
  output: "var(--color-accent)",
  store: "var(--color-accent-3)",
};

const nodes: { id: string; x: number; y: number; kind: Kind }[] = [
  { id: "a", x: 110, y: 300, kind: "trigger" },
  { id: "b", x: 180, y: 130, kind: "trigger" },
  { id: "c", x: 380, y: 210, kind: "process" },
  { id: "d", x: 380, y: 410, kind: "process" },
  { id: "e", x: 620, y: 150, kind: "ai" },
  { id: "f", x: 620, y: 330, kind: "ai" },
  { id: "g", x: 600, y: 490, kind: "store" },
  { id: "h", x: 860, y: 250, kind: "output" },
  { id: "i", x: 860, y: 430, kind: "output" },
];

const edges: [string, string][] = [
  ["a", "c"],
  ["a", "d"],
  ["b", "c"],
  ["c", "e"],
  ["c", "f"],
  ["d", "f"],
  ["d", "g"],
  ["e", "h"],
  ["f", "h"],
  ["f", "i"],
  ["g", "i"],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

export function NodeGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 980 600"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-2)" />
        </linearGradient>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base edges */}
      {edges.map(([from, to], i) => {
        const a = byId(from);
        const b = byId(to);
        return (
          <line
            key={`base-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1.2}
          />
        );
      })}

      {/* Animated flow edges */}
      {edges.map(([from, to], i) => {
        const a = byId(from);
        const b = byId(to);
        return (
          <line
            key={`flow-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edge-grad)"
            strokeWidth={1.6}
            strokeDasharray="4 16"
            style={{
              animation: `dash ${6 + (i % 4)}s linear infinite`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.9,
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.id} style={{ filter: "url(#soft-glow)" }}>
          <circle
            cx={n.x}
            cy={n.y}
            r={16}
            fill="var(--color-surface)"
            stroke={colorFor[n.kind]}
            strokeWidth={1.6}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={5}
            fill={colorFor[n.kind]}
            style={{
              animation: `pulse-slow ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
