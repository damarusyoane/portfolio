import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/** A short signed letter from the founder. No photo means no image at all. */
export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;
  const letter = t.raw("letter") as string[];
  const facts = t.raw("facts") as string[];
  const { founderPhoto, signatureSvg } = siteConfig.assets;

  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-border py-20 lg:py-32"
    >
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <h2 className="font-display text-h2 font-normal text-ink">
            {t("title")}
          </h2>
          {founderPhoto && (
            <figure className="mt-8 w-[240px]">
              <Image
                src={founderPhoto}
                alt={siteConfig.founder}
                width={480}
                height={600}
                className="aspect-[4/5] w-full rounded-lg object-cover"
              />
              <figcaption className="ts mt-2 text-note text-faint">
                {siteConfig.founder}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-6">
          <div className="max-w-[62ch] space-y-5 font-display text-[1.25rem] leading-[1.6] text-ink-soft">
            {letter.map((p, i) => (
              <p
                key={i}
                className={i === letter.length - 1 ? "text-ink" : undefined}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8">
            {signatureSvg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signatureSvg}
                alt=""
                aria-hidden
                className="mb-2 h-14 w-auto"
              />
            )}
            <p className="font-display text-[1.25rem] font-medium text-ink">
              {siteConfig.founder}
            </p>
            <p className="text-[15px] text-muted">
              {siteConfig.founderRole[locale]}
            </p>
          </div>

          <p className="mt-8 text-body text-ink-soft">
            {t("ps")}{" "}
            <a
              href={whatsappUrl(siteConfig.whatsappMessage[locale])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link whitespace-nowrap text-ink"
            >
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>

        <ul className="ts space-y-2 border-t border-border pt-6 text-note text-muted lg:col-span-2 lg:col-start-11 lg:border-t-0 lg:pt-1">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
          <li>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 hover:text-accent-ink"
            >
              {t("linkedin")} ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
