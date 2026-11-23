"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const BAR_MAX = 112;
const BAR_HIGH = BAR_MAX;
const BAR_LOW = 38;

export function ColdOutreachBounceBars({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduceMotion = useReducedMotion();
  const active = inView || Boolean(reduceMotion);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <p className="mb-4 text-[11px] font-medium tracking-wide text-white/45 uppercase">
        Bounces on cold outreach decreased
      </p>

      <div className="relative flex h-[7.75rem] items-end justify-center gap-10 sm:gap-14">
        <div className="flex h-full flex-col items-center justify-end gap-2">
          <motion.div
            className="w-12 rounded-t-sm bg-gradient-to-t from-white/10 to-white/30 sm:w-14"
            initial={{ height: BAR_HIGH }}
            animate={{ height: active ? BAR_HIGH : BAR_HIGH }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
          <span className="text-[10px] text-white/40">Before</span>
        </div>

        <div className="flex h-full flex-col items-center justify-end gap-2">
          <motion.div
            className="w-12 rounded-t-sm bg-gradient-to-t from-sky-500/25 to-sky-200/35 sm:w-14"
            initial={{ height: BAR_HIGH }}
            animate={{ height: active ? BAR_LOW : BAR_HIGH }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : 0.12,
            }}
            aria-hidden
          />
          <span className="text-[10px] text-white/40">After</span>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 border-b border-white/10"
          aria-hidden
        />
      </div>
    </div>
  );
}