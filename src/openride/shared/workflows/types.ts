export type AuthStatus = "anonymous" | "authenticated";

export type AuthVariant = "classic" | "premium";

export type OnboardingStep = "auth" | "setup-profile" | "trust-center" | "complete";

export type TripViewTab = "upcoming" | "past" | "cancelled";

export type TripViewRole = "passenger" | "driver";

export type PublishMode = "planned-ride" | "availability";

export type SearchMode = "find-rides" | "post-request";

export type MyTripsCollection = "bookings" | "requests" | "trips" | "availabilities";

export type MyTripsStatusTab = "upcoming" | "past" | "cancelled" | "active" | "fulfilled";

export type PaymentMethodId = "card" | "wallet" | "paypal" | "cash";

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
  departureLat?: number;
  departureLng?: number;
  departureLocation: string;
  departureStation: string;
  departureTime: string;
  distanceLabel: string;
  driver: RideDriver;
  driverId?: string;
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
  destinationLat?: number;
  destinationLng?: number;
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

export type PaymentStatus = "authorized" | "paid" | "cash_pending";

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

export type DriverAvailabilityStatus = "active" | "fulfilled" | "cancelled";

export type RiderRequestStatus = "active" | "fulfilled" | "cancelled";

export type DriverAvailabilityDraft = {
  date: string;
  endTime: string;
  notes: string;
  seats: number;
  startTime: string;
  vehicleName: string;
  zone: string;
};

export type DriverAvailabilityPost = {
  date: string;
  driverAvatar: string;
  driverId?: string;
  driverName: string;
  driverRating: number;
  id: string;
  kind: DriverAvailabilityStatus;
  notes: string;
  routeLabel: string;
  seats: number;
  timeWindow: string;
  vehicleName: string;
  zone: string;
};

export type RiderRequestDraft = {
  date: string;
  destination: string;
  notes: string;
  origin: string;
  seatCount: number;
  startTime: string;
  endTime: string;
};

export type RiderRequestPost = {
  date: string;
  destination: string;
  id: string;
  kind: RiderRequestStatus;
  notes: string;
  origin: string;
  passengerAvatar: string;
  passengerId?: string;
  passengerName: string;
  routeLabel: string;
  seatCount: number;
  timeWindow: string;
};

export type MatchContextType = "ride" | "availability" | "request";

export type MatchSuggestion = {
  contextId: string;
  contextType: MatchContextType;
  counterpartAvatar: string;
  counterpartName: string;
  counterpartRoleLabel: string;
  id: string;
  metaLabel: string;
  priceLabel?: string;
  routeLabel: string;
  secondaryLabel: string;
  statusLabel: string;
  title: string;
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
  contextType: MatchContextType;
  id: string;
  isOnline: boolean;
  lastMessage: string;
  lastTimestamp: string;
  messages: ConversationMessage[];
  participantAvatar: string;
  participantName: string;
  participantRoleLabel: string;
  paymentStateLabel: string;
  rideId: string;
  routeLabel: string;
  statusLabel: string;
  unread: boolean;
};

export type OpenRideWorkflowState = {
  activeConversationId: string | null;
  authStatus: AuthStatus;
  authVariant: AuthVariant | null;
  availabilityDraft: DriverAvailabilityDraft;
  bookingDraft: BookingDraft;
  conversations: Conversation[];
  driverAvailabilities: DriverAvailabilityPost[];
  onboardingStep: OnboardingStep;
  passengerTrips: PassengerTrip[];
  profileCompleted: boolean;
  publishDraft: PublishDraft;
  publishMode: PublishMode;
  publishedTrips: PublishedTrip[];
  rideRequestDraft: RiderRequestDraft;
  rideRequests: RiderRequestPost[];
  rides: Ride[];
  searchMode: SearchMode;
  selectedRideId: string | null;
  trustCompleted: boolean;
  user: UserProfile | null;
};
