import * as ContextMenu from "@radix-ui/react-context-menu";
import { useDesktopState } from "../hooks/useDesktopState";
import type { ReactNode } from "react";

const itemClass = "flex items-center gap-2.5 px-3 py-2 text-xs text-text-primary rounded-lg hover:bg-surface-glass/60 cursor-default outline-none transition-colors duration-micro";
const surfaceClass = "min-w-[200px] bg-surface-deep/90 backdrop-blur-glass-heavy rounded-xl shadow-elevated p-1.5";

export function DesktopContextMenu({ children }: { children: ReactNode }) {
  const { setCommandBarOpen, setWallpaper, wallpaper } = useDesktopState();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={`${surfaceClass} z-[300]`}>
          <ContextMenu.Item onSelect={() => setCommandBarOpen(true)} className={itemClass}>
            <span className="text-base">🔍</span>
            <span>Rechercher</span>
            <span className="ml-auto text-text-ghost text-[10px]">⌘K</span>
          </ContextMenu.Item>
          <div className="h-px my-1 mx-2" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--text-primary) / 0.08), transparent)" }} />
          <ContextMenu.Item className={itemClass}>
            <span className="text-base">📐</span>
            <span>Aligner les icônes</span>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className={itemClass}>
              <span className="text-base">🎨</span>
              <span>Fond d'écran</span>
              <span className="ml-auto text-text-ghost">▸</span>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent className={`${surfaceClass} z-[301]`}>
                {["default", "midnight", "aurora", "ember"].map(w => (
                  <ContextMenu.Item
                    key={w}
                    onSelect={() => setWallpaper(w)}
                    className={`${itemClass} ${wallpaper === w ? "text-intent-primary-glow" : ""}`}
                  >
                    {wallpaper === w && <span className="text-[10px]">●</span>}
                    <span className={wallpaper === w ? "" : "ml-[14px]"}>{w.charAt(0).toUpperCase() + w.slice(1)}</span>
                  </ContextMenu.Item>
                ))}
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <div className="h-px my-1 mx-2" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--text-primary) / 0.08), transparent)" }} />
          <ContextMenu.Item className={itemClass}>
            <span className="text-base">⚙️</span>
            <span>Préférences</span>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
