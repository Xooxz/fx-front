import { createContext } from "react";

export interface CustomizerContextState {
  activeMode: string;
  setActiveMode: (mode: string) => void;

  activeTheme: string;
  setActiveTheme: (theme: string) => void;

  isBorderRadius: number;
  setIsBorderRadius: (radius: number) => void;

  isCollapse: string;
  setIsCollapse: (collapse: string) => void;

  isSidebarHover: boolean;
  setIsSidebarHover: (isHover: boolean) => void;

  isMobileSidebar: boolean;
  setIsMobileSidebar: (isMobileSidebar: boolean) => void;
}

export const CustomizerContext = createContext<CustomizerContextState | undefined>(undefined);
