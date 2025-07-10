import React from 'react';
import { Download } from 'lucide-react';
import { exportToCSV } from './utils/exportUtils';

import type { CSVData } from './types';

interface ExportButtonProps {
  data: CSVData;
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    exportToCSV(data, {
      filename: 'exported-data.csv',
      includeHeaders: true
    });
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <Download size={20} />
      Export CSV
    </button>
  );
}
