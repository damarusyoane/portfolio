import { useLocale, useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Item = { q: string; a: string };

/** Every answer is visible on large screens; phones get native disclosures. */
export function Faq() {
  const t = useTranslations("Faq");
  const locale = useLocale() as Locale;
  const items = t.raw("items") as Item[];

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-border py-16 lg:py-24"
    >
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="max-w-[16ch] font-display text-h2 font-normal text-ink">
              {t("title")}
            </h2>
            <a
              href={whatsappUrl(siteConfig.whatsappMessage[locale])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-6 inline-block text-[16px] text-ink"
            >
              {t("whatsappLink")} ↗
            </a>
          </div>
        </div>

        {/* Large screens: all answers open, two columns */}
        <dl className="hidden gap-x-10 lg:col-span-8 lg:grid lg:grid-cols-2">
          {items.map((it) => (
            <div key={it.q} className="border-t border-border py-6">
              <dt className="font-display text-[1.25rem] leading-snug text-ink">
                {it.q}
              </dt>
              <dd className="mt-2.5 text-body text-muted">{it.a}</dd>
            </div>
          ))}
        </dl>

        {/* Phones: native disclosures, first two open */}
        <div className="border-b border-border lg:hidden">
          {items.map((it, i) => (
            <details
              key={it.q}
              open={i < 2}
              className="group border-t border-border [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[1.25rem] leading-snug text-ink">
                {it.q}
                <span
                  className="ts mt-0.5 text-lg text-muted group-open:hidden"
                  aria-hidden
                >
                  +
                </span>
                <span
                  className="ts mt-0.5 hidden text-lg text-muted group-open:inline"
                  aria-hidden
                >
                  −
                </span>
              </summary>
              <p className="-mt-1 pb-6 text-body text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** FAQPage structured data built from the same messages as the section. */
export function faqJsonLd(items: Item[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
