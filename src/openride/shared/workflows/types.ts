export type AuthStatus = "anonymous" | "authenticated";

export type AuthVariant = "classic" | "premium";

export type OnboardingStep = "auth" | "setup-profile" | "trust-center" | "complete";

export type TripViewTab = "upcoming" | "past" | "cancelled";

export type TripViewRole = "passenger" | "driver";

export type PaymentMethodId = "card" | "wallet" | "paypal";

export type VerificationState = {
  emailVerified: boolean;
  idVerified: boolean;
  phoneVerified: boolean;
};

export type UserProfile = {
  ageLabel: string;
  bio: string;
  birthDate: string;
  city: string;
  country: string;
  currency: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  firstName: string;
  fullName: string;
  gender: string;
  language: string;
  lastName: string;
  memberSince: string;
  miniRoleLabel: string;
  phone: string;
  rating: number;
  reviewCount: number;
  tripCount: number;
  verification: VerificationState;
};

export type RideDriver = {
  avatar: string;
  memberSince: string;
  name: string;
  rating: number;
  reviewCount: number;
  shortName: string;
  verifiedLabel: string;
  vehicleColor: string;
  vehicleName: string;
};

export type RidePreferences = {
  ambience: string;
  instantBook: boolean;
  luggage: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
};

export type Ride = {
  arrivalDateLabel: string;
  arrivalLocation: string;
  arrivalStation: string;
  arrivalTime: string;
  carImage: string;
  dateLabel: string;
  departureDateLabel: string;
  departureLocation: string;
  departureStation: string;
  departureTime: string;
  distanceLabel: string;
  driver: RideDriver;
  durationLabel: string;
  id: string;
  mapImage: string;
  originCity: string;
  price: number;
  priceLabel: string;
  preferences: RidePreferences;
  routeLabel: string;
  seatsLeft: number;
  seatsTotal: number;
  serviceFee: number;
  taxes: number;
};

export type BookingDraft = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  paymentMethod: PaymentMethodId;
  phone: string;
  rideId: string | null;
  seatCount: number;
};

export type BookingStatus = "confirmed" | "pending" | "cancelled";

export type PaymentStatus = "authorized" | "paid";

export type PassengerTrip = {
  departureLabel: string;
  driverAvatar: string;
  driverName: string;
  id: string;
  kind: TripViewTab;
  passengersLabel: string;
  paymentStatus: PaymentStatus;
  price: number;
  rideId: string;
  routeLabel: string;
  status: BookingStatus;
  vehicleName: string;
};

export type PublishedTrip = {
  departureLabel: string;
  id: string;
  kind: TripViewTab;
  passengersLabel: string;
  price: number;
  rideId: string;
  routeLabel: string;
  seatsAvailable: number;
  status: "draft" | "published";
  vehicleName: string;
};

export type PublishDraft = {
  date: string;
  departure: string;
  destination: string;
  instructions: string;
  luggageAllowed: boolean;
  petsAllowed: boolean;
  price: number;
  seats: number;
  smokingAllowed: boolean;
  time: string;
  vehicleName: string;
};

export type ConversationMessage = {
  attachmentImage?: string;
  attachmentLabel?: string;
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  isOnline: boolean;
  lastMessage: string;
  lastTimestamp: string;
  participantAvatar: string;
  participantName: string;
  participantRoleLabel: string;
  paymentStateLabel: string;
  rideId: string;
  routeLabel: string;
  statusLabel: string;
  unread: boolean;
  messages: ConversationMessage[];
};

export type OpenRideWorkflowState = {
  activeConversationId: string | null;
  authStatus: AuthStatus;
  authVariant: AuthVariant | null;
  bookingDraft: BookingDraft;
  conversations: Conversation[];
  onboardingStep: OnboardingStep;
  passengerTrips: PassengerTrip[];
  profileCompleted: boolean;
  publishDraft: PublishDraft;
  publishedTrips: PublishedTrip[];
  rides: Ride[];
  selectedRideId: string | null;
  trustCompleted: boolean;
  user: UserProfile | null;
};
