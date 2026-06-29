import { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import PageContainer from "../components/common/PageContainer";
import TableBasic from "../components/table/TableBasic";

type ServiceHealthRow = {
  serviceName: string;
  port: number;
  status: "UP" | "DOWN" | "UNKNOWN";
  responseTime: number | null;
  checkedAt: string;
};

const columnHelper = createColumnHelper<ServiceHealthRow>();

const columns = [
  columnHelper.accessor("serviceName", {
    header: "서비스",
    cell: (info) => (
      <Typography variant="subtitle1" fontWeight={600}>
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor("port", {
    header: "포트",
  }),
  columnHelper.accessor("status", {
    header: "상태",
    cell: (info) => {
      const status = info.getValue();

      return (
        <Chip
          size="small"
          label={status}
          color={status === "UP" ? "success" : status === "DOWN" ? "error" : "warning"}
        />
      );
    },
  }),
  columnHelper.accessor("responseTime", {
    header: "응답시간",
    cell: (info) => {
      const value = info.getValue();
      return value === null ? "-" : `${value}ms`;
    },
  }),
  columnHelper.accessor("checkedAt", {
    header: "확인 시간",
  }),
] as ColumnDef<ServiceHealthRow, unknown>[];

const formatDateTime = (value: string) => {
  const date = new Date(value);

  return (
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, "0")}-` +
    `${String(date.getDate()).padStart(2, "0")} ` +
    `${String(date.getHours()).padStart(2, "0")}:` +
    `${String(date.getMinutes()).padStart(2, "0")}:` +
    `${String(date.getSeconds()).padStart(2, "0")}.` +
    `${String(date.getMilliseconds()).padStart(3, "0")}`
  );
};

const ServiceHealth = () => {
  const [services, setServices] = useState<ServiceHealthRow[]>([]);

  useEffect(() => {
    const fetchServiceHealth = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${baseUrl}/api/system/status`);

      if (!response.ok) {
        throw new Error("서비스 상태 조회 실패");
      }

      const data = (await response.json()) as ServiceHealthRow[];

      setServices(
        data.map((item) => ({
          ...item,
          checkedAt: formatDateTime(item.checkedAt),
        }))
      );
    };

    fetchServiceHealth();
  }, []);

  return (
    <PageContainer title="서비스 상태">
      <TableBasic data={services} columns={columns} />
    </PageContainer>
  );
};

export default ServiceHealth;
