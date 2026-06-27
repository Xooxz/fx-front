import { uniqueId } from "lodash";
import type { ChipProps } from "@mui/material/Chip";
import { type Icon, IconActivityHeartbeat, IconChartLine, IconLogs } from "@tabler/icons-react";

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
  {
    navLabel: true,
    subheader: "Rate",
  },
  {
    id: uniqueId(),
    title: "실시간 환율",
    icon: IconChartLine,
    href: "/rates/chart",
    chipColor: "secondary",
  },
  {
    navLabel: true,
    subheader: "Monitoring",
  },
  {
    id: uniqueId(),
    title: "이벤트 로그",
    icon: IconLogs,
    href: "/monitoring/events",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "서비스 상태",
    icon: IconActivityHeartbeat,
    href: "/monitoring/health",
    chipColor: "secondary",
  },
];

export default MenuItems;
