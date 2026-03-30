import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppRoutes from "@/AppRoutes";
import { openRideThemeStorageKey } from "@/openride/shared/theme";

const mockRuntime = vi.hoisted(() => {
  const COMPLETE_USER_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const NEEDS_PROFILE_USER_ID = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const NEEDS_TRUST_USER_ID = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
  const DRIVER_USER_ID = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
  const FLEX_DRIVER_USER_ID = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";

  type AuthUser = {
    email: string;
    id: string;
    user_metadata?: Record<string, unknown>;
  };

  type StoreConversation = {
    context_id: string;
    context_type: "availability" | "request" | "ride";
    created_at: string;
    id: string;
    participants: Array<{ role_label: string; user_id: string }>;
  };

  type StoreMessage = {
    attachment_url?: string;
    conversation_id: string;
    created_at: string;
    id: string;
    sender_id: string;
    text: string;
  };

  type StoreShape = {
    bookings: Array<Record<string, unknown>>;
    conversations: StoreConversation[];
    driverAvailabilities: Array<Record<string, unknown>>;
    messages: Record<string, StoreMessage[]>;
    profiles: Record<string, Record<string, unknown>>;
    rideRequests: Array<Record<string, unknown>>;
    trips: Array<Record<string, unknown>>;
    usersByEmail: Record<string, AuthUser>;
  };

  const authListeners = new Set<() => void>();
  const dataListeners = new Set<() => void>();
  let authVersion = 0;
  let dataVersion = 0;
  let idCounter = 100;

  const createUser = (
    id: string,
    email: string,
    metadata?: Record<string, unknown>,
  ): AuthUser => ({
    email,
    id,
    user_metadata: metadata,
  });

  const nowIso = "2026-03-30T08:00:00.000Z";

  const createBaseStore = (): StoreShape => {
    const usersByEmail: Record<string, AuthUser> = {
      "premium@example.com": createUser(COMPLETE_USER_ID, "premium@example.com", {
        first_name: "Lina",
        last_name: "Richards",
      }),
      "newbie@example.com": createUser(NEEDS_PROFILE_USER_ID, "newbie@example.com"),
      "verify@example.com": createUser(NEEDS_TRUST_USER_ID, "verify@example.com", {
        first_name: "Nadia",
        last_name: "Miles",
      }),
      "driver@example.com": createUser(DRIVER_USER_ID, "driver@example.com", {
        first_name: "Marc",
        last_name: "Tremblay",
      }),
      "flex@example.com": createUser(FLEX_DRIVER_USER_ID, "flex@example.com", {
        first_name: "Zoé",
        last_name: "Nguyen",
      }),
    };

    return {
      bookings: [],
      conversations: [],
      driverAvailabilities: [
        {
          created_at: nowIso,
          date: "2026-04-05",
          driver_id: FLEX_DRIVER_USER_ID,
          end_time: "18:00:00",
          id: "22222222-2222-4222-8222-222222222222",
          notes: "Je peux me déplacer dans la région selon votre besoin.",
          seats: 2,
          start_time: "09:00:00",
          status: "active",
          vehicle_name: "Honda Civic",
          zone: "Gatineau",
        },
      ],
      messages: {},
      profiles: {
        [COMPLETE_USER_ID]: {
          avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
          bio: "Conductrice flexible entre Montréal et l'Outaouais.",
          city: "Montréal",
          country: "Canada",
          created_at: "2024-01-15T00:00:00.000Z",
          currency: "CAD ($)",
          email: "premium@example.com",
          email_verified: true,
          first_name: "Lina",
          id: COMPLETE_USER_ID,
          id_verified: true,
          language: "Français",
          last_name: "Richards",
          phone: "+1 514 555 0101",
          phone_verified: true,
          rating: 4.8,
          review_count: 124,
          trip_count: 45,
        },
        [NEEDS_PROFILE_USER_ID]: {
          avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
          city: "Cornwall",
          country: "Canada",
          created_at: "2026-03-25T00:00:00.000Z",
          currency: "CAD ($)",
          email: "newbie@example.com",
          email_verified: false,
          first_name: "",
          id: NEEDS_PROFILE_USER_ID,
          id_verified: false,
          language: "Français",
          last_name: "",
          phone: "",
          phone_verified: false,
          rating: 5,
          review_count: 0,
          trip_count: 0,
        },
        [NEEDS_TRUST_USER_ID]: {
          avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
          city: "Ottawa",
          country: "Canada",
          created_at: "2025-11-10T00:00:00.000Z",
          currency: "CAD ($)",
          email: "verify@example.com",
          email_verified: false,
          first_name: "Nadia",
          id: NEEDS_TRUST_USER_ID,
          id_verified: false,
          language: "Français",
          last_name: "Miles",
          phone: "+1 613 555 0202",
          phone_verified: false,
          rating: 4.9,
          review_count: 18,
          trip_count: 6,
        },
        [DRIVER_USER_ID]: {
          avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
          city: "Montréal",
          country: "Canada",
          created_at: "2024-05-12T00:00:00.000Z",
          currency: "CAD ($)",
          email: "driver@example.com",
          email_verified: true,
          first_name: "Marc",
          id: DRIVER_USER_ID,
          id_verified: true,
          language: "Français",
          last_name: "Tremblay",
          phone: "+1 438 555 0303",
          phone_verified: true,
          rating: 4.9,
          review_count: 58,
          trip_count: 31,
        },
        [FLEX_DRIVER_USER_ID]: {
          avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
          city: "Gatineau",
          country: "Canada",
          created_at: "2024-09-08T00:00:00.000Z",
          currency: "CAD ($)",
          email: "flex@example.com",
          email_verified: true,
          first_name: "Zoé",
          id: FLEX_DRIVER_USER_ID,
          id_verified: true,
          language: "Français",
          last_name: "Nguyen",
          phone: "+1 819 555 0404",
          phone_verified: true,
          rating: 4.7,
          review_count: 27,
          trip_count: 12,
        },
      },
      rideRequests: [],
      trips: [
        {
          created_at: nowIso,
          date: "2026-04-05",
          departure: "Montréal",
          departure_lat: 45.5017,
          departure_lng: -73.5673,
          destination: "Ottawa",
          destination_lat: 45.4215,
          destination_lng: -75.6972,
          driver_id: DRIVER_USER_ID,
          id: "11111111-1111-4111-8111-111111111111",
          luggage_allowed: true,
          pets_allowed: false,
          price: 42,
          seats_left: 2,
          seats_total: 3,
          smoking_allowed: false,
          status: "published",
          time: "10:00:00",
          vehicle_color: "Bleu",
          vehicle_name: "Toyota Prius",
        },
      ],
      usersByEmail,
    };
  };

  let store = createBaseStore();
  let authState: { loading: boolean; session: null; user: AuthUser | null } = {
    loading: false,
    session: null,
    user: null,
  };

  const notifyAuth = () => {
    authVersion += 1;
    authListeners.forEach((listener) => listener());
  };

  const notifyData = () => {
    dataVersion += 1;
    dataListeners.forEach((listener) => listener());
  };

  const nextUuid = () => {
    idCounter += 1;
    return `00000000-0000-4000-8000-${String(idCounter).padStart(12, "0")}`;
  };

  const getProfile = (userId?: string) => (userId ? store.profiles[userId] ?? null : null);

  const ensureProfile = (user: AuthUser) => {
    if (!store.profiles[user.id]) {
      store.profiles[user.id] = {
        avatar_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
        city: "Montréal",
        country: "Canada",
        created_at: nowIso,
        currency: "CAD ($)",
        email: user.email,
        email_verified: false,
        first_name: String(user.user_metadata?.first_name ?? ""),
        id: user.id,
        id_verified: false,
        language: "Français",
        last_name: String(user.user_metadata?.last_name ?? ""),
        phone: String(user.user_metadata?.phone ?? ""),
        phone_verified: false,
        rating: 5,
        review_count: 0,
        trip_count: 0,
      };
    }

    return store.profiles[user.id];
  };

  const currentUser = () => authState.user;

  const attachDriver = (trip: Record<string, unknown>) => ({
    ...trip,
    driver: store.profiles[String(trip.driver_id)] ?? null,
  });

  const attachAvailabilityDriver = (availability: Record<string, unknown>) => ({
    ...availability,
    driver: store.profiles[String(availability.driver_id)] ?? null,
  });

  const attachPassenger = (request: Record<string, unknown>) => ({
    ...request,
    passenger: store.profiles[String(request.passenger_id)] ?? null,
  });

  const attachBookingTrip = (booking: Record<string, unknown>) => ({
    ...booking,
    trip: attachDriver(
      store.trips.find((trip) => trip.id === booking.ride_id) ?? {},
    ),
  });

  const getConversationRows = (userId: string) =>
    store.conversations
      .filter((conversation) =>
        conversation.participants.some((participant) => participant.user_id === userId),
      )
      .map((conversation) => {
        const latestMessage = [...(store.messages[conversation.id] ?? [])].sort((a, b) =>
          a.created_at.localeCompare(b.created_at),
        ).at(-1) ?? null;

        return {
          ...conversation,
          latest_message: latestMessage,
          participants: conversation.participants.map((participant) => ({
            ...participant,
            profile: store.profiles[participant.user_id] ?? null,
          })),
        };
      });

  const reset = () => {
    store = createBaseStore();
    authState = { loading: false, session: null, user: null };
    authVersion += 1;
    dataVersion += 1;
  };

  const authenticateAs = (kind: "complete" | "needs-profile" | "needs-trust") => {
    authState = {
      loading: false,
      session: null,
      user:
        kind === "complete"
          ? store.usersByEmail["premium@example.com"]
          : kind === "needs-profile"
            ? store.usersByEmail["newbie@example.com"]
            : store.usersByEmail["verify@example.com"],
    };
    notifyAuth();
    notifyData();
  };

  const signIn = async (email: string) => {
    const existingUser =
      store.usersByEmail[email] ??
      createUser(nextUuid(), email, {
        first_name: "Utilisateur",
        last_name: "OpenRide",
      });

    store.usersByEmail[email] = existingUser;
    authState = { loading: false, session: null, user: existingUser };

    if (!store.profiles[existingUser.id] && email !== "newbie@example.com") {
      ensureProfile(existingUser);
    }

    notifyAuth();
    notifyData();

    return { error: null };
  };

  const signUp = async (
    email: string,
    _password: string,
    metadata?: Record<string, string>,
  ) => {
    const createdUser = createUser(nextUuid(), email, metadata);
    store.usersByEmail[email] = createdUser;
    authState = { loading: false, session: null, user: createdUser };
    notifyAuth();
    notifyData();
    return { error: null };
  };

  const signOut = async () => {
    authState = { loading: false, session: null, user: null };
    notifyAuth();
    notifyData();
  };

  const updateProfile = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const updated = {
      ...ensureProfile(user),
      ...payload,
      email: String(payload.email ?? user.email),
    };
    store.profiles[user.id] = updated;
    notifyData();
    return updated;
  };

  const publishTrip = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const trip = {
      created_at: nowIso,
      driver_id: user.id,
      id: nextUuid(),
      seats_left: Number(payload.seats_total ?? 1),
      status: "published",
      vehicle_color: "Noir",
      ...payload,
    };
    store.trips.unshift(trip);
    notifyData();
    return trip;
  };

  const publishAvailability = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const availability = {
      created_at: nowIso,
      driver_id: user.id,
      id: nextUuid(),
      status: "active",
      ...payload,
    };
    store.driverAvailabilities.unshift(availability);
    notifyData();
    return availability;
  };

  const createRideRequest = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const request = {
      created_at: nowIso,
      id: nextUuid(),
      passenger_id: user.id,
      status: "active",
      ...payload,
    };
    store.rideRequests.unshift(request);
    notifyData();
    return request;
  };

  const createBooking = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const paymentMethod = String(payload.payment_method ?? "card");
    const paymentStatus =
      paymentMethod === "cash"
        ? "cash_pending"
        : paymentMethod === "wallet"
          ? "authorized"
          : "paid";

    const booking = {
      created_at: nowIso,
      id: nextUuid(),
      passenger_id: user.id,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      status: "confirmed",
      ...payload,
    };
    store.bookings.unshift(booking);

    const trip = store.trips.find((entry) => entry.id === payload.ride_id);
    if (trip) {
      trip.seats_left = Math.max(
        0,
        Number(trip.seats_left ?? trip.seats_total ?? 0) - Number(payload.seat_count ?? 1),
      );
    }

    notifyData();
    return booking;
  };

  const createConversation = async (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const existing = store.conversations.find(
      (conversation) =>
        conversation.context_id === payload.context_id &&
        conversation.context_type === payload.context_type &&
        conversation.participants.some(
          (participant) => participant.user_id === String(payload.other_user_id),
        ) &&
        conversation.participants.some((participant) => participant.user_id === user.id),
    );

    if (existing) {
      return existing;
    }

    const conversation = {
      context_id: String(payload.context_id),
      context_type: payload.context_type as "availability" | "request" | "ride",
      created_at: nowIso,
      id: nextUuid(),
      participants: [
        { role_label: "Moi", user_id: user.id },
        {
          role_label: String(payload.their_role_label ?? "Participant"),
          user_id: String(payload.other_user_id),
        },
      ],
    };

    store.conversations.unshift(conversation);

    if (payload.initial_message) {
      store.messages[conversation.id] = [
        {
          conversation_id: conversation.id,
          created_at: nowIso,
          id: nextUuid(),
          sender_id: user.id,
          text: String(payload.initial_message),
        },
      ];
    }

    notifyData();
    return conversation;
  };

  const sendMessage = (payload: Record<string, unknown>) => {
    const user = currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const message = {
      conversation_id: String(payload.conversation_id),
      created_at: "2026-03-30T09:15:00.000Z",
      id: nextUuid(),
      sender_id: user.id,
      text: String(payload.text ?? ""),
    };
    store.messages[message.conversation_id] = [
      ...(store.messages[message.conversation_id] ?? []),
      message,
    ];
    notifyData();
    return message;
  };

  const cancelAvailability = (id: string) => {
    const availability = store.driverAvailabilities.find((entry) => entry.id === id);
    if (availability) {
      availability.status = "cancelled";
      notifyData();
    }
  };

  const cancelRideRequest = (id: string) => {
    const request = store.rideRequests.find((entry) => entry.id === id);
    if (request) {
      request.status = "cancelled";
      notifyData();
    }
  };

  return {
    attachAvailabilityDriver,
    attachBookingTrip,
    attachDriver,
    attachPassenger,
    authenticateAs,
    cancelAvailability,
    cancelRideRequest,
    createBooking,
    createConversation,
    createRideRequest,
    currentUser,
    getAuthState: () => authState,
    getAuthVersion: () => authVersion,
    getConversationRows,
    getDataVersion: () => dataVersion,
    getMessages: (conversationId?: string) =>
      conversationId ? store.messages[conversationId] ?? [] : [],
    getMyAvailabilities: (userId?: string) =>
      store.driverAvailabilities
        .filter((entry) => entry.driver_id === userId)
        .map(attachAvailabilityDriver),
    getMyBookings: (userId?: string) =>
      store.bookings.filter((entry) => entry.passenger_id === userId).map(attachBookingTrip),
    getMyRequests: (userId?: string) =>
      store.rideRequests
        .filter((entry) => entry.passenger_id === userId)
        .map(attachPassenger),
    getMyTrips: (userId?: string) =>
      store.trips.filter((entry) => entry.driver_id === userId).map(attachDriver),
    getProfile,
    getPublicAvailabilities: () =>
      store.driverAvailabilities
        .filter((entry) => entry.status === "active")
        .map(attachAvailabilityDriver),
    getPublicRequests: () =>
      store.rideRequests
        .filter((entry) => entry.status === "active")
        .map(attachPassenger),
    getTrips: () => store.trips.filter((entry) => entry.status === "published").map(attachDriver),
    publishAvailability,
    publishTrip,
    reset,
    sendMessage,
    signIn,
    signOut,
    signUp,
    subscribeAuth: (listener: () => void) => {
      authListeners.add(listener);
      return () => authListeners.delete(listener);
    },
    subscribeData: (listener: () => void) => {
      dataListeners.add(listener);
      return () => dataListeners.delete(listener);
    },
    updateProfile,
  };
});

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("mapbox-gl", () => {
  class Map {
    addControl() {
      return this;
    }
    fitBounds() {
      return this;
    }
    remove() {
      return undefined;
    }
  }

  class NavigationControl {}

  class Marker {
    setLngLat() {
      return this;
    }
    addTo() {
      return this;
    }
    remove() {
      return undefined;
    }
  }

  class LngLatBounds {
    extend() {
      return this;
    }
  }

  return {
    default: {
      LngLatBounds,
      Map,
      Marker,
      NavigationControl,
      accessToken: "",
    },
    LngLatBounds,
    Map,
    Marker,
    NavigationControl,
  };
});

vi.mock("@/openride/shared/auth", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: () => {
      React.useSyncExternalStore(
        mockRuntime.subscribeAuth,
        mockRuntime.getAuthVersion,
        mockRuntime.getAuthVersion,
      );

      return {
        loading: mockRuntime.getAuthState().loading,
        resetPassword: vi.fn(async () => ({ error: null })),
        session: mockRuntime.getAuthState().session,
        signIn: mockRuntime.signIn,
        signInWithProvider: vi.fn(async () => ({ error: null })),
        signOut: mockRuntime.signOut,
        signUp: mockRuntime.signUp,
        updatePassword: vi.fn(async () => ({ error: null })),
        user: mockRuntime.getAuthState().user,
      };
    },
  };
});

vi.mock("@/integrations/supabase/hooks", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  const useDataVersion = () => {
    React.useSyncExternalStore(
      mockRuntime.subscribeData,
      mockRuntime.getDataVersion,
      mockRuntime.getDataVersion,
    );
  };

  return {
    useCancelAvailability: () => ({
      mutate: (id: string) => mockRuntime.cancelAvailability(id),
    }),
    useCancelRideRequest: () => ({
      mutate: (id: string) => mockRuntime.cancelRideRequest(id),
    }),
    useConversations: () => {
      useDataVersion();
      const user = mockRuntime.currentUser();
      return {
        data: user ? mockRuntime.getConversationRows(user.id) : [],
        isLoading: false,
      };
    },
    useCreateBooking: () => ({
      mutate: (
        payload: Record<string, unknown>,
        options?: { onError?: (error: Error) => void; onSuccess?: (data: Record<string, unknown>) => void },
      ) => {
        try {
          const data = mockRuntime.createBooking(payload);
          options?.onSuccess?.(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      },
    }),
    useCreateConversation: () => ({
      mutateAsync: async (payload: Record<string, unknown>) => mockRuntime.createConversation(payload),
    }),
    useCreateRideRequest: () => ({
      isPending: false,
      mutate: (
        payload: Record<string, unknown>,
        options?: { onError?: (error: Error) => void; onSuccess?: (data: Record<string, unknown>) => void },
      ) => {
        try {
          const data = mockRuntime.createRideRequest(payload);
          options?.onSuccess?.(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      },
    }),
    useDriverAvailabilities: () => {
      useDataVersion();
      return {
        data: mockRuntime.getPublicAvailabilities(),
        isLoading: false,
      };
    },
    useMessages: (conversationId?: string) => {
      useDataVersion();
      return {
        data: mockRuntime.getMessages(conversationId),
        isLoading: false,
      };
    },
    useMyAvailabilities: () => {
      useDataVersion();
      const user = mockRuntime.currentUser();
      return {
        data: mockRuntime.getMyAvailabilities(user?.id),
        isLoading: false,
      };
    },
    useMyBookings: () => {
      useDataVersion();
      const user = mockRuntime.currentUser();
      return {
        data: mockRuntime.getMyBookings(user?.id),
        isLoading: false,
      };
    },
    useMyRequests: () => {
      useDataVersion();
      const user = mockRuntime.currentUser();
      return {
        data: mockRuntime.getMyRequests(user?.id),
        isLoading: false,
      };
    },
    useMyTrips: () => {
      useDataVersion();
      const user = mockRuntime.currentUser();
      return {
        data: mockRuntime.getMyTrips(user?.id),
        isLoading: false,
      };
    },
    useProfile: (userId?: string) => {
      useDataVersion();
      return {
        data: mockRuntime.getProfile(userId),
        isLoading: false,
      };
    },
    usePublishAvailability: () => ({
      mutate: (
        payload: Record<string, unknown>,
        options?: { onError?: (error: Error) => void; onSuccess?: (data: Record<string, unknown>) => void },
      ) => {
        try {
          const data = mockRuntime.publishAvailability(payload);
          options?.onSuccess?.(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      },
    }),
    usePublishTrip: () => ({
      mutate: (
        payload: Record<string, unknown>,
        options?: { onError?: (error: Error) => void; onSuccess?: (data: Record<string, unknown>) => void },
      ) => {
        try {
          const data = mockRuntime.publishTrip(payload);
          options?.onSuccess?.(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      },
    }),
    useRideRequests: () => {
      useDataVersion();
      return {
        data: mockRuntime.getPublicRequests(),
        isLoading: false,
      };
    },
    useSendMessage: () => ({
      mutate: (payload: Record<string, unknown>) => {
        mockRuntime.sendMessage(payload);
      },
    }),
    useTrips: () => {
      useDataVersion();
      return {
        data: mockRuntime.getTrips(),
        isLoading: false,
      };
    },
    useUpdateProfile: () => ({
      mutate: (
        payload: Record<string, unknown>,
        options?: { onError?: (error: Error) => void; onSuccess?: (data: Record<string, unknown>) => void },
      ) => {
        try {
          const data = mockRuntime.updateProfile(payload);
          options?.onSuccess?.(data);
        } catch (error) {
          options?.onError?.(error as Error);
        }
      },
    }),
  };
});

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("OpenRide workflows", () => {
  beforeEach(() => {
    mockRuntime.reset();
    window.localStorage.clear();
  });

  it("redirects anonymous users from the root entry point to auth", async () => {
    renderRoute("/");

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(document.title).toBe("Rideshare Login & Registration");
  });

  it("routes authenticated users to the next onboarding step", async () => {
    mockRuntime.authenticateAs("needs-profile");
    const setupView = renderRoute("/");

    expect(await screen.findByRole("heading", { name: "Set up your profile" })).toBeInTheDocument();
    setupView.unmount();

    mockRuntime.reset();
    mockRuntime.authenticateAs("needs-trust");
    renderRoute("/");

    expect(await screen.findByRole("heading", { name: "Trust Center" })).toBeInTheDocument();
  });

  it("keeps auth screen toggles working and signup redirects into onboarding", async () => {
    renderRoute("/auth");

    fireEvent.click(await screen.findByRole("link", { name: "Sign up" }));
    expect(await screen.findByRole("heading", { name: "Sign up" })).toBeInTheDocument();

    const signupView = document.getElementById("signup-view");
    expect(signupView).not.toBeNull();
    const signupQueries = within(signupView as HTMLElement);

    fireEvent.change(signupQueries.getByPlaceholderText("John"), { target: { value: "Amina" } });
    fireEvent.change(signupQueries.getByPlaceholderText("Doe"), { target: { value: "Bela" } });
    fireEvent.change(signupQueries.getByPlaceholderText("john.doe@gmail.com"), {
      target: { value: "amina@example.com" },
    });
    fireEvent.change(signupQueries.getByPlaceholderText("+1 (555) 000-0000"), {
      target: { value: "+1 514 222 0101" },
    });
    fireEvent.change(signupQueries.getAllByPlaceholderText("••••••••••••••••")[0], {
      target: { value: "secret123" },
    });
    fireEvent.change(signupQueries.getAllByPlaceholderText("••••••••••••••••")[1], {
      target: { value: "secret123" },
    });
    fireEvent.click(signupQueries.getByRole("button", { name: "Create account" }));

    expect(await screen.findByRole("heading", { name: "Set up your profile" })).toBeInTheDocument();
  });

  it("keeps the authentication hub login flow connected to the app", async () => {
    renderRoute("/authentication-hub");

    fireEvent.change((await screen.findAllByPlaceholderText("john.doe@example.com"))[0], {
      target: { value: "premium@example.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••••••••••")[0], {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(await screen.findByRole("heading", { name: "Résultats de Recherche" })).toBeInTheDocument();
  });

  it("continues onboarding from setup profile to trust center to search results", async () => {
    mockRuntime.authenticateAs("needs-profile");
    renderRoute("/setup-profile");

    fireEvent.change(await screen.findByPlaceholderText("John"), { target: { value: "Nina" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Kole" } });
    fireEvent.change(screen.getByPlaceholderText("(555) 000-0000"), {
      target: { value: "613 555 1100" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save & Continue/i }));

    expect(await screen.findByRole("heading", { name: "Trust Center" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));
    expect(await screen.findByRole("heading", { name: "Résultats de Recherche" })).toBeInTheDocument();
  });

  it("affiche les trajets planifiés et les chauffeurs disponibles dans la recherche", async () => {
    mockRuntime.authenticateAs("complete");
    renderRoute("/search-results");

    expect(await screen.findByText("Trajets planifiés")).toBeInTheDocument();
    expect(screen.getByText("Chauffeurs disponibles")).toBeInTheDocument();
    expect(screen.getByText("Montréal → Ottawa")).toBeInTheDocument();
    expect(screen.getByText("Disponible depuis Gatineau")).toBeInTheDocument();
  });

  it("publie une demande passager et la retrouve dans Mes trajets", async () => {
    mockRuntime.authenticateAs("complete");
    const searchView = renderRoute("/search-results");

    fireEvent.click(await screen.findByRole("button", { name: "Publier une demande" }));
    fireEvent.change(screen.getByPlaceholderText("Ville de départ"), {
      target: { value: "Cornwall" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville d'arrivée"), {
      target: { value: "Montréal" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bagages, point de rendez-vous, flexibilité, etc."), {
      target: { value: "Départ tôt le matin." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publier ma demande" }));

    expect(
      await screen.findByText(/Votre demande a bien été publiée/i),
    ).toBeInTheDocument();

    searchView.unmount();

    renderRoute("/my-trips");
    fireEvent.click(await screen.findByRole("button", { name: "Demandes" }));

    expect(await screen.findByText("Cornwall → Montréal")).toBeInTheDocument();
    expect(screen.getByText("Départ tôt le matin.")).toBeInTheDocument();
  });

  it("publie une disponibilité chauffeur et la retrouve dans Mes trajets", async () => {
    mockRuntime.authenticateAs("complete");
    renderRoute("/publish-trip");

    fireEvent.click(await screen.findByRole("button", { name: "Je suis disponible" }));
    fireEvent.change(screen.getByPlaceholderText("Ville ou zone de départ"), {
      target: { value: "Cornwall" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ex: Toyota RAV4"), {
      target: { value: "Mazda CX-5" },
    });
    fireEvent.change(screen.getByPlaceholderText("Précisez votre zone, votre flexibilité et les conditions du trajet."), {
      target: { value: "Disponible pour des allers simples ou retours le soir." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Publier la disponibilité/i }));

    expect(await screen.findByRole("heading", { name: "Mes Trajets" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Conducteur" }));
    fireEvent.click(screen.getByRole("button", { name: "Disponibilités" }));

    expect(await screen.findByText("Disponible depuis Cornwall")).toBeInTheDocument();
    expect(screen.getByText("Mazda CX-5")).toBeInTheDocument();
  });

  it("confirme une réservation cash et l'affiche comme à payer en cash", async () => {
    mockRuntime.authenticateAs("complete");
    renderRoute("/search-results");

    fireEvent.click(await screen.findByRole("button", { name: "View Details" }));
    expect(await screen.findByRole("heading", { name: "Détails du Trajet" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Réserver" }));
    expect(await screen.findByRole("heading", { name: "Paiement & Réservation" })).toBeInTheDocument();
    expect(await screen.findByText("Résumé du trajet")).toBeInTheDocument();

    const cashLabel = await screen.findByText("Cash");
    fireEvent.click(cashLabel.closest("label") as HTMLElement);
    fireEvent.click(screen.getByRole("button", { name: /Payer et Réserver/i }));

    expect(await screen.findByText("Réservation Confirmée !")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Voir dans Mes Trajets/i }));

    expect(await screen.findByRole("heading", { name: "Mes Trajets" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Passager" }));
    fireEvent.click(screen.getByRole("button", { name: "Réservations" }));

    const relevantTab =
      screen.queryByRole("button", { name: /À venir \(1\)/i }) ??
      screen.queryByRole("button", { name: /Passés \(1\)/i }) ??
      screen.queryByRole("button", { name: /À venir/i }) ??
      screen.getByRole("button", { name: /Passés/i });

    fireEvent.click(relevantTab);

    expect(await screen.findByText("Cash à bord")).toBeInTheDocument();
    expect(screen.getByText("Montréal → Ottawa")).toBeInTheDocument();
  });

  it("ouvre une conversation contextualisée depuis une disponibilité et permet d'envoyer un message", async () => {
    mockRuntime.authenticateAs("complete");
    renderRoute("/search-results");

    fireEvent.click(await screen.findByRole("button", { name: "Contacter" }));

    expect(await screen.findByRole("heading", { name: "Messages" })).toBeInTheDocument();
    expect(await screen.findByText("Disponibilité active")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Écrivez votre message..."), {
      target: { value: "Allô, êtes-vous dispo pour demain matin ?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer le message" }));

    const sentMessageMatches = await screen.findAllByText("Allô, êtes-vous dispo pour demain matin ?");
    expect(sentMessageMatches.length).toBeGreaterThan(0);
  });

  it("persiste le profil et le thème global depuis les paramètres", async () => {
    mockRuntime.authenticateAs("complete");
    const { container } = renderRoute("/profile-settings");

    fireEvent.change(await screen.findByDisplayValue("Lina"), {
      target: { value: "Arielle" },
    });
    fireEvent.click(screen.getByRole("button", { name: /White/i }));
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer les modifications/i }));

    await waitFor(() => {
      expect(
        container.querySelector('[data-openride-page="profile-settings"]'),
      ).toHaveAttribute("data-openride-theme", "white");
    });
    expect(window.localStorage.getItem(openRideThemeStorageKey)).toBe("white");
    expect((await screen.findAllByText("Arielle Richards")).length).toBeGreaterThan(0);
  });

  it("garde les routes auth sur leur identité visuelle fixe", async () => {
    window.localStorage.setItem(openRideThemeStorageKey, "white");

    const authRender = renderRoute("/auth");
    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(
      authRender.container.querySelector('[data-openride-page="auth"]'),
    ).toHaveAttribute("data-openride-theme", "auth-light");

    authRender.unmount();

    const hubRender = renderRoute("/authentication-hub");
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(
      hubRender.container.querySelector('[data-openride-page="authentication-hub"]'),
    ).toHaveAttribute("data-openride-theme", "auth-dark");
  });
});

afterEach(() => {
  vi.useRealTimers();
  cleanup();
});
