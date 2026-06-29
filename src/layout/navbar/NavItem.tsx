import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import { CustomizerContext } from "../../context/customizerContext.ts";
import config from "../../context/config";

type NavGroup = {
  id?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ElementType;
  href?: string;
  chip?: string;
  chipColor?: ChipProps["color"];
  variant?: ChipProps["variant"];
  disabled?: boolean;
};

type Props = {
  item: NavGroup;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: boolean;
  level?: number;
  pathDirect: string;
};

const ListItemStyled = styled(ListItemButton)({
  whiteSpace: "nowrap",
  marginBottom: "2px",
  padding: "8px 10px",
});

/**
 * 사이드바 단일 메뉴 아이템
 */
export default function NavItem({ item, level = 1, pathDirect, hideMenu = false, onClick }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("NavItem must be used inside CustomizerContextProvider");
  }

  const Icon = item.icon;

  const itemIcon = Icon ? <Icon stroke={1.5} size={level > 1 ? "1rem" : "1.3rem"} /> : null;

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    if (item.href) {
      navigate(item.href);
    }

    onClick?.(event);
  };

  return (
    <List component="li" disablePadding>
      <ListItemStyled
        disabled={item.disabled}
        selected={pathDirect === item.href}
        onClick={handleItemClick}
        sx={{
          borderRadius: `${config.isBorderRadius}px`,
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          color:
            level > 1 && pathDirect === item.href
              ? `${theme.palette.primary.main}!important`
              : theme.palette.text.secondary,
          paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",

          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },

          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: "white",

            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color:
              level > 1 && pathDirect === item.href
                ? `${theme.palette.primary.main}!important`
                : "inherit",
          }}
        >
          {itemIcon}
        </ListItemIcon>

        <ListItemText
          primary={hideMenu ? "" : item.title}
          secondary={
            item.subtitle && !hideMenu ? (
              <Typography variant="caption">{item.subtitle}</Typography>
            ) : null
          }
        />

        {!item.chip || hideMenu ? null : (
          <Chip
            color={item.chipColor}
            variant={item.variant ?? "filled"}
            size="small"
            label={item.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
}
