import type { LucideIcon } from "lucide-react";
import { CirclePlus, MessageSquare, Route, Search, User } from "lucide-react";

export type DashboardNavKey = "searchResults" | "publishTrip" | "messages" | "myTrips" | "profileSettings";

export type DashboardNavItem = {
  badge?: string;
  icon: LucideIcon;
  key: DashboardNavKey;
  label: string;
  path: string;
  section: "account" | "main";
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    key: "searchResults",
    label: "Accueil (Recherche)",
    path: "/search-results",
    section: "main",
    icon: Search,
  },
  {
    key: "publishTrip",
    label: "Publier un Trajet",
    path: "/publish-trip",
    section: "main",
    icon: CirclePlus,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/messages",
    section: "main",
    icon: MessageSquare,
    badge: "3",
  },
  {
    key: "myTrips",
    label: "Mes Trajets",
    path: "/my-trips",
    section: "main",
    icon: Route,
  },
  {
    key: "profileSettings",
    label: "Profil & Paramètres",
    path: "/profile-settings",
    section: "account",
    icon: User,
  },
];
