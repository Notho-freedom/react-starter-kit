export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
}

export interface WindowConfig {
  appId: string;
  title: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  icon?: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  component: React.ComponentType<{ windowId: string }>;
  showInDock?: boolean;
  showOnDesktop?: boolean;
}
