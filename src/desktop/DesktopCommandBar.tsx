import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { useDesktopState } from "../hooks/useDesktopState";
import { getAppRegistry } from "../apps/AppRegistry";
import { useWindowManager } from "./windows/useWindowManager";

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
    <CommandDialog open={commandBarOpen} onOpenChange={setCommandBarOpen}>
      <CommandInput placeholder="Rechercher une application, commande…" />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup heading="Applications">
          {apps.map(app => (
            <CommandItem key={app.id} onSelect={() => launch(app)} className="flex items-center gap-3">
              <span className="text-lg">{app.icon}</span>
              <div>
                <p className="text-sm font-medium">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.description}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
