import { Command } from "cmdk";
import { useDesktopState } from "../hooks/useDesktopState";
import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function DesktopCommandBar() {
  const { commandBarOpen, setCommandBarOpen } = useDesktopState();
  const { openWindow } = useWindowManager();
  const apps = getAppRegistry();

  const launch = (app: typeof apps[0]) => {
    openWindow(app.id, app.name, {
      width: app.defaultWidth,
      height: app.defaultHeight,
    });
    setCommandBarOpen(false);
  };

  if (!commandBarOpen) return null;

  return (
    <div className="fixed inset-0 z-[500]" onClick={() => setCommandBarOpen(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[520px]"
        onClick={e => e.stopPropagation()}
      >
        <Command className="bg-surface-deep/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-elevated overflow-hidden">
          <div className="flex items-center gap-2 px-4 border-b border-border/30">
            <Search className="w-4 h-4 text-text-muted shrink-0" />
            <Command.Input
              placeholder="Rechercher une application, commande…"
              className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-text-ghost outline-none"
              autoFocus
            />
            <kbd className="text-[10px] text-text-ghost bg-surface-glass px-1.5 py-0.5 rounded">ESC</kbd>
          </div>
          <Command.List className="max-h-[300px] overflow-auto p-2">
            <Command.Empty className="py-6 text-center text-xs text-text-muted">Aucun résultat.</Command.Empty>
            <Command.Group heading="Applications" className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:text-text-ghost [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {apps.map(app => (
                <Command.Item
                  key={app.id}
                  value={app.name}
                  onSelect={() => launch(app)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground cursor-default
                    data-[selected=true]:bg-surface-glass/60 transition-colors"
                >
                  <span className="text-lg">{app.icon}</span>
                  <div>
                    <p className="text-xs font-medium">{app.name}</p>
                    <p className="text-[10px] text-text-muted">{app.description}</p>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </motion.div>
    </div>
  );
}
