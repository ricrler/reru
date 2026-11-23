import { GrainPanel } from "@/components/landing/grain-panel";
import { Separator } from "@/components/ui/separator";

const reviews = [
  {
    quote:
      "We cut bounces under 1.2% and stopped guessing about spam folder placement. The inbox test matches what our deliverability consultant sees.",
    name: "Lena Voss",
    role: "Head of Lifecycle, Northline",
  },
  {
    quote:
      "Warmup schedules are boring by design—that is the point. Our fresh subdomain reached steady volume without a single provider block.",
    name: "Marcus Iqbal",
    role: "Founder, Parcelstack",
  },
  {
    quote:
      "Preview runs caught Outlook desktop quirks our ESP preview missed. The API drops cleanly into our existing send pipeline.",
    name: "Priya Nandakumar",
    role: "Engineering, Coledger",
  },
] as const;

export function Reviews() {
  return (
    <section id="reviews" className="border-t border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Customers</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Teams sending transactional and marketing mail at modest volume.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {reviews.map((review, index) => (
            <GrainPanel key={review.name} className="flex h-full flex-col p-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{review.quote}&rdquo;
              </p>
              <Separator className="my-4 bg-border" />
              <p className="text-sm font-medium">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.role}</p>
              {index === 1 ? (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Verified sender
                </p>
              ) : null}
            </GrainPanel>
          ))}
        </div>
      </div>
    </section>
  );
}