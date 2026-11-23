"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { BUY_WARMUP_HOLO_BLOB } from "@/components/landing/buy-warmup-holospot-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const THREE_URL =
  "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js";
const HOLO_JS =
  "https://cdn.jsdelivr.net/gh/dmitrykurash/holospot@v0.1.0/dist/holo.js";
const HOLO_ASSETS =
  "https://cdn.jsdelivr.net/gh/dmitrykurash/holospot@v0.1.0/assets/";
const IMPORT_MAP_ID = "holo-spot-importmap";

function ensureHoloImportMap() {
  if (document.getElementById(IMPORT_MAP_ID)) return;
  const el = document.createElement("script");
  el.id = IMPORT_MAP_ID;
  el.type = "importmap";
  el.textContent = JSON.stringify({
    imports: {
      three: THREE_URL,
      holospot: HOLO_JS,
    },
  });
  document.head.prepend(el);
}

type HoloModule = {
  Holo: new (
    renderer: import("three").WebGLRenderer,
    options?: Record<string, unknown>
  ) => {
    card: (options?: Record<string, unknown>) => import("three").Mesh;
    get: (mesh: import("three").Mesh) => {
      pose: { rx: number; ry: number; rz: number; flip: boolean };
      ready: Promise<void>;
    } | null;
    render: (
      scene: import("three").Scene,
      camera: import("three").PerspectiveCamera
    ) => void;
    dispose: () => void;
    errors: readonly string[];
  };
  shotCamera: (
    camera: import("three").PerspectiveCamera,
    obj: { pose: { rx: number; ry: number; rz: number; flip: boolean } },
    o: { aspect: number }
  ) => void;
  shotRotation: (pose: {
    rx: number;
    ry: number;
    rz: number;
    flip: boolean;
  }) => import("three").Euler;
};

async function loadHoloRuntime(): Promise<{
  THREE: typeof import("three");
  holoMod: HoloModule;
}> {
  ensureHoloImportMap();
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
  const [THREE, holoMod] = await Promise.all([
    import(/* webpackIgnore: true */ THREE_URL),
    import(/* webpackIgnore: true */ HOLO_JS),
  ]);
  return { THREE, holoMod: holoMod as HoloModule };
}

function readyTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("holospot ready timeout")), ms)
    ),
  ]);
}

type BuyWarmupHolospotProps = {
  className?: string;
  scrollTargetRef: React.RefObject<HTMLElement | null>;
};

function BuyWarmupFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[14rem] w-full flex-col justify-end overflow-hidden bg-black p-0",
        className
      )}
    >
      <Image
        src="/gradients/24.jpeg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="(min-width: 768px) 40vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/78" aria-hidden />
      <div className="relative z-[1] px-4 pt-5 pb-5 sm:px-5 sm:pt-6 sm:pb-6 md:px-5 md:pt-7 md:pb-7">
        <p className="holo-product-gradient-text max-w-full text-left">
          <span className="holo-product-gradient-text-fill">
            Buy Pre Warmed Up Accounts
          </span>
          <span className="holo-product-gradient-text-grain" aria-hidden>
            Buy Pre Warmed Up Accounts
          </span>
        </p>
        <Link
          href="#buy-warmup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-5 h-10 rounded-full bg-white px-8 text-sm font-semibold text-neutral-900 hover:bg-white/95"
          )}
        >
          Buy
        </Link>
      </div>
    </div>
  );
}

export function BuyWarmupHolospot({
  className,
  scrollTargetRef,
}: BuyWarmupHolospotProps) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"loading" | "holo" | "fallback">("loading");
  const reducedMotion = useReducedMotion();
  const scrollOffset = useRef(0);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start 0.95", "end 0.15"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollOffset.current = reducedMotion ? 0.85 : v;
  });

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host || mode === "fallback") return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      try {
        const { THREE, holoMod } = await loadHoloRuntime();
        const { Holo, shotCamera, shotRotation } = holoMod;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera();

        const renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 1);

        const mount = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          if (w < 8 || h < 8) return false;
          const dpr = Math.min(window.devicePixelRatio, reducedMotion ? 1.25 : 1.75);
          renderer.setPixelRatio(dpr);
          renderer.setSize(w, h, false);
          renderer.domElement.style.width = "100%";
          renderer.domElement.style.height = "100%";
          renderer.domElement.style.display = "block";
          return true;
        };

        const holo = new Holo(renderer, {
          assets: HOLO_ASSETS,
          background: "black",
          quality: reducedMotion ? "low" : "medium",
        });

        const card = holo.card({
          material: "emboss",
          settings: BUY_WARMUP_HOLO_BLOB,
          scene: true,
          widthMm: 63,
          heightMm: 88,
        });
        scene.add(card);

        host.appendChild(renderer.domElement);
        if (!mount()) {
          throw new Error("holospot container has no size");
        }

        const obj = holo.get(card);
        if (!obj) throw new Error("holospot card missing");

        await readyTimeout(obj.ready, 20_000);
        if (disposed) return;

        const restRot = shotRotation(obj.pose);
        card.rotation.copy(restRot);
        shotCamera(camera, obj, {
          aspect: host.clientWidth / Math.max(host.clientHeight, 1),
        });
        holo.render(scene, camera);
        setMode("holo");

        const animate = () => {
          if (disposed) return;
          mount();
          const aspect = host.clientWidth / Math.max(host.clientHeight, 1);
          if (Math.abs(camera.aspect - aspect) > 0.01) {
            shotCamera(camera, obj, { aspect });
          }
          const t = scrollOffset.current;
          card.rotation.set(
            restRot.x + THREE.MathUtils.degToRad(t * 14),
            restRot.y + THREE.MathUtils.degToRad(t * 38),
            restRot.z,
            "XYZ"
          );
          holo.render(scene, camera);
          raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        const ro = new ResizeObserver(() => mount());
        ro.observe(host);

        cleanup = () => {
          disposed = true;
          cancelAnimationFrame(raf);
          ro.disconnect();
          holo.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          scene.clear();
        };
      } catch (e) {
        console.error("BuyWarmupHolospot", e);
        if (!disposed) setMode("fallback");
      }
    };

    void run();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [mode, reducedMotion]);

  if (mode === "fallback") {
    return <BuyWarmupFallback className={className} />;
  }

  return (
    <div
      ref={canvasHostRef}
      className={cn(
        "relative h-full min-h-[14rem] w-full bg-black",
        mode === "loading" && "animate-pulse",
        className
      )}
      aria-busy={mode === "loading"}
      aria-label="Buy pre warmed up accounts holographic card"
    />
  );
}