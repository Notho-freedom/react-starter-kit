# Desktop Workspace Prototype

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-desktop-47848F?logo=electron&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-tests-6E9F18?logo=vitest&logoColor=white)

This repository is no longer accurately described by the default Lovable starter README. The current codebase is a **desktop workspace prototype** built with React and Vite, with an Electron companion and a window-management-oriented UI.

## What is implemented

The current React application renders a desktop-style shell with:

- Desktop background and top bar
- Dock
- Application grid
- Command bar
- Context menu
- Window manager
- Keyboard shortcuts
- Centralized desktop state
- Dark toast notifications

The project also contains AI/service integrations in its dependency graph, including OpenAI, Groq and Google authentication libraries, but this README does not claim specific user-facing AI features without corresponding verified UI behavior.

## Architecture

```text
React renderer
    │
    ├── DesktopStateProvider
    │
    └── DesktopShell
          ├── DesktopBackground
          ├── DesktopTopBar
          ├── DesktopGrid
          ├── WindowManager
          ├── DesktopDock
          ├── DesktopCommandBar
          └── DesktopContextMenu

Electron companion
    └── electron/
```

## Tech stack

- **React 18**
- **TypeScript 5**
- **Vite 5**
- **Tailwind CSS 3**
- **Radix UI / shadcn-style components**
- **Framer Motion**
- **Supabase client**
- **OpenAI SDK**
- **Groq SDK**
- **systeminformation** for system-oriented capabilities
- **Vitest + Testing Library**
- **Electron** for desktop integration

## Development

### Requirements

- Node.js
- npm

### Install

```bash
npm install
```

### Run the web application

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm run test
```

### Desktop development

The repository includes dedicated desktop scripts:

```bash
npm run dev:desktop
npm run electron
```

The exact Electron packaging/runtime behavior should be checked against the `electron/` project before treating this as a production desktop application.

## Project structure

```text
src/
├── desktop/       # Desktop shell and window management
├── hooks/         # Desktop/application state and shortcuts
├── components/    # Shared UI
└── ...

electron/          # Electron-side application code
scripts/            # Desktop development helpers
```

## Status

This is an experimental desktop-workspace codebase. The UI shell is substantially beyond a generic starter template, but the repository should still be treated as a prototype unless its Electron packaging and backend integrations have been validated for production use.

## License

No explicit license file was identified in the current repository. Treat the project as **all rights reserved** unless a license is added.