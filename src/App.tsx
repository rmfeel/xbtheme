import { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import Nodes from './pages/Nodes';
import Tickets from './pages/Tickets';

type PageKey = 'dashboard' | 'purchase' | 'nodes' | 'tickets';

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'purchase':
        return <Purchase />;
      case 'nodes':
        return <Nodes />;
      case 'tickets':
        return <Tickets />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677FF',
          borderRadius: 4,
        },
      }}
    >
      <BasicLayout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </BasicLayout>
    </ConfigProvider>
  );
}

export default App;
