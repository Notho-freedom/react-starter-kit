import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getOpenRideTheme,
  openRideThemeStorageKey,
  openRideThemes,
  resolveOpenRideThemeId,
  type OpenRideThemeDefinition,
  type OpenRideThemeId,
} from "./openRideThemes";

type OpenRideThemeContextValue = {
  setTheme: (themeId: OpenRideThemeId) => void;
  theme: OpenRideThemeDefinition;
  themeId: OpenRideThemeId;
  themes: OpenRideThemeDefinition[];
};

const OpenRideThemeContext = createContext<OpenRideThemeContextValue | null>(null);

function getInitialThemeId() {
  if (typeof window === "undefined") {
    return "default" as OpenRideThemeId;
  }

  return resolveOpenRideThemeId(window.localStorage.getItem(openRideThemeStorageKey));
}

type OpenRideThemeProviderProps = {
  children: ReactNode;
};

export function OpenRideThemeProvider({ children }: OpenRideThemeProviderProps) {
  const [themeId, setThemeId] = useState<OpenRideThemeId>(getInitialThemeId);

  useEffect(() => {
    window.localStorage.setItem(openRideThemeStorageKey, themeId);
  }, [themeId]);

  const value = useMemo<OpenRideThemeContextValue>(
    () => ({
      themeId,
      setTheme: setThemeId,
      theme: getOpenRideTheme(themeId),
      themes: openRideThemes,
    }),
    [themeId],
  );

  return (
    <OpenRideThemeContext.Provider value={value}>
      {children}
    </OpenRideThemeContext.Provider>
  );
}

export function useOpenRideTheme() {
  const context = useContext(OpenRideThemeContext);

  if (!context) {
    throw new Error("useOpenRideTheme must be used within OpenRideThemeProvider");
  }

  return context;
}
