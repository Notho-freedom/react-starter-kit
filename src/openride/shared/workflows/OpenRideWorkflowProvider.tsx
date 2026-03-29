import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createInitialWorkflowState,
  defaultAvailabilityDraft,
  defaultBookingDraft,
  defaultUserProfile,
  formatTimeWindow,
  openRideWorkflowStorageKey,
} from "./seed";
import type {
  AuthVariant,
  BookingDraft,
  Conversation,
  DriverAvailabilityDraft,
  DriverAvailabilityPost,
  MatchContextType,
  MatchSuggestion,
  OnboardingStep,
  OpenRideWorkflowState,
  PassengerTrip,
  PaymentMethodId,
  PublishDraft,
  PublishMode,
  PublishedTrip,
  Ride,
  RiderRequestDraft,
  RiderRequestPost,
  SearchMode,
  UserProfile,
} from "./types";

type AuthFormPayload = Partial<
  Pick<UserProfile, "email" | "firstName" | "fullName" | "lastName" | "phone">
>;

type CompleteBookingPayload = Partial<
  Pick<BookingDraft, "email" | "firstName" | "lastName" | "message" | "phone">
> & {
  paymentMethod: PaymentMethodId;
  seatCount?: number;
};

type ConversationContextPayload = {
  contextId: string;
  contextType: MatchContextType;
  counterpartAvatar: string;
  counterpartName: string;
  counterpartRoleLabel: string;
  initialMessage?: string;
  isOnline?: boolean;
  paymentStateLabel?: string;
  routeLabel: string;
  statusLabel?: string;
};

type OpenRideWorkflowContextValue = {
  activeConversation: Conversation | null;
  availabilityDraft: DriverAvailabilityDraft;
  bookingDraft: BookingDraft;
  cancelAvailability: (availabilityId: string) => void;
  cancelRideRequest: (requestId: string) => void;
  completeBooking: (payload: CompleteBookingPayload) => PassengerTrip | null;
  completeSetupProfile: (payload: Partial<UserProfile>) => void;
  completeTrustCenter: () => void;
  conversations: Conversation[];
  createRideRequest: (payload: Partial<RiderRequestDraft>) => RiderRequestPost;
  driverAvailabilities: DriverAvailabilityPost[];
  getDriverRequestMatches: (availabilityId?: string) => MatchSuggestion[];
  getNextRoute: () => string;
  getSearchMatches: (request?: Partial<RiderRequestDraft | RiderRequestPost>) => MatchSuggestion[];
  isAuthenticated: boolean;
  login: (variant: AuthVariant, payload?: AuthFormPayload) => string;
  logout: () => void;
  onboardingStep: OnboardingStep;
  openConversationForContext: (payload: ConversationContextPayload) => Conversation | null;
  openConversationForRide: (rideId: string) => Conversation | null;
  passengerTrips: PassengerTrip[];
  profileCompleted: boolean;
  publishAvailability: (payload: Partial<DriverAvailabilityDraft>) => DriverAvailabilityPost;
  publishDraft: PublishDraft;
  publishMode: PublishMode;
  publishTrip: (payload: Partial<PublishDraft>) => PublishedTrip;
  publishedTrips: PublishedTrip[];
  rideRequestDraft: RiderRequestDraft;
  rideRequests: RiderRequestPost[];
  saveAvailabilityDraft: (payload: Partial<DriverAvailabilityDraft>) => void;
  savePublishDraft: (payload: Partial<PublishDraft>) => void;
  searchMode: SearchMode;
  searchRides: OpenRideWorkflowState["rides"];
  selectedRide: Ride | null;
  sendMessage: (text: string) => void;
  setActiveConversation: (conversationId: string) => void;
  setPublishMode: (mode: PublishMode) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSelectedRide: (rideId: string) => void;
  signup: (variant: AuthVariant, payload?: AuthFormPayload) => string;
  trustCompleted: boolean;
  updateBookingDraft: (payload: Partial<BookingDraft>) => void;
  updateProfile: (payload: Partial<UserProfile>) => void;
  updateRideRequestDraft: (payload: Partial<RiderRequestDraft>) => void;
  user: UserProfile | null;
};

const OpenRideWorkflowContext = createContext<OpenRideWorkflowContextValue | null>(null);

function normalizeUserProfile(
  current: UserProfile | null,
  payload: Partial<UserProfile>,
): UserProfile {
  const base = current ?? defaultUserProfile;
  const firstName = payload.firstName ?? base.firstName;
  const lastName = payload.lastName ?? base.lastName;

  return {
    ...base,
    ...payload,
    firstName,
    fullName: payload.fullName ?? `${firstName} ${lastName}`.trim(),
    lastName,
  };
}

function getInitialWorkflowState(): OpenRideWorkflowState {
  if (typeof window === "undefined") {
    return createInitialWorkflowState();
  }

  const rawState = window.localStorage.getItem(openRideWorkflowStorageKey);

  if (!rawState) {
    return createInitialWorkflowState();
  }

  try {
    return {
      ...createInitialWorkflowState(),
      ...JSON.parse(rawState),
    } as OpenRideWorkflowState;
  } catch {
    return createInitialWorkflowState();
  }
}

function normalizeText(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function areDatesCompatible(a?: string | null, b?: string | null) {
  if (!a || !b) {
    return true;
  }

  return a === b;
}

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

function isTimeInsideWindow(value: string, start?: string, end?: string) {
  const time = timeToMinutes(value);
  const startMinutes = start ? timeToMinutes(start) : null;
  const endMinutes = end ? timeToMinutes(end) : null;

  if (time === null) {
    return true;
  }

  if (startMinutes === null && endMinutes === null) {
    return true;
  }

  if (startMinutes !== null && time < startMinutes) {
    return false;
  }

  if (endMinutes !== null && time > endMinutes) {
    return false;
  }

  return true;
}

function doWindowsOverlap(aStart?: string, aEnd?: string, bStart?: string, bEnd?: string) {
  const safeAStart = timeToMinutes(aStart ?? "") ?? 0;
  const safeAEnd = timeToMinutes(aEnd ?? "") ?? 24 * 60;
  const safeBStart = timeToMinutes(bStart ?? "") ?? 0;
  const safeBEnd = timeToMinutes(bEnd ?? "") ?? 24 * 60;

  return safeAStart <= safeBEnd && safeBStart <= safeAEnd;
}

function splitRouteLabel(routeLabel: string) {
  const [origin, destination] = routeLabel.split("→").map((part) => part.trim());
  return {
    destination: destination ?? "",
    origin: origin ?? "",
  };
}

function buildRequestRouteLabel(origin: string, destination: string) {
  return `${origin || "Départ"} → ${destination || "Arrivée"}`;
}

function buildAvailabilityRouteLabel(zone: string) {
  return `Disponible depuis ${zone || "votre zone"}`;
}

function requestMatchesRide(query: Partial<RiderRequestDraft | RiderRequestPost>, ride: Ride) {
  const origin = normalizeText("origin" in query ? query.origin : "");
  const destination = normalizeText("destination" in query ? query.destination : "");
  const route = splitRouteLabel(ride.routeLabel);
  const rideOrigin = normalizeText(ride.originCity || route.origin);
  const rideDestination = normalizeText(ride.arrivalLocation || route.destination);

  const originMatches = !origin || rideOrigin.includes(origin) || origin.includes(rideOrigin);
  const destinationMatches =
    !destination ||
    rideDestination.includes(destination) ||
    destination.includes(rideDestination);
  const timeMatches = isTimeInsideWindow(
    ride.departureTime,
    "startTime" in query ? query.startTime : undefined,
    "endTime" in query ? query.endTime : undefined,
  );

  return originMatches && destinationMatches && timeMatches;
}

function requestMatchesAvailability(
  query: Partial<RiderRequestDraft | RiderRequestPost>,
  availability: DriverAvailabilityPost,
) {
  const origin = normalizeText("origin" in query ? query.origin : "");
  const zone = normalizeText(availability.zone);
  const zoneMatches = !origin || zone.includes(origin) || origin.includes(zone);
  const dateMatches = areDatesCompatible(
    "date" in query ? query.date : undefined,
    availability.date,
  );
  const [availabilityStart, availabilityEnd] = availability.timeWindow
    .split("-")
    .map((part) => part.trim());
  const timeMatches = doWindowsOverlap(
    "startTime" in query ? query.startTime : undefined,
    "endTime" in query ? query.endTime : undefined,
    availabilityStart,
    availabilityEnd,
  );

  return zoneMatches && dateMatches && timeMatches;
}

function availabilityMatchesRequest(
  availability: Partial<DriverAvailabilityDraft> | DriverAvailabilityPost,
  request: RiderRequestPost,
) {
  const zone = normalizeText("zone" in availability ? availability.zone : "");
  const origin = normalizeText(request.origin);
  const zoneMatches = !zone || origin.includes(zone) || zone.includes(origin);
  const dateMatches = areDatesCompatible(
    "date" in availability ? availability.date : undefined,
    request.date,
  );
  const start = "startTime" in availability ? availability.startTime : undefined;
  const end = "endTime" in availability ? availability.endTime : undefined;
  const [requestStart, requestEnd] = request.timeWindow.split("-").map((part) => part.trim());
  const timeMatches = doWindowsOverlap(start, end, requestStart, requestEnd);

  return zoneMatches && dateMatches && timeMatches;
}

function createMatchFromRide(ride: Ride): MatchSuggestion {
  return {
    contextId: ride.id,
    contextType: "ride",
    counterpartAvatar: ride.driver.avatar,
    counterpartName: ride.driver.shortName,
    counterpartRoleLabel: "Conducteur",
    id: `match-ride-${ride.id}`,
    metaLabel: `${ride.seatsLeft} places • ${ride.driver.vehicleName}`,
    priceLabel: ride.priceLabel,
    routeLabel: ride.routeLabel,
    secondaryLabel: `${ride.departureDateLabel}, ${ride.departureTime}`,
    statusLabel: ride.preferences.instantBook ? "Réservation instantanée" : "Trajet planifié",
    title: ride.driver.shortName,
  };
}

function createMatchFromAvailability(availability: DriverAvailabilityPost): MatchSuggestion {
  return {
    contextId: availability.id,
    contextType: "availability",
    counterpartAvatar: availability.driverAvatar,
    counterpartName: availability.driverName,
    counterpartRoleLabel: "Conducteur disponible",
    id: `match-availability-${availability.id}`,
    metaLabel: `${availability.seats} places • ${availability.vehicleName}`,
    priceLabel: "À convenir",
    routeLabel: availability.routeLabel,
    secondaryLabel: `${availability.date} • ${availability.timeWindow}`,
    statusLabel: "Disponible à la demande",
    title: availability.driverName,
  };
}

function createMatchFromRequest(request: RiderRequestPost): MatchSuggestion {
  return {
    contextId: request.id,
    contextType: "request",
    counterpartAvatar: request.passengerAvatar,
    counterpartName: request.passengerName,
    counterpartRoleLabel: "Passager",
    id: `match-request-${request.id}`,
    metaLabel: `${request.seatCount} place${request.seatCount > 1 ? "s" : ""}`,
    routeLabel: request.routeLabel,
    secondaryLabel: `${request.date} • ${request.timeWindow}`,
    statusLabel: "Demande active",
    title: request.passengerName,
  };
}

export function getNextWorkflowRoute(state: OpenRideWorkflowState) {
  if (state.authStatus !== "authenticated") {
    return "/auth";
  }

  if (!state.profileCompleted) {
    return "/setup-profile";
  }

  if (!state.trustCompleted) {
    return "/trust-center";
  }

  return "/search-results";
}

type OpenRideWorkflowProviderProps = {
  children: ReactNode;
};

export function OpenRideWorkflowProvider({ children }: OpenRideWorkflowProviderProps) {
  const [state, setState] = useState<OpenRideWorkflowState>(getInitialWorkflowState);

  useEffect(() => {
    window.localStorage.setItem(openRideWorkflowStorageKey, JSON.stringify(state));
  }, [state]);

  const value = useMemo<OpenRideWorkflowContextValue>(() => {
    const selectedRide =
      state.rides.find((ride) => ride.id === state.selectedRideId) ?? state.rides[0] ?? null;
    const activeConversation =
      state.conversations.find((conversation) => conversation.id === state.activeConversationId) ??
      null;

    const updateProfile = (payload: Partial<UserProfile>) => {
      setState((current) => ({
        ...current,
        user: normalizeUserProfile(current.user, payload),
      }));
    };

    const setSelectedRide = (rideId: string) => {
      setState((current) => ({
        ...current,
        bookingDraft: {
          ...current.bookingDraft,
          rideId,
        },
        selectedRideId: rideId,
      }));
    };

    const updateBookingDraft = (payload: Partial<BookingDraft>) => {
      setState((current) => ({
        ...current,
        bookingDraft: {
          ...current.bookingDraft,
          ...payload,
        },
      }));
    };

    const setPublishMode = (mode: PublishMode) => {
      setState((current) => ({
        ...current,
        publishMode: mode,
      }));
    };

    const setSearchMode = (mode: SearchMode) => {
      setState((current) => ({
        ...current,
        searchMode: mode,
      }));
    };

    const savePublishDraft = (payload: Partial<PublishDraft>) => {
      setState((current) => ({
        ...current,
        publishDraft: {
          ...current.publishDraft,
          ...payload,
        },
      }));
    };

    const saveAvailabilityDraft = (payload: Partial<DriverAvailabilityDraft>) => {
      setState((current) => ({
        ...current,
        availabilityDraft: {
          ...current.availabilityDraft,
          ...payload,
        },
      }));
    };

    const updateRideRequestDraft = (payload: Partial<RiderRequestDraft>) => {
      setState((current) => ({
        ...current,
        rideRequestDraft: {
          ...current.rideRequestDraft,
          ...payload,
        },
      }));
    };

    const login = (variant: AuthVariant, payload?: AuthFormPayload) => {
      let nextRoute = "/search-results";

      setState((current) => {
        const nextUser = normalizeUserProfile(current.user, payload ?? {});
        const nextState: OpenRideWorkflowState = {
          ...current,
          authStatus: "authenticated",
          authVariant: variant,
          user: nextUser,
        };
        nextRoute = getNextWorkflowRoute(nextState);
        return nextState;
      });

      return nextRoute;
    };

    const signup = (variant: AuthVariant, payload?: AuthFormPayload) => {
      const firstName = payload?.firstName?.trim() || "New";
      const lastName = payload?.lastName?.trim() || "Member";
      const nextUser = normalizeUserProfile(defaultUserProfile, {
        ...payload,
        email: payload?.email?.trim() || defaultUserProfile.email,
        firstName,
        fullName: `${firstName} ${lastName}`.trim(),
        lastName,
        miniRoleLabel: "Nouvel utilisateur",
        phone: payload?.phone?.trim() || defaultUserProfile.phone,
        reviewCount: 0,
        tripCount: 0,
        verification: {
          emailVerified: false,
          idVerified: false,
          phoneVerified: false,
        },
      });

      setState((current) => ({
        ...current,
        activeConversationId: null,
        authStatus: "authenticated",
        authVariant: variant,
        bookingDraft: defaultBookingDraft(current.selectedRideId ?? current.rides[0]?.id ?? null),
        conversations: [],
        onboardingStep: "setup-profile",
        passengerTrips: [],
        profileCompleted: false,
        publishedTrips: [],
        trustCompleted: false,
        user: nextUser,
      }));

      return "/setup-profile";
    };

    const completeSetupProfile = (payload: Partial<UserProfile>) => {
      setState((current) => ({
        ...current,
        onboardingStep: "trust-center",
        profileCompleted: true,
        user: normalizeUserProfile(current.user, payload),
      }));
    };

    const completeTrustCenter = () => {
      setState((current) => ({
        ...current,
        onboardingStep: "complete",
        trustCompleted: true,
        user: current.user
          ? {
              ...current.user,
              verification: {
                ...current.user.verification,
                emailVerified: true,
                phoneVerified: true,
              },
            }
          : current.user,
      }));
    };

    const publishTrip = (payload: Partial<PublishDraft>) => {
      let publishedTrip: PublishedTrip = {
        departureLabel: "Aujourd'hui, 08:00",
        id: `published-${Date.now()}`,
        kind: "upcoming",
        passengersLabel: "3 places restantes",
        price: 35,
        rideId: `published-${Date.now()}`,
        routeLabel: "Paris → Lyon",
        seatsAvailable: 3,
        status: "published",
        vehicleName: "Peugeot 3008",
      };

      setState((current) => {
        const nextDraft = {
          ...current.publishDraft,
          ...payload,
        };

        publishedTrip = {
          departureLabel:
            nextDraft.date && nextDraft.time
              ? `${nextDraft.date}, ${nextDraft.time}`
              : "Départ à confirmer",
          id: `published-${Date.now()}`,
          kind: "upcoming",
          passengersLabel: `${nextDraft.seats} places restantes`,
          price: nextDraft.price,
          rideId: `ride-published-${Date.now()}`,
          routeLabel: `${nextDraft.departure || "Départ"} → ${nextDraft.destination || "Arrivée"}`,
          seatsAvailable: nextDraft.seats,
          status: "published",
          vehicleName: nextDraft.vehicleName,
        };

        return {
          ...current,
          publishDraft: nextDraft,
          publishedTrips: [publishedTrip, ...current.publishedTrips],
        };
      });

      return publishedTrip;
    };

    const publishAvailability = (payload: Partial<DriverAvailabilityDraft>) => {
      let publishedAvailability: DriverAvailabilityPost = {
        date: state.availabilityDraft.date || "2026-03-30",
        driverAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
        driverName: state.user?.fullName || "Conducteur OpenRide",
        driverRating: state.user?.rating ?? 4.8,
        id: `availability-${Date.now()}`,
        kind: "active",
        notes: state.availabilityDraft.notes,
        routeLabel: buildAvailabilityRouteLabel(state.availabilityDraft.zone),
        seats: state.availabilityDraft.seats,
        timeWindow: formatTimeWindow(
          state.availabilityDraft.startTime,
          state.availabilityDraft.endTime,
        ),
        vehicleName: state.availabilityDraft.vehicleName,
        zone: state.availabilityDraft.zone,
      };

      setState((current) => {
        const nextDraft = {
          ...current.availabilityDraft,
          ...payload,
        };

        publishedAvailability = {
          date: nextDraft.date || "2026-03-30",
          driverAvatar:
            "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
          driverName: current.user?.fullName || "Conducteur OpenRide",
          driverRating: current.user?.rating ?? 4.8,
          id: `availability-${Date.now()}`,
          kind: "active",
          notes: nextDraft.notes,
          routeLabel: buildAvailabilityRouteLabel(nextDraft.zone),
          seats: nextDraft.seats,
          timeWindow: formatTimeWindow(nextDraft.startTime, nextDraft.endTime),
          vehicleName: nextDraft.vehicleName,
          zone: nextDraft.zone,
        };

        return {
          ...current,
          availabilityDraft: nextDraft,
          driverAvailabilities: [publishedAvailability, ...current.driverAvailabilities],
        };
      });

      return publishedAvailability;
    };

    const createRideRequest = (payload: Partial<RiderRequestDraft>) => {
      let requestPost: RiderRequestPost = {
        date: state.rideRequestDraft.date || "2026-03-30",
        destination: state.rideRequestDraft.destination,
        id: `request-${Date.now()}`,
        kind: "active",
        notes: state.rideRequestDraft.notes,
        origin: state.rideRequestDraft.origin,
        passengerAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
        passengerName: state.user?.fullName || "Passager OpenRide",
        routeLabel: buildRequestRouteLabel(
          state.rideRequestDraft.origin,
          state.rideRequestDraft.destination,
        ),
        seatCount: state.rideRequestDraft.seatCount,
        timeWindow: formatTimeWindow(
          state.rideRequestDraft.startTime,
          state.rideRequestDraft.endTime,
        ),
      };

      setState((current) => {
        const nextDraft = {
          ...current.rideRequestDraft,
          ...payload,
        };

        requestPost = {
          date: nextDraft.date || "2026-03-30",
          destination: nextDraft.destination,
          id: `request-${Date.now()}`,
          kind: "active",
          notes: nextDraft.notes,
          origin: nextDraft.origin,
          passengerAvatar:
            "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
          passengerName: current.user?.fullName || "Passager OpenRide",
          routeLabel: buildRequestRouteLabel(nextDraft.origin, nextDraft.destination),
          seatCount: nextDraft.seatCount,
          timeWindow: formatTimeWindow(nextDraft.startTime, nextDraft.endTime),
        };

        return {
          ...current,
          rideRequestDraft: nextDraft,
          rideRequests: [requestPost, ...current.rideRequests],
        };
      });

      return requestPost;
    };

    const cancelRideRequest = (requestId: string) => {
      setState((current) => ({
        ...current,
        rideRequests: current.rideRequests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                kind: "cancelled",
              }
            : request,
        ),
      }));
    };

    const cancelAvailability = (availabilityId: string) => {
      setState((current) => ({
        ...current,
        driverAvailabilities: current.driverAvailabilities.map((availability) =>
          availability.id === availabilityId
            ? {
                ...availability,
                kind: "cancelled",
              }
            : availability,
        ),
      }));
    };

    const setActiveConversation = (conversationId: string) => {
      setState((current) => ({
        ...current,
        activeConversationId: conversationId,
        conversations: current.conversations.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                unread: false,
              }
            : conversation,
        ),
      }));
    };

    const openConversationForContext = (payload: ConversationContextPayload) => {
      const existingConversation = state.conversations.find(
        (conversation) =>
          conversation.contextType === payload.contextType &&
          conversation.rideId === payload.contextId,
      );

      if (existingConversation) {
        setActiveConversation(existingConversation.id);
        return existingConversation;
      }

      const newConversation: Conversation = {
        contextType: payload.contextType,
        id: `conversation-${payload.contextType}-${payload.contextId}`,
        isOnline: payload.isOnline ?? true,
        lastMessage:
          payload.initialMessage ?? "Bonjour ! Je suis intéressé par cette annonce.",
        lastTimestamp: "Maintenant",
        messages: [
          {
            id: `message-${Date.now()}`,
            sender: "them",
            text: payload.initialMessage ?? "Bonjour ! Je suis intéressé par cette annonce.",
            timestamp: "Maintenant",
          },
        ],
        participantAvatar: payload.counterpartAvatar,
        participantName: payload.counterpartName,
        participantRoleLabel: payload.counterpartRoleLabel,
        paymentStateLabel: payload.paymentStateLabel ?? "À définir",
        rideId: payload.contextId,
        routeLabel: payload.routeLabel,
        statusLabel: payload.statusLabel ?? "En discussion",
        unread: false,
      };

      setState((current) => ({
        ...current,
        activeConversationId: newConversation.id,
        conversations: [newConversation, ...current.conversations],
      }));

      return newConversation;
    };

    const openConversationForRide = (rideId: string) => {
      const ride = state.rides.find((entry) => entry.id === rideId) ?? selectedRide;

      if (!ride) {
        return null;
      }

      return openConversationForContext({
        contextId: ride.id,
        contextType: "ride",
        counterpartAvatar: ride.driver.avatar,
        counterpartName: ride.driver.name,
        counterpartRoleLabel: "Conducteur",
        initialMessage: "Bonjour ! Votre réservation est bien enregistrée.",
        isOnline: true,
        paymentStateLabel: "Payé en ligne",
        routeLabel: ride.routeLabel,
        statusLabel: "Confirmée",
      });
    };

    const getSearchMatches = (request?: Partial<RiderRequestDraft | RiderRequestPost>) => {
      const query = {
        ...state.rideRequestDraft,
        ...request,
      };

      const rideMatches = state.rides
        .filter((ride) => requestMatchesRide(query, ride))
        .map(createMatchFromRide);
      const availabilityMatches = state.driverAvailabilities
        .filter(
          (availability) =>
            availability.kind === "active" && requestMatchesAvailability(query, availability),
        )
        .map(createMatchFromAvailability);

      return [...rideMatches, ...availabilityMatches];
    };

    const getDriverRequestMatches = (availabilityId?: string) => {
      return state.rideRequests
        .filter(
          (request) =>
            request.kind === "active" &&
            availabilityMatchesRequest(
              availabilityId
                ? state.driverAvailabilities.find((entry) => entry.id === availabilityId) ??
                    defaultAvailabilityDraft
                : state.availabilityDraft,
              request,
            ),
        )
        .map(createMatchFromRequest);
    };

    const completeBooking = (payload: CompleteBookingPayload) => {
      const ride =
        state.rides.find((entry) => entry.id === state.bookingDraft.rideId) ?? selectedRide;

      if (!ride) {
        return null;
      }

      let nextTrip: PassengerTrip | null = null;

      setState((current) => {
        const paymentMethod = payload.paymentMethod;
        const paymentStatus =
          paymentMethod === "cash"
            ? "cash_pending"
            : paymentMethod === "wallet"
              ? "authorized"
              : "paid";
        const paymentStateLabel =
          paymentMethod === "cash"
            ? "À payer en cash"
            : paymentMethod === "wallet"
              ? "Autorisé"
              : "Payé en ligne";
        const initialMessage =
          paymentMethod === "cash"
            ? "Bonjour ! Réservation confirmée, paiement en cash au départ."
            : "Bonjour ! Votre réservation est bien enregistrée.";
        const nextDraft: BookingDraft = {
          ...current.bookingDraft,
          ...payload,
          paymentMethod,
          rideId: ride.id,
          seatCount: payload.seatCount ?? current.bookingDraft.seatCount,
        };
        const existingConversation = current.conversations.find(
          (conversation) => conversation.contextType === "ride" && conversation.rideId === ride.id,
        );
        const nextConversation =
          existingConversation ??
          ({
            contextType: "ride",
            id: `conversation-ride-${ride.id}`,
            isOnline: true,
            lastMessage: initialMessage,
            lastTimestamp: "Maintenant",
            participantAvatar: ride.driver.avatar,
            participantName: ride.driver.name,
            participantRoleLabel: "Conducteur",
            paymentStateLabel,
            rideId: ride.id,
            routeLabel: ride.routeLabel,
            statusLabel: "Confirmée",
            unread: false,
            messages: [
              {
                id: `message-${Date.now()}`,
                sender: "them",
                text: initialMessage,
                timestamp: "Maintenant",
              },
            ],
          } satisfies Conversation);

        nextTrip = {
          departureLabel: `${ride.departureDateLabel}, ${ride.departureTime}`,
          driverAvatar: ride.driver.avatar,
          driverName: ride.driver.shortName,
          id: `booking-${Date.now()}`,
          kind: "upcoming",
          passengersLabel: `${nextDraft.seatCount}/${ride.seatsTotal}`,
          paymentStatus,
          price: Number((ride.price + ride.serviceFee + ride.taxes).toFixed(2)),
          rideId: ride.id,
          routeLabel: ride.routeLabel,
          status: "confirmed",
          vehicleName: ride.driver.vehicleName,
        };

        return {
          ...current,
          activeConversationId: nextConversation.id,
          bookingDraft: nextDraft,
          conversations: existingConversation
            ? current.conversations.map((conversation) =>
                conversation.id === existingConversation.id
                  ? {
                      ...conversation,
                      lastMessage: initialMessage,
                      lastTimestamp: "Maintenant",
                      paymentStateLabel,
                      statusLabel: "Confirmée",
                      unread: false,
                    }
                  : conversation,
              )
            : [nextConversation, ...current.conversations],
          passengerTrips: nextTrip
            ? [nextTrip, ...current.passengerTrips]
            : current.passengerTrips,
        };
      });

      return nextTrip;
    };

    const sendMessage = (text: string) => {
      const nextText = text.trim();

      if (!nextText || !state.activeConversationId) {
        return;
      }

      setState((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === current.activeConversationId
            ? {
                ...conversation,
                lastMessage: nextText,
                lastTimestamp: "Maintenant",
                messages: [
                  ...conversation.messages,
                  {
                    id: `message-${Date.now()}`,
                    sender: "me",
                    text: nextText,
                    timestamp: "Maintenant",
                  },
                ],
              }
            : conversation,
        ),
      }));
    };

    const logout = () => {
      setState((current) => ({
        ...current,
        authStatus: "anonymous",
        authVariant: null,
      }));
    };

    return {
      activeConversation,
      availabilityDraft: state.availabilityDraft,
      bookingDraft: state.bookingDraft,
      cancelAvailability,
      cancelRideRequest,
      completeBooking,
      completeSetupProfile,
      completeTrustCenter,
      conversations: state.conversations,
      createRideRequest,
      driverAvailabilities: state.driverAvailabilities,
      getDriverRequestMatches,
      getNextRoute: () => getNextWorkflowRoute(state),
      getSearchMatches,
      isAuthenticated: state.authStatus === "authenticated",
      login,
      logout,
      onboardingStep: state.onboardingStep,
      openConversationForContext,
      openConversationForRide,
      passengerTrips: state.passengerTrips,
      profileCompleted: state.profileCompleted,
      publishAvailability,
      publishDraft: state.publishDraft,
      publishMode: state.publishMode,
      publishTrip,
      publishedTrips: state.publishedTrips,
      rideRequestDraft: state.rideRequestDraft,
      rideRequests: state.rideRequests,
      saveAvailabilityDraft,
      savePublishDraft,
      searchMode: state.searchMode,
      searchRides: state.rides,
      selectedRide,
      sendMessage,
      setActiveConversation,
      setPublishMode,
      setSearchMode,
      setSelectedRide,
      signup,
      trustCompleted: state.trustCompleted,
      updateBookingDraft,
      updateProfile,
      updateRideRequestDraft,
      user: state.user,
    };
  }, [state]);

  return (
    <OpenRideWorkflowContext.Provider value={value}>
      {children}
    </OpenRideWorkflowContext.Provider>
  );
}

export function useOpenRideWorkflow() {
  const context = useContext(OpenRideWorkflowContext);

  if (!context) {
    throw new Error("useOpenRideWorkflow must be used within OpenRideWorkflowProvider");
  }

  return context;
}
