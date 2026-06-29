import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme, type Theme } from "@mui/material/styles";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { IconProps } from "@tabler/icons-react";

import { CustomizerContext } from "../../context/customizerContext.ts";
import config from "../../context/config";
import NavItem from "./NavItem.tsx";

type NavGroupProps = {
  id?: string;
  navLabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: React.ComponentType<IconProps>;
  href?: string;
  children?: NavGroupProps[];
};

interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: string;
  pathDirect: string;
  hideMenu: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ListItemStyled = styled(ListItemButton)({
  marginBottom: "2px",
  padding: "8px 10px",
  whiteSpace: "nowrap",
});

/**
 * 하위 메뉴를 가진 사이드바 메뉴
 */
export default function NavCollapse({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}: NavCollapseProps) {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("NavCollapse must be used inside CustomizerContextProvider");
  }

  const theme = useTheme<Theme>();
  const { pathname } = useLocation();

  const [userOpen, setUserOpen] = useState(false);

  const Icon = menu.icon;

  const menuIcon = Icon ? <Icon stroke={1.5} size={level > 1 ? "1rem" : "1.3rem"} /> : null;

  const isChildActive = menu.children?.some((item) => item.href === pathname) ?? false;

  const isActive = Boolean(menu.href && pathname.includes(menu.href));

  const open = userOpen || isChildActive;

  const handleClick = () => {
    setUserOpen((prev) => !prev);
  };

  const submenus = menu.children?.map((item) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }

    return (
      <NavItem
        key={item.id}
        item={item}
        level={level + 1}
        pathDirect={pathDirect}
        hideMenu={hideMenu}
        onClick={onClick}
      />
    );
  });

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        sx={{
          paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",

          backgroundColor: open && level < 2 ? theme.palette.primary.main : "transparent",

          color:
            open && level < 2
              ? "white"
              : level > 1 && open
                ? theme.palette.primary.main
                : theme.palette.text.secondary,

          borderRadius: `${config.isBorderRadius}px`,

          "&:hover": {
            backgroundColor:
              isActive || open ? theme.palette.primary.main : theme.palette.primary.light,
            color: isActive || open ? "white" : theme.palette.primary.main,
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>

        <ListItemText color="inherit">{hideMenu ? "" : menu.title}</ListItemText>

        {open ? <IconChevronUp size="1rem" /> : <IconChevronDown size="1rem" />}
      </ListItemStyled>

      <Collapse in={open} timeout="auto">
        {submenus}
      </Collapse>
    </>
  );
}
