import { useEffect, useState } from "react";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import { connectRateStream, type RateEvent } from "../api/rateStreamApi";
import PageContainer from "../components/common/PageContainer";
import TableBasic from "../components/table/TableBasic";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

type RateRow = {
  symbol: string;
  price: number;
  previousPrice: number | null;
  change: number;
  changeRate: number;
  updatedAt: string;
};

const columnHelper = createColumnHelper<RateRow>();

const columns = [
  columnHelper.accessor("symbol", {
    header: "통화",
    size: 140,
      cell: (info) => {
          const [base, quote] = info.getValue().split("-");

          return (
              <Box>
                  <Typography component="span" variant="subtitle1" fontWeight={700}>
                      {base}
                  </Typography>

                  <Typography component="span" variant="body1" >
                      {" - "}
                      {quote}
                  </Typography>
              </Box>
          );
      },
  }),
  columnHelper.accessor("price", {
    header: "현재 환율",
    size: 150,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("previousPrice", {
    header: "이전 환율",
    size: 150,
    cell: (info) => {
      const value = info.getValue();

      return value === null ? "-" : value.toLocaleString();
    },
  }),
  columnHelper.accessor("changeRate", {
    header: "변동률",
    size: 160,
    cell: ({ row, getValue }) => {
      const { change } = row.original;
      const changeRate = getValue();

      const isUp = change > 0;
      const isDown = change < 0;

      return (
        <Stack spacing={0}>
          <Typography
            variant="caption"
            sx={{
              color: isUp ? "rate.up" : isDown ? "rate.down" : "text.secondary",
            }}
          >
            {changeRate > 0 && "+"}
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
    size: 140,
  }),
] as ColumnDef<RateRow, unknown>[];

const RateChart = () => {
  const [rates, setRates] = useState<RateRow[]>([]);

  useEffect(() => {
    const eventSource = connectRateStream((events: RateEvent[]) => {
      const rows: RateRow[] = events.map((event) => {
        const date = new Date(event.updatedAt);

        return {
          symbol: event.symbol,
          price: event.price,
          previousPrice: event.previousPrice,
          change: event.change,
          changeRate: event.changeRate,
          updatedAt:
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, "0")}-` +
            `${String(date.getDate()).padStart(2, "0")} ` +
            `${String(date.getHours()).padStart(2, "0")}:` +
            `${String(date.getMinutes()).padStart(2, "0")}:` +
            `${String(date.getSeconds()).padStart(2, "0")}.` +
            `${String(date.getMilliseconds()).padStart(3, "0")}`,
        };
      });

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
