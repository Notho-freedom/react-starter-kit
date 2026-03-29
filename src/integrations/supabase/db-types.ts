export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          bio: string | null;
          city: string | null;
          country: string | null;
          gender: string | null;
          birth_date: string | null;
          avatar_url: string | null;
          currency: string | null;
          language: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          email_verified: boolean;
          phone_verified: boolean;
          id_verified: boolean;
          rating: number;
          review_count: number;
          trip_count: number;
          created_at: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          gender?: string | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          currency?: string | null;
          language?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          email_verified?: boolean;
          phone_verified?: boolean;
          id_verified?: boolean;
          rating?: number;
          review_count?: number;
          trip_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          gender?: string | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          currency?: string | null;
          language?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          email_verified?: boolean;
          phone_verified?: boolean;
          id_verified?: boolean;
          rating?: number;
          review_count?: number;
          trip_count?: number;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: "admin" | "moderator" | "user";
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "admin" | "moderator" | "user";
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: "admin" | "moderator" | "user";
        };
      };
      trips: {
        Row: {
          id: string;
          driver_id: string;
          departure: string;
          destination: string;
          departure_station: string | null;
          arrival_station: string | null;
          date: string;
          time: string;
          price: number;
          seats_total: number;
          seats_left: number;
          vehicle_name: string | null;
          vehicle_color: string | null;
          luggage_allowed: boolean;
          pets_allowed: boolean;
          smoking_allowed: boolean;
          instructions: string | null;
          status: "draft" | "published" | "cancelled";
          departure_lat: number | null;
          departure_lng: number | null;
          destination_lat: number | null;
          destination_lng: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          departure: string;
          destination: string;
          departure_station?: string | null;
          arrival_station?: string | null;
          date: string;
          time: string;
          price: number;
          seats_total: number;
          seats_left?: number;
          vehicle_name?: string | null;
          vehicle_color?: string | null;
          luggage_allowed?: boolean;
          pets_allowed?: boolean;
          smoking_allowed?: boolean;
          instructions?: string | null;
          status?: "draft" | "published" | "cancelled";
          departure_lat?: number | null;
          departure_lng?: number | null;
          destination_lat?: number | null;
          destination_lng?: number | null;
          created_at?: string;
        };
        Update: {
          driver_id?: string;
          departure?: string;
          destination?: string;
          departure_station?: string | null;
          arrival_station?: string | null;
          date?: string;
          time?: string;
          price?: number;
          seats_total?: number;
          seats_left?: number;
          vehicle_name?: string | null;
          vehicle_color?: string | null;
          luggage_allowed?: boolean;
          pets_allowed?: boolean;
          smoking_allowed?: boolean;
          instructions?: string | null;
          status?: "draft" | "published" | "cancelled";
          departure_lat?: number | null;
          departure_lng?: number | null;
          destination_lat?: number | null;
          destination_lng?: number | null;
        };
      };
      driver_availabilities: {
        Row: {
          id: string;
          driver_id: string;
          zone: string;
          date: string;
          start_time: string;
          end_time: string;
          seats: number;
          vehicle_name: string | null;
          notes: string | null;
          status: "active" | "fulfilled" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          zone: string;
          date: string;
          start_time: string;
          end_time: string;
          seats?: number;
          vehicle_name?: string | null;
          notes?: string | null;
          status?: "active" | "fulfilled" | "cancelled";
          created_at?: string;
        };
        Update: {
          driver_id?: string;
          zone?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          seats?: number;
          vehicle_name?: string | null;
          notes?: string | null;
          status?: "active" | "fulfilled" | "cancelled";
        };
      };
      ride_requests: {
        Row: {
          id: string;
          passenger_id: string;
          origin: string;
          destination: string;
          date: string;
          start_time: string;
          end_time: string;
          seat_count: number;
          notes: string | null;
          status: "active" | "fulfilled" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          passenger_id: string;
          origin: string;
          destination: string;
          date: string;
          start_time: string;
          end_time: string;
          seat_count?: number;
          notes?: string | null;
          status?: "active" | "fulfilled" | "cancelled";
          created_at?: string;
        };
        Update: {
          passenger_id?: string;
          origin?: string;
          destination?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          seat_count?: number;
          notes?: string | null;
          status?: "active" | "fulfilled" | "cancelled";
        };
      };
      bookings: {
        Row: {
          id: string;
          ride_id: string;
          passenger_id: string;
          seat_count: number;
          payment_method: "card" | "wallet" | "paypal" | "cash";
          payment_status: "paid" | "authorized" | "cash_pending";
          status: "confirmed" | "pending" | "cancelled";
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ride_id: string;
          passenger_id: string;
          seat_count?: number;
          payment_method: "card" | "wallet" | "paypal" | "cash";
          payment_status?: "paid" | "authorized" | "cash_pending";
          status?: "confirmed" | "pending" | "cancelled";
          message?: string | null;
          created_at?: string;
        };
        Update: {
          ride_id?: string;
          passenger_id?: string;
          seat_count?: number;
          payment_method?: "card" | "wallet" | "paypal" | "cash";
          payment_status?: "paid" | "authorized" | "cash_pending";
          status?: "confirmed" | "pending" | "cancelled";
          message?: string | null;
        };
      };
      conversations: {
        Row: {
          id: string;
          context_type: "ride" | "availability" | "request";
          context_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          context_type: "ride" | "availability" | "request";
          context_id: string;
          created_at?: string;
        };
        Update: {
          context_type?: "ride" | "availability" | "request";
          context_id?: string;
        };
      };
      conversation_participants: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          role_label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          role_label?: string | null;
          created_at?: string;
        };
        Update: {
          conversation_id?: string;
          user_id?: string;
          role_label?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          text: string;
          attachment_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          text: string;
          attachment_url?: string | null;
          created_at?: string;
        };
        Update: {
          conversation_id?: string;
          sender_id?: string;
          text?: string;
          attachment_url?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _user_id: string;
          _role: "admin" | "moderator" | "user";
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "moderator" | "user";
      trip_status: "draft" | "published" | "cancelled";
      availability_status: "active" | "fulfilled" | "cancelled";
      request_status: "active" | "fulfilled" | "cancelled";
      booking_status: "confirmed" | "pending" | "cancelled";
      payment_method_type: "card" | "wallet" | "paypal" | "cash";
      payment_status_type: "paid" | "authorized" | "cash_pending";
      conversation_context: "ride" | "availability" | "request";
    };
  };
};
