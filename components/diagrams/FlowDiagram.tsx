import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

type Kind = "trigger" | "process" | "ai" | "output" | "store";

const kindColor: Record<Kind, string> = {
  trigger: "var(--color-accent-ink)",
  process: "var(--color-ink-soft)",
  ai: "var(--color-accent-3)",
  output: "var(--color-accent-2)",
  store: "var(--color-muted)",
};

const kindLabel: Record<Kind, { en: string; fr: string }> = {
  trigger: { en: "Trigger", fr: "Déclencheur" },
  process: { en: "Process", fr: "Traitement" },
  ai: { en: "AI", fr: "IA" },
  output: { en: "Output", fr: "Résultat" },
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
    <div className="rounded-[var(--radius-card)] border border-border bg-bg-soft p-4 sm:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {nodes.map((node, i) => {
          const kind = node.kind ?? "process";
          const color = kindColor[kind];
          return (
            <Fragment key={i}>
              <div className="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-border bg-surface px-4 py-4 md:text-center">
                <span
                  className="mb-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em]"
                  style={{ color }}
                >
                  {kindLabel[kind][locale]}
                </span>
                <span className="text-[15px] font-semibold leading-snug text-ink">
                  {node.label}
                </span>
              </div>

              {i < nodes.length - 1 && (
                <div className="flex shrink-0 items-center justify-center py-0.5 md:w-8 md:py-0">
                  <ArrowRight className="h-4 w-4 rotate-90 text-faint md:rotate-0" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
