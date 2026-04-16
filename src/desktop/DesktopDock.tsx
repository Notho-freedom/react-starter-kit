import { motion } from "framer-motion";
import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import type { AppDefinition } from "./windows/types";

export function DesktopDock() {
  const apps = getAppRegistry().filter(a => a.showInDock !== false);
  const { openWindow, windows } = useWindowManager();

  const handleClick = (app: AppDefinition) => {
    openWindow(app.id, app.name, {
      width: app.defaultWidth,
      height: app.defaultHeight,
      minWidth: app.minWidth,
      minHeight: app.minHeight,
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-end gap-1 px-3 py-2
        bg-surface-void/70 backdrop-blur-2xl rounded-2xl border border-border/40 shadow-elevated"
    >
      {apps.map(app => {
        const isOpen = windows.some(w => w.appId === app.id && !w.isMinimized);
        return (
          <motion.button
            key={app.id}
            onClick={() => handleClick(app)}
            whileHover={{ y: -8, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex flex-col items-center group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg
              bg-surface-glass/60 border border-border/30 transition-all duration-200
              group-hover:bg-surface-elevated group-hover:shadow-glow-primary group-hover:border-primary/30
              ${isOpen ? "ring-1 ring-primary/40" : ""}`}
            >
              <span className="text-xl">{app.icon}</span>
            </div>
            {isOpen && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
            )}
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity
              bg-surface-deep/95 text-foreground text-[10px] px-2 py-1 rounded-md whitespace-nowrap
              border border-border/30 shadow-ambient pointer-events-none">
              {app.name}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
