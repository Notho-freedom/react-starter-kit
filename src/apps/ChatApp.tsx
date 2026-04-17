import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatApp({ }: { windowId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: "Bonjour ! Je suis l'assistant Ergo Proxy. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    const responses = [
      "C'est une excellente question. Laissez-moi réfléchir…",
      "Je comprends votre demande. Voici ce que je peux vous proposer.",
      "Intéressant ! Je vais analyser ça pour vous.",
      "Bien sûr, je suis là pour vous aider avec ça.",
      "Permettez-moi de traiter cette information.",
    ];

    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages — bubbles use single surface, no border */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-2.5 items-start", msg.role === "user" && "flex-row-reverse")}>
            <div
              className={cn(
                "w-7 h-7 rounded-lg grid place-items-center shrink-0",
                msg.role === "assistant" ? "bg-intent-primary/15 text-intent-primary-glow" : "bg-surface-glass/60 text-text-secondary",
              )}
              style={msg.role === "assistant"
                ? { boxShadow: "0 0 12px -4px hsl(var(--intent-primary) / 0.5)" }
                : undefined}
            >
              {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div
              className={cn(
                "max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed",
                msg.role === "assistant"
                  ? "bg-surface-glass/50 text-text-primary rounded-tl-sm"
                  : "text-text-primary rounded-tr-sm",
              )}
              style={msg.role === "user"
                ? { background: "linear-gradient(135deg, hsl(var(--intent-primary) / 0.25), hsl(var(--intent-secondary) / 0.18))" }
                : undefined}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 items-start">
            <div
              className="w-7 h-7 rounded-lg bg-intent-primary/15 text-intent-primary-glow grid place-items-center"
              style={{ boxShadow: "0 0 12px -4px hsl(var(--intent-primary) / 0.5)" }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-surface-glass/50 rounded-2xl rounded-tl-sm px-3 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-intent-primary-glow rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-intent-primary-glow rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-intent-primary-glow rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input — fused into surface, halo on focus instead of border */}
      <div
        className="p-3"
        style={{ background: "linear-gradient(0deg, hsl(var(--surface-void) / 0.5), transparent)" }}
      >
        <div className="flex gap-2 items-center bg-surface-glass/40 hover:bg-surface-glass/55 focus-within:bg-surface-glass/60 transition-colors rounded-xl px-3 py-1.5"
          style={{ boxShadow: "inset 0 0 0 1px hsl(var(--text-primary) / 0.04)" }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Écrivez votre message…"
            className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-ghost outline-none py-1.5"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-7 h-7 rounded-lg bg-intent-primary/20 text-intent-primary-glow grid place-items-center
              hover:bg-intent-primary/35 disabled:opacity-30 transition-all duration-micro
              hover:shadow-glow-primary disabled:shadow-none"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
