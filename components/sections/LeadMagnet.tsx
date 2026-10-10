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
          <div className="grid items-center gap-8 rounded-[var(--radius-card)] bg-accent p-7 text-[#0c1f18] sm:p-10 md:grid-cols-[auto_1fr_1fr] md:gap-10">
            {/* Mini cover of the PDF */}
            <div
              className="hidden h-40 w-32 rotate-[-4deg] flex-col justify-between rounded-md bg-[#0c3a2b] p-3.5 shadow-[0_18px_30px_-12px_rgba(12,31,24,0.5)] md:flex"
              aria-hidden
            >
              <span className="h-1.5 w-8 rounded-full bg-[#ffd23f]" />
              <span className="font-display text-[17px] font-extrabold leading-tight tracking-[-0.03em] text-white">
                {t("coverTop")}
                <br />
                {t("coverBottom")}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#b9d1c5]">
                Ottomate
              </span>
            </div>

            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em]">{t("badge")}</p>
              <h2 className="mt-2 font-display text-[1.85rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[2.2rem]">
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
                <div className="rounded-xl bg-white p-6 text-center">
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
                    className="h-12 w-full rounded-xl border-0 bg-white px-5 text-[15px] text-[#0c1f18] placeholder:text-[#5f7168] focus:outline-none focus:ring-2 focus:ring-[#0c3a2b]"
                  />
                  {state.status === "error" && (
                    <p className="text-sm font-medium">{t("error")}</p>
                  )}
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0c3a2b] text-[15px] font-semibold text-white transition-colors hover:bg-[#124b38] disabled:opacity-70"
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
