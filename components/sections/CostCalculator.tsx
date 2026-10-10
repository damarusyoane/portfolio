"use client";

import { useId, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading, hl } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

// Working weeks in a year once holidays and public holidays are taken out.
const WEEKS_PER_YEAR = 47;
const HOURS_PER_DAY = 8;
// The "half of it" scenario shown under the total: a deliberately modest share.
const AUTOMATED_SHARE = 0.5;

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] text-ink-soft">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-2xl font-extrabold tabular-nums tracking-[-0.03em] text-ink"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-4 w-full"
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div className="mt-1.5 flex justify-between text-xs text-faint">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function CostCalculator() {
  const t = useTranslations("Calculator");
  const locale = useLocale();
  const [people, setPeople] = useState(2);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(25);

  const nf = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    maximumFractionDigits: 0,
  });
  const money = (n: number) =>
    locale === "fr" ? `${nf.format(n)} $` : `$${nf.format(n)}`;

  const hoursPerYear = people * hours * WEEKS_PER_YEAR;
  const costPerYear = hoursPerYear * rate;
  const days = Math.round(hoursPerYear / HOURS_PER_DAY);
  const recovered = costPerYear * AUTOMATED_SHARE;

  return (
    <section
      id="calculator"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t.rich("title", hl)}
          subtitle={t("subtitle")}
        />

        <Reveal className="mt-12">
          <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-card)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-surface p-7 sm:p-10">
              <Slider
                label={t("people")}
                value={people}
                min={1}
                max={20}
                display={nf.format(people)}
                onChange={setPeople}
              />
              <Slider
                label={t("hours")}
                value={hours}
                min={1}
                max={30}
                display={`${hours} h`}
                onChange={setHours}
              />
              <Slider
                label={t("rate")}
                value={rate}
                min={10}
                max={100}
                display={money(rate)}
                onChange={setRate}
              />
              <p className="mt-2 text-[13px] leading-relaxed text-faint">
                {t("rateHint")}
              </p>
            </div>

            <div className="theme-ink flex flex-col p-7 sm:p-10" aria-live="polite">
              <p className="text-sm text-muted">{t("resultLabel")}</p>
              <p className="mt-3 font-display text-[3.4rem] font-extrabold leading-none tracking-[-0.045em] text-accent tabular-nums sm:text-[4.2rem]">
                {money(costPerYear)}
              </p>
              <p className="mt-3 text-[15px] text-ink-soft">
                {t("resultHours", {
                  hours: nf.format(hoursPerYear),
                  days: nf.format(days),
                })}
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  {t.rich("half", {
                    amount: () => (
                      <strong className="font-semibold text-ink">
                        {money(recovered)}
                      </strong>
                    ),
                  })}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-faint">
                  {t("compare")}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <a
                  href={siteConfig.links.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("accent", "lg", "w-full sm:w-auto")}
                >
                  {t("cta")}
                  <ButtonArrow />
                </a>
                <p className="mt-3 text-[13px] text-faint">
                  {t("method", { weeks: WEEKS_PER_YEAR })}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
