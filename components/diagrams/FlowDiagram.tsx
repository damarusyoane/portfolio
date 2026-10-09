import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

type Kind = "trigger" | "process" | "ai" | "output" | "store";

const kindLabel: Record<Kind, { en: string; fr: string }> = {
  trigger: { en: "Trigger", fr: "Déclencheur" },
  process: { en: "Process", fr: "Traitement" },
  ai: { en: "AI", fr: "IA" },
  output: { en: "Output", fr: "Résultat" },
  store: { en: "Store", fr: "Stockage" },
};

export type DiagramNode = { label: string; kind?: Kind };

/** The workflow as a plain sequence of labelled steps. */
export function FlowDiagram({
  nodes,
  locale = "en",
}: {
  nodes: DiagramNode[];
  locale?: "en" | "fr";
}) {
  return (
    <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
      {nodes.map((node, i) => {
        const kind = node.kind ?? "process";
        return (
          <Fragment key={i}>
            <li className="sheet flex min-w-0 flex-1 flex-col justify-center px-4 py-4">
              <span className="ts text-note text-faint">
                {i + 1} · {kindLabel[kind][locale]}
              </span>
              <span className="mt-1 text-[15px] font-medium leading-snug text-ink">
                {node.label}
              </span>
            </li>
            {i < nodes.length - 1 && (
              <li
                aria-hidden
                className="flex shrink-0 items-center justify-center py-0.5 md:w-7 md:py-0"
              >
                <ArrowRight className="h-4 w-4 rotate-90 text-faint md:rotate-0" />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
