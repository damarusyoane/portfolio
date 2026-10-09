import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pains() {
  const t = useTranslations("Pains");
  const items = t.raw("items") as {
    when: string;
    event: string;
    cost: string;
  }[];

  return (
    <section
      id="pains"
      className="scroll-mt-16 border-y border-border bg-bg-soft py-20 lg:py-32"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <SectionHeading
            title={t("title")}
            lead={t("lead")}
            className="lg:sticky lg:top-28"
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ol className="border-b border-border">
            {items.map((it) => (
              <li
                key={it.when}
                className="grid gap-1 border-t border-border py-6 lg:grid-cols-[9.5rem_1fr] lg:gap-6"
              >
                <span className="ts pt-1.5 text-sm text-faint">{it.when}</span>
                <div>
                  <p className="font-display text-[1.375rem] leading-snug text-ink">
                    {it.event}
                  </p>
                  <p className="mt-1.5 text-body text-muted">{it.cost}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-[44ch] text-lg text-ink">{t("closing")}</p>
          <a
            href="#nuit"
            className="text-link mt-3 inline-block text-[16px] text-ink"
          >
            {t("closingLink")} ↓
          </a>
        </div>
      </div>
    </section>
  );
}
