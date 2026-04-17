import { useState, useRef, useEffect } from "react";

interface Line {
  id: number;
  type: "input" | "output";
  text: string;
}

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => "Commandes disponibles: help, echo, date, clear, whoami, ls, uname, pwd, cat",
  echo: (args) => args.join(" "),
  date: () => new Date().toLocaleString("fr-FR"),
  whoami: () => "ergo@proxy",
  uname: () => "ErgoProxy Desktop v1.0 — Web Runtime",
  pwd: () => "/home/ergo",
  ls: () => "Documents  Images  Desktop  Downloads  .config  .local",
  cat: (args) => args.length ? `cat: ${args[0]}: fichier fictif (mode web)` : "cat: argument manquant",
};

export function Terminal({ }: { windowId: string }) {
  const [lines, setLines] = useState<Line[]>([
    { id: 0, type: "output", text: "ErgoProxy Terminal v1.0" },
    { id: 1, type: "output", text: 'Tapez "help" pour voir les commandes disponibles.\n' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const exec = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const inputLine: Line = { id: nextId.current++, type: "input", text: `ergo@proxy:~$ ${trimmed}` };

    if (command === "clear") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[command];
    const result = handler ? handler(args) : `${command}: commande non trouvée`;
    const outputLine: Line = { id: nextId.current++, type: "output", text: result };

    setLines(prev => [...prev, inputLine, outputLine]);
    setHistory(prev => [trimmed, ...prev].slice(0, 50));
    setHistIdx(-1);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      if (history[newIdx]) setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx >= 0 ? history[newIdx] : "");
    }
  };

  return (
    <div
      className="flex flex-col h-full font-mono text-sm cursor-text relative"
      style={{ background: "hsl(var(--surface-void))" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Subtle scan effect inside terminal */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--intent-success)) 0px, hsl(var(--intent-success)) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div ref={scrollRef} className="relative flex-1 overflow-auto p-3 space-y-0.5">
        {lines.map(l => (
          <div key={l.id} className={l.type === "input" ? "text-intent-success" : "text-text-secondary"}>
            {l.text}
          </div>
        ))}
        <div className="flex items-center text-intent-success">
          <span>ergo@proxy:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent outline-none text-text-primary caret-intent-primary"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
