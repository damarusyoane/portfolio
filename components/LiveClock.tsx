"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { siteConfig } from "@/lib/site";

function now(locale: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: siteConfig.timezone,
  }).format(new Date());
}

/**
 * The founder's local time. Renders a width-stable placeholder on the server,
 * then the real time after mount (refreshed every 30 s).
 */
export function LiveClock() {
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(now(locale));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [locale]);

  return (
    <time className="ts" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}

export function LiveDot() {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent"
      aria-hidden
    />
  );
}
