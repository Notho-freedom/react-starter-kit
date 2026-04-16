import { useCallback } from "react";
import { useDesktopState } from "../../hooks/useDesktopState";
import type { WindowState } from "./types";

let nextZIndex = 100;

export function useWindowManager() {
  const { windows, setWindows } = useDesktopState();

  const openWindow = useCallback((appId: string, title: string, opts?: Partial<WindowState>) => {
    const existing = windows.find(w => w.appId === appId && !w.isMinimized);
    if (existing) {
      focusWindow(existing.id);
      return existing.id;
    }

    const id = `win-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    nextZIndex++;
    const newWin: WindowState = {
      id,
      appId,
      title,
      x: 80 + (windows.length % 8) * 30,
      y: 60 + (windows.length % 6) * 30,
      width: opts?.width ?? 700,
      height: opts?.height ?? 500,
      minWidth: opts?.minWidth ?? 400,
      minHeight: opts?.minHeight ?? 300,
      zIndex: nextZIndex,
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
    };
    setWindows(prev => [...prev.map(w => ({ ...w, isFocused: false })), newWin]);
    return id;
  }, [windows, setWindows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, [setWindows]);

  const focusWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev => prev.map(w =>
      w.id === id
        ? { ...w, isFocused: true, zIndex: nextZIndex, isMinimized: false }
        : { ...w, isFocused: false }
    ));
  }, [setWindows]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
    ));
  }, [setWindows]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized, isFocused: true } : w
    ));
  }, [setWindows]);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, x, y } : w
    ));
  }, [setWindows]);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, width: Math.max(w.minWidth, width), height: Math.max(w.minHeight, height) } : w
    ));
  }, [setWindows]);

  const snapWindow = useCallback((id: string, side: "left" | "right") => {
    nextZIndex++;
    setWindows(prev => prev.map(w =>
      w.id === id ? {
        ...w,
        x: side === "left" ? 0 : window.innerWidth / 2,
        y: 40,
        width: window.innerWidth / 2,
        height: window.innerHeight - 110,
        isMaximized: false,
        isFocused: true,
        zIndex: nextZIndex,
      } : { ...w, isFocused: false }
    ));
  }, [setWindows]);

  return { windows, openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow, snapWindow };
}
