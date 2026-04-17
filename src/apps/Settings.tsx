import { useState } from "react";
import { useDesktopState } from "../hooks/useDesktopState";
import { cn } from "@/lib/utils";

const wallpapers = [
  { id: "default", name: "Default", preview: "linear-gradient(135deg, hsl(222 47% 8%), hsl(240 30% 5%))" },
  { id: "midnight", name: "Midnight", preview: "linear-gradient(135deg, hsl(230 50% 6%), hsl(260 40% 4%))" },
  { id: "aurora", name: "Aurora", preview: "linear-gradient(135deg, hsl(180 40% 8%), hsl(260 50% 6%))" },
  { id: "ember", name: "Ember", preview: "linear-gradient(135deg, hsl(15 50% 8%), hsl(350 40% 5%))" },
];

const sections = ["Apparence", "Système", "Réseau", "À propos"];

export function Settings({ }: { windowId: string }) {
  const { wallpaper, setWallpaper } = useDesktopState();
  const [section, setSection] = useState(0);

  return (
    <div className="flex h-full text-text-primary">
      {/* Sidebar — luminance, no border */}
      <div
        className="w-48 p-3 space-y-0.5"
        style={{ background: "linear-gradient(90deg, hsl(var(--surface-void) / 0.5), transparent)" }}
      >
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setSection(i)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-xs cursor-default transition-all duration-micro",
              section === i
                ? "bg-intent-primary/15 text-intent-primary-glow"
                : "text-text-secondary hover:bg-surface-glass/50 hover:text-text-primary",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {section === 0 && (
          <>
            <h2 className="text-sm font-medium mb-4 text-text-primary">Fond d'écran</h2>
            <div className="grid grid-cols-2 gap-3">
              {wallpapers.map(w => {
                const active = wallpaper === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWallpaper(w.id)}
                    className={cn(
                      "relative h-24 rounded-xl transition-all duration-short ease-cognitive-enter overflow-hidden",
                      "hover:scale-[1.02]",
                    )}
                    style={{
                      background: w.preview,
                      boxShadow: active
                        ? "0 0 0 2px hsl(var(--intent-primary) / 0.7), 0 0 24px -4px hsl(var(--intent-primary) / 0.5)"
                        : "0 4px 12px -4px hsl(220 40% 2% / 0.5)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-end p-2">
                      <span className="text-[10px] text-text-primary/90 font-medium">{w.name}</span>
                    </div>
                    {active && (
                      <span
                        className="absolute top-2 right-2 w-2 h-2 rounded-full"
                        style={{ background: "hsl(var(--intent-primary-glow))", boxShadow: "0 0 8px hsl(var(--intent-primary) / 0.8)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <h2 className="text-sm font-medium mt-8 mb-4 text-text-primary">Informations système</h2>
            <div className="space-y-0 text-xs">
              {[
                ["Système", "Ergo Proxy Desktop v1.0"],
                ["Runtime", "Web (Electron-ready)"],
                ["Moteur", "React 18 + Vite 5"],
                ["UI", "Tailwind CSS + Framer Motion"],
                ["Thème", "Dark (Cognitive Glass)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5 hover:bg-surface-glass/30 px-2 rounded-md transition-colors">
                  <span className="text-text-muted">{k}</span>
                  <span className="text-text-secondary">{v}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {section > 0 && (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            Section "{sections[section]}" — bientôt disponible.
          </div>
        )}
      </div>
    </div>
  );
}
