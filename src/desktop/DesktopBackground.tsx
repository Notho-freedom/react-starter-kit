import { motion } from "framer-motion";

const orbs = [
  { x: "15%", y: "25%", size: 400, color: "hsl(217 91% 60% / 0.15)", delay: 0 },
  { x: "75%", y: "20%", size: 350, color: "hsl(270 60% 55% / 0.12)", delay: 2 },
  { x: "50%", y: "70%", size: 500, color: "hsl(217 91% 60% / 0.1)", delay: 4 },
  { x: "85%", y: "75%", size: 300, color: "hsl(270 60% 55% / 0.08)", delay: 1 },
  { x: "30%", y: "85%", size: 250, color: "hsl(142 71% 45% / 0.06)", delay: 3 },
];

export function DesktopBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[hsl(222,47%,4%)] overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(222,47%,4%)] to-[hsl(240,30%,5%)]" />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px",
      }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(217 91% 60% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60% / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
}
