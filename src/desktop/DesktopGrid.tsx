import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import type { AppDefinition } from "./windows/types";

export function DesktopGrid() {
  const apps = getAppRegistry().filter(a => a.showOnDesktop !== false);
  const { openWindow } = useWindowManager();

  const handleDblClick = (app: AppDefinition) => {
    openWindow(app.id, app.name, {
      width: app.defaultWidth,
      height: app.defaultHeight,
      minWidth: app.minWidth,
      minHeight: app.minHeight,
    });
  };

  return (
    <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-[5]">
      {apps.map(app => (
        <button
          key={app.id}
          onDoubleClick={() => handleDblClick(app)}
          className="flex flex-col items-center gap-1 w-20 p-2 rounded-lg
            hover:bg-surface-glass/40 transition-colors group cursor-default"
        >
          <div className="w-12 h-12 rounded-xl bg-surface-glass/50 border border-border/20 flex items-center justify-center
            group-hover:bg-surface-elevated group-hover:border-border/40 transition-all text-2xl">
            {app.icon}
          </div>
          <span className="text-[10px] text-text-secondary group-hover:text-foreground transition-colors text-center leading-tight">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
}
