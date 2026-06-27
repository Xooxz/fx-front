import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import PageContainer from "../components/common/PageContainer";
import { basicsTableData, type BasicsTableDataType } from "../components/table/FilterTableData";
import TableSorting from "../components/table/TableSorting";

const columnHelper = createColumnHelper<BasicsTableDataType>();

const columns = [
  columnHelper.accessor("invoiceno", { header: "Invoice" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("name", { header: "Customer" }),
  columnHelper.accessor("progress", { header: "Progress" }),
] as ColumnDef<BasicsTableDataType>[];

const RateChart = () => {
  return (
    <PageContainer title="실시간 환율">
      <TableSorting data={basicsTableData} columns={columns} />
    </PageContainer>
  );
};

export default RateChart;
