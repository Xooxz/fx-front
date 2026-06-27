import { useEffect, useState, type ReactNode } from "react";

import config from "./config";
import { CustomizerContext } from "./customizerContext";

type Props = {
  children: ReactNode;
};

/**
 * 전역 UI(Customizer) 상태를 관리하는 Context Provider
 */
export const CustomizerContextProvider = ({ children }: Props) => {
  const [activeMode, setActiveMode] = useState(config.activeMode);
  const [activeTheme, setActiveTheme] = useState(config.activeTheme);

  const [isCardShadow, setIsCardShadow] = useState(config.isCardShadow);
  const [isLayout, setIsLayout] = useState(config.isLayout);
  const [isBorderRadius, setIsBorderRadius] = useState(config.isBorderRadius);
  const [isCollapse, setIsCollapse] = useState(config.isCollapse);

  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  // HTML 속성에 현재 UI 설정 적용
  useEffect(() => {
    document.documentElement.setAttribute("class", activeMode);
    document.documentElement.setAttribute("data-color-theme", activeTheme);
    document.documentElement.setAttribute("data-boxed-layout", isLayout);
    document.documentElement.setAttribute("data-sidebar-type", isCollapse);
  }, [activeMode, activeTheme, isLayout, isCollapse]);

  return (
    <CustomizerContext.Provider
      value={{
        activeMode,
        setActiveMode,

        activeTheme,
        setActiveTheme,

        isCardShadow,
        setIsCardShadow,

        isLayout,
        setIsLayout,

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
