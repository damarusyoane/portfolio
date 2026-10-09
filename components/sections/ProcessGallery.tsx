import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { pngSize } from "@/lib/imageSize";
import type { Locale } from "@/i18n/routing";
import type { GalleryStep } from "@/lib/galleries";

/**
 * A project's walkthrough as numbered figures: one real screenshot per step,
 * captioned in mono. Workflow canvases are flagged as demonstration runs.
 */
export function ProcessGallery({
  steps,
  locale,
  labels,
}: {
  steps: GalleryStep[];
  locale: Locale;
  labels: { figure: string; demoNote: string; realCapture: string };
}) {
  return (
    <ol className="space-y-14">
      {steps.map((step, i) => {
        const src = typeof step.src === "string" ? step.src : step.src[locale];
        const size = pngSize(src) ?? { width: 1600, height: 900 };
        const isCanvas = /workflow/.test(src);
        return (
          <li key={src}>
            <h3 className="mb-4 flex items-baseline gap-3 font-display text-[1.375rem] text-ink">
              <span className="ts text-sm text-faint">
                {labels.figure} {i + 1}
              </span>
              {step.title[locale]}
            </h3>
            <ScreenshotFrame
              src={src}
              alt={step.title[locale]}
              width={size.width}
              height={size.height}
              dark={isCanvas}
              caption={isCanvas ? labels.demoNote : labels.realCapture}
            />
            <p className="mt-3 max-w-[62ch] text-body text-muted">
              {step.caption[locale]}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
