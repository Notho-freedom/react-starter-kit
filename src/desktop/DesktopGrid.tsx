import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";
import type { AppDefinition } from "./windows/types";
import { CognitiveIcon } from "@/components/cognitive/CognitiveIcon";

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
    <div className="absolute top-6 left-6 grid grid-cols-1 gap-5 z-[5]">
      {apps.map(app => (
        <CognitiveIcon
          key={app.id}
          glyph={<span>{app.icon}</span>}
          label={app.name}
          size="lg"
          onDoubleClick={() => handleDblClick(app)}
        />
      ))}
    </div>
  );
}
