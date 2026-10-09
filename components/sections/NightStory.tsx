"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ChatFrame, type ChatMessage } from "@/components/ChatFrame";
import {
  STORY_ALERT_FROM,
  STORY_CANVAS,
  STORY_CANVAS_RATIO,
  STORY_NODES,
  STORY_VISIBLE_MESSAGES,
} from "@/lib/story";
import { cn } from "@/lib/utils";

type Step = { time: string; sentence: string; line: string; node: string };

const LG = "(min-width: 1024px)";

function subscribeLg(onChange: () => void) {
  const mq = window.matchMedia(LG);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * "Thursday, 23:12": the one scroll-driven sequence on the site. On large
 * screens with motion allowed, the conversation and the workflow follow the
 * step being read. Everywhere else (server render, phones, reduced motion)
 * the full story is shown statically.
 */
export function NightStory() {
  const t = useTranslations("Night");
  const tDemo = useTranslations("Hero.demo");
  const steps = t.raw("steps") as Step[];
  const messages = tDemo.raw("messages") as ChatMessage[];
  const reduce = useReducedMotion();
  const isLg = useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia(LG).matches,
    () => false,
  );
  const scrolly = isLg && !reduce;

  const chat = {
    messages,
    business: tDemo("business"),
    status: tDemo("status"),
    day: tDemo("day"),
  };

  return (
    <section id="nuit" className="theme-night scroll-mt-16 py-24 lg:py-40">
      <div className="wrap">
        <div className="max-w-[40rem]">
          <h2 className="font-display text-h2 font-normal text-ink">
            {t("title")}
          </h2>
          <p className="mt-5 text-lead text-muted">{t("lead")}</p>
        </div>

        {scrolly ? (
          <Scrolly steps={steps} chat={chat} />
        ) : (
          <Stacked steps={steps} chat={chat} />
        )}

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 lg:mt-24 lg:flex-row lg:items-baseline lg:justify-between">
          <p className="max-w-[40ch] font-display text-[1.6rem] leading-snug text-ink">
            {t("without")}
          </p>
          <Link
            href="/projects/whatsapp-ai-assistant"
            className="group inline-flex shrink-0 items-center gap-2 text-[16px] text-ink"
          >
            <span className="text-link">{t("caseLink")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

type ChatProps = {
  messages: ChatMessage[];
  business: string;
  status: string;
  day: string;
};

/* ------------------------------------------------------------------------ */

function Scrolly({ steps, chat }: { steps: Step[]; chat: ChatProps }) {
  const t = useTranslations("Night");
  // null until the reader reaches the first step: the plate then starts at 0.
  const [active, setActive] = useState<number | null>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = active ?? 0;

  return (
    <div className="mt-16 grid grid-cols-12 gap-x-6">
      <ol className="col-span-5">
        {steps.map((s, i) => (
          <li
            key={i}
            data-index={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className={cn(
              "flex min-h-[68vh] flex-col justify-center border-l pl-6 transition-colors duration-300",
              i === step ? "border-accent" : "border-border",
            )}
          >
            <StepText step={s} dim={i !== step} nodeLabel={t("nodeLabel")} />
          </li>
        ))}
      </ol>

      <div className="col-span-6 col-start-7">
        <div className="sticky top-[12vh]">
          <Canvas node={STORY_NODES[step]} />
          <div className="mt-5 flex items-start gap-5">
            <ChatFrame
              {...chat}
              visible={STORY_VISIBLE_MESSAGES[step]}
              animate
              className="w-[330px] shrink-0"
              bodyClassName="h-[330px]"
            />
            <div className="min-w-0 flex-1 pt-10">
              <AnimatePresence>
                {step >= STORY_ALERT_FROM && (
                  <Alert
                    key="alert"
                    time={steps[STORY_ALERT_FROM].time}
                    animate
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* progress ticks */}
          <div className="mt-6 flex gap-1.5" aria-hidden>
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i <= step ? "bg-accent" : "bg-border",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stacked({ steps, chat }: { steps: Step[]; chat: ChatProps }) {
  const t = useTranslations("Night");
  return (
    <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-6">
      <ol className="space-y-8 lg:col-span-5">
        {steps.map((s, i) => (
          <li key={i} className="border-l border-border pl-5">
            <StepText step={s} nodeLabel={t("nodeLabel")} />
          </li>
        ))}
      </ol>
      <div className="min-w-0 space-y-6 lg:col-span-6 lg:col-start-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <ChatFrame {...chat} className="w-full max-w-[360px] shrink-0" />
          <div className="sm:pt-10">
            <Alert time={steps[STORY_ALERT_FROM].time} />
          </div>
        </div>
        <Canvas node={null} scrollable />
      </div>
    </div>
  );
}

function StepText({
  step,
  dim = false,
  nodeLabel,
}: {
  step: Step;
  dim?: boolean;
  nodeLabel: string;
}) {
  return (
    <div
      className={cn(
        "transition-opacity duration-300",
        dim ? "opacity-40" : "opacity-100",
      )}
    >
      <time className="ts text-[15px] text-accent-ink">{step.time}</time>
      <p className="mt-2 font-display text-[1.75rem] leading-[1.2] text-ink">
        {step.sentence}
      </p>
      <p className="mt-2 text-body text-muted">{step.line}</p>
      {step.node && (
        <p className="ts mt-3 text-[12px] text-faint">
          {nodeLabel} : {step.node}
        </p>
      )}
    </div>
  );
}

function Alert({ time, animate = false }: { time: string; animate?: boolean }) {
  const t = useTranslations("Night");
  const reduce = useReducedMotion();
  const on = animate && !reduce;
  return (
    <motion.div
      initial={on ? { opacity: 0, x: 24 } : false}
      animate={{ opacity: 1, x: 0 }}
      exit={on ? { opacity: 0 } : undefined}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className="rounded-lg border border-border-strong bg-surface p-4"
    >
      <p className="ts flex items-center gap-2 text-note text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {time} · email
      </p>
      <p className="mt-2 font-semibold text-ink">{t("alertTitle")}</p>
      <p className="mt-1 text-[15px] text-muted">{t("alertBody")}</p>
    </motion.div>
  );
}

function Canvas({
  node,
  scrollable = false,
}: {
  node: { x: number; y: number } | null;
  scrollable?: boolean;
}) {
  const t = useTranslations("Night");
  return (
    <figure>
      <div
        className={cn(
          "rounded-lg border border-border bg-[#151c23] p-1.5",
          scrollable && "overflow-x-auto [scroll-snap-type:x_proximity]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded",
            scrollable && "min-w-[760px]",
          )}
          style={{ aspectRatio: STORY_CANVAS_RATIO }}
        >
          <Image
            src={STORY_CANVAS.src}
            alt={t("canvasAlt")}
            fill
            sizes="(min-width: 1024px) 600px, 760px"
            className="object-cover object-bottom"
          />
          {node && (
            <motion.span
              aria-hidden
              className="absolute h-[17%] w-[5.4%] rounded-md border-2 border-accent"
              animate={{ left: `${node.x - 2.7}%`, top: `${node.y - 8.5}%` }}
              initial={false}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            />
          )}
        </div>
      </div>
      <figcaption className="ts mt-2.5 flex flex-wrap justify-between gap-2 text-note text-faint">
        <span>{t("canvasCaption")}</span>
        {scrollable && <span className="sm:hidden">{t("dragHint")} →</span>}
      </figcaption>
    </figure>
  );
}
