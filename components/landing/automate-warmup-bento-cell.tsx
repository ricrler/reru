import { WarmupVolumeScrollChart } from "@/components/landing/warmup-volume-scroll-chart";

const TITLE = "Automate Warmups";
const DESCRIPTION =
  "Ramp from 0 to 45k sends over five weeks—engaged inboxes, steady reputation, no manual babysitting.";

export function AutomateWarmupBentoCell({ className = "" }: { className?: string }) {
  return (
    <article
      className={`automate-warmup-bento relative flex min-h-[26rem] min-w-0 flex-col border-b border-white/10 bg-black p-0 sm:min-h-[28rem] md:min-h-[32rem] md:border-r md:border-b-0 lg:min-h-[34rem] ${className}`}
    >
      <div className="holo-product-grain-cell flex min-h-0 min-w-0 flex-1 flex-col p-0">
        <div className="min-w-0 px-4 pt-5 sm:px-5 sm:pt-6 md:px-5 md:pt-7">
          <p className="holo-product-gradient-text max-w-full text-left">
            <span className="holo-product-gradient-text-fill">{TITLE}</span>
            <span className="holo-product-gradient-text-grain" aria-hidden>
              {TITLE}
            </span>
          </p>
          <p className="bento-warmup-description mt-3 max-w-3xl text-left text-pretty">
            {DESCRIPTION}
          </p>
        </div>
        <div className="mt-auto w-full min-w-0 flex-1 pt-4 pb-2">
          <WarmupVolumeScrollChart className="h-[min(340px,42vh)] min-h-[240px] w-full sm:min-h-[280px] md:min-h-[300px]" />
        </div>
      </div>
    </article>
  );
}