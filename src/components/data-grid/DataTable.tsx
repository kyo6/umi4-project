import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import type { Column } from './types';

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  onRowsChange: (rows: Record<string, any>[]) => void;
}

export function DataTable({ columns, rows, onRowsChange }: DataTableProps) {

  return (
    <div className="border rounded-lg overflow-hidden relative">
      <DataGrid
        columns={columns}
        rows={rows}
        className="rdg-light"
        style={{ height: 500 }}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        onRowsChange={onRowsChange}
      />
    </div>
  );
}
