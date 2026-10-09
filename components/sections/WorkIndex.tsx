"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CanvasImage } from "@/components/CanvasImage";
import type { Canvas } from "@/lib/canvases";
import { cn } from "@/lib/utils";

export type IndexRow = {
  slug: string;
  title: string;
  purpose: string;
  result: string;
  canvas: Canvas | null;
};

/**
 * A ruled index of projects. On large screens with a pointer, the row under
 * the cursor (or keyboard focus) shows its real workflow in a pinned pane.
 */
export function WorkIndex({
  rows,
  labels,
}: {
  rows: IndexRow[];
  labels: {
    project: string;
    purpose: string;
    result: string;
    previewAlt: string;
  };
}) {
  const [active, setActive] = useState(0);
  const current = rows[active];

  return (
    <div className="mt-20 grid gap-x-6 lg:mt-28 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="ts hidden grid-cols-[1.1fr_1fr_0.9fr_1.25rem] gap-6 border-b border-border pb-3 text-note text-faint md:grid">
          <span>{labels.project}</span>
          <span>{labels.purpose}</span>
          <span>{labels.result}</span>
          <span />
        </div>
        <ul>
          {rows.map((r, i) => (
            <li key={r.slug} className="border-b border-border">
              <Link
                href={`/projects/${r.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group grid gap-1.5 py-5 transition-colors md:grid-cols-[1.1fr_1fr_0.9fr_1.25rem] md:gap-6",
                  i === active &&
                    "lg:bg-[color-mix(in_oklab,var(--color-ink)_3%,transparent)]",
                )}
              >
                <span className="font-display text-[1.3rem] leading-snug text-ink">
                  {r.title}
                </span>
                <span className="text-[15px] leading-snug text-muted md:pt-1">
                  {r.purpose}
                </span>
                <span className="ts text-[13px] leading-snug text-ink-soft md:pt-1.5">
                  {r.result}
                </span>
                <ArrowUpRight className="hidden h-5 w-5 text-faint transition-colors group-hover:text-ink md:block md:mt-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Pinned preview of the hovered project's workflow */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-28">
          <div className="overflow-hidden rounded-lg border border-border bg-[#0d1217] p-1.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {current.canvas ? (
                  <CanvasImage
                    canvas={current.canvas}
                    alt={labels.previewAlt.replace("{name}", current.title)}
                    sizes="400px"
                    className="rounded"
                  />
                ) : (
                  <div className="aspect-[3/1]" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="ts mt-2.5 text-note text-faint">{current.title}</p>
        </div>
      </div>
    </div>
  );
}
