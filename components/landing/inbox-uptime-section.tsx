import { UptimeDitherStrip } from "@/components/amicro/UptimeDitherStrip";
import { NumberTicker } from "@/components/ui/number-ticker";

const LONG_STRIP = [1, 1, 0.8, 1, 1, 1, 0, 1, 1, 1, 0.8, 1];

const SHORT_STRIP = [1, 0.8, 1];

const lineText =
  "text-2xl leading-none font-medium tracking-tight sm:text-3xl md:text-4xl";
const stripHeight = "h-[0.92em] min-h-[1.35rem] sm:min-h-[1.6rem] md:min-h-[1.85rem]";

export function InboxUptimeSection() {
  return (
    <section
      id="features"
      className="bg-transparent px-5 py-14 sm:px-8 md:px-10 md:py-16"
    >
      <div
        className={`mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 sm:gap-x-3 sm:gap-y-2 ${lineText}`}
      >
        <UptimeDitherStrip data={LONG_STRIP} className={`w-full ${stripHeight}`} />
        <span className="shrink-0 whitespace-nowrap">
          <NumberTicker value={94} className="text-white" />
          <span className="text-white">%</span>{" "}
          <span className="font-normal text-white/50">Emails</span>
        </span>

        <div className={`col-span-1 flex min-w-0 items-center gap-2 sm:gap-2.5 ${stripHeight}`}>
          <UptimeDitherStrip data={SHORT_STRIP} className="h-full w-[70%] shrink-0" />
          <span className="min-w-0 font-normal whitespace-nowrap text-white/50">
            Delivered to Inbox
          </span>
        </div>
      </div>
    </section>
  );
}