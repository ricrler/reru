"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { week: "W1", deliverability: 62, reputation: 58 },
  { week: "W2", deliverability: 65, reputation: 61 },
  { week: "W3", deliverability: 68, reputation: 64 },
  { week: "W4", deliverability: 71, reputation: 67 },
  { week: "W5", deliverability: 74, reputation: 72 },
  { week: "W6", deliverability: 78, reputation: 76 },
  { week: "W7", deliverability: 81, reputation: 79 },
  { week: "W8", deliverability: 84, reputation: 83 },
  { week: "W9", deliverability: 86, reputation: 85 },
  { week: "W10", deliverability: 88, reputation: 87 },
  { week: "W11", deliverability: 90, reputation: 89 },
  { week: "W12", deliverability: 92, reputation: 91 },
];

const chartConfig = {
  deliverability: {
    label: "Inbox rate",
    color: "var(--chart-1)",
  },
  reputation: {
    label: "Sender score",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DeliverabilityChart({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [animate, setAnimate] = useState(!animated);

  useEffect(() => {
    if (!animated) return;
    if (inView) setAnimate(true);
  }, [animated, inView]);

  return (
    <ChartContainer
      ref={ref}
      config={chartConfig}
      className={cn("h-[220px] w-full", className)}
    >
      <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillDeliverability" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillReputation" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[50, 100]}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          width={32}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          type="monotone"
          dataKey="reputation"
          stroke="var(--color-chart-2)"
          strokeWidth={1.5}
          fill="url(#fillReputation)"
          isAnimationActive={animate}
          animationDuration={1600}
          animationEasing="ease-out"
        />
        <Area
          type="monotone"
          dataKey="deliverability"
          stroke="var(--color-chart-1)"
          strokeWidth={1.5}
          fill="url(#fillDeliverability)"
          isAnimationActive={animate}
          animationDuration={1800}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ChartContainer>
  );
}