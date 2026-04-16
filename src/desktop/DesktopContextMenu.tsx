import * as ContextMenu from "@radix-ui/react-context-menu";
import { useDesktopState } from "../hooks/useDesktopState";
import type { ReactNode } from "react";

export function DesktopContextMenu({ children }: { children: ReactNode }) {
  const { setCommandBarOpen, setWallpaper, wallpaper } = useDesktopState();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[180px] bg-surface-deep/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-elevated p-1.5 z-[300]">
          <ContextMenu.Item
            onSelect={() => setCommandBarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground rounded-lg hover:bg-surface-glass cursor-default outline-none"
          >
            🔍 Rechercher
            <span className="ml-auto text-text-ghost text-[10px]">⌘K</span>
          </ContextMenu.Item>
          <ContextMenu.Separator className="h-px bg-border/30 my-1" />
          <ContextMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground rounded-lg hover:bg-surface-glass cursor-default outline-none"
          >
            📐 Aligner les icônes
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="flex items-center gap-2 px-3 py-2 text-xs text-foreground rounded-lg hover:bg-surface-glass cursor-default outline-none">
              🎨 Fond d'écran
              <span className="ml-auto text-text-ghost">▸</span>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent className="min-w-[140px] bg-surface-deep/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-elevated p-1.5 z-[301]">
                {["default", "midnight", "aurora", "ember"].map(w => (
                  <ContextMenu.Item
                    key={w}
                    onSelect={() => setWallpaper(w)}
                    className={`px-3 py-2 text-xs rounded-lg hover:bg-surface-glass cursor-default outline-none
                      ${wallpaper === w ? "text-primary" : "text-foreground"}`}
                  >
                    {w.charAt(0).toUpperCase() + w.slice(1)}
                  </ContextMenu.Item>
                ))}
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Separator className="h-px bg-border/30 my-1" />
          <ContextMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs text-foreground rounded-lg hover:bg-surface-glass cursor-default outline-none">
            ⚙️ Préférences
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
