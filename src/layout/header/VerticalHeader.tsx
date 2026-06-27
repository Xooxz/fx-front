import { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";

import { CustomizerContext } from "../../context/customizerContext.ts";
import config from "../../context/config.ts";

import Profile from "./Profile.tsx";
import Notifications from "./Notification.tsx";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const VerticalHeader = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("VerticalHeader must be used inside CustomizerContextProvider");
  }

  const { activeMode, setActiveMode, setIsCollapse, isCollapse } = customizer;

  return (
    <AppBarStyled
      position="sticky"
      color="default"
      sx={{
        minHeight: {
          lg: config.topbarHeight,
        },
      }}
    >
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            if (!lgUp) return;

            setIsCollapse(isCollapse === "full-sidebar" ? "mini-sidebar" : "full-sidebar");
          }}
        >
          <IconMenu2 size={20} />
        </IconButton>

        <Box flexGrow={1} />

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="large" color="inherit">
            {activeMode === "light" ? (
              <IconMoon size="21" stroke="1.5" onClick={() => setActiveMode("dark")} />
            ) : (
              <IconSun size="21" stroke="1.5" onClick={() => setActiveMode("light")} />
            )}
          </IconButton>
          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default VerticalHeader;
