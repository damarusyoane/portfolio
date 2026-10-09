"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { submitContact, type ContactState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-md border bg-surface px-3.5 text-[16px] text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";
const fieldState = (invalid?: boolean) =>
  invalid ? "border-red-700" : "border-border-strong";

export function ContactForm() {
  const t = useTranslations("Contact");
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

  if (state.status === "success") {
    return (
      <p role="status" className="py-6 font-display text-[1.375rem] text-ink">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="grid gap-4 py-6 sm:grid-cols-2">
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue={0} />
      {/* Honeypot */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-[15px] text-red-800 sm:col-span-2">
          {state.reason === "validation" ? t("validation") : t("error")}
        </p>
      )}

      <div>
        <label
          htmlFor="cf-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {t("name")}
        </label>
        <input
          id="cf-name"
          name="name"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={invalid("name") || undefined}
          className={cn(inputClass, "h-12", fieldState(invalid("name")))}
        />
      </div>
      <div>
        <label
          htmlFor="cf-contact"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {t("contact")}
        </label>
        <input
          id="cf-contact"
          name="contact"
          required
          autoComplete="email"
          placeholder={t("contactPlaceholder")}
          aria-invalid={invalid("contact") || undefined}
          className={cn(inputClass, "h-12", fieldState(invalid("contact")))}
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {t("message")}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          placeholder={t("messagePlaceholder")}
          aria-invalid={invalid("message") || undefined}
          className={cn(
            inputClass,
            "resize-y py-3",
            fieldState(invalid("message")),
          )}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonClass("primary", "md", "disabled:opacity-70")}
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
}
