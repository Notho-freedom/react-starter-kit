import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  intent?: "neutral" | "primary" | "secondary" | "success" | "warning" | "ghost";
  size?: "xs" | "sm";
}

const intentMap = {
  neutral: "bg-surface-glass/70 text-text-secondary",
  ghost: "bg-surface-glass/40 text-text-ghost",
  primary: "bg-intent-primary/15 text-intent-primary-glow",
  secondary: "bg-intent-secondary/15 text-intent-secondary-glow",
  success: "bg-intent-success/15 text-intent-success",
  warning: "bg-intent-warning/15 text-intent-warning",
};

const sizeMap = {
  xs: "text-[9px] px-1.5 py-0.5",
  sm: "text-[11px] px-2 py-0.5",
};

/**
 * CognitivePill — keyboard hints, status badges. No border.
 */
export const CognitivePill = forwardRef<HTMLSpanElement, Props>(function CognitivePill(
  { intent = "neutral", size = "xs", className, ...rest }, ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-medium leading-none",
        intentMap[intent],
        sizeMap[size],
        className,
      )}
      {...rest}
    />
  );
});
