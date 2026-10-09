import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section title + optional lead. No eyebrow, no animation: just type. */
export function SectionHeading({
  title,
  lead,
  className,
  as: Heading = "h2",
}: {
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-[36rem]", className)}>
      <Heading className="font-display text-h2 font-normal text-ink">
        {title}
      </Heading>
      {lead && <p className="mt-5 text-lead text-muted">{lead}</p>}
    </div>
  );
}
