import { useState, useEffect } from "react";
import { Wifi, Battery, BellRing, Search, Volume2 } from "lucide-react";
import { useDesktopState } from "../hooks/useDesktopState";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-4
      bg-surface-void/80 backdrop-blur-xl border-b border-border/50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">EP</span>
        </div>
        <span className="text-xs font-medium text-text-secondary">Ergo Proxy</span>
      </div>

      {/* Center — search trigger */}
      <button
        onClick={() => setCommandBarOpen(true)}
        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-glass/50 hover:bg-surface-glass
          text-text-muted text-xs transition-colors border border-border/30"
      >
        <Search className="w-3 h-3" />
        <span>Rechercher…</span>
        <kbd className="text-[10px] bg-surface-deep px-1 rounded text-text-ghost ml-2">⌘K</kbd>
      </button>

      {/* Right */}
      <div className="flex items-center gap-3 text-text-secondary">
        <Volume2 className="w-3.5 h-3.5 cursor-pointer hover:text-foreground transition-colors" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-3.5 h-3.5" />

        <div className="relative">
          <button onClick={() => setShowNotifs(!showNotifs)} className="relative hover:text-foreground transition-colors">
            <BellRing className="w-3.5 h-3.5" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full text-[7px] text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute right-0 top-8 w-72 bg-surface-deep/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-elevated p-3 z-[200]"
              >
                <p className="text-xs font-medium text-foreground mb-2">Notifications</p>
                {notifications.length === 0 ? (
                  <p className="text-xs text-text-muted py-4 text-center">Aucune notification</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.slice(0, 10).map(n => (
                      <div key={n.id} className="p-2 rounded-lg bg-surface-glass/50 text-xs">
                        <p className="font-medium text-foreground">{n.title}</p>
                        <p className="text-text-muted mt-0.5">{n.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-xs font-medium text-text-secondary pl-2 border-l border-border/50">
          <span>{timeStr}</span>
          <span className="ml-2 text-text-muted">{dateStr}</span>
        </div>
      </div>
    </div>
  );
}
