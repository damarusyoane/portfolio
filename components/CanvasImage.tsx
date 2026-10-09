import Image from "next/image";
import type { Canvas } from "@/lib/canvases";
import { cn } from "@/lib/utils";

/**
 * A workflow screenshot with the n8n top bar cropped away: the box takes the
 * cropped proportions and the image is pinned to the bottom.
 */
export function CanvasImage({
  canvas,
  alt,
  sizes,
  className,
  priority = false,
}: {
  canvas: Canvas;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: canvas.width / (canvas.height - canvas.cropTop) }}
    >
      <Image
        src={canvas.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-bottom"
      />
    </div>
  );
}
