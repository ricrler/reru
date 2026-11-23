"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type HoloTone = "green" | "red" | "yellow";

const BEAM_TONE: Record<
  HoloTone,
  { track: string; start: string; stop: string }
> = {
  green: {
    track: "rgba(255,255,255,0.08)",
    start: "#ffffff",
    stop: "#5eead4",
  },
  red: {
    track: "rgba(255,255,255,0.08)",
    start: "#ffffff",
    stop: "#fb7185",
  },
  yellow: {
    track: "rgba(255,255,255,0.08)",
    start: "#ffffff",
    stop: "#fde047",
  },
};

export function HoloTimelineConnector({
  tone,
  height = 44,
  className,
  pulse = true,
}: {
  tone: HoloTone;
  height?: number;
  className?: string;
  pulse?: boolean;
}) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const colors = BEAM_TONE[tone];
  const animate = pulse && !reduceMotion;

  return (
    <svg
      width={3}
      height={height}
      viewBox={`0 0 3 ${height}`}
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden
    >
      <line
        x1={1.5}
        y1={0}
        x2={1.5}
        y2={height}
        stroke={colors.track}
        strokeWidth={1}
        strokeLinecap="round"
      />
      <line
        x1={1.5}
        y1={0}
        x2={1.5}
        y2={height}
        stroke={`url(#${id})`}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={0}
          x2={0}
          initial={{ y1: 0, y2: height * 0.25 }}
          animate={
            animate
              ? { y1: [0, height], y2: [height * 0.2, height * 1.2] }
              : { y1: 0, y2: height * 0.3 }
          }
          transition={
            animate
              ? {
                  duration: 1.8,
                  ease: [0.23, 1, 0.32, 1],
                  repeat: Infinity,
                  repeatDelay: 0.35,
                }
              : { duration: 0 }
          }
        >
          <stop offset="0%" stopColor={colors.start} stopOpacity={0} />
          <stop offset="18%" stopColor={colors.start} stopOpacity={0.95} />
          <stop offset="42%" stopColor={colors.stop} stopOpacity={0.85} />
          <stop offset="100%" stopColor={colors.stop} stopOpacity={0} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}