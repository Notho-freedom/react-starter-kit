import { useState } from "react";
import { ChevronRight, Folder, File, HardDrive, ArrowLeft, Home } from "lucide-react";

interface FsNode {
  name: string;
  type: "folder" | "file";
  size?: string;
  modified?: string;
  children?: FsNode[];
}

const mockFs: FsNode = {
  name: "C:", type: "folder", children: [
    { name: "Users", type: "folder", children: [
      { name: "ergo", type: "folder", children: [
        { name: "Documents", type: "folder", children: [
          { name: "projet.md", type: "file", size: "12 KB", modified: "15 avr. 2026" },
          { name: "notes.txt", type: "file", size: "2 KB", modified: "14 avr. 2026" },
          { name: "rapport.pdf", type: "file", size: "1.2 MB", modified: "10 avr. 2026" },
        ]},
        { name: "Images", type: "folder", children: [
          { name: "wallpaper.png", type: "file", size: "4.5 MB", modified: "12 avr. 2026" },
          { name: "screenshot.jpg", type: "file", size: "890 KB", modified: "11 avr. 2026" },
        ]},
        { name: "Desktop", type: "folder", children: [] },
        { name: "Downloads", type: "folder", children: [
          { name: "setup.exe", type: "file", size: "45 MB", modified: "16 avr. 2026" },
        ]},
      ]},
    ]},
    { name: "Program Files", type: "folder", children: [
      { name: "ErgoProxy", type: "folder", children: [
        { name: "ergo.exe", type: "file", size: "28 MB", modified: "1 avr. 2026" },
        { name: "config.json", type: "file", size: "4 KB", modified: "1 avr. 2026" },
      ]},
    ]},
    { name: "Windows", type: "folder", children: [] },
  ]
};

function resolvePath(root: FsNode, path: string[]): FsNode | null {
  let current = root;
  for (const p of path) {
    const child = current.children?.find(c => c.name === p);
    if (!child) return null;
    current = child;
  }
  return current;
}

export function FileExplorer({ }: { windowId: string }) {
  const [pathStack, setPathStack] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const current = resolvePath(mockFs, pathStack);
  const items = current?.children ?? [];

  const navigate = (name: string) => { setPathStack(prev => [...prev, name]); setSelected(null); };
  const goBack = () => { setPathStack(prev => prev.slice(0, -1)); setSelected(null); };
  const goHome = () => { setPathStack([]); setSelected(null); };

  return (
    <div className="flex flex-col h-full text-text-primary">
      {/* Toolbar — no border, separated by luminance */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "linear-gradient(180deg, hsl(var(--surface-void) / 0.4), transparent)" }}
      >
        <button
          onClick={goBack}
          disabled={pathStack.length === 0}
          className="p-1.5 rounded-md hover:bg-surface-glass/60 disabled:opacity-30 transition-colors duration-micro"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={goHome} className="p-1.5 rounded-md hover:bg-surface-glass/60 transition-colors duration-micro">
          <Home className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 text-xs text-text-secondary flex-1 bg-surface-glass/30 hover:bg-surface-glass/50 transition-colors rounded-lg px-2.5 py-1.5">
          <HardDrive className="w-3 h-3 text-text-muted" />
          <span className="font-medium">{mockFs.name}</span>
          {pathStack.map((p, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-text-ghost" />
              <button onClick={() => setPathStack(pathStack.slice(0, i + 1))} className="hover:text-text-primary transition-colors">
                {p}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* File list — rows separated only by hover state */}
      <div className="flex-1 overflow-auto px-2 pb-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted text-sm gap-2">
            <Folder className="w-10 h-10 text-text-ghost" />
            <p>Dossier vide</p>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-ghost">
                <th className="text-left py-2 px-3 font-medium uppercase tracking-wider text-[10px]">Nom</th>
                <th className="text-left py-2 px-3 font-medium uppercase tracking-wider text-[10px] w-24">Taille</th>
                <th className="text-left py-2 px-3 font-medium uppercase tracking-wider text-[10px] w-32">Modifié</th>
              </tr>
            </thead>
            <tbody>
              {items.sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name);
                return a.type === "folder" ? -1 : 1;
              }).map(item => {
                const isSelected = selected === item.name;
                return (
                  <tr
                    key={item.name}
                    onClick={() => setSelected(item.name)}
                    onDoubleClick={() => item.type === "folder" && navigate(item.name)}
                    className={`cursor-default rounded-lg transition-colors duration-micro ${
                      isSelected ? "bg-intent-primary/15" : "hover:bg-surface-glass/40"
                    }`}
                  >
                    <td className="py-2 px-3 flex items-center gap-2.5 rounded-l-lg">
                      {item.type === "folder"
                        ? <Folder className="w-4 h-4 text-intent-primary-glow" />
                        : <File className="w-4 h-4 text-text-muted" />}
                      <span className="text-text-primary">{item.name}</span>
                    </td>
                    <td className="py-2 px-3 text-text-muted">{item.size ?? "—"}</td>
                    <td className="py-2 px-3 text-text-muted rounded-r-lg">{item.modified ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Status bar — luminance separation only */}
      <div
        className="px-3 py-1.5 text-[10px] text-text-ghost"
        style={{ background: "linear-gradient(0deg, hsl(var(--surface-void) / 0.4), transparent)" }}
      >
        {items.length} élément{items.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}
