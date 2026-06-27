import type { Table } from "@tanstack/react-table";

export interface DownloadCardProps<TData extends object> {
  children: React.ReactNode;
  table: Table<TData>;
  onDownload?: () => void;
}
