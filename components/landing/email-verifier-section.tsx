import { AutomateWarmupBentoCell } from "@/components/landing/automate-warmup-bento-cell";
import { BuyWarmupBentoCell } from "@/components/landing/buy-warmup-bento-cell";
import { ProductHoloText } from "@/components/landing/product-holo-text";
import { EmailVerifierForm } from "@/components/landing/email-verifier-form";
import { BounceDecreaseBentoCell } from "@/components/landing/bounce-decrease-bento-cell";

function ProductHoloCell({ className = "" }: { className?: string }) {
  return (
    <article
      className={`holo-product-grain-cell flex min-h-[17rem] min-w-0 flex-col justify-end self-stretch overflow-hidden border-b border-white/10 bg-transparent px-0 pt-5 pb-3 sm:min-h-[19rem] sm:pb-4 sm:pt-6 md:h-full md:min-h-0 md:border-r md:pb-4 md:pr-5 md:pt-7 ${className}`}
    >
      <ProductHoloText />
    </article>
  );
}

export function EmailVerifierSection() {
  return (
    <section id="verify" className="w-full bg-black pb-10 sm:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)] lg:items-center lg:gap-10">
          <header className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-tight">
              Check if the Email is valid?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
              Try the Email verifier for free without signing in.
            </p>
          </header>
          <EmailVerifierForm />
        </div>
      </div>

      <div className="mt-10 w-full px-5 sm:px-8 md:mt-12 md:px-10">
        <div className="grid overflow-hidden rounded-b-xl border border-white/10 bg-black md:grid-cols-10">
          <ProductHoloCell className="md:col-span-5 md:row-span-2" />
          <BounceDecreaseBentoCell className="border-r-0 md:col-span-5 md:row-span-2" />
          <AutomateWarmupBentoCell className="rounded-bl-xl md:col-span-6" />
          <BuyWarmupBentoCell className="border-r-0 md:col-span-4" />
        </div>
      </div>
    </section>
  );
}