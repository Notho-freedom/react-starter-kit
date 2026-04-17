

# Refonte cognitive du bureau — élimination des bordures parasites + composants partagés

## Diagnostic

Pas de dossier `src/components/` ni de "composants cognitifs" stockés ailleurs — ils n'existent pas en tant que fichiers. En revanche, le **design system cognitif** est défini dans `tailwind.config.ts` :
- Tokens : `surface-{void,deep,glass,elevated}`, `intent-*`, `text-*`, `radius-cognitive`, `shadow-{glow-primary,ambient,elevated}`, easing `cognitive-enter/exit`
- Animations : `breathe`, `glow-pulse`, `orbit`, `scan-line`, `fade-in/out`, `dissolve`
- Spacing : `cognitive-sm/md/lg/xl`

Ces tokens ne sont quasiment pas utilisés. Le bureau actuel empile cartes-dans-cartes (dock = bordure + icônes bordées ; grid = bouton bordé + icône bordée) et le fond est statique.

## Ce que je vais faire (lot unique)

### 1. Créer la bibliothèque `src/components/cognitive/` (vraies briques réutilisables)

| Composant | Rôle | Anti-pattern évité |
|---|---|---|
| `CognitiveSurface` | Conteneur glass de base (variants: `void`, `glass`, `elevated`, `floating`) avec **zéro bordure par défaut** — séparation par ombre/luminance | bordure systématique |
| `CognitiveCard` | Carte de réponse (le composant de référence demandé) — surface unique, pas de wrapper | bordures empilées |
| `CognitiveWindow` | Étend `CognitiveCard` avec titlebar, drag, resize, min/max/close (remplace `WindowFrame` actuel) | titlebar séparée par bordure |
| `CognitiveDock` | Dock sans bordure interne sur les icônes — l'élévation seule différencie hover/actif | icône bordée dans dock bordé |
| `CognitiveIcon` | Icône applicative — au repos: pure (pas de carte), au hover: halo `glow-primary` + scale, sans bordure | double carte hover/icon |
| `CognitiveOrb` | Orbe lumineuse animée (`breathe`, `orbit`) pour fond et accents | — |
| `CognitiveScanline` | Ligne de scan animée (`scan-line`) overlay subtil | — |
| `CognitivePill` | Badge/indicateur (statut, raccourci kbd) sans bordure | `<kbd>` bordé |
| `CognitiveCommandPalette` | Palette Spotlight stylée cognitive | bordures sur input + items |
| `CognitiveContextMenu` | Menu contextuel cognitif | — |

Toutes ces briques utilisent **uniquement** les tokens cognitifs (surface/intent/shadow/easing). Règle stricte : **une seule frontière visuelle par niveau de profondeur** — soit ombre, soit luminance, jamais bordure + ombre + carte interne.

### 2. Refondre le fond — animations vivantes

Nouveau `DesktopBackground` :
- Gradient mesh animé bleu/violet/cyan (mouvement lent, 30–60s)
- 5–7 `CognitiveOrb` qui dérivent (`breathe` + translate)
- Couche de particules légère (canvas) — points lumineux qui dérivent
- `CognitiveScanline` horizontale très discrète (opacité 0.04)
- Grille subtile en parallaxe douce sur mouvement souris
- Vignette radiale pour focaliser le regard

### 3. Refondre les surfaces du bureau (sans bordures parasites)

- **TopBar** : surface flottante translucide, séparée du fond uniquement par `shadow-ambient` + backdrop-blur. Items = texte/icône nus, hover = halo lumineux (pas de carte).
- **Dock** : un seul plan (`surface-glass` + `shadow-elevated`). Icônes nues au repos, agrandissement + halo au hover (pas de carte interne).
- **DesktopGrid** : icônes nues (juste l'emoji/glyphe) + label. Hover = halo radial doux derrière l'icône, pas de carte.
- **Window** : titlebar fondue dans la surface (pas de bordure de séparation — un dégradé subtil suffit). Boutons ronds colorés discrets façon macOS, sans carte.
- **CommandBar** : input sans bordure, items à séparation par luminance au focus.

### 4. Brancher l'existant sur les nouveaux composants

- `WindowManager` utilise `CognitiveWindow` au lieu de `WindowFrame`
- `FileExplorer`, `Terminal`, `Settings`, `ChatApp` re-stylés avec `CognitiveSurface` (suppression des cartes internes redondantes)
- `useDesktopState` inchangé, `useWindowManager` inchangé

### 5. Détails de polish

- Transitions sur `cognitive-enter/exit` partout (220–360ms)
- Ouverture de fenêtre : `fade-in` + scale doux + halo `glow-pulse` 1× au focus
- Fermeture : `dissolve`
- Apparition du dock : `breathe` au mount
- Curseur custom subtil sur le bureau

## Arborescence finale

```text
src/
├── components/cognitive/
│   ├── CognitiveSurface.tsx
│   ├── CognitiveCard.tsx
│   ├── CognitiveWindow.tsx       (← remplace desktop/windows/WindowFrame)
│   ├── CognitiveDock.tsx
│   ├── CognitiveIcon.tsx
│   ├── CognitiveOrb.tsx
│   ├── CognitiveScanline.tsx
│   ├── CognitivePill.tsx
│   ├── CognitiveCommandPalette.tsx
│   ├── CognitiveContextMenu.tsx
│   └── index.ts
├── desktop/
│   ├── DesktopShell.tsx          (refondu)
│   ├── DesktopBackground.tsx     (refondu — mesh + particules + orbs)
│   ├── DesktopTopBar.tsx         (refondu, sans bordures)
│   ├── DesktopDock.tsx           (utilise CognitiveDock)
│   ├── DesktopGrid.tsx           (utilise CognitiveIcon)
│   ├── DesktopCommandBar.tsx     (utilise CognitiveCommandPalette)
│   ├── DesktopContextMenu.tsx    (utilise CognitiveContextMenu)
│   └── windows/
│       ├── WindowManager.tsx     (utilise CognitiveWindow)
│       ├── useWindowManager.ts   (inchangé)
│       └── types.ts              (inchangé)
└── apps/                          (re-stylées sans cartes internes)
```

## Règles strictes appliquées partout

1. **Jamais de bordure visible sauf pour un focus actif explicite.** Séparation = surface + ombre + backdrop-blur.
2. **Jamais d'icône dans une carte dans un dock dans une carte.** Maximum 1 niveau de surface autour d'un contenu interactif.
3. **Hover** = halo lumineux (glow), élévation, ou scale — **jamais** ajout de bordure ou de fond plein.
4. **Transitions cognitives uniquement** (`cognitive-enter/exit`, durées du token).

## Lot unique

Tout en une passe pour tenir sur les crédits restants : 10 composants cognitifs + refonte du fond + refactor des 6 fichiers desktop + restyle des 4 apps.

