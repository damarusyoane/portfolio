import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "primary" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-200 active:translate-y-px";

export const buttonSizes = {
  sm: "h-10 px-4 text-[15px]",
  md: "h-12 px-5 text-base",
  lg: "h-[52px] px-6 text-[17px]",
};

// `accent` is the only filled style (one per screen): orange with ink text.
// `primary` follows the ink token, so it flips automatically on night bands.
export const buttonVariants: Record<Variant, string> = {
  accent:
    "bg-accent text-[#121417] hover:bg-[color-mix(in_oklab,var(--color-accent),black_8%)]",
  primary:
    "bg-ink text-bg hover:bg-[color-mix(in_oklab,var(--color-ink),var(--color-bg)_12%)]",
  outline:
    "border border-ink text-ink hover:bg-[color-mix(in_oklab,var(--color-ink)_6%,transparent)]",
};

export function buttonClass(
  variant: Variant = "accent",
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
  variant = "accent",
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
