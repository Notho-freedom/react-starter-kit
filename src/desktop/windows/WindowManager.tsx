import { useDesktopState } from "../../hooks/useDesktopState";
import { WindowFrame } from "./WindowFrame";
import { getAppRegistry } from "../../apps/AppRegistry";

export function WindowManager() {
  const { windows } = useDesktopState();
  const apps = getAppRegistry();

  return (
    <>
      {windows.filter(w => !w.isMinimized).map(win => {
        const app = apps.find(a => a.id === win.appId);
        if (!app) return null;
        const AppComponent = app.component;
        return (
          <WindowFrame key={win.id} windowState={win}>
            <AppComponent windowId={win.id} />
          </WindowFrame>
        );
      })}
    </>
  );
}
