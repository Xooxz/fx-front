import type { Table } from "@tanstack/react-table";

export interface TableCardProps<TData extends object> {
  children: React.ReactNode;
  table: Table<TData>;
}
