import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[13px] font-medium text-ink-soft",
        className,
      )}
    >
      {dot && <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden />}
      {children}
    </span>
  );
}
