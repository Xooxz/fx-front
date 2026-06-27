import _ from "lodash";
import { useContext, useEffect } from "react";
import { createTheme, type ThemeOptions } from "@mui/material/styles";

import { CustomizerContext } from "../../context/customizerContext";
import components from "./Components";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import { DarkThemeColors } from "./DarkThemeColors";
import { LightThemeColors } from "./LightThemeColors";
import { darkshadows, shadows } from "./Shadows";
import typography from "./Typography";

type BuildThemeConfig = {
  direction: "ltr" | "rtl";
  theme: string;
  activeMode: "light" | "dark";
  isBorderRadius: number;
};

export const BuildTheme = (config: BuildThemeConfig) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkThemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);

  const defaultTheme = config.activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow = config.activeMode === "dark" ? darkshadows : shadows;
  const themeSelect = config.activeMode === "dark" ? darkThemeOptions : themeOptions;

  const baseMode: ThemeOptions = {
    palette: {
      mode: config.activeMode,
    },
    shape: {
      borderRadius: config.isBorderRadius,
    },
    shadows: defaultShadow,
    typography,
    direction: config.direction,
  };

  let theme = createTheme(_.merge({}, baseMode, defaultTheme, themeSelect));

  theme = createTheme(theme, {
    components: components(theme),
  });

  return theme;
};

export const ThemeSettings = () => {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("ThemeSettings must be used inside CustomizerContextProvider");
  }

  const { activeDir, activeTheme, activeMode, isBorderRadius } = customizer;

  const theme = BuildTheme({
    direction: activeDir as "ltr" | "rtl",
    theme: activeTheme,
    activeMode: activeMode as "light" | "dark",
    isBorderRadius,
  });

  useEffect(() => {
    document.dir = activeDir;
  }, [activeDir]);

  return theme;
};
