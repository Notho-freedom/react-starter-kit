import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "void" | "glass" | "elevated" | "floating";
type Elevation = "none" | "ambient" | "elevated" | "glow";

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  elevation?: Elevation;
  blur?: "none" | "soft" | "glass" | "heavy";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
}

const variantMap: Record<Variant, string> = {
  void: "bg-surface-void/70",
  glass: "bg-surface-glass/55",
  elevated: "bg-surface-elevated/70",
  floating: "bg-surface-deep/85",
};

const elevationMap: Record<Elevation, string> = {
  none: "",
  ambient: "shadow-ambient",
  elevated: "shadow-elevated",
  glow: "shadow-glow-subtle",
};

const blurMap = {
  none: "",
  soft: "backdrop-blur-md",
  glass: "backdrop-blur-glass",
  heavy: "backdrop-blur-glass-heavy",
};

const roundedMap = {
  none: "",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  "2xl": "rounded-[28px]",
  full: "rounded-full",
};

/**
 * CognitiveSurface — base glassy container.
 * Strict rule: NO border by default. Separation comes from luminance + shadow + blur.
 */
export const CognitiveSurface = forwardRef<HTMLDivElement, Props>(function CognitiveSurface(
  { variant = "glass", elevation = "ambient", blur = "glass", rounded = "lg", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        variantMap[variant],
        elevationMap[elevation],
        blurMap[blur],
        roundedMap[rounded],
        className,
      )}
      {...rest}
    />
  );
});
