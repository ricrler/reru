import { Badge } from "@/components/ui/badge";
import {
  BentoCard,
  BentoCardContent,
  BentoCardDescription,
  BentoCardTitle,
  BentoCardVisual,
  BentoGrid,
  BentoLight,
  BentoPanel,
} from "@/components/ui/bento-grid";
import { DeliverabilityChart } from "@/components/landing/deliverability-chart";
import { ApiSnippetTabs } from "@/components/landing/api-snippet-tabs";

const features = [
  {
    id: "validator",
    title: "Email validator",
    body: "Syntax, DNS, and optional SMTP RCPT checks before addresses enter your CRM or outbound queue.",
    tag: "Validation",
    span: "md:col-span-3",
    accent: "[--bento-light:#4778f5]",
  },
  {
    id: "warmup",
    title: "Email warmup",
    body: "Gradual send ramps with engaged inboxes so new domains do not trip rate limits on day one.",
    tag: "Warmup",
    span: "md:col-span-3",
    accent: "[--bento-light:#3b82f6]",
  },
  {
    id: "inbox",
    title: "Inbox tester",
    body: "Send once; seed inboxes across providers return inbox, promotions, or spam placement in real time.",
    tag: "Placement",
    span: "md:col-span-2",
    accent: "[--bento-light:#60a5fa]",
  },
  {
    id: "preview",
    title: "Preview testing",
    body: "Render HTML across webmail, desktop clients, and common breakpoints before production sends.",
    tag: "Preview",
    span: "md:col-span-2",
    accent: "[--bento-light:#2563eb]",
  },
  {
    id: "ai",
    title: "AI templates",
    body: "Draft transactional receipts and marketing sequences with editable structure—not generic filler copy.",
    tag: "Templates",
    span: "md:col-span-2",
    accent: "[--bento-light:#1d4ed8]",
  },
] as const;

export function BentoProduct() {
  return (
    <section id="features" className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="mb-10 max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight">Product</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Five tools on one surface. Boxes use restrained texture; the page stays flat black.
          </p>
        </div>

        <BentoGrid id="product">
          {features.map((item) => (
            <BentoCard
              key={item.id}
              className={`${item.span} ${item.accent}`}
            >
              <BentoLight />
              <BentoCardVisual className="min-h-24 items-end justify-start p-5 pb-0">
                <Badge
                  variant="secondary"
                  className="rounded-full border border-border bg-secondary/80 font-normal text-muted-foreground"
                >
                  {item.tag}
                </Badge>
              </BentoCardVisual>
              <BentoCardContent>
                <BentoCardTitle>{item.title}</BentoCardTitle>
                <BentoCardDescription>{item.body}</BentoCardDescription>
              </BentoCardContent>
            </BentoCard>
          ))}

          <BentoCard id="metrics" className="md:col-span-4 [--bento-light:#1a6bff]">
            <BentoLight />
            <BentoCardContent className="pb-2">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <BentoCardTitle>Deliverability trend</BentoCardTitle>
                  <BentoCardDescription className="mt-1">
                    Inbox rate and sender reputation over a 12-week warmup.
                  </BentoCardDescription>
                </div>
                <p className="font-mono text-xs text-muted-foreground">+30 pts avg.</p>
              </div>
              <DeliverabilityChart />
            </BentoCardContent>
          </BentoCard>

          <BentoCard id="api" className="md:col-span-2 [--bento-light:#1a6bff]">
            <BentoLight />
            <BentoCardContent>
              <BentoCardTitle>API</BentoCardTitle>
              <BentoCardDescription className="mb-4">
                REST endpoints for validate, inbox tests, warmup, previews, and
                templates.
              </BentoCardDescription>
              <BentoPanel className="grain-panel p-3">
                <ApiSnippetTabs />
              </BentoPanel>
            </BentoCardContent>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}