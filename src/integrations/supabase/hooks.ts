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
      return data;
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
        .upsert({ id: user.id, ...payload })
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
        .select("*, driver:profiles!trips_driver_id_fkey(*)")
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
      return data;
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
      return data;
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
        })
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
        .select("*, driver:profiles!driver_availabilities_driver_id_fkey(*)")
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
      return data;
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
      return data;
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
        .insert({ ...payload, driver_id: user.id })
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
        .update({ status: "cancelled" as const })
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
        .select("*, passenger:profiles!ride_requests_passenger_id_fkey(*)")
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
      return data;
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
      return data;
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
        .insert({ ...payload, passenger_id: user.id })
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
        .update({ status: "cancelled" as const })
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
        .select("*, trip:trips(*), trip_driver:trips(driver:profiles!trips_driver_id_fkey(*))")
        .eq("passenger_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
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
          ? ("cash_pending" as const)
          : payload.payment_method === "wallet"
            ? ("authorized" as const)
            : ("paid" as const);

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          ...payload,
          passenger_id: user.id,
          payment_status: paymentStatus,
          status: "confirmed",
        })
        .select()
        .single();
      if (error) throw error;

      // Decrement seats_left
      await supabase.rpc("decrement_seats" as never, {
        trip_id: payload.ride_id,
        count: payload.seat_count,
      } as never).then(() => {});

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
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          participants:conversation_participants(*, profile:profiles(*)),
          latest_message:messages(id, text, sender_id, created_at)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
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
        .select("*, sender:profiles!messages_sender_id_fkey(first_name, last_name, avatar_url)")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
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
        .insert({ ...payload, sender_id: user.id })
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
      const { data: existing } = await supabase
        .from("conversations")
        .select("*, participants:conversation_participants(user_id)")
        .eq("context_type", payload.context_type)
        .eq("context_id", payload.context_id);

      const existingConvo = existing?.find((c) =>
        (c.participants as Array<{ user_id: string }>)?.some((p) => p.user_id === payload.other_user_id)
      );

      if (existingConvo) return existingConvo;

      const { data: conversation, error: convoError } = await supabase
        .from("conversations")
        .insert({
          context_type: payload.context_type,
          context_id: payload.context_id,
        })
        .select()
        .single();
      if (convoError) throw convoError;

      // Add participants
      await supabase.from("conversation_participants").insert([
        { conversation_id: conversation.id, user_id: user.id, role_label: payload.my_role_label || "Moi" },
        { conversation_id: conversation.id, user_id: payload.other_user_id, role_label: payload.their_role_label || "Participant" },
      ]);

      // Send initial message if provided
      if (payload.initial_message) {
        await supabase.from("messages").insert({
          conversation_id: conversation.id,
          sender_id: user.id,
          text: payload.initial_message,
        });
      }

      return conversation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
