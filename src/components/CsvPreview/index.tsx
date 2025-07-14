import { HotTable } from '@handsontable/react-wrapper';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { Upload } from 'lucide-react';
import * as Papa from 'papaparse';
import { useRef, useState } from 'react';
import './index.css';

// register Handsontable's modules
registerAllModules();

// generate an array of arrays with dummy data
const defaultData = new Array(100) // number of rows
  .fill(null)
  .map((_, row) =>
    new Array(50) // number of columns
      .fill(null)
      .map((_, column) => `${row}, ${column}`),
  );

const ExampleComponent = () => {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hotRef = useRef(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const parsedData = results.data as string[][];
        console.log('Parsed data:', parsedData);
        if (parsedData.length > 0) {
          setHeaders(parsedData[0]);
          setData(parsedData.slice(1));
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert("Error parsing CSV file. Please make sure it's a valid CSV.");
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="mb-6 flex justify-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} />
          Upload CSV File
        </button>
      </div>

      {data.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <HotTable
            data={data}
            rowHeaders={true}
            colHeaders={headers}
            width="100%"
            height="500"
            rowHeights={23}
            colWidths={100}
            autoWrapRow={true}
            autoWrapCol={true}
            licenseKey="non-commercial-and-evaluation"
            ref={hotRef}
          />
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
