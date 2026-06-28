import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

import CustomSelect from "../common/CustomSelect.tsx";
import CustomTextField from "../common/CustomTextField.tsx";
import TableCard from "./TableCard.tsx";

type TableSortingProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
};

/**
 * 정렬/필터/페이지네이션을 지원하는 공통 테이블
 */
const TableSorting = <TData extends object>({ data, columns }: TableSortingProps<TData>) => {
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
    getPaginationRowModel: getPaginationRowModel(),
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
              <Table sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const sortState = header.column.getIsSorted();

                        return (
                          <TableCell key={header.id}>
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
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          <Typography variant="body1">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />

            <Stack gap={1} p={2} alignItems="center" direction="row" justifyContent="space-between">
              <Typography variant="body1">
                {table.getPrePaginationRowModel().rows.length} Rows
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="body1">Page</Typography>

                  <Typography variant="body1" fontWeight={600}>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="body1">| Go to page:</Typography>

                  <CustomTextField
                    type="number"
                    inputProps={{
                      min: 1,
                      max: table.getPageCount(),
                    }}
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const page = event.target.value ? Number(event.target.value) - 1 : 0;

                      table.setPageIndex(page);
                    }}
                  />
                </Stack>

                <CustomSelect
                  value={String(table.getState().pagination.pageSize)}
                  onChange={(event: SelectChangeEvent<unknown>) => {
                    table.setPageSize(Number(event.target.value));
                  }}
                >
                  {[10, 15, 20, 25].map((pageSize) => (
                    <MenuItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </MenuItem>
                  ))}
                </CustomSelect>

                <IconButton
                  size="small"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronsLeft />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronLeft />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronRight />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronsRight />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </TableCard>
  );
};

export default TableSorting;
