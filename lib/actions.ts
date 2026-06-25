"use server";

import { z } from "zod";
import { siteConfig } from "./site";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(160).optional().default(""),
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
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const invalid = [
      ...new Set(parsed.error.issues.map((i) => String(i.path[0]))),
    ];
    return { status: "error", reason: "validation", invalid };
  }

  const data = parsed.data;

  // 4. Send via Brevo (free tier: 300 emails/day)
  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || siteConfig.email;
  const fromName = process.env.CONTACT_FROM_NAME || "Portfolio Contact";

  if (!apiKey) {
    console.error("[contact] BREVO_API_KEY is not set — cannot send email.");
    return { status: "error", reason: "server" };
  }

  const subject = `[Portfolio] ${data.subject || "New message"} — ${data.name}`;
  const html = `
    <div style="background:#0a0b12;padding:32px 0;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#11131d;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px">
        <h1 style="color:#e7e9f1;font-size:20px;font-weight:600;margin:0 0 20px">New message from your portfolio</h1>
        <p style="color:#99a1b3;font-size:14px;margin:4px 0"><strong style="color:#c3c8d6">From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
        ${data.subject ? `<p style="color:#99a1b3;font-size:14px;margin:4px 0"><strong style="color:#c3c8d6">Subject:</strong> ${escapeHtml(data.subject)}</p>` : ""}
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0" />
        <p style="color:#c3c8d6;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0" />
        <p style="color:#6b7488;font-size:12px;margin:0">Reply directly to this email to reach ${escapeHtml(data.name)}.</p>
      </div>
    </div>`;
  const text = `New message from your portfolio\n\nFrom: ${data.name} <${data.email}>\n${data.subject ? `Subject: ${data.subject}\n` : ""}\n${data.message}`;

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
        replyTo: { email: data.email, name: data.name },
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
