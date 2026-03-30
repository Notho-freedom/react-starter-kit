import {
  createContext,
  useCallback,
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
  openRideWorkflowStorageKey,
} from "./seed";
import {
  dbAvailabilityToPost,
  dbBookingToPassengerTrip,
  dbConversationToConversation,
  dbProfileToUserProfile,
  dbRequestToPost,
  dbTripToPublishedTrip,
  dbTripToRide,
} from "./supabaseMappers";
import {
  useCancelAvailability,
  useCancelRideRequest,
  useConversations,
  useCreateConversation,
  useDriverAvailabilities,
  useMessages,
  useMyAvailabilities,
  useMyBookings,
  useMyRequests,
  useMyTrips,
  useProfile,
  useRideRequests,
  useSendMessage,
  useTrips,
} from "@/integrations/supabase/hooks";
import { useAuth } from "@/openride/shared/auth";
import type {
  BookingDraft,
  Conversation,
  ConversationMessage,
  DriverAvailabilityDraft,
  DriverAvailabilityPost,
  MatchContextType,
  MatchSuggestion,
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

type PersistedWorkflowUiState = Pick<
  OpenRideWorkflowState,
  | "activeConversationId"
  | "authVariant"
  | "availabilityDraft"
  | "bookingDraft"
  | "publishDraft"
  | "publishMode"
  | "rideRequestDraft"
  | "searchMode"
  | "selectedRideId"
>;

type OpenRideWorkflowContextValue = {
  activeConversation: Conversation | null;
  availabilityDraft: DriverAvailabilityDraft;
  bookingDraft: BookingDraft;
  cancelAvailability: (availabilityId: string) => void;
  cancelRideRequest: (requestId: string) => void;
  completeBooking: (payload: CompleteBookingPayload) => PassengerTrip | null;
  conversations: Conversation[];
  driverAvailabilities: DriverAvailabilityPost[];
  getDriverRequestMatches: (availabilityId?: string) => MatchSuggestion[];
  getNextRoute: () => string;
  getSearchMatches: (request?: Partial<RiderRequestDraft | RiderRequestPost>) => MatchSuggestion[];
  myDriverAvailabilities: DriverAvailabilityPost[];
  myRideRequests: RiderRequestPost[];
  openConversationForContext: (payload: ConversationContextPayload) => Promise<Conversation | null>;
  openConversationForRide: (rideId: string) => Promise<Conversation | null>;
  passengerTrips: PassengerTrip[];
  profileCompleted: boolean;
  publishDraft: PublishDraft;
  publishMode: PublishMode;
  publishedTrips: PublishedTrip[];
  rideRequestDraft: RiderRequestDraft;
  rideRequests: RiderRequestPost[];
  saveAvailabilityDraft: (payload: Partial<DriverAvailabilityDraft>) => void;
  savePublishDraft: (payload: Partial<PublishDraft>) => void;
  searchMode: SearchMode;
  searchRides: Ride[];
  selectedRide: Ride | null;
  sendMessage: (text: string) => void;
  setActiveConversation: (conversationId: string) => void;
  setPublishMode: (mode: PublishMode) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSelectedRide: (rideId: string) => void;
  trustCompleted: boolean;
  updateBookingDraft: (payload: Partial<BookingDraft>) => void;
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

function getDefaultUiState(): PersistedWorkflowUiState {
  const base = createInitialWorkflowState();

  return {
    activeConversationId: base.activeConversationId,
    authVariant: base.authVariant,
    availabilityDraft: base.availabilityDraft,
    bookingDraft: base.bookingDraft,
    publishDraft: base.publishDraft,
    publishMode: base.publishMode,
    rideRequestDraft: base.rideRequestDraft,
    searchMode: base.searchMode,
    selectedRideId: base.selectedRideId,
  };
}

function getInitialUiState(): PersistedWorkflowUiState {
  if (typeof window === "undefined") {
    return getDefaultUiState();
  }

  const rawState = window.localStorage.getItem(openRideWorkflowStorageKey);
  if (!rawState) {
    return getDefaultUiState();
  }

  try {
    const parsed = JSON.parse(rawState) as Partial<OpenRideWorkflowState>;
    const base = getDefaultUiState();

    return {
      ...base,
      ...parsed,
      availabilityDraft: {
        ...base.availabilityDraft,
        ...parsed.availabilityDraft,
      },
      bookingDraft: {
        ...base.bookingDraft,
        ...parsed.bookingDraft,
      },
      publishDraft: {
        ...base.publishDraft,
        ...parsed.publishDraft,
      },
      rideRequestDraft: {
        ...base.rideRequestDraft,
        ...parsed.rideRequestDraft,
      },
    };
  } catch {
    return getDefaultUiState();
  }
}

function toPersistedWorkflowState(uiState: PersistedWorkflowUiState): OpenRideWorkflowState {
  return {
    ...createInitialWorkflowState(),
    ...uiState,
  };
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

function isUuid(value: string | null | undefined) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(value));
}

function formatMessageTimestamp(isoString: string) {
  if (!isoString) {
    return "";
  }

  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }

    if (diffDays === 1) {
      return "Hier";
    }

    if (diffDays < 7) {
      const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      return days[date.getDay()];
    }

    return `${date.getDate()}/${date.getMonth() + 1}`;
  } catch {
    return "";
  }
}

function mapDbMessage(
  message: Record<string, unknown>,
  currentUserId: string,
): ConversationMessage {
  return {
    attachmentImage:
      typeof message.attachment_url === "string" ? message.attachment_url : undefined,
    attachmentLabel: "Pièce jointe",
    id: String(message.id ?? `message-${Date.now()}`),
    sender: String(message.sender_id ?? "") === currentUserId ? "me" : "them",
    text: String(message.text ?? ""),
    timestamp: formatMessageTimestamp(String(message.created_at ?? "")),
  };
}

function mergeById<T extends { id: string }>(...collections: T[][]) {
  const merged = new Map<string, T>();

  collections.flat().forEach((item) => {
    merged.set(item.id, item);
  });

  return Array.from(merged.values());
}

function getPaymentStateLabel(paymentStatus: PassengerTrip["paymentStatus"]) {
  if (paymentStatus === "cash_pending") {
    return "À payer en cash";
  }

  if (paymentStatus === "authorized") {
    return "Paiement autorisé";
  }

  return "Payé en ligne";
}

function enrichConversation(
  conversation: Conversation,
  rides: Ride[],
  availabilities: DriverAvailabilityPost[],
  requests: RiderRequestPost[],
  bookings: PassengerTrip[],
) {
  if (conversation.contextType === "ride") {
    const ride = rides.find((entry) => entry.id === conversation.rideId);
    const booking = bookings.find((entry) => entry.rideId === conversation.rideId);

    return {
      ...conversation,
      paymentStateLabel: booking
        ? getPaymentStateLabel(booking.paymentStatus)
        : conversation.paymentStateLabel || "Discussion en cours",
      routeLabel: ride?.routeLabel ?? conversation.routeLabel,
      statusLabel: booking ? "Réservation confirmée" : "Trajet planifié",
    };
  }

  if (conversation.contextType === "availability") {
    const availability = availabilities.find((entry) => entry.id === conversation.rideId);

    return {
      ...conversation,
      paymentStateLabel: conversation.paymentStateLabel || "À convenir",
      routeLabel: availability?.routeLabel ?? conversation.routeLabel,
      statusLabel: "Disponibilité active",
    };
  }

  const request = requests.find((entry) => entry.id === conversation.rideId);

  return {
    ...conversation,
    paymentStateLabel: conversation.paymentStateLabel || "Discussion en cours",
    routeLabel: request?.routeLabel ?? conversation.routeLabel,
    statusLabel: "Demande active",
  };
}

export function getNextWorkflowRoute(state: Pick<
  OpenRideWorkflowState,
  "authStatus" | "profileCompleted" | "trustCompleted"
>) {
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
  const [uiState, setUiState] = useState<PersistedWorkflowUiState>(getInitialUiState);
  const [optimisticConversations, setOptimisticConversations] = useState<Record<string, Conversation>>({});
  const [optimisticMessages, setOptimisticMessages] = useState<Record<string, ConversationMessage[]>>({});
  const { user: authUser } = useAuth();
  const profileQuery = useProfile(authUser?.id);
  const publishedTripsQuery = useTrips();
  const myTripsQuery = useMyTrips();
  const myBookingsQuery = useMyBookings();
  const publicAvailabilitiesQuery = useDriverAvailabilities();
  const myAvailabilitiesQuery = useMyAvailabilities();
  const publicRequestsQuery = useRideRequests();
  const myRequestsQuery = useMyRequests();
  const conversationsQuery = useConversations();
  const createConversationMutation = useCreateConversation();
  const sendMessageMutation = useSendMessage();
  const cancelAvailabilityMutation = useCancelAvailability();
  const cancelRideRequestMutation = useCancelRideRequest();

  const authStatus = authUser ? "authenticated" : "anonymous";
  const authMetadata = (authUser?.user_metadata as Record<string, unknown> | undefined) ?? {};
  const fallbackUser = authUser
    ? normalizeUserProfile(defaultUserProfile, {
        email: authUser.email ?? "",
        firstName: String(authMetadata.first_name ?? ""),
        fullName: `${String(authMetadata.first_name ?? "")} ${String(authMetadata.last_name ?? "")}`.trim(),
        lastName: String(authMetadata.last_name ?? ""),
        phone: String(authMetadata.phone ?? ""),
      })
    : null;
  const user = profileQuery.data
    ? dbProfileToUserProfile(profileQuery.data as Record<string, unknown>)
    : fallbackUser;
  const profileCompleted = Boolean((profileQuery.data as Record<string, unknown> | null)?.first_name || user?.firstName);
  const trustCompleted = Boolean(
    (profileQuery.data as Record<string, unknown> | null)?.email_verified &&
      (profileQuery.data as Record<string, unknown> | null)?.phone_verified,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      openRideWorkflowStorageKey,
      JSON.stringify(toPersistedWorkflowState(uiState)),
    );
  }, [uiState]);

  useEffect(() => {
    if (authUser) {
      return;
    }

    setUiState((current) => ({
      ...current,
      activeConversationId: null,
      bookingDraft: defaultBookingDraft(null),
      selectedRideId: null,
    }));
    setOptimisticConversations({});
    setOptimisticMessages({});
  }, [authUser]);

  const searchRides = useMemo(() => {
    const rows = (publishedTripsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows
      .map((row) => dbTripToRide(row))
      .filter((ride) => ride.driverId !== authUser?.id);
  }, [authUser?.id, publishedTripsQuery.data]);

  const myRideDetails = useMemo(() => {
    const rows = (myTripsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => dbTripToRide(row));
  }, [myTripsQuery.data]);

  const passengerRideDetails = useMemo(() => {
    const rows = (myBookingsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows
      .map((row) => row.trip as Record<string, unknown> | undefined)
      .filter((row): row is Record<string, unknown> => Boolean(row))
      .map((row) => dbTripToRide(row));
  }, [myBookingsQuery.data]);

  const allRideDetails = useMemo(
    () => mergeById(searchRides, myRideDetails, passengerRideDetails),
    [myRideDetails, passengerRideDetails, searchRides],
  );

  const passengerTrips = useMemo(() => {
    const rows = (myBookingsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => dbBookingToPassengerTrip(row));
  }, [myBookingsQuery.data]);

  const publishedTrips = useMemo(() => {
    const rows = (myTripsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => dbTripToPublishedTrip(row));
  }, [myTripsQuery.data]);

  const driverAvailabilities = useMemo(() => {
    const rows = (publicAvailabilitiesQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows
      .map((row) => dbAvailabilityToPost(row))
      .filter((availability) => availability.driverId !== authUser?.id);
  }, [authUser?.id, publicAvailabilitiesQuery.data]);

  const myDriverAvailabilities = useMemo(() => {
    const rows = (myAvailabilitiesQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => dbAvailabilityToPost(row));
  }, [myAvailabilitiesQuery.data]);

  const rideRequests = useMemo(() => {
    const rows = (publicRequestsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows
      .map((row) => dbRequestToPost(row))
      .filter((request) => request.passengerId !== authUser?.id);
  }, [authUser?.id, publicRequestsQuery.data]);

  const myRideRequests = useMemo(() => {
    const rows = (myRequestsQuery.data ?? []) as Array<Record<string, unknown>>;
    return rows.map((row) => dbRequestToPost(row));
  }, [myRequestsQuery.data]);

  const selectedRide = useMemo(() => {
    const selectedId = uiState.selectedRideId ?? uiState.bookingDraft.rideId;
    if (selectedId) {
      return allRideDetails.find((ride) => ride.id === selectedId) ?? null;
    }

    return searchRides[0] ?? allRideDetails[0] ?? null;
  }, [allRideDetails, searchRides, uiState.bookingDraft.rideId, uiState.selectedRideId]);

  const baseConversations = useMemo(() => {
    if (!authUser) {
      return [];
    }

    const availabilityIndex = mergeById(driverAvailabilities, myDriverAvailabilities);
    const requestIndex = mergeById(rideRequests, myRideRequests);

    return ((conversationsQuery.data ?? []) as Array<Record<string, unknown>>).map((row) => {
      const latestMessage = row.latest_message
        ? [row.latest_message as Record<string, unknown>]
        : [];

      return enrichConversation(
        dbConversationToConversation(row, latestMessage, authUser.id),
        allRideDetails,
        availabilityIndex,
        requestIndex,
        passengerTrips,
      );
    });
  }, [
    allRideDetails,
    authUser,
    conversationsQuery.data,
    driverAvailabilities,
    myDriverAvailabilities,
    myRideRequests,
    passengerTrips,
    rideRequests,
  ]);

  const inferredActiveConversationId =
    uiState.activeConversationId ??
    baseConversations[0]?.id ??
    Object.keys(optimisticConversations)[0] ??
    null;
  const activeMessagesQuery = useMessages(
    isUuid(inferredActiveConversationId) ? inferredActiveConversationId : undefined,
  );

  useEffect(() => {
    if (!baseConversations.length) {
      return;
    }

    setOptimisticConversations((current) => {
      const next = { ...current };
      let changed = false;

      Object.keys(next).forEach((conversationId) => {
        if (baseConversations.some((conversation) => conversation.id === conversationId)) {
          delete next[conversationId];
          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [baseConversations]);

  useEffect(() => {
    if (!inferredActiveConversationId || !(activeMessagesQuery.data?.length)) {
      return;
    }

    setOptimisticMessages((current) => {
      if (!current[inferredActiveConversationId]?.length) {
        return current;
      }

      const next = { ...current };
      delete next[inferredActiveConversationId];
      return next;
    });
  }, [activeMessagesQuery.data?.length, inferredActiveConversationId]);

  const conversations = useMemo(() => {
    const merged = mergeById(
      baseConversations,
      Object.values(optimisticConversations),
    ).map((conversation) => {
      if (conversation.id !== inferredActiveConversationId) {
        return conversation;
      }

      const activeMessages = (activeMessagesQuery.data ?? []) as Array<Record<string, unknown>>;
      const persistedMessages = authUser
        ? activeMessages.map((message) => mapDbMessage(message, authUser.id))
        : conversation.messages;
      const nextMessages = [
        ...persistedMessages,
        ...(optimisticMessages[conversation.id] ?? []),
      ];
      const lastMessage = nextMessages[nextMessages.length - 1];

      return {
        ...conversation,
        lastMessage: lastMessage?.text ?? conversation.lastMessage,
        lastTimestamp: lastMessage?.timestamp ?? conversation.lastTimestamp,
        messages: nextMessages,
        unread: false,
      };
    });

    return merged;
  }, [
    activeMessagesQuery.data,
    authUser,
    baseConversations,
    inferredActiveConversationId,
    optimisticConversations,
    optimisticMessages,
  ]);

  const activeConversation = useMemo(() => {
    if (!conversations.length) {
      return null;
    }

    if (inferredActiveConversationId) {
      return (
        conversations.find((conversation) => conversation.id === inferredActiveConversationId) ??
        conversations[0]
      );
    }

    return conversations[0];
  }, [conversations, inferredActiveConversationId]);

  const setActiveConversation = useCallback((conversationId: string) => {
    setUiState((current) => ({
      ...current,
      activeConversationId: conversationId,
    }));
  }, []);

  const setSelectedRide = useCallback((rideId: string) => {
    setUiState((current) => ({
      ...current,
      bookingDraft: {
        ...current.bookingDraft,
        rideId,
      },
      selectedRideId: rideId,
    }));
  }, []);

  const setPublishMode = useCallback((mode: PublishMode) => {
    setUiState((current) => ({
      ...current,
      publishMode: mode,
    }));
  }, []);

  const setSearchMode = useCallback((mode: SearchMode) => {
    setUiState((current) => ({
      ...current,
      searchMode: mode,
    }));
  }, []);

  const saveAvailabilityDraft = useCallback((payload: Partial<DriverAvailabilityDraft>) => {
    setUiState((current) => ({
      ...current,
      availabilityDraft: {
        ...current.availabilityDraft,
        ...payload,
      },
    }));
  }, []);

  const savePublishDraft = useCallback((payload: Partial<PublishDraft>) => {
    setUiState((current) => ({
      ...current,
      publishDraft: {
        ...current.publishDraft,
        ...payload,
      },
    }));
  }, []);

  const updateBookingDraft = useCallback((payload: Partial<BookingDraft>) => {
    setUiState((current) => ({
      ...current,
      bookingDraft: {
        ...current.bookingDraft,
        ...payload,
      },
    }));
  }, []);

  const updateRideRequestDraft = useCallback((payload: Partial<RiderRequestDraft>) => {
    setUiState((current) => ({
      ...current,
      rideRequestDraft: {
        ...current.rideRequestDraft,
        ...payload,
      },
    }));
  }, []);

  const getSearchMatches = useCallback(
    (request?: Partial<RiderRequestDraft | RiderRequestPost>) => {
      const query = request ?? uiState.rideRequestDraft;

      const rideMatches = searchRides
        .filter((ride) => requestMatchesRide(query, ride))
        .map(createMatchFromRide);
      const availabilityMatches = driverAvailabilities
        .filter(
          (availability) =>
            availability.kind === "active" && requestMatchesAvailability(query, availability),
        )
        .map(createMatchFromAvailability);

      return [...rideMatches, ...availabilityMatches];
    },
    [driverAvailabilities, searchRides, uiState.rideRequestDraft],
  );

  const getDriverRequestMatches = useCallback(
    (availabilityId?: string) => {
      const availability =
        availabilityId
          ? myDriverAvailabilities.find((entry) => entry.id === availabilityId) ??
            driverAvailabilities.find((entry) => entry.id === availabilityId)
          : null;

      return rideRequests
        .filter(
          (request) =>
            request.kind === "active" &&
            availabilityMatchesRequest(
              availability ?? uiState.availabilityDraft,
              request,
            ),
        )
        .map(createMatchFromRequest);
    },
    [driverAvailabilities, myDriverAvailabilities, rideRequests, uiState.availabilityDraft],
  );

  const findOtherUserId = useCallback(
    (contextType: MatchContextType, contextId: string) => {
      if (contextType === "ride") {
        return allRideDetails.find((ride) => ride.id === contextId)?.driverId ?? null;
      }

      if (contextType === "availability") {
        return (
          myDriverAvailabilities.find((entry) => entry.id === contextId)?.driverId ??
          driverAvailabilities.find((entry) => entry.id === contextId)?.driverId ??
          null
        );
      }

      return (
        myRideRequests.find((entry) => entry.id === contextId)?.passengerId ??
        rideRequests.find((entry) => entry.id === contextId)?.passengerId ??
        null
      );
    },
    [allRideDetails, driverAvailabilities, myDriverAvailabilities, myRideRequests, rideRequests],
  );

  const openConversationForContext = useCallback(
    async (payload: ConversationContextPayload) => {
      const existingConversation = conversations.find(
        (conversation) =>
          conversation.contextType === payload.contextType &&
          conversation.rideId === payload.contextId,
      );

      if (existingConversation) {
        setActiveConversation(existingConversation.id);
        return existingConversation;
      }

      const otherUserId = findOtherUserId(payload.contextType, payload.contextId);

      if (!authUser || !otherUserId) {
        return null;
      }

      const createdConversation = (await createConversationMutation.mutateAsync({
        context_id: payload.contextId,
        context_type: payload.contextType,
        initial_message: payload.initialMessage,
        other_user_id: otherUserId,
        their_role_label: payload.counterpartRoleLabel,
      })) as Record<string, unknown>;
      const conversationId = String(createdConversation.id ?? "");

      if (!conversationId) {
        return null;
      }

      const previewMessages = payload.initialMessage
        ? [
            {
              id: `message-${conversationId}`,
              sender: "me" as const,
              text: payload.initialMessage,
              timestamp: "Maintenant",
            },
          ]
        : [];
      const optimisticConversation: Conversation = {
        contextType: payload.contextType,
        id: conversationId,
        isOnline: payload.isOnline ?? true,
        lastMessage: payload.initialMessage ?? "Discussion démarrée",
        lastTimestamp: "Maintenant",
        messages: previewMessages,
        participantAvatar: payload.counterpartAvatar,
        participantName: payload.counterpartName,
        participantRoleLabel: payload.counterpartRoleLabel,
        paymentStateLabel: payload.paymentStateLabel ?? "Discussion en cours",
        rideId: payload.contextId,
        routeLabel: payload.routeLabel,
        statusLabel: payload.statusLabel ?? "Conversation active",
        unread: false,
      };

      setOptimisticConversations((current) => ({
        ...current,
        [conversationId]: optimisticConversation,
      }));
      setActiveConversation(conversationId);

      return optimisticConversation;
    },
    [authUser, conversations, createConversationMutation, findOtherUserId, setActiveConversation],
  );

  const openConversationForRide = useCallback(
    async (rideId: string) => {
      const ride = allRideDetails.find((entry) => entry.id === rideId);

      if (!ride) {
        return null;
      }

      const booking = passengerTrips.find((entry) => entry.rideId === rideId);

      return openConversationForContext({
        contextId: rideId,
        contextType: "ride",
        counterpartAvatar: ride.driver.avatar,
        counterpartName: ride.driver.name,
        counterpartRoleLabel: "Conducteur",
        paymentStateLabel: booking
          ? getPaymentStateLabel(booking.paymentStatus)
          : "Discussion en cours",
        routeLabel: ride.routeLabel,
        statusLabel: booking ? "Réservation confirmée" : "Trajet planifié",
      });
    },
    [allRideDetails, openConversationForContext, passengerTrips],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const nextText = text.trim();
      const conversationId = activeConversation?.id;

      if (!nextText || !conversationId || !authUser) {
        return;
      }

      const optimisticMessage: ConversationMessage = {
        id: `message-${Date.now()}`,
        sender: "me",
        text: nextText,
        timestamp: "Maintenant",
      };

      setOptimisticMessages((current) => ({
        ...current,
        [conversationId]: [...(current[conversationId] ?? []), optimisticMessage],
      }));

      if (isUuid(conversationId)) {
        sendMessageMutation.mutate({
          conversation_id: conversationId,
          text: nextText,
        });
      }
    },
    [activeConversation?.id, authUser, sendMessageMutation],
  );

  const cancelAvailability = useCallback(
    (availabilityId: string) => {
      cancelAvailabilityMutation.mutate(availabilityId);
    },
    [cancelAvailabilityMutation],
  );

  const cancelRideRequest = useCallback(
    (requestId: string) => {
      cancelRideRequestMutation.mutate(requestId);
    },
    [cancelRideRequestMutation],
  );

  const completeBooking = useCallback(
    (payload: CompleteBookingPayload) => {
      const ride = selectedRide;

      if (!ride) {
        return null;
      }

      const paymentMethod = payload.paymentMethod;
      const paymentStatus =
        paymentMethod === "cash"
          ? "cash_pending"
          : paymentMethod === "wallet"
            ? "authorized"
            : "paid";
      const nextDraft: BookingDraft = {
        ...uiState.bookingDraft,
        ...payload,
        paymentMethod,
        rideId: ride.id,
        seatCount: payload.seatCount ?? uiState.bookingDraft.seatCount,
      };

      setUiState((current) => ({
        ...current,
        bookingDraft: nextDraft,
      }));

      return {
        departureLabel: `${ride.departureDateLabel}, ${ride.departureTime}`,
        driverAvatar: ride.driver.avatar,
        driverName: ride.driver.shortName,
        id: `booking-preview-${ride.id}`,
        kind: "upcoming",
        passengersLabel: `${nextDraft.seatCount}/${ride.seatsTotal}`,
        paymentStatus,
        price: Number((ride.price + ride.serviceFee + ride.taxes).toFixed(2)),
        rideId: ride.id,
        routeLabel: ride.routeLabel,
        status: "confirmed",
        vehicleName: ride.driver.vehicleName,
      };
    },
    [selectedRide, uiState.bookingDraft],
  );

  const getNextRoute = useCallback(
    () =>
      getNextWorkflowRoute({
        authStatus,
        profileCompleted,
        trustCompleted,
      }),
    [authStatus, profileCompleted, trustCompleted],
  );

  const value = useMemo<OpenRideWorkflowContextValue>(
    () => ({
      activeConversation,
      availabilityDraft: uiState.availabilityDraft,
      bookingDraft: uiState.bookingDraft,
      cancelAvailability,
      cancelRideRequest,
      completeBooking,
      conversations,
      driverAvailabilities,
      getDriverRequestMatches,
      getNextRoute,
      getSearchMatches,
      myDriverAvailabilities,
      myRideRequests,
      openConversationForContext,
      openConversationForRide,
      passengerTrips,
      profileCompleted,
      publishDraft: uiState.publishDraft,
      publishMode: uiState.publishMode,
      publishedTrips,
      rideRequestDraft: uiState.rideRequestDraft,
      rideRequests,
      saveAvailabilityDraft,
      savePublishDraft,
      searchMode: uiState.searchMode,
      searchRides,
      selectedRide,
      sendMessage,
      setActiveConversation,
      setPublishMode,
      setSearchMode,
      setSelectedRide,
      trustCompleted,
      updateBookingDraft,
      updateRideRequestDraft,
      user,
    }),
    [
      activeConversation,
      cancelAvailability,
      cancelRideRequest,
      completeBooking,
      conversations,
      driverAvailabilities,
      getDriverRequestMatches,
      getNextRoute,
      getSearchMatches,
      myDriverAvailabilities,
      myRideRequests,
      openConversationForContext,
      openConversationForRide,
      passengerTrips,
      profileCompleted,
      publishedTrips,
      rideRequests,
      saveAvailabilityDraft,
      savePublishDraft,
      searchRides,
      selectedRide,
      sendMessage,
      setActiveConversation,
      setPublishMode,
      setSearchMode,
      setSelectedRide,
      trustCompleted,
      uiState.availabilityDraft,
      uiState.bookingDraft,
      uiState.publishDraft,
      uiState.publishMode,
      uiState.rideRequestDraft,
      uiState.searchMode,
      updateBookingDraft,
      updateRideRequestDraft,
      user,
    ],
  );

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
