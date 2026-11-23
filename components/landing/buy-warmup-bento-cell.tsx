"use client";

import { useRef } from "react";
import { BuyWarmupHolospot } from "@/components/landing/buy-warmup-holospot";

export function BuyWarmupBentoCell({ className = "" }: { className?: string }) {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <article
      ref={articleRef}
      className={`buy-warmup-bento bounce-bento-cell relative min-h-[14rem] w-full self-stretch overflow-hidden border-b-0 bg-black p-0 md:min-h-[18rem] ${className}`}
    >
      <BuyWarmupHolospot
        className="absolute inset-0 min-h-[14rem]"
        scrollTargetRef={articleRef}
      />
    </article>
  );
}