"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { submitContact, type ContactState } from "@/lib/actions";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const initialState: ContactState = { status: "idle" };

export function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale() as Locale;
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  // Anti-bot timing: stamped once the form is on screen.
  const startedAt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  const invalid = (f: string) => state.invalid?.includes(f);

  const directLinks = [
    {
      label: t("whatsapp"),
      value: siteConfig.phoneDisplay,
      href: whatsappUrl(siteConfig.whatsappMessage[locale]),
      icon: WhatsappIcon,
      iconClass: "bg-[#25d366] text-white",
      badge: t("fastest"),
      external: true,
    },
    {
      label: t("emailDirect"),
      value: siteConfig.email,
      href: mailtoUrl(siteConfig.emailSubject[locale]),
      icon: Mail,
      iconClass: "bg-ink text-bg",
      external: false,
    },
    {
      label: t("linkedin"),
      value: siteConfig.founder,
      href: siteConfig.links.linkedin,
      icon: LinkedinIcon,
      iconClass: "bg-[#0a66c2] text-white",
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Intro + direct channels */}
        <div>
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem]">
              {t("title")}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="mt-10 text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
              {t("directTitle")}
            </h3>
            <div className="mt-4 space-y-3">
              {directLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="card card-hover group flex items-center gap-4 rounded-xl p-4 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                      l.iconClass,
                    )}
                  >
                    <l.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[15px] font-bold text-ink">
                      {l.label}
                      {l.badge && (
                        <span className="rounded-full bg-accent-2/12 px-2 py-0.5 text-[11px] font-semibold text-accent-2">
                          {l.badge}
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {l.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-ink" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              {t("availability")}
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.05}>
          <div className="rounded-[var(--radius-card)] border border-border bg-bg-soft p-6 sm:p-9">
            {state.status === "success" ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-2/12">
                  <CheckCircle2 className="h-8 w-8 text-accent-2" />
                </span>
                <p className="mt-5 max-w-sm font-display text-xl font-bold text-ink">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-5">
                <input
                  ref={startedAt}
                  type="hidden"
                  name="startedAt"
                  defaultValue={0}
                />
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
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 rounded-xl border border-red-700/20 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {state.reason === "validation"
                      ? t("validation")
                      : t("error")}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={t("name")}
                    name="name"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    invalid={invalid("name")}
                    required
                  />
                  <Field
                    label={t("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    invalid={invalid("email")}
                    required
                  />
                </div>

                <Field
                  label={t("subject")}
                  name="subject"
                  placeholder={t("subjectPlaceholder")}
                  invalid={invalid("subject")}
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t("messagePlaceholder")}
                    className={cn(
                      inputClass,
                      "resize-none py-3",
                      fieldState(invalid("message")),
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className={buttonClass(
                    "primary",
                    "lg",
                    "w-full disabled:opacity-70",
                  )}
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("send")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border px-4 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-ink focus:bg-surface focus:outline-none";
const fieldState = (invalid?: boolean) =>
  invalid ? "border-red-600/60 bg-red-50/60" : "border-border-strong bg-bg";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  invalid,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(inputClass, "h-12", fieldState(invalid))}
      />
    </div>
  );
}
