import { cn } from "@/lib/utils";

type GrainPanelProps = React.ComponentProps<"div"> & {
  glass?: boolean;
  grain?: boolean;
};

export function GrainPanel({
  className,
  glass = false,
  grain = true,
  children,
  ...props
}: GrainPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-sm border border-border",
        grain && "grain-panel",
        !grain && "bg-card",
        glass && "glass-panel",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}