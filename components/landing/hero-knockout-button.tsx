import { cn } from "@/lib/utils";

type HeroKnockoutButtonProps = React.ComponentProps<"button">;

/** Solid white pill; label is a fixed-aligned clip of the hero stripe pattern (no gradient on the button). */
export function HeroKnockoutButton({
  className,
  children,
  ...props
}: HeroKnockoutButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white bg-none px-8 text-sm font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span className="hero-stripe-columns hero-knockout-text">{children}</span>
    </button>
  );
}