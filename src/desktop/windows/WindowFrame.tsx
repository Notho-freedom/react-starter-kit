import { useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { useWindowManager } from "./useWindowManager";
import type { WindowState } from "./types";

interface Props {
  windowState: WindowState;
  children: ReactNode;
}

export function WindowFrame({ windowState: win, children }: Props) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useWindowManager();
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; winW: number; winH: number } | null>(null);

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
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
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute flex flex-col rounded-xl overflow-hidden
        bg-surface-deep/95 backdrop-blur-2xl border shadow-elevated
        ${win.isFocused ? "border-primary/30" : "border-border/30"}`}
      style={style as any}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center h-9 px-3 gap-2 shrink-0 cursor-grab active:cursor-grabbing
          bg-surface-void/60 border-b border-border/30"
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => maximizeWindow(win.id)}
      >
        <span className="text-xs font-medium text-text-secondary truncate flex-1">{win.title}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => minimizeWindow(win.id)}
            className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-glass text-text-muted hover:text-foreground transition-colors">
            <Minus className="w-3 h-3" />
          </button>
          <button onClick={() => maximizeWindow(win.id)}
            className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-glass text-text-muted hover:text-foreground transition-colors">
            {win.isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
          <button onClick={() => closeWindow(win.id)}
            className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-destructive/20 text-text-muted hover:text-destructive transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Resize handle */}
      {!win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={onResizeMouseDown}
        />
      )}
    </motion.div>
  );
}
