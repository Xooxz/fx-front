import { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import PageContainer from "../components/common/PageContainer";
import TableBasic from "../components/table/TableBasic";

/**
 * 서비스 상태 테이블 Row 타입
 */
type ServiceHealthRow = {
  serviceName: string;
  port: number;
  status: "UP" | "DOWN" | "UNKNOWN";
  responseTime: number | null;
  checkedAt: string;
};

/**
 * 날짜 문자열을 yyyy-MM-dd HH:mm:ss.SSS 형식으로 변환한다.
 */
const formatDateTime = (value: string): string => {
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

const columnHelper = createColumnHelper<ServiceHealthRow>();

/**
 * 서비스 상태 테이블 컬럼 정의
 */
const columns = [
  columnHelper.accessor("serviceName", {
    header: "서비스",
    size: 220,
    cell: (info) => (
      <Typography variant="subtitle1" fontWeight={600}>
        {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("port", {
    header: "포트",
    size: 100,
    cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
  }),

  columnHelper.accessor("status", {
    header: "상태",
    size: 120,
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
    size: 120,
    cell: (info) => {
      const value = info.getValue();

      return <Typography variant="body1">{value === null ? "-" : `${value} ms`}</Typography>;
    },
  }),

  columnHelper.accessor("checkedAt", {
    header: "마지막 확인",
    size: 220,
    cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
  }),
] as ColumnDef<ServiceHealthRow, unknown>[];

/**
 * 서비스 상태 조회 화면
 */
const ServiceHealth = () => {
  const [services, setServices] = useState<ServiceHealthRow[]>([]);

  useEffect(() => {
    const fetchServiceHealth = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/system/status`);

        if (!response.ok) {
          console.error("서비스 상태 조회 실패");
          return;
        }

        const data = (await response.json()) as ServiceHealthRow[];

        setServices(
          data.map((item) => ({
            ...item,
            checkedAt: formatDateTime(item.checkedAt),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    void fetchServiceHealth();
  }, []);

  return (
    <PageContainer title="서비스 상태">
      <TableBasic data={services} columns={columns} />
    </PageContainer>
  );
};

export default ServiceHealth;
