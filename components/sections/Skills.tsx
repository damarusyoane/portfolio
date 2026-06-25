"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Workflow,
  Sparkles,
  Server,
  ServerCog,
  Terminal,
  Bot,
  Cable,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const icons: Record<string, LucideIcon> = {
  automation: Workflow,
  ai: Sparkles,
  aitools: Terminal,
  backend: Server,
  scraping: Bot,
  integrations: Cable,
  selfhost: ServerCog,
  infra: Cloud,
};

export function Skills() {
  const t = useTranslations("Skills");
  const locale = useLocale() as Locale;

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.id] ?? Workflow;
            return (
              <Reveal key={group.id} delay={Math.min(i * 0.06, 0.4)}>
                <div className="card-hover glass group h-full rounded-2xl p-6 hover:-translate-y-1 hover:border-border-strong">
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl border border-border"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 16%, transparent), color-mix(in oklab, var(--color-accent-2) 16%, transparent))",
                      }}
                    >
                      <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {group.title[locale]}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-lg border border-border bg-white/[0.02] px-2.5 py-1 text-xs text-ink-soft transition-colors group-hover:border-border-strong"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
