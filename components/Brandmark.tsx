import { cn } from "@/lib/utils";

/**
 * Ottomate wordmark: lowercase, heavy, with a sun-yellow full stop.
 * Inherits the surrounding text colour, so it works on white and on green.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.045em]",
        className,
      )}
    >
      ottomate<span className="text-accent">.</span>
    </span>
  );
}
