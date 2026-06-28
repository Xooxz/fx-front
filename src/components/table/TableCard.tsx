import { useContext, useState } from "react";

import Card from "@mui/material/Card";

import { CustomizerContext } from "../../context/customizerContext";
import TableToolbar from "./TableToolbar.tsx";
import type { TableCardProps } from "./types";

/**
 * 검색 및 다운로드 기능을 포함한 공통 테이블 카드 컴포넌트
 */
const TableCard = <TData extends object>({ children, table }: TableCardProps<TData>) => {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("TableCard must be used inside CustomizerContextProvider");
  }

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Card
        elevation={0}
        variant={"outlined"}
        sx={{
          border: undefined,
        }}
      >
        <TableToolbar table={table} searchValue={searchValue} setSearchValue={setSearchValue} />

        {children}
      </Card>
    </>
  );
};

export default TableCard;
