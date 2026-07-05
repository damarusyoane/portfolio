"use client";

import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  BadgeCheck,
  Lock,
  Quote,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const gIcons: LucideIcon[] = [ShieldCheck, BadgeCheck, Lock];

export function Trust() {
  const t = useTranslations("Trust");
  const logos = t.raw("logos") as string[];
  const testimonials = t.raw("testimonials") as {
    quote: string;
    name: string;
    role: string;
  }[];
  const guarantees = t.raw("guarantees") as { title: string; text: string }[];
  const credentials = t.raw("credentials") as string[];

  return (
    <section id="trust" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Trusted-by strip */}
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {t("trustedBy")}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {logos.map((l) => (
              <span
                key={l}
                className="font-display text-lg font-semibold tracking-tight text-ink-soft/70"
              >
                {l}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((tm, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <figure className="glass h-full rounded-2xl p-6">
                  <Quote className="h-6 w-6 text-accent/60" />
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {tm.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-ink">{tm.name}</span>{" "}
                    <span className="text-faint">· {tm.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {/* Guarantees / risk reversal */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {guarantees.map((g, i) => {
            const Ic = gIcons[i % gIcons.length];
            return (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="flex h-full gap-3 rounded-2xl border border-border bg-surface/50 p-5">
                  <Ic className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{g.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Credentials */}
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {credentials.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 text-xs text-muted"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
