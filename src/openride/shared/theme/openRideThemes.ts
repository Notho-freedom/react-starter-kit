export const openRideThemeStorageKey = "openride.theme";

export type OpenRideThemeId =
  | "default"
  | "search"
  | "dashboard"
  | "profile"
  | "white";

export type OpenRideFixedThemeId =
  | "auth-light"
  | "auth-dark"
  | "setup-light"
  | "trust-dark";

export type OpenRideThemeDefinition = {
  className: string;
  description: string;
  id: OpenRideThemeId;
  label: string;
  previewColors: string[];
};

export const openRideThemes: OpenRideThemeDefinition[] = [
  {
    id: "default",
    label: "Neutre",
    description: "Palette OpenRide par défaut, sombre et équilibrée.",
    className: "openride-theme-default",
    previewColors: ["#0F1115", "#1C1F26", "#A3F0A3", "#F3F4F6"],
  },
  {
    id: "search",
    label: "Recherche",
    description: "Version plus froide avec accents violets pour l'exploration.",
    className: "openride-theme-search",
    previewColors: ["#0B0F19", "#111827", "#8B5CF6", "#F59E0B"],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Ambiance sombre avec accents verts pour l'action.",
    className: "openride-theme-dashboard",
    previewColors: ["#0F1115", "#2A2D35", "#A3F0A3", "#F5EA6C"],
  },
  {
    id: "profile",
    label: "Profil",
    description: "Noir profond avec accent violet plus prononcé.",
    className: "openride-theme-profile",
    previewColors: ["#0A0B10", "#1E212B", "#8B5CF6", "#22C55E"],
  },
  {
    id: "white",
    label: "White",
    description: "Palette claire premium, plus nette et plus lumineuse pour toute l'app.",
    className: "openride-theme-white",
    previewColors: ["#F7F4EE", "#FFFFFF", "#1E40AF", "#22C55E"],
  },
];

export const openRideThemeMap = new Map(
  openRideThemes.map((theme) => [theme.id, theme] as const),
);

export const openRideFixedThemeClasses: Record<OpenRideFixedThemeId, string> = {
  "auth-light": "openride-theme-auth-light",
  "auth-dark": "openride-theme-auth-dark",
  "setup-light": "openride-theme-setup-light",
  "trust-dark": "openride-theme-trust-dark",
};

export function isOpenRideThemeId(value: string): value is OpenRideThemeId {
  return openRideThemeMap.has(value as OpenRideThemeId);
}

export function getOpenRideTheme(themeId: OpenRideThemeId) {
  return openRideThemeMap.get(themeId) ?? openRideThemes[0];
}

export function resolveOpenRideThemeId(value: string | null | undefined): OpenRideThemeId {
  if (!value) {
    return "default";
  }

  if (value === "auth-light" || value === "setup-light") {
    return "white";
  }

  if (value === "auth-dark" || value === "trust-dark") {
    return "default";
  }

  return isOpenRideThemeId(value) ? value : "default";
}
