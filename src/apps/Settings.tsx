import { useDesktopState } from "../hooks/useDesktopState";

const wallpapers = [
  { id: "default", name: "Default", preview: "bg-gradient-to-br from-[hsl(222,47%,8%)] to-[hsl(240,30%,5%)]" },
  { id: "midnight", name: "Midnight", preview: "bg-gradient-to-br from-[hsl(230,50%,6%)] to-[hsl(260,40%,4%)]" },
  { id: "aurora", name: "Aurora", preview: "bg-gradient-to-br from-[hsl(180,40%,8%)] to-[hsl(260,50%,6%)]" },
  { id: "ember", name: "Ember", preview: "bg-gradient-to-br from-[hsl(15,50%,8%)] to-[hsl(350,40%,5%)]" },
];

export function Settings({ windowId }: { windowId: string }) {
  const { wallpaper, setWallpaper } = useDesktopState();

  return (
    <div className="flex h-full bg-surface-deep text-foreground">
      {/* Sidebar */}
      <div className="w-48 border-r border-border/30 bg-surface-void/50 p-3 space-y-1">
        {["Apparence", "Système", "Réseau", "À propos"].map((s, i) => (
          <div key={s} className={`px-3 py-2 rounded-lg text-xs cursor-default transition-colors
            ${i === 0 ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-surface-glass"}`}>
            {s}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-sm font-semibold mb-4">Fond d'écran</h2>
        <div className="grid grid-cols-2 gap-3">
          {wallpapers.map(w => (
            <button
              key={w.id}
              onClick={() => setWallpaper(w.id)}
              className={`h-24 rounded-xl ${w.preview} border-2 transition-all flex items-end p-2
                ${wallpaper === w.id ? "border-primary shadow-glow-primary" : "border-border/30 hover:border-border/60"}`}
            >
              <span className="text-[10px] text-white/80 font-medium">{w.name}</span>
            </button>
          ))}
        </div>

        <h2 className="text-sm font-semibold mt-8 mb-4">Informations système</h2>
        <div className="space-y-2 text-xs">
          {[
            ["Système", "Ergo Proxy Desktop v1.0"],
            ["Runtime", "Web (Electron-ready)"],
            ["Moteur", "React 18 + Vite 5"],
            ["UI", "Tailwind CSS + Framer Motion"],
            ["Thème", "Dark (Glass Morphism)"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-border/20">
              <span className="text-text-muted">{k}</span>
              <span className="text-text-secondary">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
