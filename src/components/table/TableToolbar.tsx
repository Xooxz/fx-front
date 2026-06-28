import Stack from "@mui/material/Stack";

import type { Table } from "@tanstack/react-table";

import ColumnSearchInput from "./ColumnSearchInput";

interface Props<TData extends object> {
  table: Table<TData>;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

/**
 * 테이블 검색 및 다운로드 기능을 제공하는 툴바
 */
const TableToolbar = <TData extends object>({
  table,
  searchValue,
  setSearchValue,
}: Props<TData>) => {
  return (
    <Stack direction="row" spacing={2} px={1} pt={1} pb={5} alignItems="center">
      {/* 검색어 입력 */}
      <ColumnSearchInput table={table} value={searchValue} onChange={setSearchValue} />
    </Stack>
  );
};

export default TableToolbar;
