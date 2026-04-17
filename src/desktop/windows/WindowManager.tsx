import { AnimatePresence } from "framer-motion";
import { useDesktopState } from "../../hooks/useDesktopState";
import { CognitiveWindow } from "@/components/cognitive/CognitiveWindow";
import { getAppRegistry } from "../../apps/AppRegistry";

export function WindowManager() {
  const { windows } = useDesktopState();
  const apps = getAppRegistry();

  return (
    <AnimatePresence>
      {windows.filter(w => !w.isMinimized).map(win => {
        const app = apps.find(a => a.id === win.appId);
        if (!app) return null;
        const AppComponent = app.component;
        return (
          <CognitiveWindow key={win.id} windowState={win}>
            <AppComponent windowId={win.id} />
          </CognitiveWindow>
        );
      })}
    </AnimatePresence>
  );
}
