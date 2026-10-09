"use client";

import { useState } from "react";
import { Workflow } from "lucide-react";

/**
 * A light frame for a project screenshot. Shows the image at its natural
 * proportions; if the file isn't there yet it degrades to a clean placeholder
 * instead of a broken image.
 */
export function ScreenshotFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface-2 p-2 sm:p-3">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {failed ? (
          <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 text-faint">
            <Workflow className="h-7 w-7 opacity-50" />
            <span className="px-4 text-center text-sm">{alt}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="block h-auto w-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="px-1 pt-2.5 text-[13px] text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
