"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
import { NodeGraph } from "@/components/NodeGraph";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const cvHref = `/cv/Damarus-Ngankou-CV-${locale === "fr" ? "FR" : "EN"}.pdf`;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Background layers */}
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

          <motion.p
            variants={item}
            className="mt-7 font-mono text-sm text-accent"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient-animated">{t("role")}</span>
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
              href="#work"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-bg shadow-[0_10px_40px_-10px_rgba(34,211,238,0.55)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-accent), var(--color-accent-2))",
              }}
            >
              {t("ctaWork")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-border-strong"
            >
              {t("ctaContact")}
            </a>
            <a
              href={cvHref}
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-muted transition-colors hover:text-ink"
            >
              <Download className="h-4 w-4" />
              {t("downloadCV")}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
          >
            <Stat value="30+" label={t("stats.automations")} />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat value="AI" label={t("stats.ai")} />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat value="EN / FR" label={t("stats.bilingual")} />
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
