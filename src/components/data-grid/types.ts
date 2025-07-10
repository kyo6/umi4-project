export interface Column {
  key: string;
  name: string;
  resizable: boolean;
  sortable: boolean;
  editor?: boolean;
}

export interface CSVData {
  columns: Column[];
  rows: Record<string, any>[];
}

export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
}
