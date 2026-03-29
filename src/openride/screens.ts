import authHtml from "@/openRuide UI/auth_files.html?raw";
import trustCenterHtml from "@/openRuide UI/dashboard (Find a Ride)_files.html?raw";
import tripDetailsHtml from "@/openRuide UI/Détails du Trajet.html?raw";
import myTripsHtml from "@/openRuide UI/Mes Trajets_files.html?raw";
import messagesHtml from "@/openRuide UI/Messages_files.html?raw";
import paymentBookingHtml from "@/openRuide UI/Paiement & Réservation_files.html?raw";
import profileSettingsHtml from "@/openRuide UI/Profil & Paramètres.html?raw";
import publishTripHtml from "@/openRuide UI/Publier un Trajet_files.html?raw";
import searchResultsHtml from "@/openRuide UI/Résultats de Recherche_files.html?raw";
import authenticationHubHtml from "@/openRuide UI/Set up your profile_files.html?raw";
import setupProfileHtml from "@/openRuide UI/Trust Center_files.html?raw";
import { parseOpenRideHtml } from "./parseOpenRideHtml";

export type OpenRideScreenId =
  | "searchResults"
  | "publishTrip"
  | "messages"
  | "myTrips"
  | "tripDetails"
  | "paymentBooking"
  | "profileSettings"
  | "auth"
  | "authenticationHub"
  | "setupProfile"
  | "trustCenter";

type MobileMenuPreset = "surface" | "surfaceLight";

export type OpenRideScreen = ReturnType<typeof createScreen>;

function createScreen(config: {
  heading: string;
  id: OpenRideScreenId;
  mobileMenuPreset?: MobileMenuPreset;
  rawHtml: string;
}) {
  return {
    ...config,
    ...parseOpenRideHtml(config.rawHtml),
  };
}

export const openRideScreens = {
  searchResults: createScreen({
    id: "searchResults",
    heading: "Résultats de Recherche",
    mobileMenuPreset: "surface",
    rawHtml: searchResultsHtml,
  }),
  publishTrip: createScreen({
    id: "publishTrip",
    heading: "Publier un Trajet",
    mobileMenuPreset: "surface",
    rawHtml: publishTripHtml,
  }),
  messages: createScreen({
    id: "messages",
    heading: "Messages",
    mobileMenuPreset: "surface",
    rawHtml: messagesHtml,
  }),
  myTrips: createScreen({
    id: "myTrips",
    heading: "Mes Trajets",
    mobileMenuPreset: "surfaceLight",
    rawHtml: myTripsHtml,
  }),
  tripDetails: createScreen({
    id: "tripDetails",
    heading: "Détails du Trajet",
    mobileMenuPreset: "surface",
    rawHtml: tripDetailsHtml,
  }),
  paymentBooking: createScreen({
    id: "paymentBooking",
    heading: "Paiement & Réservation",
    mobileMenuPreset: "surface",
    rawHtml: paymentBookingHtml,
  }),
  profileSettings: createScreen({
    id: "profileSettings",
    heading: "Profil & Paramètres",
    mobileMenuPreset: "surfaceLight",
    rawHtml: profileSettingsHtml,
  }),
  auth: createScreen({
    id: "auth",
    heading: "Login",
    rawHtml: authHtml,
  }),
  authenticationHub: createScreen({
    id: "authenticationHub",
    heading: "Welcome back",
    rawHtml: authenticationHubHtml,
  }),
  setupProfile: createScreen({
    id: "setupProfile",
    heading: "Set up your profile",
    rawHtml: setupProfileHtml,
  }),
  trustCenter: createScreen({
    id: "trustCenter",
    heading: "Trust Center",
    rawHtml: trustCenterHtml,
  }),
} as const;
