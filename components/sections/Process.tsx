import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as {
    when: string;
    title: string;
    text: string;
  }[];
  const blocks = t.raw("planBlocks") as { label: string; text: string }[];

  return (
    <section id="process" className="scroll-mt-16 py-20 lg:py-32">
      <div className="wrap">
        <SectionHeading title={t("title")} lead={t("lead")} />

        <ol className="mt-14 grid gap-0 border-l border-border pl-6 lg:grid-cols-4 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-10 lg:pb-0 lg:pt-6">
              {/* tick on the rail */}
              <span
                className="absolute -left-[27.5px] top-1.5 h-2 w-2 rounded-full bg-ink lg:-top-[4.5px] lg:left-0"
                aria-hidden
              />
              <p className="ts text-note text-faint">
                <span className="text-ink">{i + 1}</span> · {s.when}
              </p>
              <h3 className="mt-3 font-display text-[1.375rem] leading-snug text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ol>

        {/* What the plan looks like */}
        <figure className="sheet mt-14 max-w-[34rem] p-6 sm:p-8 lg:ml-auto">
          <figcaption className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <span className="font-display text-[1.375rem] text-ink">
              {t("planTitle")}
            </span>
            <span className="ts rounded border border-border-strong px-1.5 py-0.5 text-[11px] uppercase text-muted">
              {t("planStamp")}
            </span>
          </figcaption>
          <dl className="mt-2">
            {blocks.map((b) => (
              <div
                key={b.label}
                className="grid gap-1 border-b border-border py-4 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
              >
                <dt className="ts text-note text-faint">{b.label}</dt>
                <dd className="text-[15px] leading-relaxed text-ink-soft">
                  {b.text}
                </dd>
              </div>
            ))}
          </dl>
        </figure>
      </div>
    </section>
  );
}
