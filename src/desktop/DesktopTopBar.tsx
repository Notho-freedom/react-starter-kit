import { useState, useEffect } from "react";
import { Wifi, Battery, BellRing, Search, Volume2 } from "lucide-react";
import { useDesktopState } from "../hooks/useDesktopState";
import { motion, AnimatePresence } from "framer-motion";
import { CognitiveSurface } from "@/components/cognitive/CognitiveSurface";
import { CognitivePill } from "@/components/cognitive/CognitivePill";

export function DesktopTopBar() {
  const [time, setTime] = useState(new Date());
  const { notifications, setCommandBarOpen } = useDesktopState();
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div
      className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-4
        bg-surface-void/40 backdrop-blur-glass-heavy"
      style={{
        background: "linear-gradient(180deg, hsl(var(--surface-void) / 0.65) 0%, hsl(var(--surface-void) / 0.15) 100%)",
        boxShadow: "0 8px 24px -16px hsl(220 40% 2% / 0.6)",
      }}
    >
      {/* Left — brand */}
      <div className="flex items-center gap-2.5">
        <div
          className="relative w-5 h-5 rounded-md grid place-items-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--intent-primary)), hsl(var(--intent-secondary)))",
            boxShadow: "0 0 12px -2px hsl(var(--intent-primary) / 0.6)",
          }}
        >
          <span className="text-[9px] font-medium text-text-primary">EP</span>
        </div>
        <span className="text-xs font-medium text-text-secondary tracking-wide">Ergo Proxy</span>
      </div>

      {/* Center — search trigger (no border, only luminance) */}
      <button
        onClick={() => setCommandBarOpen(true)}
        className="group flex items-center gap-2 px-3 h-7 rounded-lg
          bg-surface-glass/30 hover:bg-surface-glass/55 backdrop-blur-glass
          text-text-muted hover:text-text-secondary text-xs transition-all duration-short ease-cognitive-enter"
      >
        <Search className="w-3 h-3" />
        <span>Rechercher…</span>
        <CognitivePill size="xs" intent="ghost" className="ml-3">⌘K</CognitivePill>
      </button>

      {/* Right — system tray */}
      <div className="flex items-center gap-3 text-text-muted">
        <button className="hover:text-text-primary transition-colors duration-micro">
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-3.5 h-3.5" />

        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative hover:text-text-primary transition-colors duration-micro"
          >
            <BellRing className="w-3.5 h-3.5" />
            {unread > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 rounded-full text-[8px] font-medium grid place-items-center"
                style={{
                  background: "hsl(var(--destructive))",
                  color: "hsl(var(--destructive-foreground))",
                  boxShadow: "0 0 8px -1px hsl(var(--destructive) / 0.7)",
                }}
              >
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-9 w-72 z-[200]"
              >
                <CognitiveSurface variant="floating" elevation="elevated" blur="heavy" rounded="xl" className="p-3">
                  <p className="text-xs font-medium text-text-primary mb-2">Notifications</p>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-text-muted py-6 text-center">Aucune notification</p>
                  ) : (
                    <div className="space-y-1.5 max-h-60 overflow-y-auto">
                      {notifications.slice(0, 10).map(n => (
                        <div key={n.id} className="p-2 rounded-lg bg-surface-glass/40 hover:bg-surface-glass/60 transition-colors text-xs">
                          <p className="font-medium text-text-primary">{n.title}</p>
                          <p className="text-text-muted mt-0.5 leading-relaxed">{n.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CognitiveSurface>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Time block — separated by spacing & luminance, no vertical border */}
        <div className="text-xs font-medium text-text-secondary pl-3 ml-1">
          <span className="text-text-primary">{timeStr}</span>
          <span className="ml-2 text-text-ghost">{dateStr}</span>
        </div>
      </div>
    </div>
  );
}
