import { Button } from "@/components/ui/button";
import WayglimBackground from "@/components/landing/wayglim-background";

export function Hero() {
  return (
    <section
      id="solutions"
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden border-b border-white/15 bg-black"
    >
      <WayglimBackground className="z-0" style={undefined} label={undefined} />

      <div className="relative z-10 mt-auto w-full px-5 pb-12 pt-8 text-left sm:px-8 sm:pb-16 md:px-10 md:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-medium leading-snug tracking-tight text-pretty sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
            <span className="text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]">
              Know where your email lands.
            </span>{" "}
            <span className="text-white/80 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]">
              Validate addresses, warm up new domains, preview every message, and
              test inbox placement in real time.
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
            <Button
              size="lg"
              className="h-11 rounded-full bg-white px-8 text-sm font-semibold text-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-white/95"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 rounded-full  bg-black/30 px-6 text-sm font-medium text-white  hover:bg-black/45 sm:px-7 border-none"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}