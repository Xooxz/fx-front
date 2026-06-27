import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";

import { CustomizerContext } from "../context/customizerContext";
import Sidebar from "./sidebar/Sidebar";
import VerticalHeader from "./header/VerticalHeader";

const MainWrapper = styled("div")({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
});

const PageWrapper = styled(Box)({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
});

/**
 * 관리자 대시보드 공통 레이아웃
 */
const DashboardLayout = () => {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("DashboardLayout must be used inside CustomizerContextProvider");
  }

  const { isLayout, isCollapse } = customizer;
  const theme = useTheme();

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar />

      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(isCollapse === "mini-sidebar" && {
            [theme.breakpoints.up("lg")]: {
              ml: "87px",
            },
          }),
        }}
      >
        <VerticalHeader />

        <Container
          maxWidth={false}
          sx={{
            pt: "24px",
            px: "24px",
            maxWidth: isLayout === "boxed" ? "1200px" : "100%",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DashboardLayout;
