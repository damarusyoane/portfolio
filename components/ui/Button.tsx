import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px";

export const buttonSizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

// `primary` uses the ink tokens, so inside a `.theme-ink` band it flips to a
// white button automatically. `accent` is the sun-yellow CTA for green bands.
export const buttonVariants: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-accent hover:text-[#0c1f18]",
  accent: "bg-accent text-[#0c1f18] hover:bg-[#ffe07a]",
  secondary:
    "border border-border-strong text-ink hover:border-ink hover:bg-ink/[0.04]",
  ghost: "text-ink-soft hover:text-ink",
};

export function buttonClass(
  variant: Variant = "primary",
  size: keyof typeof buttonSizes = "md",
  className?: string,
) {
  return cn(base, buttonSizes[size], buttonVariants[variant], className);
}

export function ButtonArrow({ external = false }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden
    />
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof buttonSizes;
  arrow?: boolean;
  external?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {arrow && <ButtonArrow />}
    </a>
  );
}
