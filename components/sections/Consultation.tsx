"use client";

import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CalendarCheck,
  Check,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { submitConsultation, type ConsultationState } from "@/lib/actions";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: ConsultationState = { status: "idle" };

export function Consultation() {
  const t = useTranslations("Consultation");
  const included = t.raw("included") as string[];
  const timelineOptions = t.raw("timelineOptions") as string[];
  const budgetOptions = t.raw("budgetOptions") as string[];

  const [state, formAction, pending] = useActionState(
    submitConsultation,
    initialState,
  );
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const invalid = (f: string) => state.invalid?.includes(f);

  return (
    <section className="relative pt-28 pb-24 sm:pb-28">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-bg opacity-60" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Badge dot>{t("badge")}</Badge>
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 rounded-3xl border border-border bg-white/[0.02] p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("includedTitle")}
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-ink-soft"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass mt-8 rounded-3xl p-6 sm:p-8">
            {state.status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </span>
                <p className="mt-5 text-lg font-medium text-ink">
                  {t("successTitle")}
                </p>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  {t("successText")}
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {t("formTitle")}
                </h3>

                <input type="hidden" name="startedAt" value={startedAt} />
                {/* Honeypot */}
                <div
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label>
                    Company
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {state.status === "error" && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {state.reason === "validation"
                      ? t("validation")
                      : t("error")}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={t("name")}
                    name="name"
                    placeholder={t("namePlaceholder")}
                    invalid={invalid("name")}
                    required
                  />
                  <Field
                    label={t("email")}
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    invalid={invalid("email")}
                    required
                  />
                </div>

                <Field
                  label={t("business")}
                  name="business"
                  placeholder={t("businessPlaceholder")}
                  invalid={invalid("business")}
                />

                <TextArea
                  label={t("tools")}
                  name="tools"
                  placeholder={t("toolsPlaceholder")}
                  invalid={invalid("tools")}
                  required
                  rows={3}
                />

                <TextArea
                  label={t("goals")}
                  name="goals"
                  placeholder={t("goalsPlaceholder")}
                  invalid={invalid("goals")}
                  required
                  rows={4}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label={t("timeline")}
                    name="timeline"
                    placeholder={t("timelinePlaceholder")}
                    options={timelineOptions}
                  />
                  <Select
                    label={t("budget")}
                    name="budget"
                    placeholder={t("budgetPlaceholder")}
                    options={budgetOptions}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-70"
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
                      <Send className="h-4 w-4" />
                      {t("submit")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {state.status === "success" && (
          <Reveal delay={0.05}>
            <div
              className="relative mt-8 overflow-hidden rounded-3xl border p-6 sm:p-8"
              style={{
                borderColor: "rgba(139,92,246,.35)",
                background:
                  "linear-gradient(120deg, rgba(34,211,238,.10), rgba(139,92,246,.15))",
              }}
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {t("bookTitle")}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                {t("bookSubtitle")}
              </p>

              <a
                href={siteConfig.links.cal}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold text-bg shadow-[0_12px_44px_-12px_rgba(139,92,246,0.7)] transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
                }}
              >
                <CalendarCheck className="h-5 w-5" />
                {t("bookCta")}
              </a>

              <div
                className="mt-7 overflow-hidden rounded-2xl border border-border"
                style={{ background: "#0a0b12" }}
              >
                <iframe
                  src={`${siteConfig.links.cal}?theme=dark`}
                  title={t("bookCta")}
                  loading="lazy"
                  className="h-[640px] w-full"
                />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  invalid,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/40",
          invalid ? "border-red-500/50" : "border-border focus:border-border-strong",
        )}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  invalid,
  required,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full resize-none rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/40",
          invalid ? "border-red-500/50" : "border-border focus:border-border-strong",
        )}
      />
    </div>
  );
}

function Select({
  label,
  name,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-ink focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-bg text-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
