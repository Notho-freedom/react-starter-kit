import type { AppDefinition } from "../desktop/windows/types";
import { FileExplorer } from "./FileExplorer";
import { Terminal } from "./Terminal";
import { Settings } from "./Settings";
import { ChatApp } from "./ChatApp";

const registry: AppDefinition[] = [
  {
    id: "file-explorer",
    name: "Explorateur",
    icon: "📁",
    description: "Parcourir les fichiers et dossiers",
    defaultWidth: 750,
    defaultHeight: 500,
    minWidth: 500,
    minHeight: 350,
    component: FileExplorer,
    showInDock: true,
    showOnDesktop: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "⬛",
    description: "Terminal de commandes",
    defaultWidth: 650,
    defaultHeight: 420,
    minWidth: 400,
    minHeight: 250,
    component: Terminal,
    showInDock: true,
    showOnDesktop: true,
  },
  {
    id: "settings",
    name: "Paramètres",
    icon: "⚙️",
    description: "Configuration du bureau",
    defaultWidth: 600,
    defaultHeight: 450,
    minWidth: 400,
    minHeight: 300,
    component: Settings,
    showInDock: true,
    showOnDesktop: true,
  },
  {
    id: "chat",
    name: "Chat IA",
    icon: "💬",
    description: "Assistant IA conversationnel",
    defaultWidth: 500,
    defaultHeight: 550,
    minWidth: 380,
    minHeight: 400,
    component: ChatApp,
    showInDock: true,
    showOnDesktop: true,
  },
];

export function getAppRegistry(): AppDefinition[] {
  return registry;
}
