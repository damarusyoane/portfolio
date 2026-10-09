import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A real screenshot on a plate, at its natural proportions, with a mono
 * caption. Dark captures (n8n canvases) sit on the night plate.
 */
export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  caption,
  dark = false,
  sizes = "(min-width: 1024px) 860px, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  dark?: boolean;
  sizes?: string;
}) {
  return (
    <figure>
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border p-1.5 sm:p-2",
          dark ? "bg-[#0d1217]" : "bg-surface-2",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="block h-auto w-full rounded"
        />
      </div>
      {caption && (
        <figcaption className="ts mt-2.5 text-note text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
