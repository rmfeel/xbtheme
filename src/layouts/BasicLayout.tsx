import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  ClusterOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
  HomeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import './BasicLayout.css';

const { Header, Content, Footer } = Layout;

type MenuKey = 'dashboard' | 'plan' | 'node' | 'ticket' | 'doc' | 'knowledge' | 'invite' | 'profile' | 'traffic' | 'orders' | 'giftcard';

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentPage = (location.pathname.substring(1) || 'dashboard') as MenuKey;

  const onPageChange = (key: MenuKey) => {
    navigate(`/${key}`);
    setMobileMenuOpen(false);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      // Handle logout
    } else if (key === 'profile') {
      onPageChange('profile');
    } else if (key === 'settings') {
      onPageChange('profile');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'plan',
      icon: <ShoppingCartOutlined />,
      label: '购买订阅',
    },
    {
      key: 'node',
      icon: <ClusterOutlined />,
      label: '节点列表',
    },
    {
      key: 'ticket',
      icon: <CustomerServiceOutlined />,
      label: '工单',
    },
  ];



  return (
    <Layout className="basic-layout">
      <Header className="layout-header">
        <div className="header-content">
          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </div>

          <div className="logo" onClick={() => onPageChange('dashboard')}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
            <span className="logo-title">Enterprise</span>
          </div>

          <Menu
            mode="horizontal"
            selectedKeys={[currentPage]}
            items={menuItems}
            className="header-menu desktop-menu"
            onClick={({ key }) => onPageChange(key as MenuKey)}
          />

          <div className="user-info">
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="user-name">Admin User</span>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>

      {/* Mobile Menu Backdrop */}
      <div
        id="menu-backdrop"
        className={mobileMenuOpen ? 'open' : 'closed'}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div id="mobile-menu-panel" className={mobileMenuOpen ? 'open' : 'closed'}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: '#f5f5f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#bfbfbf', border: '1px solid #e8e8e8'
              }}>
                <UserOutlined style={{ fontSize: 20 }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'rgba(0,0,0,0.88)' }}>Admin</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', fontFamily: 'monospace' }}>¥ 1,280.00</div>
              </div>
            </div>
            <Button size="small" style={{ fontSize: 12, color: '#1677ff', borderColor: '#1677ff' }}>充值</Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '8px 0' }}>
          <div className="menu-grid-item" onClick={() => onPageChange('node')}>
            <ClusterOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>节点列表</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('plan')}>
            <ShoppingCartOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>我的套餐</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('traffic')}>
            <DashboardOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>流量明细</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('orders')}>
            <MenuOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>我的订单</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('giftcard')}>
            <ShoppingCartOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>礼品卡</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('invite')}>
            <UserOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>邀请返佣</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('ticket')}>
            <CustomerServiceOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>工单</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('doc')}>
            <HomeOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>文档</span>
          </div>
          <div className="menu-grid-item" onClick={() => onPageChange('profile')}>
            <UserOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.88)' }}>个人中心</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0' }}>
          <div
            style={{
              padding: '16px', textAlign: 'center', color: '#ff4d4f', fontSize: 14,
              cursor: 'pointer', transition: 'background 0.2s'
            }}
            className="hover:bg-gray-50"
          >
            退出登录
          </div>
        </div>
      </div>



      <Content className="layout-content">
        {children}
      </Content>
      <Footer className="layout-footer">
        <div className="footer-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('node'); }}>节点</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('plan'); }}>套餐</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('ticket'); }}>工单</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('knowledge'); }}>文档</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('giftcard'); }}>礼品卡</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('traffic'); }}>流量明细</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('invite'); }}>邀请</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('orders'); }}>订单</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('profile'); }}>个人中心</a>
        </div>
        <div className="footer-copyright">
          Copyright © 2025 Xborad Inc. All rights reserved.
        </div>
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
