import { Card, Row, Col, Typography, Button, Tag, Space, Progress, Badge, Tooltip, Grid } from 'antd';
import {
    ReloadOutlined,
    CloudServerOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';

const { Text } = Typography;
const { useBreakpoint } = Grid;

// Types
interface NodeItem {
    id: string;
    name: string;
    location: string;
    type: 'IPLC' | 'BGP' | 'GIA';
    status: 'online' | 'warning' | 'offline';
    uptimeHistory: ('good' | 'warning' | 'down')[]; // 14 days
    load: number;
    ping: number;
}

interface RegionGroup {
    id: string;
    name: string;
    icon: string; // Emoji or URL
    subRegion: string;
    nodes: NodeItem[];
}

const Node = () => {
    const screens = useBreakpoint();
    // Mock Data
    const data: RegionGroup[] = [
        {
            id: 'asia',
            name: '亚太地区',
            icon: '🌏',
            subRegion: '中国香港 & 日本',
            nodes: [
                {
                    id: 'hk-01',
                    name: 'HK-Premium-01',
                    location: 'Equinix HK2 数据中心',
                    type: 'IPLC',
                    status: 'online',
                    // Simulate 14 days history: mostly good, a few warnings/downs
                    uptimeHistory: Array(9).fill('good').concat(['warning', 'good', 'good', 'good', 'good']),
                    load: 24,
                    ping: 22,
                },
                {
                    id: 'jp-01',
                    name: 'JP-Tokyo-Direct',
                    location: 'NTT 通信',
                    type: 'BGP',
                    status: 'online',
                    uptimeHistory: Array(14).fill('good'),
                    load: 58,
                    ping: 45,
                },
            ],
        },
        {
            id: 'americas',
            name: '美洲地区',
            icon: '🇺🇸',
            subRegion: '性能降级', // Using the tag text from design
            nodes: [
                {
                    id: 'us-01',
                    name: 'US-LosAngeles-CN2',
                    location: 'ZenLayer 洛杉矶机房',
                    type: 'GIA',
                    status: 'warning',
                    uptimeHistory: Array(6).fill('good').concat(['down', 'warning']).concat(Array(6).fill('good')),
                    load: 92,
                    ping: 168,
                },
            ],
        },
    ];



    // Components

    const UptimeBar = ({ status }: { status: string }) => {
        let color = '#52c41a'; // good
        if (status === 'warning') color = '#faad14';
        if (status === 'down') color = '#ff4d4f';

        return (
            <Tooltip title={status === 'good' ? '运行正常' : status === 'warning' ? '轻微抖动' : '服务中断'}>
                <div style={{
                    width: 4,
                    height: 24,
                    background: color,
                    borderRadius: 2,
                    opacity: 0.8,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                }} />
            </Tooltip>
        );
    };

    return (
        <div style={{ paddingTop: 32, maxWidth: 1200, margin: '0 auto' }}>
            {/* Page Header */}
            <PageHeader
                title="服务状态监控"
                subtitle="网络基础设施实时监控"
                extra={
                    <Space>
                        <Tag variant="filled" color="success" style={{ padding: '4px 12px', borderRadius: 100 }}>
                            <Badge status="success" text={<span style={{ color: '#52c41a', fontWeight: 500 }}>运行正常</span>} />
                        </Tag>
                        <Button icon={<ReloadOutlined />} type="text">刷新数据</Button>
                    </Space>
                }
                style={{ padding: 0, marginBottom: 32, background: 'transparent' }}
            />

            {/* Stats Grid */}
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title="节点总数"
                        value="42"
                        icon={<CloudServerOutlined style={{ fontSize: 32 }} />}
                        color="#2F54EB"
                        description={<Tag color="processing" variant="filled" icon={<LineChartOutlined />}>+2 新增</Tag>}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title="可用性 (14天)"
                        value="99.9"
                        suffix="%"
                        icon={<CheckCircleOutlined style={{ fontSize: 32 }} />}
                        color="#52c41a"
                        description={<Progress percent={100} showInfo={false} strokeColor="#52c41a" size="small" />}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title="平均延迟"
                        value="45"
                        suffix="ms"
                        icon={<ThunderboltOutlined style={{ fontSize: 32 }} />}
                        color="#FA8C16"
                        description={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Badge color="#52c41a" />
                                <Text type="secondary" style={{ fontSize: 12 }}>全球均值</Text>
                            </div>
                        }
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title="实时带宽"
                        value="8.2"
                        suffix="Gbps"
                        icon={<LineChartOutlined rotate={90} style={{ fontSize: 32 }} />}
                        color="#722ED1"
                        description={<Tag color="purple" variant="filled">晚高峰</Tag>}
                    />
                </Col>
            </Row>

            {/* Region Groups */}
            <Space orientation="vertical" size={24} style={{ width: '100%' }}>
                {data.map((group) => (
                    <Card
                        key={group.id}
                        variant="borderless"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                        styles={{ body: { padding: 0 } }}
                    >
                        {/* Group Header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space size={12}>
                                <span style={{ fontSize: 20 }}>{group.icon}</span>
                                <Text strong style={{ fontSize: 16, whiteSpace: 'nowrap' }}>{group.name}</Text>
                                <Tag variant="outlined" style={{ borderRadius: 4, color: group.id === 'americas' ? '#faad14' : '#8c8c8c', whiteSpace: 'nowrap' }}>
                                    {group.subRegion}
                                </Tag>
                            </Space>
                            <Space size={32} style={{ color: '#8c8c8c', fontSize: 12, display: screens.md ? 'flex' : 'none' }}>
                                <span style={{ whiteSpace: 'nowrap' }}>当前状态</span>
                                <span style={{ width: 120, whiteSpace: 'nowrap' }}>14天历史趋势</span>
                                <span style={{ width: 100, textAlign: 'right', whiteSpace: 'nowrap' }}>负载</span>
                                <span style={{ width: 60, textAlign: 'right', whiteSpace: 'nowrap' }}>Ping</span>
                            </Space>
                        </div>

                        {/* Nodes List */}
                        <div>
                            {group.nodes.map((node, index) => (
                                <div key={node.id} style={{
                                    padding: '20px 24px',
                                    borderBottom: index === group.nodes.length - 1 ? 'none' : '1px solid #f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: 16
                                }}>
                                    {/* Left: Node Info */}
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                        <Badge status={node.status === 'online' ? 'success' : node.status === 'warning' ? 'warning' : 'error'} style={{ marginTop: 6 }} />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <Text strong style={{ fontSize: 15, whiteSpace: 'nowrap' }}>{node.name}</Text>
                                                <Tag variant="filled" style={{ margin: 0, fontSize: 11, padding: '0 6px' }}>
                                                    {node.type}
                                                </Tag>
                                            </div>
                                            <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{node.location}</Text>
                                        </div>
                                    </div>

                                    {/* Right: Metrics */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: screens.md ? 32 : 16, flex: 1, justifyContent: screens.md ? 'flex-end' : 'space-between', flexWrap: 'wrap', minWidth: 280 }}>
                                        {/* Uptime History Bars */}
                                        <div style={{ display: 'flex', gap: 3, height: 24, alignItems: 'flex-end', width: 120 }}>
                                            {node.uptimeHistory.map((s, i) => (
                                                <UptimeBar key={i} status={s} />
                                            ))}
                                        </div>

                                        {/* Load */}
                                        <div style={{ width: 100 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                                <Text type="secondary" style={{ fontSize: 10, whiteSpace: 'nowrap' }}>CPU</Text>
                                                <Text type="secondary" style={{ fontSize: 10, whiteSpace: 'nowrap' }}>{node.load}%</Text>
                                            </div>
                                            <Progress
                                                percent={node.load}
                                                showInfo={false}
                                                size={{ height: 4 }}
                                                strokeColor={node.load > 80 ? '#faad14' : '#1677ff'}
                                                status={node.load > 90 ? 'exception' : 'active'}
                                            />
                                        </div>

                                        {/* Ping */}
                                        <div style={{ width: 60, textAlign: 'right' }}>
                                            <Tag
                                                variant="filled"
                                                color={node.ping < 50 ? 'success' : node.ping < 150 ? 'warning' : 'error'}
                                                style={{ margin: 0, fontWeight: 500 }}
                                            >
                                                {node.ping}ms
                                            </Tag>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </Space>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: 48, marginBottom: 24 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    系统运行正常 • 数据每 60 秒自动更新
                </Text>
            </div>
        </div>
    );
};

export default Node;
