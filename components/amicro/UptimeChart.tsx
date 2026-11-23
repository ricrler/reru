"use client";

// Uptime Dither Bar Chart from Amicro by Syed Subhan Uddin
// Copyright (c) 2026 SYED SUBHAN UDDIN. Licensed under MIT

import { useEffect } from "react";
import { useCanvasSetup } from "@/hooks/useCanvasSetup";
import { cn } from "@/lib/utils";

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

const UPTIME_DATA = Array.from({ length: 90 }, (_, i) => {
  if (i === 12 || i === 45 || i === 78) return 0.8;
  if (i === 22 || i === 60) return 0;
  return 1;
});

export function UptimeChart({
  className,
  compact = false,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  const { canvasRef, rect, isVisible, reducedMotion } = useCanvasSetup();
  const isVisibleRef = isVisible;
  const rectRef = rect;

  useEffect(() => {
    let req: number;
    let lastFrame = 0;
    let time = 0;

    const draw = (now: number) => {
      req = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      if (now - lastFrame < 33) return;
      lastFrame = now;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width: w, height: h } = rectRef.current;
      if (w <= 0 || h <= 0) return;

      time += reducedMotion ? 0 : 0.02;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const days = UPTIME_DATA.length;
      const barW = 7;
      const gap = 1;
      const perRow = Math.max(1, Math.floor(w / (barW + gap)));
      const rowCount = Math.ceil(days / perRow);
      const barH = Math.max(10, (h - (rowCount - 1) * gap) / rowCount);
      const cell = Math.max(2, Math.min(4, Math.round(barH / 9)));
      const t2 = time;

      for (let i = 0; i < days; i++) {
        const row = Math.floor(i / perRow);
        const col = i % perRow;

        const x = col * (barW + gap);
        const y = row * (barH + gap);

        const val = UPTIME_DATA[i];
        const color =
          val === 1
            ? "#22c55e"
            : val === 0
              ? "rgba(34, 197, 94, 0.22)"
              : "rgba(34, 197, 94, 0.55)";

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, barW, barH);
        ctx.clip();

        ctx.globalAlpha = 0.92;
        ctx.fillStyle = color;

        for (let tx = x; tx <= x + barW; tx += cell) {
          for (let ty = y; ty <= y + barH; ty += cell) {
            const jx = tx + cell / 2;
            const jy = ty + cell / 2;
            const jit = hash(jx, jy);

            const waveRaw = reducedMotion
              ? 0
              : Math.sin(jx * 0.05 + t2) + Math.sin(jy * 0.05 + t2 * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);

            const radius = (cell * (0.48 + 0.42 * mod) * (0.82 + 0.38 * jit)) / 2;
            ctx.beginPath();
            ctx.arc(jx, jy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      ctx.restore();
    };

    req = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(req);
  }, [canvasRef, isVisibleRef, rectRef, reducedMotion]);

  return (
    <div className={cn("flex h-full w-full flex-col justify-center", className)}>
      <div
        className={cn(
          "relative flex w-full items-center justify-center",
          compact ? "h-[52px]" : "h-full min-h-[4.25rem] sm:min-h-[5rem] md:min-h-[5.5rem]"
        )}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}