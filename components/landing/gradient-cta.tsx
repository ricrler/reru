import { cn } from "@/lib/utils";

type GradientCtaProps = React.ComponentProps<"button"> & {
  variant?: "gradient" | "white";
};

export function GradientCta({
  className,
  children,
  variant = "gradient",
  ...props
}: GradientCtaProps) {
  if (variant === "white") {
    return (
      <button
        type="button"
        className={cn(
          "inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.98]",
          className
        )}
        {...props}
      >
        <span
          className="bg-[linear-gradient(105deg,#0052ff_0%,#00c853_52%,#39ff14_100%)] bg-clip-text text-[#0052ff] text-transparent [-webkit-text-fill-color:transparent]"
        >
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "blue-grain-cta inline-flex h-11 shrink-0 items-center justify-center rounded-full px-8 text-sm font-medium text-white transition-opacity hover:opacity-90",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}