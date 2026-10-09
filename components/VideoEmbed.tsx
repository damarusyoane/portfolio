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
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface-2 p-2 sm:p-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface">
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
                embed ? "text-accent-ink group-hover:scale-110" : "text-faint/40"
              }`}
            />
            <span className="text-sm">
              {embed ? playLabel || "Play demo" : soonLabel || "Demo coming soon"}
            </span>
          </button>
        )}
      </div>
      {title && (
        <figcaption className="px-1 pt-2.5 text-[13px] text-faint">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
