import { useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useWindowManager } from "@/desktop/windows/useWindowManager";
import type { WindowState } from "@/desktop/windows/types";
import { cn } from "@/lib/utils";

interface Props {
  windowState: WindowState;
  children: ReactNode;
}

/**
 * CognitiveWindow — single-surface window built atop CognitiveCard concept.
 * Titlebar is fused with the body (no separating border — luminance gradient only).
 * macOS-style traffic-light controls.
 */
export function CognitiveWindow({ windowState: win, children }: Props) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useWindowManager();
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; winW: number; winH: number } | null>(null);

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-window-control]")) return;
    e.preventDefault();
    focusWindow(win.id);
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      moveWindow(win.id, dragRef.current.winX + dx, dragRef.current.winY + dy);
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [win.id, win.x, win.y, focusWindow, moveWindow]);

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    focusWindow(win.id);
    resizeRef.current = { startX: e.clientX, startY: e.clientY, winW: win.width, winH: win.height };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const dw = ev.clientX - resizeRef.current.startX;
      const dh = ev.clientY - resizeRef.current.startY;
      resizeWindow(win.id, resizeRef.current.winW + dw, resizeRef.current.winH + dh);
    };
    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [win.id, win.width, win.height, focusWindow, resizeWindow]);

  const style = win.isMaximized
    ? { top: 40, left: 0, width: "100vw", height: "calc(100vh - 112px)", zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-2xl",
        "bg-surface-deep/85 backdrop-blur-glass-heavy",
        win.isFocused ? "shadow-elevated shadow-glow-subtle" : "shadow-ambient",
      )}
      style={style as React.CSSProperties}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Focus ring (glow) — replaces border */}
      {win.isFocused && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px hsl(var(--intent-primary) / 0.18), 0 0 60px -20px hsl(var(--intent-primary) / 0.5)",
          }}
        />
      )}

      {/* Titlebar — fused with body via gradient luminance, no divider line */}
      <div
        className="relative flex items-center h-10 px-3 gap-3 shrink-0 cursor-grab active:cursor-grabbing"
        style={{
          background: "linear-gradient(180deg, hsl(var(--surface-elevated) / 0.6) 0%, hsl(var(--surface-deep) / 0) 100%)",
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => maximizeWindow(win.id)}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" data-window-control>
          <button
            onClick={() => closeWindow(win.id)}
            className="group/btn w-3 h-3 rounded-full grid place-items-center"
            style={{ background: "hsl(0 70% 55%)", boxShadow: "0 0 0 0.5px hsl(0 70% 35% / 0.5)" }}
            aria-label="Fermer"
          >
            <svg className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 8 8" fill="none">
              <path d="M2 2L6 6M6 2L2 6" stroke="hsl(0 70% 20%)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => minimizeWindow(win.id)}
            className="group/btn w-3 h-3 rounded-full grid place-items-center"
            style={{ background: "hsl(38 92% 55%)", boxShadow: "0 0 0 0.5px hsl(38 92% 35% / 0.5)" }}
            aria-label="Réduire"
          >
            <svg className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4H6.5" stroke="hsl(38 92% 20%)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => maximizeWindow(win.id)}
            className="group/btn w-3 h-3 rounded-full grid place-items-center"
            style={{ background: "hsl(142 71% 45%)", boxShadow: "0 0 0 0.5px hsl(142 71% 25% / 0.5)" }}
            aria-label="Agrandir"
          >
            <svg className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 8 8" fill="none">
              <path d="M2.5 1.5L1.5 1.5L1.5 2.5M5.5 6.5L6.5 6.5L6.5 5.5" stroke="hsl(142 71% 20%)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <span className="text-[11px] font-medium text-text-secondary truncate flex-1 text-center pointer-events-none">
          {win.title}
        </span>

        {/* Spacer to balance the traffic lights visually */}
        <div className="w-[60px] shrink-0" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>

      {/* Resize handle (invisible) */}
      {!win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
          onMouseDown={onResizeMouseDown}
        />
      )}
    </motion.div>
  );
}
