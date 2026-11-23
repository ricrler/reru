"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const CHART_HEIGHT = 210;
const TALL = 172;
const SHORT = 70;

function HoloPercent({ children }: { children: string }) {
  return (
    <p className="bounce-chart-percent holo-product-gradient-text mb-2 leading-none">
      <span className="holo-product-gradient-text-fill">{children}</span>
      <span className="holo-product-gradient-text-grain" aria-hidden>
        {children}
      </span>
    </p>
  );
}

export function BounceDecreaseChart({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-end justify-center gap-10 pb-0 sm:gap-12",
        className
      )}
      style={{ height: CHART_HEIGHT }}
    >
      <div className="bounce-bar-column flex h-full w-[7.5rem] flex-col items-stretch justify-end overflow-visible sm:w-[8.25rem]">
        <HoloPercent>5.4%</HoloPercent>
        <div
          className="bounce-holo-bar block w-full shrink-0 transition-[height] duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: TALL }}
        />
      </div>
      <div className="bounce-bar-column flex h-full w-[7.5rem] flex-col items-stretch justify-end overflow-visible sm:w-[8.25rem]">
        <HoloPercent>{inView ? "0.2%" : "5.4%"}</HoloPercent>
        <div
          className="bounce-holo-bar block w-full shrink-0 transition-[height] duration-[1.1s] delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: inView ? SHORT : TALL }}
        />
      </div>
    </div>
  );
}