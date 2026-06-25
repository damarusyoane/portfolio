import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-offset-4 disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "text-bg shadow-[0_8px_30px_-8px_rgba(34,211,238,0.5)] hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.6)] hover:-translate-y-0.5",
  secondary:
    "glass text-ink hover:border-border-strong hover:bg-white/5 hover:-translate-y-0.5",
  ghost: "text-ink-soft hover:text-ink hover:bg-white/5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const style =
    variant === "primary"
      ? {
          backgroundImage:
            "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
        }
      : undefined;

  return (
    <a
      className={cn(base, sizes[size], variants[variant], className)}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}
