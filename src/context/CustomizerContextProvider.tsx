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
  const [activeDir, setActiveDir] = useState(config.activeDir);
  const [activeMode, setActiveMode] = useState(config.activeMode);
  const [activeTheme, setActiveTheme] = useState(config.activeTheme);
  const [activeLayout, setActiveLayout] = useState(config.activeLayout);

  const [isCardShadow, setIsCardShadow] = useState(config.isCardShadow);
  const [isLayout, setIsLayout] = useState(config.isLayout);
  const [isBorderRadius, setIsBorderRadius] = useState(config.isBorderRadius);
  const [isCollapse, setIsCollapse] = useState(config.isCollapse);
  const [isLanguage, setIsLanguage] = useState(config.isLanguage);

  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  // HTML 속성에 현재 UI 설정 적용
  useEffect(() => {
    document.documentElement.setAttribute("class", activeMode);
    document.documentElement.setAttribute("dir", activeDir);
    document.documentElement.setAttribute("data-color-theme", activeTheme);
    document.documentElement.setAttribute("data-layout", activeLayout);
    document.documentElement.setAttribute("data-boxed-layout", isLayout);
    document.documentElement.setAttribute("data-sidebar-type", isCollapse);
  }, [activeMode, activeDir, activeTheme, activeLayout, isLayout, isCollapse]);

  return (
    <CustomizerContext.Provider
      value={{
        activeDir,
        setActiveDir,

        activeMode,
        setActiveMode,

        activeTheme,
        setActiveTheme,

        activeLayout,
        setActiveLayout,

        isCardShadow,
        setIsCardShadow,

        isLayout,
        setIsLayout,

        isBorderRadius,
        setIsBorderRadius,

        isCollapse,
        setIsCollapse,

        isLanguage,
        setIsLanguage,

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
