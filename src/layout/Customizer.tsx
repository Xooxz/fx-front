import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
  IconAdjustmentsHorizontal,
  IconCheck,
  IconMaximize,
  IconShadow,
  IconSquare,
  IconX,
} from "@tabler/icons-react";

import Scrollbar from "../components/common/CustomScrollbar";
import { CustomizerContext } from "../context/customizerContext";

const SIDEBAR_WIDTH = "320px";

type ThemeColor = {
  id: number;
  bgColor: string;
  disp: string;
};

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[8],
  padding: "20px",
  cursor: "pointer",
  justifyContent: "center",
  display: "flex",
  transition: "0.1s ease-in",
  border: "1px solid rgba(145, 158, 171, 0.12)",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const themeColors: ThemeColor[] = [
  { id: 1, bgColor: "#5D87FF", disp: "BLUE_THEME" },
  { id: 2, bgColor: "#0074BA", disp: "AQUA_THEME" },
  { id: 3, bgColor: "#763EBD", disp: "PURPLE_THEME" },
  { id: 4, bgColor: "#0A7EA4", disp: "GREEN_THEME" },
  { id: 5, bgColor: "#01C0C8", disp: "CYAN_THEME" },
  { id: 6, bgColor: "#FA896B", disp: "ORANGE_THEME" },
];

/**
 * 화면 테마/레이아웃 설정 패널
 */
const Customizer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("Customizer must be used inside CustomizerContextProvider");
  }

  const {
    activeTheme,
    isLayout,
    isCardShadow,
    setIsCardShadow,
    setIsLayout,
    isBorderRadius,
    setIsBorderRadius,
    setActiveTheme,
  } = customizer;

  const handleThemeColorChange = (themeName: string) => {
    document.body.setAttribute("data-color-theme", themeName);
    setActiveTheme(themeName);
  };

  return (
    <div>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "25px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          <IconAdjustmentsHorizontal stroke={1.5} />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Settings</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>

          <Divider />

          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Theme Colors
            </Typography>

            <Grid container spacing={2}>
              {themeColors.map((themeColor) => (
                <Grid key={themeColor.id} size={4}>
                  <StyledBox onClick={() => handleThemeColorChange(themeColor.disp)}>
                    <Tooltip title={themeColor.disp} placement="top">
                      <Box
                        sx={{
                          backgroundColor: themeColor.bgColor,
                          width: "25px",
                          height: "25px",
                          borderRadius: "60px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "white",
                        }}
                        aria-label={themeColor.bgColor}
                      >
                        {activeTheme === themeColor.disp ? <IconCheck width={13} /> : null}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>

            <Box pt={4} />

            <Typography variant="h6" gutterBottom>
              Container Option
            </Typography>

            <Stack direction="row" gap={2} my={2}>
              <StyledBox onClick={() => setIsLayout("boxed")} display="flex" gap={1}>
                <IconSquare color={isLayout === "boxed" ? "currentColor" : undefined} />
                Boxed
              </StyledBox>

              <StyledBox onClick={() => setIsLayout("full")} display="flex" gap={1}>
                <IconMaximize color={isLayout === "full" ? "currentColor" : undefined} />
                Full
              </StyledBox>
            </Stack>

            <Box pt={4} />

            <Typography variant="h6" gutterBottom>
              Card With
            </Typography>

            <Stack direction="row" gap={2} my={2}>
              <StyledBox onClick={() => setIsCardShadow(false)} display="flex" gap={1}>
                <IconSquare color={!isCardShadow ? "currentColor" : undefined} />
                Border
              </StyledBox>

              <StyledBox onClick={() => setIsCardShadow(true)} display="flex" gap={1}>
                <IconShadow color={isCardShadow ? "currentColor" : undefined} />
                Shadow
              </StyledBox>
            </Stack>

            <Box pt={4} />

            <Typography variant="h6" gutterBottom>
              Theme Border Radius
            </Typography>

            <Slider
              size="small"
              value={isBorderRadius}
              aria-label="Theme border radius"
              min={4}
              max={24}
              onChange={(_, value) => {
                setIsBorderRadius(value as number);
              }}
              valueLabelDisplay="auto"
            />
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
