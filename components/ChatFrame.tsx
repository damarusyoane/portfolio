"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  from: "client" | "bot";
  text: string;
  time: string;
};

/**
 * A WhatsApp-style conversation in a phone frame. Fully server-renderable:
 * `visible` limits how many messages show (the night story drives it), and
 * bubbles only animate in when `animate` is set and motion is allowed.
 */
export function ChatFrame({
  messages,
  business,
  status,
  day,
  visible = messages.length,
  animate = false,
  className,
  bodyClassName,
}: {
  messages: ChatMessage[];
  business: string;
  status: string;
  day: string;
  visible?: number;
  animate?: boolean;
  className?: string;
  bodyClassName?: string;
}) {
  const reduce = useReducedMotion();
  const shown = messages.slice(0, visible);
  const motionOn = animate && !reduce;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[26px] border border-black/10 bg-white text-[#111b21] shadow-[var(--shadow-device)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#dfe5e7]"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="mt-2 h-8 w-8 fill-white">
            <circle cx="12" cy="8" r="4.2" />
            <path d="M3.5 22c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-tight">
            {business}
          </p>
          <p className="text-[12px] leading-tight text-[#667781]">{status}</p>
        </div>
        <WhatsappIcon className="h-5 w-5 text-[#25d366]" />
      </div>

      {/* Conversation */}
      <div
        className={cn(
          "flex flex-col justify-end gap-1.5 overflow-hidden px-3 py-3",
          bodyClassName,
        )}
        style={{ backgroundColor: "#efeae2" }}
      >
        <span className="mx-auto mb-1 rounded-md bg-white/85 px-2.5 py-0.5 text-[11px] font-medium text-[#54656f]">
          {day}
        </span>
        <AnimatePresence initial={false}>
          {shown.map((m, i) => {
            const mine = m.from === "bot";
            return (
              <motion.div
                key={i}
                initial={motionOn ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={motionOn ? { opacity: 0 } : undefined}
                transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                className={
                  mine
                    ? "max-w-[86%] self-end rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 pb-1 pt-1.5 shadow-[0_1px_0_rgb(0_0_0/0.08)]"
                    : "max-w-[86%] self-start rounded-lg rounded-tl-none bg-white px-2.5 pb-1 pt-1.5 shadow-[0_1px_0_rgb(0_0_0/0.08)]"
                }
              >
                <p className="text-[14px] leading-snug">{m.text}</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 font-mono text-[10.5px] text-[#667781]">
                  {m.time}
                  {mine && (
                    <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
                  )}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Composer (decorative) */}
      <div
        className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2"
        aria-hidden
      >
        <span className="flex-1 rounded-full bg-white px-4 py-1.5 text-[13px] text-[#8696a0]">
          Message
        </span>
        <span className="h-8 w-8 rounded-full bg-[#00a884]" />
      </div>
    </div>
  );
}
