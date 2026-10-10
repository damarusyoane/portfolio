"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
  PhoneMissed,
  Receipt,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "client" | "bot"; text: string; time: string };
type Scenario = {
  tab: string;
  business: string;
  initials: string;
  status: string;
  trigger: string;
  sticker: string;
  stickerText: string;
  notifTitle: string;
  notifText: string;
  messages: Msg[];
};
type Event =
  | { kind: "trigger" }
  | { kind: "typing" }
  | { kind: "msg"; i: number }
  | { kind: "done" };

// One icon per scenario, same order as `Hero.demo.scenarios`.
const TRIGGER_ICONS: LucideIcon[] = [PhoneMissed, Receipt, Star, CalendarClock];
const NOTIF_ICONS: LucideIcon[] = [
  CalendarCheck,
  CircleDollarSign,
  Star,
  CalendarCheck,
];

/** trigger → first reply → (client → typing → reply)… → done */
function buildEvents(sc: Scenario): Event[] {
  const list: Event[] = [{ kind: "trigger" }];
  sc.messages.forEach((m, i) => {
    if (m.from === "bot" && i > 0) list.push({ kind: "typing" });
    list.push({ kind: "msg", i });
  });
  list.push({ kind: "done" });
  return list;
}

// How long each event stays on screen before the next one (ms).
const DELAY = { trigger: 900, typing: 1100, bot: 900, client: 1500 };
// Pause on the finished thread before moving to the next scenario.
const HOLD = 3800;

/**
 * A phone playing back real-looking SMS threads, one per service: missed-call
 * text-back, invoice follow-up, review request, appointment reminder.
 * The tabs underneath let visitors jump between them.
 */
export function ChatDemo() {
  const t = useTranslations("Hero.demo");
  const scenarios = t.raw("scenarios") as Scenario[];
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState(0);
  const sc = scenarios[active];

  const events = buildEvents(sc);

  // Reduced motion: show the whole thread at once, no timers.
  const step = reduce ? events.length : played;

  useEffect(() => {
    if (reduce) return;
    const current = scenarios[active];
    const events = buildEvents(current);
    if (played >= events.length) {
      const id = setTimeout(() => {
        setActive((a) => (a + 1) % scenarios.length);
        setPlayed(0);
      }, HOLD);
      return () => clearTimeout(id);
    }
    const ev = events[played];
    const wait =
      ev.kind === "msg"
        ? DELAY[current.messages[ev.i].from === "client" ? "client" : "bot"]
        : ev.kind === "done"
          ? 300
          : DELAY[ev.kind];
    const id = setTimeout(() => setPlayed((s) => s + 1), wait);
    return () => clearTimeout(id);
  }, [played, reduce, active, scenarios]);

  const choose = (i: number) => {
    setActive(i);
    setPlayed(0);
  };

  const shown = events.slice(0, step);
  const typing = events[step - 1]?.kind === "typing";
  const firstReplyShown = shown.some((e) => e.kind === "msg");
  const done = shown.some((e) => e.kind === "done");
  const TriggerIcon = TRIGGER_ICONS[active % TRIGGER_ICONS.length];
  const NotifIcon = NOTIF_ICONS[active % NOTIF_ICONS.length];

  return (
    <figure className="relative mx-auto w-full max-w-[460px]">
      <div className="relative mx-auto h-[580px] w-[290px] sm:h-[600px] sm:w-[300px] lg:rotate-[3deg]">
        {/* Phone */}
        <div className="absolute inset-0 rounded-[46px] bg-[#0a0d0c] p-[11px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)]">
          <div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-white">
            <div className="relative border-b border-black/[0.07] bg-[#f7f7f7] px-4 pb-3 pt-9 text-center">
              <span
                className="absolute left-1/2 top-2.5 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#0a0d0c]"
                aria-hidden
              />
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-[13px] font-bold text-accent">
                {sc.initials}
              </span>
              <p className="mt-1.5 text-[13px] font-semibold text-[#111]">
                {sc.business}
              </p>
              <p className="text-[11px] text-[#6b6b70]">{sc.status}</p>
            </div>

            <div
              className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3"
              aria-live="polite"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map((ev, k) => {
                  if (ev.kind === "trigger")
                    return (
                      <motion.p
                        key={`${active}-trigger`}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto mb-1 inline-flex items-center gap-1.5 rounded-full bg-[#eef2ec] px-2.5 py-1 text-[11px] font-medium text-[#22362d]"
                      >
                        <TriggerIcon className="h-3 w-3" aria-hidden />
                        {sc.trigger}
                      </motion.p>
                    );
                  if (ev.kind === "msg")
                    return (
                      <Bubble
                        key={`${active}-m${k}`}
                        msg={sc.messages[ev.i]}
                        reduce={!!reduce}
                      />
                    );
                  return null;
                })}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex w-fit items-center gap-1 self-end rounded-[18px] bg-[#30b94d] px-3.5 py-3"
                    aria-hidden
                  >
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 pb-6 pt-2" aria-hidden>
              <span className="block rounded-full border border-black/10 px-4 py-2 text-[12px] text-[#9a9aa0]">
                {t("composer")}
              </span>
            </div>
          </div>
        </div>

        {/* Which service this is */}
        <AnimatePresence mode="wait">
          {firstReplyShown && (
            <motion.div
              key={`sticker-${active}`}
              initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute -left-3 -top-4 z-10 max-w-[220px] rounded-2xl bg-accent px-4 py-3 text-[#0c1f18] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)] sm:-left-28 sm:top-6"
            >
              <p className="text-[16px] font-extrabold leading-tight tracking-[-0.02em]">
                {sc.sticker}
              </p>
              <p className="text-[12px] font-semibold opacity-75">
                {sc.stickerText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* What the business sees */}
        <AnimatePresence mode="wait">
          {done && (
            <motion.div
              key={`notif-${active}`}
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -left-4 z-10 flex w-[260px] items-start gap-3 rounded-2xl bg-white p-3.5 text-[#0c1f18] shadow-[0_24px_40px_-16px_rgba(0,0,0,0.5)] sm:-left-28 sm:w-[280px] lg:-rotate-[5deg]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e2f5ea] text-[#13865a]">
                <NotifIcon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">{sc.notifTitle}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-[#4a5d54]">
                  {sc.notifText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Service switcher */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-1.5"
        role="tablist"
        aria-label={t("tabsLabel")}
      >
        {scenarios.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => choose(i)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors",
              i === active
                ? "bg-accent text-[#0c1f18]"
                : "bg-white/[0.07] text-ink-soft hover:bg-white/[0.14] hover:text-ink",
            )}
          >
            {s.tab}
          </button>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
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
          ? "max-w-[82%] self-end rounded-[18px] rounded-br-md bg-[#30b94d] px-3 py-2 text-white"
          : "max-w-[82%] self-start rounded-[18px] rounded-bl-md bg-[#e9e9eb] px-3 py-2 text-[#111]"
      }
    >
      <p className="text-[13.5px] leading-snug">{msg.text}</p>
      <p
        className={
          mine
            ? "mt-0.5 text-right text-[10px] text-white/75"
            : "mt-0.5 text-right text-[10px] text-[#8a8a8f]"
        }
      >
        {msg.time}
      </p>
    </motion.div>
  );
}
