import { useContext, useState } from "react";

import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";

import { CustomizerContext } from "../../context/customizerContext";
import TableToolbar from "./TableToolbar.tsx";
import type { DownloadCardProps } from "./types";

/**
 * 검색 및 다운로드 기능을 포함한 공통 테이블 카드 컴포넌트
 */
const TableCard = <TData extends object>({
  children,
  table,
  onDownload,
}: DownloadCardProps<TData>) => {
  const customizer = useContext(CustomizerContext);

  if (!customizer) {
    throw new Error("TableCard must be used inside CustomizerContextProvider");
  }

  const { isCardShadow } = customizer;
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Card
        elevation={isCardShadow ? 9 : 0}
        variant={isCardShadow ? undefined : "outlined"}
        sx={{
          border: !isCardShadow ? `1px solid ${theme.palette.divider}` : undefined,
        }}
      >
        <TableToolbar
          table={table}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onDownload={onDownload}
        />

        {children}
      </Card>
    </>
  );
};

export default TableCard;
