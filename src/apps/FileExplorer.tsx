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

export function FileExplorer({ windowId }: { windowId: string }) {
  const [pathStack, setPathStack] = useState<string[]>([]);
  const current = resolvePath(mockFs, pathStack);
  const items = current?.children ?? [];

  const navigate = (name: string) => setPathStack(prev => [...prev, name]);
  const goBack = () => setPathStack(prev => prev.slice(0, -1));
  const goHome = () => setPathStack([]);

  return (
    <div className="flex flex-col h-full bg-surface-deep text-foreground">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30 bg-surface-void/50">
        <button onClick={goBack} disabled={pathStack.length === 0}
          className="p-1 rounded hover:bg-surface-glass disabled:opacity-30 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={goHome} className="p-1 rounded hover:bg-surface-glass transition-colors">
          <Home className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 text-xs text-text-secondary flex-1 bg-surface-glass/50 rounded-lg px-2 py-1">
          <HardDrive className="w-3 h-3" />
          <span>{mockFs.name}</span>
          {pathStack.map((p, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-text-ghost" />
              <button onClick={() => setPathStack(pathStack.slice(0, i + 1))} className="hover:text-foreground transition-colors">
                {p}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-auto p-2">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            Dossier vide
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-muted border-b border-border/20">
                <th className="text-left py-1.5 px-2 font-medium">Nom</th>
                <th className="text-left py-1.5 px-2 font-medium w-24">Taille</th>
                <th className="text-left py-1.5 px-2 font-medium w-32">Modifié</th>
              </tr>
            </thead>
            <tbody>
              {items.sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name);
                return a.type === "folder" ? -1 : 1;
              }).map(item => (
                <tr
                  key={item.name}
                  onDoubleClick={() => item.type === "folder" && navigate(item.name)}
                  className="hover:bg-surface-glass/50 cursor-default rounded transition-colors"
                >
                  <td className="py-1.5 px-2 flex items-center gap-2">
                    {item.type === "folder"
                      ? <Folder className="w-4 h-4 text-intent-primary" />
                      : <File className="w-4 h-4 text-text-muted" />}
                    <span className="text-foreground">{item.name}</span>
                  </td>
                  <td className="py-1.5 px-2 text-text-muted">{item.size ?? "—"}</td>
                  <td className="py-1.5 px-2 text-text-muted">{item.modified ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Status bar */}
      <div className="px-3 py-1.5 border-t border-border/30 text-[10px] text-text-ghost bg-surface-void/30">
        {items.length} éléments
      </div>
    </div>
  );
}
