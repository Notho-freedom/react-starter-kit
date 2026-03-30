import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/openride/shared/auth";

/**
 * Real-time push notification system using:
 * - Browser Notifications API for OS-level alerts
 * - Supabase Realtime for instant message delivery
 */
export function usePushNotifications() {
  const { user } = useAuth();
  const permissionRef = useRef<NotificationPermission>("default");

  // Request notification permission on mount
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      permissionRef.current = "granted";
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        permissionRef.current = perm;
      });
    }
  }, []);

  const showNotification = useCallback(
    (title: string, body: string, options?: { tag?: string; data?: Record<string, unknown> }) => {
      if (!("Notification" in window) || permissionRef.current !== "granted") return;

      try {
        const notif = new Notification(title, {
          body,
          icon: "/placeholder.svg",
          badge: "/placeholder.svg",
          tag: options?.tag || "openride-notification",
          silent: false,
          data: options?.data,
        });

        notif.onclick = () => {
          window.focus();
          notif.close();
        };

        // Auto-close after 8s
        setTimeout(() => notif.close(), 8000);
      } catch {
        // Fallback: some browsers don't support new Notification() directly
      }
    },
    [],
  );

  // Subscribe to new messages via Supabase Realtime
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("push-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          const msg = payload.new as Record<string, unknown>;

          // Don't notify for own messages
          if (msg.sender_id === user.id) return;

          // Fetch sender profile for notification
          const { data: sender } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", msg.sender_id as string)
            .single();

          const senderName = sender
            ? `${sender.first_name || ""} ${sender.last_name || ""}`.trim()
            : "Quelqu'un";

          showNotification(
            `Nouveau message de ${senderName}`,
            String(msg.text || ""),
            { tag: `msg-${msg.id}` },
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
        },
        async (payload) => {
          const booking = payload.new as Record<string, unknown>;

          // Notify driver when someone books their trip
          const { data: trip } = await supabase
            .from("trips")
            .select("departure, destination, driver_id")
            .eq("id", booking.ride_id as string)
            .single();

          if (trip && trip.driver_id === user.id) {
            const { data: passenger } = await supabase
              .from("profiles")
              .select("first_name, last_name")
              .eq("id", booking.passenger_id as string)
              .single();

            const passengerName = passenger
              ? `${passenger.first_name || ""} ${passenger.last_name || ""}`.trim()
              : "Un passager";

            showNotification(
              "Nouvelle réservation !",
              `${passengerName} a réservé ${booking.seat_count} place(s) pour ${trip.departure} → ${trip.destination}`,
              { tag: `booking-${booking.id}` },
            );
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ride_requests",
        },
        (payload) => {
          const req = payload.new as Record<string, unknown>;

          // Don't notify for own requests
          if (req.passenger_id === user.id) return;

          showNotification(
            "Nouvelle demande de trajet",
            `${req.origin} → ${req.destination}`,
            { tag: `request-${req.id}` },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, showNotification]);

  return { showNotification, permissionGranted: permissionRef.current === "granted" };
}
