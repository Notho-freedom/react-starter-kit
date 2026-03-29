import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/openride/shared/auth";

// ─── Profile ───

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      return data as Record<string, unknown>;
    },
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...payload } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// ─── Trips ───

export function useTrips(filters?: { departure?: string; destination?: string; date?: string }) {
  return useQuery({
    queryKey: ["trips", filters],
    queryFn: async () => {
      let query = supabase
        .from("trips")
        .select("*, driver:profiles!inner(*)")
        .eq("status", "published")
        .order("date", { ascending: true });

      if (filters?.departure) {
        query = query.ilike("departure", `%${filters.departure}%`);
      }
      if (filters?.destination) {
        query = query.ilike("destination", `%${filters.destination}%`);
      }
      if (filters?.date) {
        query = query.eq("date", filters.date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
  });
}

export function useMyTrips() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-trips", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("driver_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
    enabled: !!user,
  });
}

export function usePublishTrip() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      departure: string;
      destination: string;
      date: string;
      time: string;
      price: number;
      seats_total: number;
      vehicle_name?: string;
      vehicle_color?: string;
      luggage_allowed?: boolean;
      pets_allowed?: boolean;
      smoking_allowed?: boolean;
      instructions?: string;
      departure_lat?: number;
      departure_lng?: number;
      destination_lat?: number;
      destination_lng?: number;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("trips")
        .insert({
          ...payload,
          driver_id: user.id,
          seats_left: payload.seats_total,
          status: "published",
        } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

// ─── Driver Availabilities ───

export function useDriverAvailabilities(filters?: { zone?: string; date?: string }) {
  return useQuery({
    queryKey: ["driver-availabilities", filters],
    queryFn: async () => {
      let query = supabase
        .from("driver_availabilities")
        .select("*, driver:profiles!inner(*)")
        .eq("status", "active")
        .order("date", { ascending: true });

      if (filters?.zone) {
        query = query.ilike("zone", `%${filters.zone}%`);
      }
      if (filters?.date) {
        query = query.eq("date", filters.date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
  });
}

export function useMyAvailabilities() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-availabilities", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("driver_availabilities")
        .select("*")
        .eq("driver_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
    enabled: !!user,
  });
}

export function usePublishAvailability() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      zone: string;
      date: string;
      start_time: string;
      end_time: string;
      seats?: number;
      vehicle_name?: string;
      notes?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("driver_availabilities")
        .insert({ ...payload, driver_id: user.id } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-availabilities"] });
      queryClient.invalidateQueries({ queryKey: ["my-availabilities"] });
    },
  });
}

export function useCancelAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("driver_availabilities")
        .update({ status: "cancelled" } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-availabilities"] });
      queryClient.invalidateQueries({ queryKey: ["my-availabilities"] });
    },
  });
}

// ─── Ride Requests ───

export function useRideRequests(filters?: { origin?: string; date?: string }) {
  return useQuery({
    queryKey: ["ride-requests", filters],
    queryFn: async () => {
      let query = supabase
        .from("ride_requests")
        .select("*, passenger:profiles!inner(*)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (filters?.origin) {
        query = query.ilike("origin", `%${filters.origin}%`);
      }
      if (filters?.date) {
        query = query.eq("date", filters.date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
  });
}

export function useMyRequests() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-requests", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("ride_requests")
        .select("*")
        .eq("passenger_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
    enabled: !!user,
  });
}

export function useCreateRideRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      origin: string;
      destination: string;
      date: string;
      start_time: string;
      end_time: string;
      seat_count?: number;
      notes?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("ride_requests")
        .insert({ ...payload, passenger_id: user.id } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ride-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
}

export function useCancelRideRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ride_requests")
        .update({ status: "cancelled" } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ride-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
}

// ─── Bookings ───

export function useMyBookings() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select("*, trip:trips(*)")
        .eq("passenger_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
    enabled: !!user,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      ride_id: string;
      seat_count: number;
      payment_method: "card" | "wallet" | "paypal" | "cash";
      message?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const paymentStatus =
        payload.payment_method === "cash"
          ? "cash_pending"
          : payload.payment_method === "wallet"
            ? "authorized"
            : "paid";

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          ...payload,
          passenger_id: user.id,
          payment_status: paymentStatus,
          status: "confirmed",
        } as never)
        .select()
        .single();
      if (error) throw error;

      // Decrement seats_left on the trip
      const { data: trip } = await supabase
        .from("trips")
        .select("seats_left")
        .eq("id", payload.ride_id)
        .single();

      if (trip) {
        const newSeats = Math.max(0, (trip.seats_left as number) - payload.seat_count);
        await supabase
          .from("trips")
          .update({ seats_left: newSeats } as never)
          .eq("id", payload.ride_id);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

// ─── Conversations & Messages ───

export function useConversations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      // Get conversations where user is participant
      const { data: participations, error: pError } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", user.id);
      if (pError) throw pError;

      const convoIds = (participations ?? []).map((p) => p.conversation_id as string);
      if (convoIds.length === 0) return [];

      const { data, error } = await supabase
        .from("conversations")
        .select("*, participants:conversation_participants(*, profile:profiles(*))")
        .in("id", convoIds)
        .order("created_at", { ascending: false });
      if (error) throw error;

      // Get latest message for each conversation
      const withMessages = await Promise.all(
        (data ?? []).map(async (convo) => {
          const { data: msgs } = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", convo.id as string)
            .order("created_at", { ascending: false })
            .limit(1);
          return { ...convo, latest_message: msgs?.[0] ?? null };
        })
      );

      return withMessages as Array<Record<string, unknown>>;
    },
    enabled: !!user,
  });
}

export function useMessages(conversationId?: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const { data, error } = await supabase
        .from("messages")
        .select("*, sender:profiles(first_name, last_name, avatar_url)")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Array<Record<string, unknown>>;
    },
    enabled: !!conversationId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: { conversation_id: string; text: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("messages")
        .insert({ ...payload, sender_id: user.id } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.conversation_id] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      context_type: "ride" | "availability" | "request";
      context_id: string;
      other_user_id: string;
      my_role_label?: string;
      their_role_label?: string;
      initial_message?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      // Check if conversation already exists
      const { data: myParticipations } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", user.id);

      const myConvoIds = (myParticipations ?? []).map((p) => p.conversation_id as string);

      if (myConvoIds.length > 0) {
        const { data: existingConvos } = await supabase
          .from("conversations")
          .select("*, participants:conversation_participants(user_id)")
          .in("id", myConvoIds)
          .eq("context_type", payload.context_type)
          .eq("context_id", payload.context_id);

        const existingConvo = existingConvos?.find((c: Record<string, unknown>) =>
          (c.participants as Array<{ user_id: string }>)?.some(
            (p) => p.user_id === payload.other_user_id
          )
        );
        if (existingConvo) return existingConvo;
      }

      const { data: conversation, error: convoError } = await supabase
        .from("conversations")
        .insert({
          context_type: payload.context_type,
          context_id: payload.context_id,
        } as never)
        .select()
        .single();
      if (convoError) throw convoError;
      if (!conversation) throw new Error("Failed to create conversation");

      const convoId = (conversation as Record<string, unknown>).id as string;

      await supabase.from("conversation_participants").insert([
        { conversation_id: convoId, user_id: user.id, role_label: payload.my_role_label || "Moi" } as never,
        { conversation_id: convoId, user_id: payload.other_user_id, role_label: payload.their_role_label || "Participant" } as never,
      ]);

      if (payload.initial_message) {
        await supabase.from("messages").insert({
          conversation_id: convoId,
          sender_id: user.id,
          text: payload.initial_message,
        } as never);
      }

      return conversation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
