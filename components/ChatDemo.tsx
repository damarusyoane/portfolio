"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarCheck, CheckCheck } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";

type Msg = { from: "client" | "bot"; text: string; time: string };

// Timeline of the scripted conversation. Each entry is the delay (ms) before
// the next step; steps 2 and 5 show the "typing…" bubble.
const STEP_DELAYS = [700, 900, 1500, 1300, 800, 1400, 900];
const LAST_STEP = STEP_DELAYS.length;
// Step at which each message becomes visible.
const SHOW_AT = [1, 3, 4, 6];

/**
 * A WhatsApp-style conversation played back like a real chat: the kind of
 * exchange an Ottomate assistant handles while the business is closed.
 */
export function ChatDemo() {
  const t = useTranslations("Hero.demo");
  const messages = t.raw("messages") as Msg[];
  const reduce = useReducedMotion();
  const [played, setPlayed] = useState(0);
  // Reduced motion: show the whole conversation at once, no timers.
  const step = reduce ? LAST_STEP : played;

  useEffect(() => {
    if (reduce || played >= LAST_STEP) return;
    const id = setTimeout(() => setPlayed((s) => s + 1), STEP_DELAYS[played]);
    return () => clearTimeout(id);
  }, [played, reduce]);

  const typing = step === 2 || step === 5;
  const initials = t("business")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <div className="relative">
        <div className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-[var(--shadow-lift)]">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1f6f5c] font-display text-sm font-semibold text-white">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-[#111b21]">
                {t("business")}
              </p>
              <p className="text-xs text-[#1fa855]">{t("status")}</p>
            </div>
            <WhatsappIcon className="h-5 w-5 text-[#25d366]" />
          </div>

          {/* Conversation */}
          <div
            className="flex h-[420px] flex-col justify-end sm:h-[384px] gap-2 overflow-hidden px-3.5 py-4"
            style={{ backgroundColor: "#efeae2" }}
            aria-live="polite"
          >
            <span className="mx-auto mb-1 rounded-md bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-[#54656f] shadow-sm">
              {t("day")}
            </span>
            <AnimatePresence initial={false}>
              {messages.map((m, i) =>
                step >= SHOW_AT[i] ? (
                  <Bubble key={i} msg={m} reduce={!!reduce} />
                ) : null,
              )}
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex w-fit items-center gap-1 self-end rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-3 shadow-sm"
                  aria-hidden
                >
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#54656f]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#54656f]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#54656f]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer bar (decorative) */}
          <div
            className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2.5"
            aria-hidden
          >
            <span className="flex-1 rounded-full bg-white px-4 py-2 text-[13px] text-[#8696a0]">
              Message
            </span>
            <span className="h-9 w-9 rounded-full bg-[#1f6f5c]" />
          </div>
        </div>

        {/* What the business sees */}
        <AnimatePresence>
          {step >= LAST_STEP && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-12 left-4 right-4 z-10 flex items-start gap-3 rounded-2xl border border-border bg-surface p-3.5 shadow-[var(--shadow-lift)] sm:-left-10 sm:right-auto sm:w-[300px]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-2/12 text-accent-2">
                <CalendarCheck className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {t("notifTitle")}
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">
                  {t("notifText")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <figcaption className="mt-16 text-center text-[13px] text-faint sm:text-right">
        {t("caption")}
      </figcaption>
    </figure>
  );
}

function Bubble({ msg, reduce }: { msg: Msg; reduce: boolean }) {
  const mine = msg.from === "bot";
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={
        mine
          ? "max-w-[85%] self-end rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 pb-1.5 pt-2 shadow-sm"
          : "max-w-[85%] self-start rounded-xl rounded-tl-sm bg-white px-3 pb-1.5 pt-2 shadow-sm"
      }
    >
      <p className="text-[14px] leading-snug text-[#111b21]">{msg.text}</p>
      <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
        {msg.time}
        {mine && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}
      </p>
    </motion.div>
  );
}
