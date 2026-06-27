import InputAdornment from "@mui/material/InputAdornment";

import { IconSearch } from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";

import CustomTextField from "../common/CustomTextField";

interface Props<TData extends object> {
  table: Table<TData>;
  value: string;
  onChange: (value: string) => void;
}

/**
 * 전체 테이블 검색 입력 컴포넌트
 */
const ColumnSearchInput = <TData extends object>({ table, value, onChange }: Props<TData>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    onChange(nextValue);
    table.setGlobalFilter(nextValue || undefined);
  };

  return (
    <CustomTextField
      fullWidth
      value={value}
      placeholder="검색어를 입력하세요"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconSearch size={18} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ColumnSearchInput;
