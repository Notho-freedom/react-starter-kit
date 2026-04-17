import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CognitiveSurface } from "./CognitiveSurface";

interface Props extends HTMLAttributes<HTMLDivElement> {
  intent?: "neutral" | "primary" | "secondary" | "success" | "warning";
  interactive?: boolean;
}

const intentTint: Record<NonNullable<Props["intent"]>, string> = {
  neutral: "",
  primary: "before:bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--intent-primary)/0.18),transparent_60%)]",
  secondary: "before:bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--intent-secondary)/0.18),transparent_60%)]",
  success: "before:bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--intent-success)/0.18),transparent_60%)]",
  warning: "before:bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--intent-warning)/0.18),transparent_60%)]",
};

/**
 * CognitiveCard — single-surface response card.
 * Inner content lives on the SAME surface (no nested border-card).
 * Adds a subtle intent tint via ::before pseudo, never a border.
 */
export const CognitiveCard = forwardRef<HTMLDivElement, Props>(function CognitiveCard(
  { intent = "neutral", interactive = false, className, children, ...rest },
  ref,
) {
  return (
    <CognitiveSurface
      ref={ref}
      variant="floating"
      elevation="elevated"
      blur="heavy"
      rounded="xl"
      className={cn(
        "before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
        intentTint[intent],
        interactive && "transition-all duration-short ease-cognitive-enter hover:shadow-glow-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </CognitiveSurface>
  );
});
