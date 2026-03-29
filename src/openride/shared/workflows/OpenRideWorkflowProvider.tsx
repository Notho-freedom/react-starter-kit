import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  conversationsSeed,
  createInitialWorkflowState,
  defaultBookingDraft,
  defaultUserProfile,
  openRideWorkflowStorageKey,
} from "./seed";
import type {
  AuthVariant,
  BookingDraft,
  Conversation,
  OnboardingStep,
  OpenRideWorkflowState,
  PassengerTrip,
  PaymentMethodId,
  PublishDraft,
  PublishedTrip,
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

type OpenRideWorkflowContextValue = {
  activeConversation: Conversation | null;
  bookingDraft: BookingDraft;
  completeBooking: (payload: CompleteBookingPayload) => PassengerTrip | null;
  completeSetupProfile: (payload: Partial<UserProfile>) => void;
  completeTrustCenter: () => void;
  conversations: Conversation[];
  getNextRoute: () => string;
  isAuthenticated: boolean;
  login: (variant: AuthVariant, payload?: AuthFormPayload) => string;
  logout: () => void;
  openConversationForRide: (rideId: string) => Conversation | null;
  onboardingStep: OnboardingStep;
  passengerTrips: PassengerTrip[];
  profileCompleted: boolean;
  publishDraft: PublishDraft;
  publishTrip: (payload: Partial<PublishDraft>) => PublishedTrip;
  publishedTrips: PublishedTrip[];
  savePublishDraft: (payload: Partial<PublishDraft>) => void;
  searchRides: OpenRideWorkflowState["rides"];
  selectedRide: OpenRideWorkflowState["rides"][number] | null;
  sendMessage: (text: string) => void;
  setActiveConversation: (conversationId: string) => void;
  setSelectedRide: (rideId: string) => void;
  signup: (variant: AuthVariant, payload?: AuthFormPayload) => string;
  trustCompleted: boolean;
  updateBookingDraft: (payload: Partial<BookingDraft>) => void;
  updateProfile: (payload: Partial<UserProfile>) => void;
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

    const savePublishDraft = (payload: Partial<PublishDraft>) => {
      setState((current) => ({
        ...current,
        publishDraft: {
          ...current.publishDraft,
          ...payload,
        },
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
          departureLabel: nextDraft.date && nextDraft.time
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

    const openConversationForRide = (rideId: string) => {
      const ride = state.rides.find((entry) => entry.id === rideId) ?? selectedRide;

      if (!ride) {
        return null;
      }

      const existingConversation = state.conversations.find(
        (conversation) => conversation.rideId === ride.id,
      );

      if (existingConversation) {
        setActiveConversation(existingConversation.id);
        return existingConversation;
      }

      const newConversation: Conversation = {
        id: `conversation-${ride.id}`,
        isOnline: true,
        lastMessage: "Bonjour ! Votre réservation est bien enregistrée.",
        lastTimestamp: "Maintenant",
        participantAvatar: ride.driver.avatar,
        participantName: ride.driver.name,
        participantRoleLabel: "Conducteur",
        paymentStateLabel: "Payé en ligne",
        rideId: ride.id,
        routeLabel: ride.routeLabel,
        statusLabel: "Confirmée",
        unread: false,
        messages: [
          {
            id: `message-${Date.now()}`,
            sender: "them",
            text: "Bonjour ! Votre réservation est bien enregistrée.",
            timestamp: "Maintenant",
          },
        ],
      };

      setState((current) => ({
        ...current,
        activeConversationId: newConversation.id,
        conversations: [newConversation, ...current.conversations],
      }));

      return newConversation;
    };

    const completeBooking = (payload: CompleteBookingPayload) => {
      const ride = state.rides.find((entry) => entry.id === state.bookingDraft.rideId) ?? selectedRide;

      if (!ride) {
        return null;
      }

      let nextTrip: PassengerTrip | null = null;

      setState((current) => {
        const nextDraft: BookingDraft = {
          ...current.bookingDraft,
          ...payload,
          paymentMethod: payload.paymentMethod,
          rideId: ride.id,
          seatCount: payload.seatCount ?? current.bookingDraft.seatCount,
        };
        const existingConversation = current.conversations.find(
          (conversation) => conversation.rideId === ride.id,
        );
        const nextConversation =
          existingConversation ??
          ({
            id: `conversation-${ride.id}`,
            isOnline: true,
            lastMessage: "Bonjour ! Votre réservation est bien enregistrée.",
            lastTimestamp: "Maintenant",
            participantAvatar: ride.driver.avatar,
            participantName: ride.driver.name,
            participantRoleLabel: "Conducteur",
            paymentStateLabel: "Payé en ligne",
            rideId: ride.id,
            routeLabel: ride.routeLabel,
            statusLabel: "Confirmée",
            unread: false,
            messages: [
              {
                id: `message-${Date.now()}`,
                sender: "them",
                text: "Bonjour ! Votre réservation est bien enregistrée.",
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
          paymentStatus: "paid",
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
                      lastMessage: nextConversation.lastMessage,
                      lastTimestamp: nextConversation.lastTimestamp,
                      unread: false,
                    }
                  : conversation,
              )
            : [nextConversation, ...current.conversations],
          passengerTrips: nextTrip ? [nextTrip, ...current.passengerTrips] : current.passengerTrips,
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
      bookingDraft: state.bookingDraft,
      completeBooking,
      completeSetupProfile,
      completeTrustCenter,
      conversations: state.conversations,
      getNextRoute: () => getNextWorkflowRoute(state),
      isAuthenticated: state.authStatus === "authenticated",
      login,
      logout,
      openConversationForRide,
      onboardingStep: state.onboardingStep,
      passengerTrips: state.passengerTrips,
      profileCompleted: state.profileCompleted,
      publishDraft: state.publishDraft,
      publishTrip,
      publishedTrips: state.publishedTrips,
      savePublishDraft,
      searchRides: state.rides,
      selectedRide,
      sendMessage,
      setActiveConversation,
      setSelectedRide,
      signup,
      trustCompleted: state.trustCompleted,
      updateBookingDraft,
      updateProfile,
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
