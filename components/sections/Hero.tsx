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
    <>
      <section id="top" className="theme-ink relative overflow-hidden pt-[68px]">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div>
            <motion.p
              {...fade(0)}
              className="inline-flex items-center rounded-lg border border-border-strong bg-white/[0.06] px-3 py-1.5 text-[13.5px] font-medium text-ink-soft"
            >
              {t("eyebrow")}
            </motion.p>

            {/* LCP element: rendered at full opacity on the first frame. */}
            <h1 className="mt-7 font-display text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink sm:text-[4.1rem] lg:text-[4.6rem]">
              {t("headlineTop")}{" "}
              <span className="relative inline-block text-accent">
                {t("headlineAccent")}
                <svg
                  viewBox="0 0 200 22"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-[-2%] h-[0.28em] w-[104%]"
                  aria-hidden
                >
                  <path
                    d="M3 15 C 50 5, 120 4, 197 11"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              {t("headlineEnd")}
            </h1>

            <motion.p
              {...fade(0.1)}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-[1.2rem]"
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
                className={buttonClass("accent", "lg")}
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
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] text-muted"
            >
              {reassurance.map((r) => (
                <li key={r} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" strokeWidth={3} aria-hidden />
                  {r}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div {...fade(0.2)} className="lg:pl-10">
            <ChatDemo />
          </motion.div>
        </div>

        <svg
          className="block h-10 w-full sm:h-14"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden
          style={{ color: "#ffffff" }}
        >
          <path d="M0 60 L0 34 Q 720 -12 1440 34 L1440 60 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Proof strip */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          {...fade(0.3)}
          className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-border py-7"
        >
          <p className="max-w-[11rem] text-sm leading-snug text-muted">
            {t("proofLabel")}
          </p>
          {clients.map((c) => (
            <span
              key={c}
              className="font-display text-[1.6rem] font-extrabold tracking-[-0.035em] text-brand"
            >
              {c}
            </span>
          ))}
          <p className="text-sm text-muted sm:ml-auto sm:text-right">
            <span className="block font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-ink">
              {t("proofStatValue")}
            </span>
            {t("proofStat")}
          </p>
        </motion.div>
      </div>
    </>
  );
}
