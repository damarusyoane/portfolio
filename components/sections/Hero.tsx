import { useLocale, useTranslations } from "next-intl";
import { ChatFrame, type ChatMessage } from "@/components/ChatFrame";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

// Server component: nothing above the fold waits for JavaScript or fades in.
export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale() as Locale;
  const messages = t.raw("demo.messages") as ChatMessage[];

  const quote = locale === "fr" ? ["«\u00a0", "\u00a0»"] : ["“", "”"];

  const chat = {
    business: t("demo.business"),
    status: t("demo.status"),
    day: t("demo.day"),
  };

  return (
    <section id="top" className="pb-20 pt-24 sm:pt-28 lg:pb-28 lg:pt-36">
      <div className="wrap grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        {/* Headline */}
        <h1 className="font-display text-display font-normal text-ink lg:col-span-7 lg:row-start-1">
          {t("headlineTop")}{" "}
          <span className="whitespace-nowrap">
            {t("headlineAccent")}
            <span
              className="ts ml-3 inline-flex translate-y-[-0.35em] items-center gap-1 rounded border border-border-strong bg-surface px-1.5 py-0.5 align-middle text-[14px] tracking-normal text-ink"
              aria-hidden
            >
              {t("chip")}
              <svg viewBox="0 0 16 11" className="h-2.5 w-3.5 fill-[#53bdeb]">
                <path d="M11.1.6 4.9 7.8 2 5 .9 6.1l4.1 4L12.2 1.7zM15.1.6 8.9 7.8l-.8-.8-1.1 1.2 1.9 1.9L16.2 1.7z" />
              </svg>
            </span>
          </span>
        </h1>

        {/* Phones: a compact slice of the conversation, right under the H1 */}
        <figure className="lg:hidden">
          <ChatFrame
            messages={messages.slice(0, 2)}
            {...chat}
            className="max-w-[400px]"
          />
          <figcaption className="ts mt-2.5 text-note text-faint">
            {t("demo.caption")}
          </figcaption>
        </figure>

        {/* CTA, lead, proof */}
        <div className="lg:col-span-6 lg:row-start-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              id="hero-cta"
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("accent", "lg")}
            >
              {t("ctaPrimary")}
              <ButtonArrow />
            </a>
            <a
              href={whatsappUrl(siteConfig.whatsappMessage[locale])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-[16px] text-ink"
            >
              {t("ctaWhatsapp")}
            </a>
          </div>
          <p className="ts mt-4 text-note text-faint">{t("byline")}</p>

          <p className="mt-8 max-w-[36ch] text-lead text-ink-soft">
            {t("tagline")}
          </p>

          <figure className="mt-10 max-w-[34rem] border-t border-border pt-6">
            <blockquote className="font-display text-[1.375rem] leading-snug text-ink">
              {quote[0]}
              {t("proofQuote")}
              {quote[1]}
            </blockquote>
            <figcaption className="mt-3">
              <span className="ts block text-note text-faint">
                {t("proofAttribution")}
              </span>
              <span className="mt-1 block text-[15px] text-muted">
                {t("proofOthers")}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Desktop: the full conversation, still */}
        <figure className="hidden lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:block lg:self-center">
          <ChatFrame messages={messages} {...chat} />
          <figcaption className="ts mt-4 text-note text-faint">
            {t("demo.caption")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
