import { useState } from 'react';
import Papa from 'papaparse';
import {textEditor} from 'react-data-grid';
import type { Column, CSVData } from './types';

export function useCSVParser() {
  const [csvData, setCSVData] = useState<CSVData>({ columns: [], rows: [] });

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const columns: Column[] = headers.map(header => ({
          key: header,
          name: header,
          resizable: true,
          sortable: true,
          renderEditCell: textEditor
        }));
        setCSVData({
          columns,
          rows: results.data as Record<string, any>[]
        });
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please make sure it\'s a valid CSV.');
      }
    });
  };

  const updateRows = (rows: Record<string, any>[]) => {
    setCSVData(prev => ({ ...prev, rows }));
  };

  return { csvData, parseCSV, updateRows };
}
