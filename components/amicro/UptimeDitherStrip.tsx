"use client";

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

const colorFor = (val: number) =>
  val === 1
    ? "#22c55e"
    : val === 0
      ? "rgba(34, 197, 94, 0.25)"
      : "rgba(34, 197, 94, 0.58)";

export function UptimeDitherStrip({
  data,
  className,
}: {
  data: number[];
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

      const count = data.length;
      const segW = w / count;
      const cell = Math.max(2, Math.min(4, Math.round(h / 7)));
      const t2 = time;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();

      for (let tx = 0; tx < w; tx += cell) {
        for (let ty = 0; ty <= h; ty += cell) {
          const jx = tx + cell / 2;
          const jy = ty + cell / 2;
          const idx = Math.min(count - 1, Math.max(0, Math.floor(jx / segW)));
          const val = data[idx]!;

          const jit = hash(jx, jy);
          const phase = hash(jx * 0.41, jy * 0.29);

          const waveRaw = reducedMotion
            ? 0
            : Math.sin(jx * 0.05 + t2) + Math.sin(jy * 0.05 + t2 * 0.7);
          const mod = smoothstep(-1.5, 1.5, waveRaw);

          const life = reducedMotion
            ? 1
            : smoothstep(
                0.12,
                0.88,
                0.5 + 0.5 * Math.sin(t2 * 2.1 + phase * Math.PI * 2 + jit * 0.6)
              );
          if (life < 0.06) continue;

          const radius =
            (cell * (0.52 + 0.4 * mod) * (0.85 + 0.35 * jit) * life) / 2;
          if (radius < 0.15) continue;

          ctx.globalAlpha = 0.95 * life;
          ctx.fillStyle = colorFor(val);
          ctx.beginPath();
          ctx.arc(jx, jy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      ctx.restore();
    };

    req = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(req);
  }, [canvasRef, data, isVisibleRef, rectRef, reducedMotion]);

  return (
    <div className={cn("relative w-full shrink-0", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}