import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

type Testimonial = { quote: string; name: string; role: string };

export function Trust() {
  const t = useTranslations("Trust");
  const locale = useLocale() as Locale;
  const [main, ...others] = t.raw("testimonials") as Testimonial[];
  const [open, close] = locale === "fr" ? ["« ", " »"] : ["“", "”"];

  return (
    <section id="trust" className="theme-night scroll-mt-16 py-24 lg:py-36">
      <div className="wrap">
        <h2 className="ts text-note text-faint">{t("title")}</h2>

        <figure className="mt-8 lg:ml-[8.333%] lg:w-[83.333%]">
          <blockquote className="font-display text-quote font-normal text-ink [text-indent:-0.45em]">
            {open}
            {main.quote}
            {close}
          </blockquote>
          <figcaption className="ts mt-6 text-sm text-muted">
            {main.name} · {main.role}
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-6">
          {others.map((o, i) => (
            <figure
              key={o.name}
              className={
                i === 0 ? "lg:col-span-7" : "lg:col-span-4 lg:col-start-9"
              }
            >
              <blockquote
                className={
                  i === 0
                    ? "font-display text-[1.375rem] leading-[1.4] text-ink"
                    : "font-display text-[1.125rem] leading-[1.45] text-ink-soft"
                }
              >
                {open}
                {o.quote}
                {close}
              </blockquote>
              <figcaption className="ts mt-4 text-note text-muted">
                {o.name} · {o.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
