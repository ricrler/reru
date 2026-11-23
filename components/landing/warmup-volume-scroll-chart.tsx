"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/** Cumulative send volume at each week (ramps per your schedule). */
const WARMUP_CURVE = [
  { week: 0, label: "", volume: 0 },
  { week: 1, label: "Week 1", volume: 5_000 },
  { week: 2, label: "Week 2", volume: 12_000 },
  { week: 3, label: "Week 3", volume: 25_000 },
  { week: 4, label: "Week 4", volume: 45_000 },
  { week: 5, label: "Week 5", volume: 45_000 },
] as const;

const Y_MAX = 50_000;

const VISIBLE_WEEK_START = 1.5;
const VISIBLE_WEEK_END = 5;

const chartConfig = {
  volume: {
    label: "Send volume",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function interpolateVolume(week: number): number {
  for (let i = 0; i < WARMUP_CURVE.length - 1; i++) {
    const a = WARMUP_CURVE[i];
    const b = WARMUP_CURVE[i + 1];
    if (week >= a.week && week <= b.week) {
      const t = (week - a.week) / (b.week - a.week);
      return a.volume + t * (b.volume - a.volume);
    }
  }
  return WARMUP_CURVE[WARMUP_CURVE.length - 1].volume;
}

function buildDisplayData(visibleWeek: number) {
  const capped = Math.min(VISIBLE_WEEK_END, Math.max(VISIBLE_WEEK_START, visibleWeek));
  const result: { week: number; volume: number }[] = [{ week: 0, volume: 0 }];

  for (const p of WARMUP_CURVE) {
    if (p.week > 0 && p.week < capped) {
      result.push({ week: p.week, volume: p.volume });
    }
  }

  result.push({ week: capped, volume: interpolateVolume(capped) });
  return result;
}

function formatVolumeTick(value: number) {
  const n = Math.round(value);
  if (n === 0) return "0";
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

function formatVolumeEmails(value: number) {
  const n = Math.round(value);
  if (n === 0) return "0 emails";
  if (n >= 1000) return `${Math.round(n / 1000)}k emails`;
  return `${n.toLocaleString()} emails`;
}

const axisTickStyle = {
  fill: "var(--muted-foreground)",
  fontSize: 14,
  fontWeight: 500,
} as const;

export function WarmupVolumeScrollChart({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visibleWeek, setVisibleWeek] = useState(VISIBLE_WEEK_START);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.25"],
  });

  const mappedProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(mappedProgress, "change", (v) => {
    if (reducedMotion) return;
    const week =
      VISIBLE_WEEK_START + v * (VISIBLE_WEEK_END - VISIBLE_WEEK_START);
    setVisibleWeek(week);
  });

  useEffect(() => {
    if (reducedMotion) setVisibleWeek(VISIBLE_WEEK_END);
  }, [reducedMotion]);

  const displayWeek = reducedMotion ? VISIBLE_WEEK_END : visibleWeek;
  const displayData = useMemo(
    () => buildDisplayData(displayWeek),
    [displayWeek]
  );

  return (
    <ChartContainer
      ref={ref}
      config={chartConfig}
      className={cn("h-[260px] w-full sm:h-[300px]", className)}
    >
      <AreaChart
        data={displayData}
        margin={{ left: 4, right: 12, top: 8, bottom: 12 }}
      >
        <defs>
          <linearGradient id="fillWarmupVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-volume)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--color-volume)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical
          horizontal
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.12)"
        />
        <XAxis
          dataKey="week"
          type="number"
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(w) => `Week ${w}`}
          tick={axisTickStyle}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[0, Y_MAX]}
          ticks={[0, 10_000, 20_000, 30_000, 40_000, 50_000]}
          tickFormatter={formatVolumeTick}
          tick={axisTickStyle}
          width={52}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value) =>
                typeof value === "number" ? formatVolumeEmails(value) : value
              }
            />
          }
        />
        <Area
          type="monotone"
          dataKey="volume"
          stroke="var(--color-volume)"
          strokeWidth={2}
          fill="url(#fillWarmupVolume)"
          isAnimationActive={false}
          dot={false}
          connectNulls
        />
      </AreaChart>
    </ChartContainer>
  );
}