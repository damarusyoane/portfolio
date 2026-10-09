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
    <ol className="space-y-14">
      {steps.map((step, i) => {
        const src = typeof step.src === "string" ? step.src : step.src[locale];
        return (
          <li key={src}>
            <Reveal>
              <div className="mb-4 flex items-baseline gap-3">
                <span
                  className="font-display text-2xl italic leading-none"
                  style={{ color: accent }}
                >
                  {i + 1}.
                </span>
                <h3 className="font-display text-xl font-normal text-ink sm:text-[1.4rem]">
                  {step.title[locale]}
                </h3>
              </div>
              <ScreenshotFrame src={src} alt={step.title[locale]} />
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                {step.caption[locale]}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
