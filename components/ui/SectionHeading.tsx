import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Rich-text tag map: `<hl>words</hl>` in a message gets the yellow marker. */
export const hl = {
  hl: (chunks: ReactNode) => <span className="hl">{chunks}</span>,
};

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
        "text-[13px] font-bold uppercase tracking-[0.14em] text-accent-ink",
        className,
      )}
    >
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
      <Heading className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem] md:text-[3.4rem]">
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
