import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

type Kind = "trigger" | "process" | "ai" | "output" | "store";

const kindColor: Record<Kind, string> = {
  trigger: "var(--color-accent)",
  process: "var(--color-accent-3)",
  ai: "var(--color-accent-2)",
  output: "var(--color-accent)",
  store: "var(--color-accent-3)",
};

const kindLabel: Record<Kind, { en: string; fr: string }> = {
  trigger: { en: "Trigger", fr: "Déclencheur" },
  process: { en: "Process", fr: "Traitement" },
  ai: { en: "AI", fr: "IA" },
  output: { en: "Output", fr: "Sortie" },
  store: { en: "Store", fr: "Stockage" },
};

export type DiagramNode = { label: string; kind?: Kind };

export function FlowDiagram({
  nodes,
  locale = "en",
}: {
  nodes: DiagramNode[];
  locale?: "en" | "fr";
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl p-5 sm:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {nodes.map((node, i) => {
          const kind = node.kind ?? "process";
          const color = kindColor[kind];
          return (
            <Fragment key={i}>
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-border bg-surface px-3 py-4 text-center">
                <span
                  className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    color,
                    backgroundColor:
                      "color-mix(in oklab, " + color + " 14%, transparent)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {kindLabel[kind][locale]}
                </span>
                <span className="text-sm font-medium leading-snug text-ink">
                  {node.label}
                </span>
              </div>

              {i < nodes.length - 1 && (
                <div className="flex shrink-0 items-center justify-center md:w-10">
                  <ArrowRight className="h-5 w-5 rotate-90 text-faint md:rotate-0" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
