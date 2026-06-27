import { uniqueId } from "lodash";
import type { ChipProps } from "@mui/material/Chip";
import type { Icon } from "@tabler/icons-react";

import { IconLayoutCollage } from "@tabler/icons-react";

export interface MenuItem {
  id?: string;
  navLabel?: boolean;
  subheader?: string;

  title?: string;
  href?: string;

  icon?: Icon;

  children?: MenuItem[];

  chip?: string;
  chipColor?: ChipProps["color"];
  variant?: ChipProps["variant"];

  external?: boolean;
}

const MenuItems: MenuItem[] = [
  {
    navLabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "대시보드",
    icon: IconLayoutCollage,
    href: "/",
    chipColor: "secondary",
  },
];

export default MenuItems;
