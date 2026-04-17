import { useEffect, useRef, useState } from "react";
import { CognitiveOrb } from "@/components/cognitive/CognitiveOrb";
import { CognitiveScanline } from "@/components/cognitive/CognitiveScanline";

/**
 * DesktopBackground — animated mesh + drifting orbs + particles + scanline + parallax grid.
 */
export function DesktopBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 217 : 270,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 91%, 70%, ${p.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 91%, 65%, 0.6)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallax = (depth: number) => ({
    transform: `translate(${(mouse.x - 0.5) * depth}px, ${(mouse.y - 0.5) * depth}px)`,
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-surface-void">
      {/* Animated mesh gradient base */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 25%, hsl(var(--intent-primary) / 0.22), transparent 60%),
            radial-gradient(ellipse 70% 55% at 80% 75%, hsl(var(--intent-secondary) / 0.18), transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 50%, hsl(217 80% 25% / 0.12), transparent 70%),
            linear-gradient(135deg, hsl(222 47% 5%) 0%, hsl(240 35% 4%) 100%)
          `,
          animation: "breathe 18s ease-in-out infinite",
        }}
      />

      {/* Drifting orbs */}
      <CognitiveOrb x="15%" y="25%" size={460} hue="primary" intensity={0.22} duration={28} delay={0} />
      <CognitiveOrb x="78%" y="20%" size={380} hue="secondary" intensity={0.18} duration={32} delay={3} />
      <CognitiveOrb x="50%" y="72%" size={520} hue="primary" intensity={0.14} duration={38} delay={5} drift={50} />
      <CognitiveOrb x="88%" y="78%" size={320} hue="secondary" intensity={0.16} duration={26} delay={2} />
      <CognitiveOrb x="25%" y="85%" size={280} hue="success" intensity={0.08} duration={34} delay={4} />
      <CognitiveOrb x="65%" y="40%" size={240} hue="focus" intensity={0.12} duration={22} delay={1} drift={30} />

      {/* Particle layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Parallax grid */}
      <div
        className="absolute -inset-10 opacity-[0.025] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--intent-primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--intent-primary) / 0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          ...parallax(8),
        }}
      />

      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Scan line */}
      <CognitiveScanline opacity={0.05} duration={9} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, hsl(var(--surface-void) / 0.6) 100%)",
        }}
      />
    </div>
  );
}
