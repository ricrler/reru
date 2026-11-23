// Shiny Text from Blank by Craftwork (Magic UI, MIT)
// Copyright (c) 2026 Craftwork. Craftwork License: https://craftwork.design/license#components

"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

function ShinyText({
  duration = 2.5,
  repeatDelay = 1,
  spread = 2,
  className,
  style,
  children,
  ...props
}: Omit<HTMLMotionProps<"span">, "children"> & {
  children?: React.ReactNode;
  duration?: number;
  repeatDelay?: number;
  spread?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const animate = inView && !reduceMotion;
  const length = typeof children === "string" ? children.length : 12;
  const highlight = `${Math.min(length * spread, 240)}px`;

  return (
    <motion.span
      ref={ref}
      data-slot="shiny-text"
      className={cn(
        "inline-block bg-size-[250%_100%,auto] bg-clip-text bg-no-repeat text-transparent",
        className
      )}
      style={
        {
          "--shiny-spread": highlight,
          backgroundImage:
            "linear-gradient(90deg, transparent calc(50% - var(--shiny-spread)), var(--foreground), transparent calc(50% + var(--shiny-spread))), linear-gradient(var(--muted-foreground), var(--muted-foreground))",
          ...style,
        } as React.CSSProperties
      }
      initial={{ backgroundPosition: "100% center" }}
      animate={{
        backgroundPosition: animate ? "0% center" : "100% center",
      }}
      transition={
        animate
          ? { duration, repeat: Infinity, repeatDelay, ease: "linear" }
          : { duration: 0 }
      }
      {...props}
    >
      {children}
    </motion.span>
  );
}

export { ShinyText };