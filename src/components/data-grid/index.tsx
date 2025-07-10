import React from 'react';
import { FileUploader } from './FileUpload';
import { DataTable } from './DataTable';
import { ExportButton } from './ExportButton';
import { useCSVParser } from './useCSVParser';

function CSVPreview() {
  const { csvData, parseCSV, updateRows } = useCSVParser();
  const hasData = csvData.columns.length > 0;

  return (
    <div className="p-6 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <FileUploader onFileSelect={parseCSV} />
        {hasData && <ExportButton data={csvData} />}
      </div>

      {hasData && (
        <DataTable
          columns={csvData.columns}
          rows={csvData.rows}
          onRowsChange={updateRows}
        />
      )}
    </div>
  );
}

export default CSVPreview
