import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center gap-2.5",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
