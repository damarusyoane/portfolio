"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { LiveClock, LiveDot } from "@/components/LiveClock";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * Booking + contact in one place. The calendar pane always shows a poster
 * first; the Cal.com iframe is only mounted on large screens, once the
 * section comes near the viewport, and then sits on top of the poster.
 */
export function BookCall() {
  const t = useTranslations("Book");
  const locale = useLocale() as Locale;
  const steps = t.raw("posterSteps") as string[];
  const pane = useRef<HTMLDivElement>(null);
  const [embed, setEmbed] = useState(false);

  useEffect(() => {
    const el = pane.current;
    if (!el || !window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEmbed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { founderPhoto } = siteConfig.assets;

  return (
    <section
      id="book"
      className="scroll-mt-16 border-y border-border bg-bg-soft py-24 lg:py-36"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          {founderPhoto && (
            <Image
              src={founderPhoto}
              alt={siteConfig.founder}
              width={112}
              height={112}
              className="mb-6 h-14 w-14 rounded-full object-cover"
            />
          )}
          <h2 className="font-display text-h2 font-normal text-ink">
            {t("title")}
          </h2>
          <p className="mt-5 text-lead text-muted">{t("lead")}</p>
          <p className="mt-5 text-body text-ink-soft">{t("withFounder")}</p>
          <p className="mt-2 text-body text-ink-soft">{t("guarantees")}</p>

          <a
            href={siteConfig.links.cal}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("accent", "lg", "mt-9")}
          >
            {t("cta")}
            <ButtonArrow />
          </a>

          <p className="mt-5 flex items-center gap-2.5 text-[15px] text-muted">
            <LiveDot />
            <span>
              {t.rich("clock", {
                time: () => <LiveClock />,
                place: siteConfig.place[locale],
              })}
              {siteConfig.hours && (
                <> {t("hours", { hours: siteConfig.hours[locale] })}</>
              )}
            </span>
          </p>
        </div>

        {/* Calendar pane: poster underneath, live calendar on top (lg+) */}
        <div className="hidden lg:col-span-7 lg:block">
          <div
            ref={pane}
            className="sheet relative min-h-[600px] overflow-hidden"
          >
            <div className="flex h-full min-h-[600px] flex-col justify-between p-10">
              <div>
                <p className="ts text-note text-faint">{t("posterMeta")}</p>
                <ol className="mt-8 space-y-6">
                  {steps.map((s, i) => (
                    <li key={s} className="flex gap-5">
                      <span className="ts pt-1 text-sm text-faint">
                        {i + 1}
                      </span>
                      <span className="font-display text-[1.6rem] leading-snug text-ink">
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <a
                href={siteConfig.links.cal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-[16px] text-ink"
              >
                {t("posterLink")} ↗
              </a>
            </div>
            {embed && (
              <iframe
                src={`${siteConfig.links.cal}?theme=light`}
                title={t("embedTitle")}
                loading="lazy"
                className="absolute inset-0 h-full w-full bg-transparent"
              />
            )}
          </div>
        </div>

        {/* Not ready to book */}
        <div
          id="contact"
          className="scroll-mt-24 border-t border-border pt-8 lg:col-span-12"
        >
          <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[17px]">
            <span className="text-ink">{t("notReady")}</span>
            <a
              href={whatsappUrl(siteConfig.whatsappMessage[locale])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-ink"
            >
              {t("whatsapp")}
            </a>
            <a
              href={mailtoUrl(siteConfig.emailSubject[locale])}
              className="text-link text-ink"
            >
              {t("email")}
            </a>
          </p>
          <details className="group mt-3 max-w-3xl">
            <summary className="text-link inline-block cursor-pointer list-none text-[17px] text-ink [&::-webkit-details-marker]:hidden">
              {t("leaveMessage")}{" "}
              <span
                className="inline-block transition-transform group-open:rotate-180"
                aria-hidden
              >
                ▾
              </span>
            </summary>
            <ContactForm />
          </details>
        </div>
      </div>
    </section>
  );
}
