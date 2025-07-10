import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CSVPreview from '@/components/CsvPreview';
import DataGrid from '@/components/data-grid'
import { FileSpreadsheet } from 'lucide-react';
// import { useModel } from '@umijs/max';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'HandsonTable',
    children: <CSVPreview />,
  },
  {
    key: '2',
    label: 'DataGrid',
    children: <DataGrid />,
  },
];


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">CSV Preview Tool</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
