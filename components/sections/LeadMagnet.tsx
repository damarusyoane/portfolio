"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Download, FileText, Loader2, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { captureLead, type LeadState } from "@/lib/actions";

const initial: LeadState = { status: "idle" };
const GUIDE = "/guide/automation-checklist.pdf";

export function LeadMagnet() {
  const t = useTranslations("LeadMagnet");
  const [state, action, pending] = useActionState(captureLead, initial);
  const points = t.raw("points") as string[];

  return (
    <section id="guide" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="glass grid gap-8 rounded-3xl p-8 sm:p-10 md:grid-cols-2 md:items-center">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-bg"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
                }}
              >
                {t("badge")}
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("subtitle")}
              </p>
              <ul className="mt-4 space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {state.status === "success" ? (
                <div className="flex flex-col items-center rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
                  <FileText className="h-9 w-9 text-accent" />
                  <p className="mt-3 text-sm text-ink-soft">{t("successTitle")}</p>
                  <a
                    href={GUIDE}
                    download
                    className="mt-4 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-bg"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
                    }}
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
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("email")}
                    className="h-12 w-full rounded-xl border border-border bg-white/[0.02] px-4 text-sm text-ink placeholder:text-faint focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  {state.status === "error" && (
                    <p className="text-xs text-red-300">{t("error")}</p>
                  )}
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
                    }}
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
