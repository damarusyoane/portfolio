"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Download, Loader2, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { captureLead, type LeadState } from "@/lib/actions";

const initial: LeadState = { status: "idle" };
const GUIDE = "/guide/automation-checklist.pdf";

export function LeadMagnet() {
  const t = useTranslations("LeadMagnet");
  const [state, action, pending] = useActionState(captureLead, initial);
  const points = t.raw("points") as string[];

  return (
    <section id="guide" className="relative scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[2rem] bg-accent p-7 text-[#161512] sm:p-10 md:grid-cols-[auto_1fr_1fr] md:gap-10">
            {/* Mini cover of the PDF */}
            <div
              className="hidden h-40 w-32 rotate-[-4deg] flex-col justify-between rounded-md bg-[#f6f4ef] p-3.5 shadow-[0_18px_30px_-12px_rgba(22,21,18,0.45)] md:flex"
              aria-hidden
            >
              <span className="h-1.5 w-8 rounded-full bg-[#e4572e]" />
              <span className="font-display text-[17px] leading-tight text-[#161512]">
                {t("coverTop")}
                <br />
                {t("coverBottom")}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#5c584f]">
                Ottomate
              </span>
            </div>

            <div>
              <p className="text-[13px] font-semibold">{t("badge")}</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.1rem]">
                {t("title")}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed">
                {t("subtitle")}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {points.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    <Check className="h-4 w-4" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {state.status === "success" ? (
                <div className="rounded-2xl bg-[#f6f4ef] p-6 text-center">
                  <p className="text-[15px] font-medium">{t("successTitle")}</p>
                  <a
                    href={GUIDE}
                    download
                    className={buttonClass("primary", "md", "mt-4")}
                  >
                    <Download className="h-4 w-4" />
                    {t("download")}
                  </a>
                </div>
              ) : (
                <form action={action} className="space-y-3">
                  <div
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <label htmlFor="lead-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    name="email"
                    required
                    placeholder={t("email")}
                    className="h-12 w-full rounded-full border-0 bg-[#f6f4ef] px-5 text-[15px] text-[#161512] placeholder:text-[#6f6a62] focus:outline-none focus:ring-2 focus:ring-[#161512]"
                  />
                  {state.status === "error" && (
                    <p className="text-sm font-medium">{t("error")}</p>
                  )}
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#161512] text-[15px] font-medium text-[#f6f4ef] transition-colors hover:bg-[#2a2823] disabled:opacity-70"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        {t("cta")}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
