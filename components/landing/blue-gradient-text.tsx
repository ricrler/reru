import { cn } from "@/lib/utils";

const GRADIENT_SRC = "/images/bluegradient-clean.svg";
const GRADIENT_TEXT_SRC = "/images/bluegradient-text.svg";

type BlueGradientTextProps = {
  children: string;
  className?: string;
};

export function BlueGradientText({ children, className }: BlueGradientTextProps) {
  return (
    <span className={cn("blue-grain-text", className)} data-text={children}>
      {children}
    </span>
  );
}

export { GRADIENT_SRC, GRADIENT_TEXT_SRC };