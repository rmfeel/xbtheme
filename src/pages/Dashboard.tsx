import { useMemo, useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Button, Space, Typography, Avatar, Popconfirm, Tooltip, Tag } from 'antd';
import type { CSSProperties } from 'react';
import {
  CloudFilled,
  GiftFilled,
  ClockCircleFilled,
  WindowsOutlined,
  AppleOutlined,
  AndroidOutlined,
  TabletOutlined,
  DesktopOutlined,
  PayCircleFilled,
  UserOutlined,
  CompassFilled,
  FileTextOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
  ReloadOutlined,
  BookFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

// 类型定义
interface PlatformItem {
  icon: React.ComponentType<{ style?: CSSProperties }>;
  name: string;
  key: string;
}



interface DocItem {
  icon: React.ComponentType<{ style?: CSSProperties }>;
  title: string;
  description: string;
  tag?: string;
  time: string;
  iconBg: string;
}

// 常量配置
const COLORS = {
  primary: '#1677ff',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#ff4d4f',
} as const;

const CARD_STYLE: CSSProperties = {
  height: '100%',
  borderRadius: 4,
};
const ROW_GUTTER: [number, number] = [16, 16];
const ROW_MARGIN_BOTTOM: CSSProperties = { marginBottom: 16 };

const Dashboard = () => {
  const [hitokoto, setHitokoto] = useState<string>(':D 获取中...');

  // 获取一言
  useEffect(() => {
    fetch('https://v1.hitokoto.cn/')
      .then(response => response.json())
      .then(data => {
        setHitokoto(data.hitokoto);
      })
      .catch(() => {
        setHitokoto('每一天都是新的开始');
      });
  }, []);

  // 平台列表
  const platformItems = useMemo<PlatformItem[]>(
    () => [
      { icon: WindowsOutlined, name: 'Windows', key: 'windows' },
      { icon: AppleOutlined, name: 'macOS', key: 'macos' },
      { icon: AppleOutlined, name: 'iOS', key: 'ios' },
      { icon: AndroidOutlined, name: 'Android', key: 'android' },
    ],
    []
  );



  // 使用文档列表
  const docItems = useMemo<DocItem[]>(
    () => [
      {
        icon: WindowsOutlined,
        title: 'Windows',
        description: '那是一种内在的东西，他们到达不了，也无法触及的',
        tag: '科学搬砖组',
        time: '8 年前',
        iconBg: '#1677ff',
      },
      {
        icon: AppleOutlined,
        title: 'iOS',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        tag: '全组都是吾王',
        time: '8 年前',
        iconBg: '#ff4d4f',
      },
      {
        icon: TabletOutlined,
        title: '安卓',
        description: '城镇中有那么多的酒馆，她却走进了我的酒馆',
        tag: '中二少女团',
        time: '几秒前',
        iconBg: '#52c41a',
      },
      {
        icon: DesktopOutlined,
        title: 'macOS',
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        tag: '程序员日常',
        time: '8 年前',
        iconBg: '#333',
      },
      {
        icon: FileTextOutlined,
        title: '服务协议',
        description: '凛冬将至',
        tag: '高温设计天团',
        time: '8 年前',
        iconBg: '#722ed1',
      },
      {
        icon: QuestionCircleOutlined,
        title: '常见问题',
        description: '生命就像一盒巧克力，结果往往出人意料',
        tag: '骗你来学计算机',
        time: '8 年前',
        iconBg: '#13c2c2',
      },
    ],
    []
  );

  return (
    <div style={{ paddingTop: 32 }}>
      {/* 欢迎区域和余额卡片 */}
      <Row gutter={ROW_GUTTER} style={ROW_MARGIN_BOTTOM}>
        <Col xs={24} lg={16}>
          <Card style={CARD_STYLE} styles={{ body: { padding: '20px 24px', display: 'flex', alignItems: 'center', height: '100%' } }}>
            <Space size={16} align="center">
              <Avatar
                size={56}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                icon={<UserOutlined />}
              />
              <Space orientation="vertical" size={4}>
                <Title level={4} style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>
                  早安,吴彦祖,祝你开心每一天!
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {hitokoto}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            style={CARD_STYLE}
            styles={{ body: { padding: '20px 24px' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>账户余额</Text>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: COLORS.warning, fontSize: 32, fontWeight: 700 }}>¥128.50</span>
                </div>
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  立即充值
                </Button>
              </div>
              <PayCircleFilled style={{ fontSize: 48, color: COLORS.warning, opacity: 0.8 }} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 数据统计卡片 */}
      <Row gutter={ROW_GUTTER} style={ROW_MARGIN_BOTTOM}>
        {/* 剩余流量 */}
        <Col xs={24} sm={12} lg={8}>
          <Card style={CARD_STYLE} styles={{ body: { padding: '20px 24px' } }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>剩余流量</Text>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ color: COLORS.primary, fontSize: 28, fontWeight: 700 }}>486.29</span>
                  <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>/ 502 GiB</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>已使用 15.71 GiB</Text>
                    <Text style={{ fontSize: 13, color: COLORS.primary, fontWeight: 700 }}>96.8%</Text>
                  </div>
                  <Progress
                    percent={96.8}
                    strokeColor={COLORS.primary}
                    strokeLinecap="square"
                    showInfo={false}
                    size={{ height: 8 }}
                  />
                </div>
              </div>
              <CloudFilled style={{ fontSize: 48, color: COLORS.primary, opacity: 0.6 }} />
            </div>
          </Card>
        </Col>

        {/* 使用套餐 */}
        <Col xs={24} sm={12} lg={8}>
          <Card style={CARD_STYLE} styles={{ body: { padding: '20px 24px' } }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>使用套餐</Text>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: COLORS.success, fontSize: 28, fontWeight: 700 }}>Ultimate</span>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <Tag bordered={false} color="success">企业版</Tag>
                  <Tag bordered={false} color="default">无限速</Tag>
                </div>
              </div>
              <GiftFilled style={{ fontSize: 48, color: COLORS.success, opacity: 0.6 }} />
            </div>
          </Card>
        </Col>

        {/* 账户过期 */}
        <Col xs={24} sm={12} lg={8}>
          <Card style={CARD_STYLE} styles={{ body: { padding: '20px 24px' } }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>账户过期</Text>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: COLORS.danger, fontSize: 22, fontWeight: 700 }}>2020/12/17</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>18:04:00</Text>
                </div>
                <div style={{ marginTop: 8 }}>
                  <span style={{
                    padding: '2px 8px',
                    background: `${COLORS.danger}15`,
                    color: COLORS.danger,
                    fontSize: 12,
                    borderRadius: 4
                  }}>
                    已过期
                  </span>
                </div>
              </div>
              <ClockCircleFilled style={{ fontSize: 48, color: COLORS.danger, opacity: 0.6 }} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 快速导入和使用文档 */}
      <Row gutter={ROW_GUTTER}>
        <Col xs={24} lg={8}>
          <Card
            title={<><CompassFilled style={{ marginRight: 8 }} />快速导入</>}
            style={CARD_STYLE}
            styles={{ body: { padding: '16px' } }}
          >
            <Row gutter={ROW_GUTTER}>
              {platformItems.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Col xs={12} key={platform.key}>
                    <Tooltip title={`点击导入 ${platform.name} 配置`} placement="top">
                      <Button
                        type="text"
                        block
                        style={{
                          height: 80,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent style={{ fontSize: 24 }} />
                        <Text style={{ marginTop: 8 }}>{platform.name}</Text>
                      </Button>
                    </Tooltip>
                  </Col>
                );
              })}
            </Row>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center' }}>
              <Space size={12}>
                <Button type="primary" icon={<CopyOutlined />}>
                  复制订阅
                </Button>
                <Popconfirm
                  title="重置订阅"
                  description="确定要重置订阅地址吗？此操作不可恢复。"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    console.log('重置订阅');
                  }}
                >
                  <Button danger icon={<ReloadOutlined />}>
                    重置订阅
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Card
            title={<><BookFilled style={{ marginRight: 8 }} />使用文档</>}
            extra={<a href="#" style={{ fontSize: 13 }}>全部教程</a>}
            style={CARD_STYLE}
            styles={{ body: { padding: 0 } }}
          >
            <Row gutter={[0, 0]}>
              {docItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Col xs={24} sm={12} lg={8} key={index}>
                    <div
                      style={{
                        padding: 0,
                        border: '1px solid #f0f0f0',
                        borderRadius: 0,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        minHeight: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: index % 3 === 0 ? 0 : -1,
                        marginTop: index >= 3 ? -1 : 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        e.currentTarget.style.borderColor = '#d9d9d9';
                        e.currentTarget.style.zIndex = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                        e.currentTarget.style.zIndex = '0';
                      }}
                    >
                      <Space size={12} align="start" style={{ padding: '16px', width: '100%' }}>
                        <Avatar
                          size={40}
                          icon={<IconComponent />}
                          style={{ backgroundColor: item.iconBg, flexShrink: 0 }}
                        />
                        <Space orientation="vertical" size={4} style={{ flex: 1, minWidth: 0 }}>
                          <Text strong style={{ fontSize: 14 }}>
                            {item.title}
                          </Text>
                          <Text
                            type="secondary"
                            style={{
                              fontSize: 13,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: '1.5',
                            }}
                          >
                            {item.description}
                          </Text>
                          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {item.tag}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {item.time}
                            </Text>
                          </div>
                        </Space>
                      </Space>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
