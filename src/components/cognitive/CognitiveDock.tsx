import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CognitiveSurface } from "./CognitiveSurface";

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * CognitiveDock — single floating surface. Children (icons) live on the SAME plane.
 * No inner card per icon. Glow halo on hover comes from CognitiveIcon.
 */
export function CognitiveDock({ children, className }: Props) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0, scale: 0.96 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Outer halo (depth, not border) */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[32px] pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(60% 80% at 50% 100%, hsl(var(--intent-primary) / 0.18), transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      <CognitiveSurface
        variant="floating"
        elevation="elevated"
        blur="heavy"
        rounded="2xl"
        className="relative flex items-end gap-1 px-3 py-2"
      >
        {/* Top sheen — replaces hard border with luminance */}
        <div
          aria-hidden
          className="absolute inset-x-3 top-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--text-primary) / 0.22), transparent)" }}
        />
        {children}
      </CognitiveSurface>
    </motion.div>
  );
}
