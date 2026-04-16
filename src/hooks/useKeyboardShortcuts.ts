import { useEffect } from "react";
import { useDesktopState } from "./useDesktopState";

export function useKeyboardShortcuts() {
  const { setCommandBarOpen } = useDesktopState();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandBarOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandBarOpen]);
}
