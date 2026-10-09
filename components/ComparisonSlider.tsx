"use client";

import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Two layers in one box: `front` (what the customer sees) is revealed from
 * the left up to the handle, `back` (the workflow) sits underneath.
 * Driven by a native range input, so it works with keyboard and touch.
 * Below md the drag control is hidden and the two labels act as a toggle.
 */
const MD = "(min-width: 768px)";
function subscribeMd(onChange: () => void) {
  const mq = window.matchMedia(MD);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function ComparisonSlider({
  front,
  back,
  frontLabel,
  backLabel,
  ariaLabel,
  valueTemplate,
  initial = 55,
}: {
  front: ReactNode;
  back: ReactNode;
  frontLabel: string;
  backLabel: string;
  ariaLabel: string;
  /** Announced value, with "{percent}" replaced by the position. */
  valueTemplate: string;
  initial?: number;
}) {
  const [value, setPos] = useState(initial);
  const id = useId();
  const isMd = useSyncExternalStore(
    subscribeMd,
    () => window.matchMedia(MD).matches,
    () => false,
  );
  // Phones get a plain toggle: either side, never a half-and-half split.
  const pos = isMd ? value : value >= 50 ? 100 : 0;

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-border bg-[#0d1217]">
        {/* back layer */}
        <div className="flex aspect-[2.1/1] items-center justify-center p-3 sm:p-5">
          {back}
        </div>
        {/* front layer, clipped */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#eef0f2] p-3 transition-[clip-path] duration-200 ease-[var(--ease-out-soft)] sm:p-5"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden={pos === 0}
        >
          {front}
        </div>
        {/* handle */}
        <div
          className="pointer-events-none absolute inset-y-0 hidden w-px bg-accent md:block"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <span className="ts absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-accent text-[13px] text-[#121417]">
            ⇆
          </span>
        </div>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={ariaLabel}
          aria-valuetext={valueTemplate.replace("{percent}", String(pos))}
          className="peer absolute inset-0 hidden h-full w-full cursor-ew-resize opacity-0 md:block"
          style={{ touchAction: "pan-y" }}
        />
        <span
          className="pointer-events-none absolute inset-0 hidden rounded-lg ring-2 ring-accent ring-offset-2 ring-offset-bg peer-focus-visible:block"
          aria-hidden
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[15px]">
        <button
          type="button"
          onClick={() => setPos(100)}
          aria-pressed={pos === 100}
          className={cn(
            "underline-offset-4 transition-colors",
            pos >= 50 ? "text-ink underline" : "text-muted hover:text-ink",
          )}
        >
          ← {frontLabel}
        </button>
        <button
          type="button"
          onClick={() => setPos(0)}
          aria-pressed={pos === 0}
          className={cn(
            "underline-offset-4 transition-colors",
            pos < 50 ? "text-ink underline" : "text-muted hover:text-ink",
          )}
        >
          {backLabel} →
        </button>
      </div>
    </div>
  );
}
