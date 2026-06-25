"use client";

import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { submitContact, type ContactState } from "@/lib/actions";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

export function Contact() {
  const t = useTranslations("Contact");
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const invalid = (f: string) => state.invalid?.includes(f);

  const directLinks = [
    {
      label: t("linkedin"),
      value: "in/damarus-ngankou",
      href: siteConfig.links.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      label: t("emailDirect"),
      value: siteConfig.email,
      href: mailtoUrl("Hello Damarus"),
      icon: Mail,
      external: false,
    },
    {
      label: t("whatsapp"),
      value: siteConfig.phone,
      href: whatsappUrl("Hi Damarus, I saw your portfolio"),
      icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="absolute inset-0 aurora opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <Reveal>
            <div className="glass rounded-3xl p-6 sm:p-8">
              {state.status === "success" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </span>
                  <p className="mt-5 max-w-sm text-lg text-ink">
                    {t("success")}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-4">
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
                    label={t("subject")}
                    name="subject"
                    placeholder={t("subjectPlaceholder")}
                    invalid={invalid("subject")}
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-ink-soft"
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
                        "w-full resize-none rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/40",
                        invalid("message")
                          ? "border-red-500/50"
                          : "border-border focus:border-border-strong",
                      )}
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
                        {t("send")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Direct links */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="glass flex-1 rounded-3xl p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {t("directTitle")}
                </h3>
                <div className="mt-5 space-y-2.5">
                  {directLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3.5 rounded-2xl border border-border bg-white/[0.02] p-3.5 transition-all hover:-translate-y-0.5 hover:border-border-strong"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.03] text-accent">
                        <l.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">
                          {l.label}
                        </span>
                        <span className="block truncate text-xs text-faint">
                          {l.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-ink" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <Badge dot>{t("availability")}</Badge>
              </div>
            </div>
          </Reveal>
        </div>
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
          invalid
            ? "border-red-500/50"
            : "border-border focus:border-border-strong",
        )}
      />
    </div>
  );
}
