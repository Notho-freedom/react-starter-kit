import { DesktopStateProvider } from "./hooks/useDesktopState";
import { DesktopShell } from "./desktop/DesktopShell";
import { Toaster } from "sonner";

export default function App() {
  return (
    <DesktopStateProvider>
      <DesktopShell />
      <Toaster position="top-right" theme="dark" />
    </DesktopStateProvider>
  );
}
