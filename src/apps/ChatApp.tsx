import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatApp({ windowId }: { windowId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: "Bonjour ! Je suis l'assistant Ergo Proxy. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated AI response (would use Groq/OpenRouter in production)
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
    <div className="flex flex-col h-full bg-surface-deep">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
              ${msg.role === "assistant" ? "bg-primary/20 text-primary" : "bg-surface-glass text-text-secondary"}`}>
              {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed
              ${msg.role === "assistant"
                ? "bg-surface-glass/60 text-foreground border border-border/20"
                : "bg-primary/20 text-foreground"}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-surface-glass/60 border border-border/20 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30 bg-surface-void/30">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Écrivez votre message…"
            className="flex-1 bg-surface-glass/50 border border-border/30 rounded-lg px-3 py-2 text-xs
              text-foreground placeholder:text-text-ghost outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center
              hover:bg-primary/30 disabled:opacity-30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
