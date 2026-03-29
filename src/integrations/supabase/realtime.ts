import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/openride/shared/auth";

/**
 * Subscribe to realtime messages for conversations the user participates in.
 * Call once at the app level (e.g. in MessagesPage or App).
 */
export function useRealtimeMessages(activeConversationId?: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as { conversation_id: string };
          // Invalidate the messages query for the conversation
          queryClient.invalidateQueries({
            queryKey: ["messages", newMessage.conversation_id],
          });
          // Also refresh conversations list
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
}
