export const openRideThemeStorageKey = "openride.theme";

export type OpenRideThemeId =
  | "default"
  | "search"
  | "dashboard"
  | "profile"
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
    id: "auth-light",
    label: "Auth clair",
    description: "Palette lumineuse et douce pour une interface aérée.",
    className: "openride-theme-auth-light",
    previewColors: ["#F4F7F6", "#FFFFFF", "#88E2C6", "#45B894"],
  },
  {
    id: "auth-dark",
    label: "Auth sombre",
    description: "Palette sombre violette avec contraste fort.",
    className: "openride-theme-auth-dark",
    previewColors: ["#0F172A", "#1E293B", "#A855F7", "#FFFFFF"],
  },
  {
    id: "setup-light",
    label: "Setup clair",
    description: "Fond clair avec accents violets et surfaces nettes.",
    className: "openride-theme-setup-light",
    previewColors: ["#F1F5F9", "#FFFFFF", "#A855F7", "#0F172A"],
  },
  {
    id: "trust-dark",
    label: "Trust sombre",
    description: "Palette institutionnelle sombre pour les écrans de confiance.",
    className: "openride-theme-trust-dark",
    previewColors: ["#0F172A", "#334155", "#A855F7", "#94A3B8"],
  },
];

export const openRideThemeMap = new Map(
  openRideThemes.map((theme) => [theme.id, theme] as const),
);

export function isOpenRideThemeId(value: string): value is OpenRideThemeId {
  return openRideThemeMap.has(value as OpenRideThemeId);
}

export function getOpenRideTheme(themeId: OpenRideThemeId) {
  return openRideThemeMap.get(themeId) ?? openRideThemes[0];
}

export function resolveOpenRideThemeId(value: string | null | undefined): OpenRideThemeId {
  return value && isOpenRideThemeId(value) ? value : "default";
}
