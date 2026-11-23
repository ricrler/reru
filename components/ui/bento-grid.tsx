// Bento Grid from Blank by Craftwork (modified for reru.io)
// Copyright (c) 2026 Craftwork. Craftwork License: https://craftwork.design/license#components

import * as React from "react";

import { cn } from "@/lib/utils";

function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        "grid w-full auto-rows-[minmax(12rem,auto)] grid-cols-1 gap-3 md:grid-cols-6",
        className
      )}
      {...props}
    />
  );
}

function BentoCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "group/bento-card relative isolate flex min-h-48 flex-col overflow-hidden rounded-sm bg-card text-card-foreground shadow-[inset_0_1px_0_var(--highlight)] ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-foreground/14",
        className
      )}
      {...props}
    />
  );
}

function BentoCardVisual({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card-visual"
      className={cn(
        "relative flex min-h-40 flex-1 items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_calc(100%-3rem),transparent)]",
        className
      )}
      {...props}
    />
  );
}

function BentoLight({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      data-slot="bento-light"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-full origin-top opacity-60 transition-[opacity,scale] duration-700 group-hover/bento-card:scale-105 group-hover/bento-card:opacity-90 motion-reduce:transition-none",
        "[--bento-tint:color-mix(in_oklab,var(--bento-light,#1a6bff)_28%,transparent)]",
        "bg-[radial-gradient(50%_70%_at_50%_0%,var(--bento-tint),transparent_70%)]",
        className
      )}
      {...props}
    />
  );
}

function BentoPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-panel"
      className={cn(
        "glass-panel relative rounded-sm ring-1 ring-foreground/10",
        className
      )}
      {...props}
    />
  );
}

function BentoCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-card-content"
      className={cn(
        "flex flex-col gap-1 p-5 [[data-slot=bento-card-visual]~&]:pt-0",
        className
      )}
      {...props}
    />
  );
}

function BentoCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="bento-card-title"
      className={cn("text-base font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function BentoCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="bento-card-description"
      className={cn("max-w-sm text-pretty text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  BentoGrid,
  BentoCard,
  BentoCardVisual,
  BentoLight,
  BentoPanel,
  BentoCardContent,
  BentoCardTitle,
  BentoCardDescription,
};