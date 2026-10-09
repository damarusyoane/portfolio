"use server";

import { z } from "zod";
import { siteConfig } from "./site";

// "contact" accepts an email address or a phone / WhatsApp number.
const EMAIL = z.string().email();
const PHONE = /^\+?[\d\s().-]{7,20}$/;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  contact: z
    .string()
    .trim()
    .max(160)
    .refine((v) => EMAIL.safeParse(v).success || PHONE.test(v)),
  message: z.string().trim().min(10).max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  reason?: "validation" | "server" | "spam";
  invalid?: string[];
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Honeypot — a hidden field bots tend to fill. Pretend success.
  if (((formData.get("company") as string) || "").length > 0) {
    return { status: "success" };
  }

  // 2. Time trap — forms submitted in under 2.5s are almost always bots.
  const startedAt = Number(formData.get("startedAt") || 0);
  if (startedAt > 0 && Date.now() - startedAt < 2500) {
    return { status: "error", reason: "spam" };
  }

  // 3. Validate
  const parsed = schema.safeParse({
    name: formData.get("name"),
    contact: formData.get("contact"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const invalid = [
      ...new Set(parsed.error.issues.map((i) => String(i.path[0]))),
    ];
    return { status: "error", reason: "validation", invalid };
  }

  const data = parsed.data;
  const isEmail = EMAIL.safeParse(data.contact).success;

  // 4. Send via Brevo (free tier: 300 emails/day)
  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || siteConfig.email;
  const fromName = process.env.CONTACT_FROM_NAME || "Ottomate website";

  if (!apiKey) {
    console.error("[contact] BREVO_API_KEY is not set — cannot send email.");
    return { status: "error", reason: "server" };
  }

  const subject = `[Site] Nouveau message — ${data.name}`;
  const contactLine = isEmail
    ? `${escapeHtml(data.contact)}`
    : `${escapeHtml(data.contact)} (WhatsApp / téléphone)`;
  const html = `
    <div style="background:#f3f3f0;padding:32px 0;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid rgba(18,20,23,0.12);border-radius:8px;padding:32px">
        <h1 style="color:#121417;font-size:20px;font-weight:600;margin:0 0 20px">Nouveau message depuis le site</h1>
        <p style="color:#5b6168;font-size:14px;margin:4px 0"><strong style="color:#121417">Nom :</strong> ${escapeHtml(data.name)}</p>
        <p style="color:#5b6168;font-size:14px;margin:4px 0"><strong style="color:#121417">Contact :</strong> ${contactLine}</p>
        <hr style="border:none;border-top:1px solid rgba(18,20,23,0.12);margin:20px 0" />
        <p style="color:#2c3036;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
      </div>
    </div>`;
  const text = `Nouveau message depuis le site\n\nNom : ${data.name}\nContact : ${data.contact}\n\n${data.message}`;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        ...(isEmail
          ? { replyTo: { email: data.contact, name: data.name } }
          : {}),
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[contact] Brevo error:", res.status, body);
      return { status: "error", reason: "server" };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { status: "error", reason: "server" };
  }
}

/* ── Lead magnet (free guide email capture) ─────────────────────── */

const leadSchema = z.object({ email: z.string().trim().email().max(160) });

export type LeadState = {
  status: "idle" | "success" | "error";
  reason?: "validation" | "server";
};

export async function captureLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  // Honeypot
  if (((formData.get("company") as string) || "").length > 0) {
    return { status: "success" };
  }

  const parsed = leadSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { status: "error", reason: "validation" };
  const email = parsed.data.email;

  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
    // Add the contact (best-effort — never block the download on this)
    try {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          attributes: { SOURCE: "lead-magnet" },
        }),
      });
    } catch {
      /* ignore */
    }
    // Notify the owner (best-effort)
    try {
      const fromEmail = process.env.CONTACT_FROM_EMAIL || siteConfig.email;
      const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Website", email: fromEmail },
          to: [{ email: to }],
          subject: `New guide download — ${email}`,
          textContent: `${email} downloaded the free automation guide.`,
        }),
      });
    } catch {
      /* ignore */
    }
  }

  return { status: "success" };
}
