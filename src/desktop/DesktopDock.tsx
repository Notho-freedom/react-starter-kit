import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import type { AppDefinition } from "./windows/types";
import { CognitiveDock } from "@/components/cognitive/CognitiveDock";
import { CognitiveIcon } from "@/components/cognitive/CognitiveIcon";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
      <CognitiveDock>
        {apps.map(app => {
          const isOpen = windows.some(w => w.appId === app.id && !w.isMinimized);
          return (
            <div key={app.id} className="relative group/dockitem">
              <CognitiveIcon
                glyph={<span>{app.icon}</span>}
                onClick={() => handleClick(app)}
                active={isOpen}
                size="md"
              />
              {/* Tooltip — floating above, no border */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 0 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/dockitem:opacity-100
                    transition-opacity duration-short pointer-events-none whitespace-nowrap
                    bg-surface-deep/95 backdrop-blur-glass text-text-primary text-[10px] px-2 py-1 rounded-md
                    shadow-elevated"
                >
                  {app.name}
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </CognitiveDock>
    </div>
  );
}
