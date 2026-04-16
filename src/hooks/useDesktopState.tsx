import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { WindowState } from "../desktop/windows/types";

interface Notification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  timestamp: number;
  read: boolean;
}

interface DesktopContext {
  windows: WindowState[];
  setWindows: React.Dispatch<React.SetStateAction<WindowState[]>>;
  commandBarOpen: boolean;
  setCommandBarOpen: (v: boolean) => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  clearNotifications: () => void;
  wallpaper: string;
  setWallpaper: (w: string) => void;
}

const Ctx = createContext<DesktopContext | null>(null);

export function DesktopStateProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [wallpaper, setWallpaper] = useState("default");

  const addNotification = (n: Omit<Notification, "id" | "timestamp" | "read">) => {
    setNotifications(prev => [{
      ...n,
      id: `notif-${Date.now()}`,
      timestamp: Date.now(),
      read: false,
    }, ...prev].slice(0, 50));
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <Ctx.Provider value={{
      windows, setWindows,
      commandBarOpen, setCommandBarOpen,
      notifications, addNotification, clearNotifications,
      wallpaper, setWallpaper,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useDesktopState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDesktopState must be used within DesktopStateProvider");
  return ctx;
}
