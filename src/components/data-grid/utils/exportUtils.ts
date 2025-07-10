import Papa from 'papaparse';
import type { CSVData, ExportOptions } from '../types';

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(data: CSVData, options: ExportOptions = {}) {
  const { filename = 'export.csv', includeHeaders = true } = options;

  const csv = Papa.unparse(data.rows, {
    header: includeHeaders,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadFile(filename, blob);
}

export async function exportToPdf(gridEl: HTMLDivElement, fileName: string) {
  const { head, body, foot } = getGridContent(gridEl);
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable')
  ]);
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'px'
  });

  autoTable(doc, {
    head,
    body,
    foot,
    horizontalPageBreak: true,
    styles: { cellPadding: 1.5, fontSize: 8, cellWidth: 'wrap' },
    tableWidth: 'wrap'
  });
  doc.save(fileName);
}

function getGridContent(gridEl: HTMLDivElement) {
  return {
    head: getRows('.rdg-header-row'),
    body: getRows('.rdg-row:not(.rdg-summary-row)'),
    foot: getRows('.rdg-summary-row')
  };

  function getRows(selector: string) {
    return Array.from(gridEl.querySelectorAll<HTMLDivElement>(selector)).map((gridRow) => {
      return Array.from(gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell')).map(
        (gridCell) => gridCell.innerText
      );
    });
  }


}


