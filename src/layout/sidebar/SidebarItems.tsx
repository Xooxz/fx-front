import { useContext } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";

import { CustomizerContext } from "../../context/customizerContext.ts";

import MenuItems from "./MenuItems.ts";
import NavCollapse from "../navbar";
import NavGroup from "../navbar/NavGroup.tsx";
import NavItem from "../navbar/NavItem.tsx";

/**
 * 사이드바 메뉴 목록
 */
const SidebarItems = () => {
  const { pathname } = useLocation();

  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("SidebarItems must be used inside CustomizerContextProvider");
  }

  const { isSidebarHover, isCollapse } = customizer;

  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));

  // Mini Sidebar에서 Hover가 아닐 경우 메뉴 숨김
  const hideMenu = isCollapse === "mini-sidebar" && !isSidebarHover;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup key={item.subheader} item={item} hideMenu={hideMenu} />;
          }

          if (item.children) {
            return (
              <NavCollapse
                key={item.id}
                menu={item}
                level={1}
                pathDirect={pathDirect}
                pathWithoutLastPart={pathWithoutLastPart}
                hideMenu={hideMenu}
                onClick={() => {}}
              />
            );
          }

          return (
            <NavItem
              key={item.id}
              item={item}
              level={1}
              pathDirect={pathDirect}
              hideMenu={hideMenu}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
