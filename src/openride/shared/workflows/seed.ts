import type {
  BookingDraft,
  DriverAvailabilityDraft,
  OpenRideWorkflowState,
  PublishDraft,
  RiderRequestDraft,
  UserProfile,
} from "./types";

export function formatTimeWindow(startTime: string, endTime: string) {
  if (startTime && endTime) {
    return `${startTime} - ${endTime}`;
  }

  if (startTime) {
    return `À partir de ${startTime}`;
  }

  if (endTime) {
    return `Jusqu'à ${endTime}`;
  }

  return "Horaire flexible";
}

export const defaultUserProfile: UserProfile = {
  ageLabel: "",
  bio: "",
  birthDate: "",
  city: "",
  country: "France",
  currency: "EUR (€)",
  email: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  firstName: "",
  fullName: "",
  gender: "",
  language: "French",
  lastName: "",
  memberSince: new Date().getFullYear().toString(),
  miniRoleLabel: "Nouvel utilisateur",
  phone: "",
  rating: 5.0,
  reviewCount: 0,
  tripCount: 0,
  verification: {
    emailVerified: false,
    idVerified: false,
    phoneVerified: false,
  },
};

export const defaultBookingDraft = (rideId: string | null): BookingDraft => ({
  email: "",
  firstName: "",
  lastName: "",
  message: "",
  paymentMethod: "card",
  phone: "",
  rideId,
  seatCount: 1,
});

export const defaultPublishDraft: PublishDraft = {
  date: "",
  departure: "",
  destination: "",
  instructions: "",
  luggageAllowed: true,
  petsAllowed: false,
  price: 35,
  seats: 3,
  smokingAllowed: false,
  time: "",
  vehicleName: "",
};

export const defaultAvailabilityDraft: DriverAvailabilityDraft = {
  date: "",
  endTime: "18:00",
  notes: "",
  seats: 3,
  startTime: "08:00",
  vehicleName: "",
  zone: "",
};

export const defaultRideRequestDraft: RiderRequestDraft = {
  date: "",
  destination: "",
  notes: "",
  origin: "",
  seatCount: 1,
  startTime: "08:00",
  endTime: "18:00",
};

export const openRideWorkflowStorageKey = "openride.workflow";

export function createInitialWorkflowState(): OpenRideWorkflowState {
  return {
    activeConversationId: null,
    authStatus: "anonymous",
    authVariant: null,
    availabilityDraft: defaultAvailabilityDraft,
    bookingDraft: defaultBookingDraft(null),
    conversations: [],
    driverAvailabilities: [],
    onboardingStep: "auth",
    passengerTrips: [],
    profileCompleted: false,
    publishDraft: defaultPublishDraft,
    publishMode: "planned-ride",
    publishedTrips: [],
    rideRequestDraft: defaultRideRequestDraft,
    rideRequests: [],
    rides: [],
    searchMode: "find-rides",
    selectedRideId: null,
    trustCompleted: false,
    user: null,
  };
}
