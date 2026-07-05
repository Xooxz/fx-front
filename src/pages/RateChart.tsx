import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import { connectRateStream, type RateEvent } from "../api/rateStreamApi";
import PageContainer from "../components/common/PageContainer";
import TableBasic from "../components/table/TableBasic";

/**
 * 환율 테이블 Row 데이터
 */
type RateRow = {
  symbol: string;
  countryName: string;
  price: number;
  change: number;
  changeRate: number;
  updatedAt: string;
};

const columnHelper = createColumnHelper<RateRow>();

/**
 * 날짜 문자열을 화면 표시 형식으로 변환
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

/**
 * 환율 테이블 컬럼 정의
 */
const columns = [
  columnHelper.accessor("symbol", {
    header: "통화",
    size: 160,
    cell: ({ row, getValue }) => {
      const [base, quote] = getValue().split("-");
      const countryName = row.original.countryName;

      return (
        <Box>
          <Typography variant="subtitle1">
            {base}
            <Typography component="span" variant="body1">
              {" - "}
              {quote}
            </Typography>
          </Typography>

          <Typography variant="body2">{countryName}</Typography>
        </Box>
      );
    },
  }),

  columnHelper.accessor("price", {
    header: "현재 환율",
    size: 150,
    cell: (info) => (
      <Typography variant="subtitle1">{info.getValue().toLocaleString()} </Typography>
    ),
  }),

  columnHelper.accessor("changeRate", {
    header: "변동",
    size: 160,
    cell: ({ row, getValue }) => {
      const change = row.original.change;
      const changeRate = getValue();

      const isUp = change > 0;
      const isDown = change < 0;

      return (
        <Stack spacing={0}>
          <Typography
            variant="body1"
            sx={{
              color: isUp ? "rate.up" : isDown ? "rate.down" : "text.secondary",
            }}
          >
            {changeRate > 0 && "+ "}
            {changeRate.toFixed(2)}%
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: isUp ? "rate.up" : isDown ? "rate.down" : "text.primary",
            }}
          >
            {isUp && "+ "}
            {isDown && "- "}
            {Math.abs(change).toFixed(2)}
          </Typography>
        </Stack>
      );
    },
  }),

  columnHelper.accessor("updatedAt", {
    header: "갱신 시간",
    size: 180,
    cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
  }),
] as ColumnDef<RateRow, unknown>[];

/**
 * 실시간 환율 화면
 */
const RateChart = () => {
  const [rates, setRates] = useState<RateRow[]>([]);

  useEffect(() => {
    // SSE 연결 후 전체 환율 목록을 수신
    const eventSource = connectRateStream((events: RateEvent[]) => {
      const rows = events.map((event) => ({
        symbol: event.symbol,
        countryName: event.countryName,
        price: event.price,
        change: event.change,
        changeRate: event.changeRate,
        updatedAt: formatDateTime(event.updatedAt),
      }));

      setRates(rows);
    });

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <PageContainer title="실시간 환율">
      <TableBasic data={rates} columns={columns} />
    </PageContainer>
  );
};

export default RateChart;
