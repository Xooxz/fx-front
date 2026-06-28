import { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import { connectRateStream, type RateEvent } from "../api/rateStreamApi";
import PageContainer from "../components/common/PageContainer";
import TableBasic from "../components/table/TableBasic";

type RateRow = {
  symbol: string;
  price: number;
  previousPrice: number | null;
  change: number;
  changeRate: number;
  updatedAt: string;
  status: "LIVE" | "STALE";
};

const columnHelper = createColumnHelper<RateRow>();

const columns = [
  columnHelper.accessor("symbol", {
    header: "통화",
    size: 140,
  }),
  columnHelper.accessor("price", {
    header: "현재 환율",
    size: 140,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("previousPrice", {
    header: "이전 환율",
    size: 140,
    cell: (info) => {
      const value = info.getValue();

      return value === null ? "-" : value.toLocaleString();
    },
  }),
  columnHelper.accessor("change", {
    header: "변동",
    size: 140,
    cell: (info) => {
      const value = info.getValue();

      if (value > 0) return `▲ ${value.toFixed(2)}`;
      if (value < 0) return `▼ ${Math.abs(value).toFixed(2)}`;

      return "-";
    },
  }),
  columnHelper.accessor("changeRate", {
    header: "변동률",
    size: 140,
    cell: (info) => `${info.getValue().toFixed(2)}%`,
  }),
  columnHelper.accessor("updatedAt", {
    header: "갱신시간",
    size: 140,
  }),
  columnHelper.accessor("status", {
    header: "상태",
    size: 120,
    cell: (info) => (
      <Chip
        size="small"
        label={info.getValue()}
        color={info.getValue() === "LIVE" ? "success" : "warning"}
      />
    ),
  }),
] as ColumnDef<RateRow, unknown>[];

const RateChart = () => {
  const [rates, setRates] = useState<RateRow[]>([]);

  useEffect(() => {
    const eventSource = connectRateStream((events: RateEvent[]) => {
      const rows: RateRow[] = events.map((event) => ({
        symbol: event.symbol,
        price: event.price,
        previousPrice: event.previousPrice,
        change: event.change,
        changeRate: event.changeRate,
        updatedAt: new Date(event.createdAt).toLocaleTimeString(),
        status: "LIVE",
      }));

      setRates(rows);
    });

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
