import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-accent-ink",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Kicker>{kicker}</Kicker>
      <Heading className="mt-4 font-display text-[2.15rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem] md:text-5xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-5 text-[17px] leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
