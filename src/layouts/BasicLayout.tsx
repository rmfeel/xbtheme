import { useMemo, ReactNode, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Drawer, Button, Breadcrumb } from 'antd';
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
} from '@ant-design/icons';
import './BasicLayout.css';

const { Header, Content, Footer } = Layout;

type MenuKey = 'dashboard' | 'purchase' | 'nodes' | 'tickets';

interface BasicLayoutProps {
  children: ReactNode;
  currentPage: MenuKey;
  onPageChange: (page: MenuKey) => void;
}

const BasicLayout = ({ children, currentPage, onPageChange }: BasicLayoutProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
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
      console.log('退出登录');
    } else if (key === 'profile') {
      console.log('个人中心');
    } else if (key === 'settings') {
      console.log('个人设置');
    }
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onPageChange(key as MenuKey);
    setDrawerVisible(false);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'purchase',
      icon: <ShoppingCartOutlined />,
      label: '购买套餐',
    },
    {
      key: 'nodes',
      icon: <ClusterOutlined />,
      label: '节点列表',
    },
    {
      key: 'tickets',
      icon: <CustomerServiceOutlined />,
      label: '工单',
    },
  ];

  const menuMap: Record<MenuKey, string> = {
    dashboard: '仪表盘',
    purchase: '购买套餐',
    nodes: '节点列表',
    tickets: '工单',
  };

  const breadcrumbItems = useMemo(() => {
    return [
      {
        href: '/',
        title: (
          <>
            <HomeOutlined />
            <span>首页</span>
          </>
        ),
      },
      {
        title: menuMap[currentPage] || '仪表盘',
      },
    ];
  }, [currentPage]);

  return (
    <Layout className="basic-layout">
      <Header className="layout-header">
        <div className="header-content">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            className="mobile-menu-btn"
          />
          <div className="logo">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="logo"
            />
            <span className="logo-title">Ant Design Pro</span>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={handleMenuClick}
            className="header-menu desktop-menu"
          />
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
          >
            <Space className="user-info" style={{ cursor: 'pointer' }}>
              <Avatar
                size="small"
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                icon={<UserOutlined />}
              />
              <span className="user-name">管理员</span>
            </Space>
          </Dropdown>
        </div>
      </Header>
      <Drawer
        title="菜单"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Drawer>
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb-content">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <Content className="layout-content">{children}</Content>
      <Footer className="layout-footer">
        <div className="footer-nav">
          <a href="#">节点</a>
          <a href="#">套餐</a>
          <a href="#">工单</a>
          <a href="#">礼品卡</a>
          <a href="#">流量明细</a>
          <a href="#">邀请</a>
          <a href="#">订单</a>
          <a href="#">个人中心</a>
        </div>
        <div className="footer-copyright">
          Copyright © 2025 Xborad Inc. All rights reserved.
        </div>
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
