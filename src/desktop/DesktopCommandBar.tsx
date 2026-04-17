import { Command } from "cmdk";
import { useDesktopState } from "../hooks/useDesktopState";
import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CognitiveSurface } from "@/components/cognitive/CognitiveSurface";
import { CognitivePill } from "@/components/cognitive/CognitivePill";

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

  return (
    <AnimatePresence>
      {commandBarOpen && (
        <div className="fixed inset-0 z-[500]" onClick={() => setCommandBarOpen(false)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, hsl(var(--intent-primary) / 0.08), hsl(var(--surface-void) / 0.7))",
              backdropFilter: "blur(8px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[540px]"
            onClick={e => e.stopPropagation()}
          >
            <CognitiveSurface variant="floating" elevation="elevated" blur="heavy" rounded="2xl" className="overflow-hidden">
              {/* Halo glow around the palette */}
              <div
                aria-hidden
                className="absolute -inset-px rounded-[28px] pointer-events-none"
                style={{ boxShadow: "inset 0 1px 0 hsl(var(--text-primary) / 0.08), 0 0 80px -10px hsl(var(--intent-primary) / 0.4)" }}
              />
              <Command shouldFilter>
                <div className="flex items-center gap-2.5 px-4 h-12">
                  <Search className="w-4 h-4 text-text-muted shrink-0" />
                  <Command.Input
                    placeholder="Rechercher une application, commande…"
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-ghost outline-none"
                    autoFocus
                  />
                  <CognitivePill size="xs" intent="ghost">ESC</CognitivePill>
                </div>
                {/* Subtle separator via luminance, not border */}
                <div className="h-px mx-3" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--text-primary) / 0.08), transparent)" }} />
                <Command.List className="max-h-[320px] overflow-auto p-2">
                  <Command.Empty className="py-8 text-center text-xs text-text-muted">Aucun résultat.</Command.Empty>
                  <Command.Group
                    heading="Applications"
                    className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-text-ghost [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
                  >
                    {apps.map(app => (
                      <Command.Item
                        key={app.id}
                        value={app.name}
                        onSelect={() => launch(app)}
                        className="group/cmd flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-primary cursor-default
                          data-[selected=true]:bg-surface-glass/60 transition-colors duration-micro outline-none"
                      >
                        <span
                          className="w-8 h-8 grid place-items-center rounded-lg text-lg
                            bg-surface-glass/0 group-data-[selected=true]/cmd:bg-surface-glass/40 transition-colors"
                        >
                          {app.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-text-primary">{app.name}</p>
                          <p className="text-[10px] text-text-muted truncate">{app.description}</p>
                        </div>
                        <CognitivePill size="xs" intent="ghost" className="opacity-0 group-data-[selected=true]/cmd:opacity-100 transition-opacity">↵</CognitivePill>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </CognitiveSurface>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
