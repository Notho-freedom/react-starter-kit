import { DesktopBackground } from "./DesktopBackground";
import { DesktopTopBar } from "./DesktopTopBar";
import { DesktopDock } from "./DesktopDock";
import { DesktopGrid } from "./DesktopGrid";
import { DesktopCommandBar } from "./DesktopCommandBar";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { WindowManager } from "./windows/WindowManager";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export function DesktopShell() {
  useKeyboardShortcuts();

  return (
    <DesktopContextMenu>
      <div className="relative w-screen h-screen overflow-hidden select-none">
        <DesktopBackground />
        <DesktopTopBar />
        <div className="absolute inset-0 top-10 bottom-[72px] z-10">
          <DesktopGrid />
          <WindowManager />
        </div>
        <DesktopDock />
        <DesktopCommandBar />
      </div>
    </DesktopContextMenu>
  );
}
