import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const SimpleBarStyle = styled(SimpleBar)({
  maxHeight: "100%",
});

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * 공통 스크롤바 컴포넌트
 */
const Scrollbar = ({ children, sx, ...other }: Props) => {
  return (
    <SimpleBarStyle style={{ height: "100%" }} {...other}>
      <Box sx={sx}>{children}</Box>
    </SimpleBarStyle>
  );
};

export default Scrollbar;
