import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GlassButtonProps = React.ComponentProps<typeof Button>;

/** Frosted liquid-glass CTA — blur + specular highlights over hero backgrounds. */
export function GlassButton({
  className,
  children,
  variant: _variant,
  ...props
}: GlassButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "glass-button h-11 shrink-0 rounded-full border-transparent bg-transparent px-6 text-sm font-medium text-white hover:bg-transparent hover:text-white sm:px-7",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </Button>
  );
}