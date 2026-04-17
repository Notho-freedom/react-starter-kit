import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  x: string;
  y: string;
  size?: number;
  hue?: "primary" | "secondary" | "success" | "focus";
  intensity?: number;
  drift?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

const hueMap = {
  primary: "var(--intent-primary)",
  secondary: "var(--intent-secondary)",
  success: "var(--intent-success)",
  focus: "var(--intent-focus)",
};

/**
 * CognitiveOrb — drifting luminous orb. Uses cognitive intent colors, never raw hex.
 */
export function CognitiveOrb({
  x, y, size = 400, hue = "primary", intensity = 0.18, drift = 40, duration = 22, delay = 0, className,
}: Props) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl pointer-events-none mix-blend-screen", className)}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(${hueMap[hue]} / ${intensity}), transparent 70%)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: [0, drift, -drift * 0.6, drift * 0.3, 0],
        y: [0, -drift * 0.8, drift * 0.5, -drift * 0.3, 0],
        scale: [1, 1.12, 0.92, 1.05, 1],
        opacity: [0.85, 1, 0.7, 0.95, 0.85],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
