import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import TableCard from "./TableCard";

type TableBasicProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  error?: string | null;
};

/**
 * 정렬만 지원하는 공통 테이블
 */
const TableBasic = <TData extends object>({ data, columns, error }: TableBasicProps<TData>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);

      return String(value ?? "")
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
  });

  return (
    <TableCard table={table}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Box>
            <TableContainer>
              <Table sx={{ wtableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const sortState = header.column.getIsSorted();

                        return (
                          <TableCell
                            key={header.id}
                            sx={{
                              width: header.getSize(),
                            }}
                          >
                            <Typography
                              variant="h6"
                              mb={1}
                              className={
                                header.column.getCanSort() ? "cursor-pointer select-none" : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}

                              {sortState === "asc" && " 🔼"}
                              {sortState === "desc" && " 🔽"}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHead>

                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell colSpan={table.getAllColumns().length}>
                        <Box
                          sx={{
                            height: 220,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography variant="h6" color="error">
                            데이터를 불러오지 못했습니다.
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {error}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={table.getAllColumns().length}>
                        <Box
                          sx={{
                            height: 220,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "text.secondary",
                          }}
                        >
                          조회된 데이터가 없습니다.
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </TableCard>
  );
};

export default TableBasic;
