"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

/**
 * Loom (or any) video embed with click-to-play and a graceful
 * "coming soon" fallback when no URL is set yet.
 */
export function VideoEmbed({
  url,
  title,
  playLabel,
  soonLabel,
}: {
  url?: string | null;
  title?: string;
  playLabel?: string;
  soonLabel?: string;
}) {
  const [play, setPlay] = useState(false);
  const embed = url ? url.replace("/share/", "/embed/") : null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 truncate font-mono text-[11px] text-faint">
          {title || "Demo"}
        </span>
      </div>
      <div className="relative aspect-video bg-bg">
        {embed && play ? (
          <iframe
            src={`${embed}?autoplay=1`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || "Demo"}
          />
        ) : (
          <button
            type="button"
            onClick={() => embed && setPlay(true)}
            disabled={!embed}
            className="group flex h-full w-full flex-col items-center justify-center gap-3 text-faint transition-colors hover:text-ink disabled:cursor-default"
          >
            <PlayCircle
              className={`h-14 w-14 transition-transform ${
                embed ? "text-accent group-hover:scale-110" : "text-faint/40"
              }`}
            />
            <span className="text-sm">
              {embed ? playLabel || "Play demo" : soonLabel || "Demo coming soon"}
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
