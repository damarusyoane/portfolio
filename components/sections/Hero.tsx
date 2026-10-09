"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { ChatDemo } from "@/components/ChatDemo";
import { buttonClass, ButtonArrow } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const t = useTranslations("Hero");
  const reduce = useReducedMotion();
  const reassurance = t.raw("reassurance") as string[];
  const clients = t.raw("clients") as string[];

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div
        className="paper-grain pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-3 py-1 text-[13px] font-medium text-ink-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {t("eyebrow")}
          </motion.p>

          {/* LCP element: rendered at full opacity on the first frame. */}
          <h1 className="mt-6 font-display text-[2.6rem] font-normal leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.1rem]">
            {t("headlineTop")}{" "}
            <em className="whitespace-nowrap font-normal italic text-accent">
              {t("headlineAccent")}
            </em>
          </h1>

          <motion.p
            {...fade(0.1)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            {...fade(0.18)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary", "lg")}
            >
              {t("ctaPrimary")}
              <ButtonArrow />
            </a>
            <a href="#work" className={buttonClass("secondary", "lg")}>
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.ul
            {...fade(0.24)}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
          >
            {reassurance.map((r) => (
              <li key={r} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-accent-2" aria-hidden />
                {r}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fade(0.3)}
            className="mt-12 border-t border-border pt-6"
          >
            <p className="text-sm text-faint">{t("proofLabel")}</p>
            <div className="mt-2.5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {clients.map((c) => (
                <span
                  key={c}
                  className="font-display text-xl font-semibold tracking-[-0.01em] text-ink-soft"
                >
                  {c}
                </span>
              ))}
              <span className="text-sm text-muted">· {t("proofStat")}</span>
            </div>
          </motion.div>
        </div>

        <motion.div {...fade(0.2)} className="lg:pl-6">
          <ChatDemo />
        </motion.div>
      </div>
    </section>
  );
}
