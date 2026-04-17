import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  glyph: ReactNode;
  label?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "secondary";
}

const sizeMap = {
  sm: "w-9 h-9 text-base",
  md: "w-11 h-11 text-xl",
  lg: "w-14 h-14 text-2xl",
};

const labelSize = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[11px]",
};

/**
 * CognitiveIcon — naked at rest, halo + scale on hover. No nested cards.
 * Hover halo is a radial glow BEHIND the glyph, not a border.
 */
export const CognitiveIcon = forwardRef<HTMLButtonElement, Props>(function CognitiveIcon(
  { glyph, label, active = false, size = "md", intent = "primary", className, ...rest }, ref,
) {
  const haloVar = intent === "primary" ? "--intent-primary" : "--intent-secondary";

  return (
    <button
      ref={ref}
      className={cn(
        "group relative flex flex-col items-center gap-1 outline-none cursor-default",
        className,
      )}
      {...rest}
    >
      <span className={cn("relative grid place-items-center", sizeMap[size])}>
        {/* Halo — appears on hover or active, behind glyph */}
        <span
          className={cn(
            "absolute inset-0 rounded-2xl transition-all duration-short ease-cognitive-enter",
            "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110",
            active && "opacity-100 scale-110",
          )}
          style={{
            background: `radial-gradient(circle at center, hsl(var(${haloVar}) / 0.45), hsl(var(${haloVar}) / 0.15) 45%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
        <motion.span
          whileHover={{ scale: 1.18, y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="relative z-10 grid place-items-center w-full h-full"
        >
          {glyph}
        </motion.span>
        {/* Active dot */}
        {active && (
          <span
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: `hsl(var(${haloVar}) / 1)`, boxShadow: `0 0 8px hsl(var(${haloVar}) / 0.8)` }}
          />
        )}
      </span>
      {label && (
        <span className={cn(
          "text-text-ghost group-hover:text-text-secondary transition-colors leading-tight text-center max-w-[88px] truncate",
          labelSize[size],
        )}>
          {label}
        </span>
      )}
    </button>
  );
});
