"use client";

import { useId } from "react";

/**
 * Ottomate brandmark — an "O" (continuous loop) traced by a bright node:
 * a workflow node running the automation loop, forever. Gradient, no tile.
 */
export function Brandmark({ size = 36 }: { size?: number }) {
  const id = useId();
  const g = `url(#${id})`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={id} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* the closed loop — the "O" */}
      <circle cx="20" cy="20" r="13.5" stroke={g} strokeWidth="3" opacity="0.4" />
      {/* the node sweeping the loop */}
      <path
        d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75"
        stroke={g}
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="31.69" cy="13.75" r="3.1" fill={g} />
    </svg>
  );
}
