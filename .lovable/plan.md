

# Ergo Proxy — Bureau Desktop Web Premium

## Constat

Le répertoire `src/` est **complètement vide** — le clone n'a apporté que les fichiers de config (package.json, vite.config, tailwind, .env). Il faut créer toute l'application from scratch.

## Ce que je vais construire

Un **bureau desktop immersif** en web (qui sera ensuite wrappé dans Electron), inspiré Steam Big Picture / Windows 11 / macOS, avec un système d'orchestration de composants (fenêtres, widgets, dock, etc.).

## Architecture

```text
src/
├── main.tsx                          ← entry point
├── App.tsx                           ← router + providers
├── index.css                         ← theme CSS variables + fond premium
├── lib/utils.ts                      ← cn() helper
├── desktop/
│   ├── DesktopShell.tsx              ← layout principal du bureau
│   ├── DesktopBackground.tsx         ← fond animé premium (gradients, orbs)
│   ├── DesktopTopBar.tsx             ← barre status haut (heure, wifi, batterie, user)
│   ├── DesktopDock.tsx               ← dock bas type macOS (apps lancables)
│   ├── DesktopGrid.tsx               ← grille d'icônes/raccourcis sur le bureau
│   ├── DesktopCommandBar.tsx         ← Ctrl+K command palette (Spotlight-like)
│   ├── DesktopContextMenu.tsx        ← clic droit sur bureau
│   ├── DesktopNotificationCenter.tsx ← panneau notifications
│   └── windows/
│       ├── WindowManager.tsx         ← orchestrateur : z-index, focus, positions
│       ├── WindowFrame.tsx           ← fenêtre draggable/resizable avec titre
│       ├── useWindowManager.ts       ← hook/store : open, close, minimize, maximize, focus, snap
│       └── types.ts                  ← WindowState, WindowConfig
├── apps/                             ← "applications" du bureau
│   ├── FileExplorer.tsx
│   ├── Terminal.tsx
│   ├── Settings.tsx
│   ├── ChatApp.tsx
│   └── AppRegistry.ts               ← registre des apps disponibles
├── widgets/
│   ├── ClockWidget.tsx
│   ├── WeatherWidget.tsx
│   ├── SystemMonitorWidget.tsx
│   └── QuickNotesWidget.tsx
├── hooks/
│   ├── useDesktopState.ts            ← état global bureau (React Context)
│   └── useKeyboardShortcuts.ts       ← raccourcis clavier globaux
└── components/ui/                    ← shadcn components (existants dans package.json)
```

## Fond premium

Reprise de l'ambiance décrite dans le plan : fond sombre avec des orbes lumineuses animées (bleu/violet), style glassmorphism. Identique en web et futur Electron.

## Système d'orchestration (WindowManager)

- Chaque "app" s'ouvre dans une `WindowFrame` gérée par le `WindowManager`
- Drag & drop pour déplacer les fenêtres
- Resize par les bords
- Minimize (dans le dock), Maximize (plein écran), Close
- Z-index dynamique (la fenêtre focusée passe au-dessus)
- Snap aux bords (gauche/droite = 50%)
- État centralisé via React Context

## Composants du bureau

| Composant | Description |
|-----------|-------------|
| DesktopBackground | Canvas/CSS avec gradient animé + orbes flottantes |
| DesktopTopBar | Heure, date, indicateurs système, avatar user, notifications |
| DesktopDock | Barre d'apps en bas, icônes avec tooltip, animation hover |
| DesktopGrid | Icônes sur le bureau (double-clic ouvre l'app) |
| DesktopCommandBar | Ctrl+K → recherche/lancement rapide |
| DesktopContextMenu | Clic droit → options bureau |
| WindowFrame | Fenêtre avec titlebar, drag, resize, min/max/close |

## Apps incluses

- **File Explorer** : navigation dossiers (mock en web, réel en Electron)
- **Terminal** : émulateur basique
- **Settings** : thème, wallpaper, préférences
- **Chat** : utilise les APIs AI du .env (Groq/OpenRouter)

## Widgets

Petits composants flottants sur le bureau : horloge, météo, notes rapides, moniteur système.

## Dépendances existantes utilisées

Tout est déjà dans package.json : React, Framer Motion (animations), Radix UI (menus, dialogs), lucide-react (icônes), cmdk (command palette), react-resizable-panels.

## Lot unique

Tout sera créé en un seul passage pour économiser les crédits : structure complète, fond animé, dock, topbar, window manager, 4 apps, widgets, raccourcis clavier, command bar.

