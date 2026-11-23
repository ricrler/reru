import { BounceDecreaseChart } from "@/components/landing/bounce-decrease-chart";

const HEADLINE = "Bounce rate fell by 96.3%";

export function BounceDecreaseBentoCell({ className = "" }: { className?: string }) {
  return (
    <article
      className={`bounce-bento-cell relative flex min-h-[20rem] flex-col border-b border-white/10 bg-black px-4 pt-5 pb-0 sm:min-h-[22rem] sm:px-5 sm:pt-6 md:min-h-[24rem] md:pt-7 ${className}`}
    >
      <div className="relative z-[1] w-full min-w-0">
        <p className="bounce-bento-headline holo-product-gradient-text">
          <span className="holo-product-gradient-text-fill">{HEADLINE}</span>
          <span className="holo-product-gradient-text-grain" aria-hidden>
            {HEADLINE}
          </span>
        </p>
      </div>
      <div className="absolute inset-x-2 bottom-0 z-[1] flex justify-center overflow-visible sm:inset-x-3">
        <BounceDecreaseChart />
      </div>
    </article>
  );
}