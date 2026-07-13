"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarCheck, ArrowDown, ArrowUpRight } from "lucide-react";
import { NodeGraph } from "@/components/NodeGraph";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const t = useTranslations("Hero");
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  // The headline is the LCP element: keep it at full opacity so it paints on
  // the first frame (only a subtle slide) instead of fading in after hydration.
  const headline = {
    hidden: reduce ? {} : { y: 16 },
    show: {
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 aurora" />
      <div className="noise absolute inset-0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] opacity-[0.55] [mask-image:radial-gradient(ellipse_at_right,#000_40%,transparent_80%)] lg:block">
        <NodeGraph />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item}>
            <Badge dot className="backdrop-blur-sm">
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.p variants={item} className="mt-7 font-mono text-sm text-accent">
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            variants={headline}
            className="mt-3 font-display text-[2.5rem] font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl md:text-[4.1rem]"
          >
            {t("headlineTop")}{" "}
            <span className="text-gradient-animated">{t("headlineAccent")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={siteConfig.links.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold text-bg shadow-[0_10px_40px_-10px_rgba(34,211,238,0.55)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
              }}
            >
              <CalendarCheck className="h-5 w-5" />
              {t("ctaPrimary")}
            </a>
            <a
              href="#offers"
              className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-border-strong"
            >
              {t("ctaSecondary")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
          >
            <Stat value={t("stats.v1")} label={t("stats.l1")} />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat value={t("stats.v2")} label={t("stats.l2")} />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat value={t("stats.v3")} label={t("stats.l3")} />
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          {t("scroll")}
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold text-ink">{value}</div>
      <div className="text-xs text-faint">{label}</div>
    </div>
  );
}
