import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import Dashboard from './pages/Dashboard';
import Plan from './pages/Plan';
import Node from './pages/Node';
import Ticket from './pages/Ticket';
import Doc from './pages/Doc';
import Knowledge from './pages/Knowledge';
import Invite from './pages/Invite';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Traffic from './pages/Traffic';
import Orders from './pages/Orders';
import GiftCard from './pages/GiftCard';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';



function App() {
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
      <BrowserRouter basename="/xbtheme">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/*"
            element={
              <BasicLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/plan" element={<Plan />} />
                  <Route path="/node" element={<Node />} />
                  <Route path="/ticket" element={<Ticket />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/doc" element={<Doc />} />
                  <Route path="/invite" element={<Invite />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/traffic" element={<Traffic />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/giftcard" element={<GiftCard />} />
                </Routes>
              </BasicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
