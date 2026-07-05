import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";
import type { GalleryStep } from "@/lib/galleries";

/**
 * A numbered, captioned walkthrough of a project — one screenshot per step.
 * Each frame degrades to a clean placeholder until the PNG is dropped in.
 */
export function ProcessGallery({
  steps,
  locale,
  accent,
}: {
  steps: GalleryStep[];
  locale: Locale;
  accent: string;
}) {
  return (
    <ol className="space-y-10">
      {steps.map((step, i) => {
        const src = typeof step.src === "string" ? step.src : step.src[locale];
        return (
        <li key={src}>
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold"
                style={{
                  color: accent,
                  border: `1px solid ${accent}`,
                  backgroundColor: `color-mix(in oklab, ${accent} 12%, transparent)`,
                }}
              >
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                {step.title[locale]}
              </h3>
            </div>
            <ScreenshotFrame
              src={src}
              alt={step.title[locale]}
              caption={`${i + 1} / ${steps.length}`}
            />
            <p className="mt-3 pl-11 text-[15px] leading-relaxed text-muted">
              {step.caption[locale]}
            </p>
          </Reveal>
        </li>
        );
      })}
    </ol>
  );
}
