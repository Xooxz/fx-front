import { useContext } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";

import Scrollbar from "../../components/custom/CustomScrollbar.tsx";
import { CustomizerContext } from "../../context/customizerContext.ts";
import config from "../../context/config.ts";
import SidebarItems from "./SidebarItems.tsx";

/**
 * 좌측 사이드바 영역
 */
const Sidebar = () => {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("Sidebar must be used inside CustomizerContextProvider");
  }

  const { isCollapse, isSidebarHover, setIsSidebarHover } = customizer;
  const theme = useTheme();

  const isMiniSidebar = isCollapse === "mini-sidebar";

  const sidebarWidth =
    isMiniSidebar && !isSidebarHover ? config.miniSidebarWidth : config.sidebarWidth;

  const handleMouseEnter = () => {
    if (isMiniSidebar) {
      setIsSidebarHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsSidebarHover(false);
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        width: sidebarWidth,
        flexShrink: 0,
        ...(isMiniSidebar && {
          position: "absolute",
        }),
      }}
    >
      <Drawer
        anchor="left"
        variant="permanent"
        open
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              duration: theme.transitions.duration.shortest,
            }),
          },
        }}
      >
        <Box sx={{ height: "100%" }}>
          <Scrollbar sx={{ height: "calc(100% - 110px)" }}>
            <SidebarItems />
          </Scrollbar>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
