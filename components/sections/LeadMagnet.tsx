"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Download, Loader2 } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { captureLead, type LeadState } from "@/lib/actions";

const initial: LeadState = { status: "idle" };
const GUIDE = "/guide/automation-checklist.pdf";

/** The free checklist, as a quiet paper block (blog posts, case studies). */
export function LeadMagnet() {
  const t = useTranslations("LeadMagnet");
  const [state, action, pending] = useActionState(captureLead, initial);

  return (
    <aside className="sheet grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_1fr] md:items-center">
      <div>
        <p className="ts text-note text-faint">{t("label")}</p>
        <h2 className="mt-2 font-display text-[1.5rem] leading-snug text-ink">
          {t("title")}
        </h2>
        <p className="mt-2 text-[15px] text-muted">{t("text")}</p>
      </div>

      {state.status === "success" ? (
        <div>
          <p className="text-[15px] text-ink">{t("successTitle")}</p>
          <a
            href={GUIDE}
            download
            className={buttonClass("primary", "md", "mt-3")}
          >
            <Download className="h-4 w-4" />
            {t("download")}
          </a>
        </div>
      ) : (
        <form
          action={action}
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
        >
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
            autoComplete="email"
            placeholder={t("email")}
            className="h-12 min-w-0 flex-1 rounded-md border border-border-strong bg-surface px-3.5 text-[16px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className={buttonClass("primary", "md", "disabled:opacity-70")}
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            {pending ? t("sending") : t("cta")}
          </button>
          {state.status === "error" && (
            <p role="alert" className="text-sm text-red-800 sm:basis-full">
              {t("error")}
            </p>
          )}
        </form>
      )}
    </aside>
  );
}
