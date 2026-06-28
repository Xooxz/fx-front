import { useEffect, useState, type ReactNode } from "react";

import config from "./config";
import { CustomizerContext } from "./customizerContext";

const STORAGE_KEY = "fx-pulse-ui";

type Props = {
  children: ReactNode;
};

const getStoredValue = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultValue;
    }

    const settings = JSON.parse(saved);

    return settings[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * 전역 UI(Customizer) 상태를 관리하는 Context Provider
 */
export const CustomizerContextProvider = ({ children }: Props) => {
  const [activeMode, setActiveMode] = useState(() =>
    getStoredValue("activeMode", config.activeMode)
  );

  const [activeTheme, setActiveTheme] = useState(() =>
    getStoredValue("activeTheme", config.activeTheme)
  );

  const [isBorderRadius, setIsBorderRadius] = useState(config.isBorderRadius);
  const [isCollapse, setIsCollapse] = useState(config.isCollapse);

  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  /**
   * HTML 속성에 현재 UI 설정 적용
   */
  useEffect(() => {
    document.documentElement.setAttribute("class", activeMode);
    document.documentElement.setAttribute("data-color-theme", activeTheme);
    document.documentElement.setAttribute("data-sidebar-type", isCollapse);
  }, [activeMode, activeTheme, isCollapse]);

  /**
   * Theme 설정 저장
   */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeMode,
        activeTheme,
      })
    );
  }, [activeMode, activeTheme]);

  return (
    <CustomizerContext.Provider
      value={{
        activeMode,
        setActiveMode,

        activeTheme,
        setActiveTheme,

        isBorderRadius,
        setIsBorderRadius,

        isCollapse,
        setIsCollapse,

        isSidebarHover,
        setIsSidebarHover,

        isMobileSidebar,
        setIsMobileSidebar,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};
