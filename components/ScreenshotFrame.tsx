"use client";

import { useState } from "react";
import { Workflow } from "lucide-react";

/**
 * A browser-chrome-styled frame for a workflow screenshot.
 * If the image file isn't present yet, it degrades to a clean placeholder
 * instead of a broken image — so dropping the real PNG later "just works".
 */
export function ScreenshotFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 truncate font-mono text-[11px] text-faint">
          {caption}
        </span>
      </div>
      <div className="relative aspect-[16/9] bg-bg">
        {failed ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-faint">
            <Workflow className="h-7 w-7 opacity-50" />
            <span className="px-4 text-center font-mono text-xs">{alt}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
    </figure>
  );
}
