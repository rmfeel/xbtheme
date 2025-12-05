import { Card, Row, Col, Tag, Typography, Space } from 'antd';
import { GlobalOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface NodeItem {
    key: string;
    code: string;
    name: string;
    protocol: string;
    region: string;
    regionCode: string;
    status: 'online' | 'offline' | 'maintenance';
    multiplier: number;
    tags: string[];
}

const Nodes = () => {
    const nodes: NodeItem[] = [
        {
            key: '1',
            code: 'US',
            name: 'AWS-美西洛杉矶-01',
            protocol: 'Vmess (WS+TLS)',
            region: '美国加利福尼亚',
            regionCode: 'US',
            status: 'online',
            multiplier: 1.0,
            tags: ['高速稳定', '原生IP', '解锁流媒体'],
        },
        {
            key: '2',
            code: 'HK',
            name: 'BGP-香港-01',
            protocol: 'Vmess (WS+TLS)',
            region: '中国香港',
            regionCode: 'HK',
            status: 'online',
            multiplier: 1.5,
            tags: ['低延迟', 'IPLC专线'],
        },
        {
            key: '3',
            code: 'JP',
            name: 'AWS-东京-01',
            protocol: 'Trojan',
            region: '日本东京',
            regionCode: 'JP',
            status: 'online',
            multiplier: 1.0,
            tags: ['高速稳定', '解锁流媒体'],
        },
        {
            key: '4',
            code: 'SG',
            name: 'Azure-新加坡-01',
            protocol: 'Vmess (WS+TLS)',
            region: '新加坡',
            regionCode: 'SG',
            status: 'maintenance',
            multiplier: 1.0,
            tags: ['高速稳定'],
        },
        {
            key: '5',
            code: 'TW',
            name: 'Hinet-台湾-01',
            protocol: 'Shadowsocks',
            region: '中国台湾',
            regionCode: 'TW',
            status: 'online',
            multiplier: 2.0,
            tags: ['原生IP', '低延迟'],
        },
        {
            key: '6',
            code: 'KR',
            name: 'Oracle-首尔-01',
            protocol: 'Vmess (WS+TLS)',
            region: '韩国首尔',
            regionCode: 'KR',
            status: 'offline',
            multiplier: 1.0,
            tags: ['高速稳定'],
        },
    ];

    const getStatusTag = (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
            online: { color: 'success', text: '在线' },
            offline: { color: 'error', text: '离线' },
            maintenance: { color: 'warning', text: '维护中' },
        };
        return statusMap[status];
    };

    return (
        <div style={{ paddingTop: 32 }}>
            <Row gutter={[16, 16]}>
                {nodes.map((node) => {
                    const statusInfo = getStatusTag(node.status);
                    return (
                        <Col xs={24} sm={12} lg={8} key={node.key}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: 4,
                                    border: '1px solid #e8e8e8',
                                }}
                                styles={{ body: { padding: '20px' } }}
                            >
                                {/* 头部：国家代码 + 节点名 + 状态 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Text strong style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>{node.code}</Text>
                                        <Text strong style={{ fontSize: 16 }}>{node.name}</Text>
                                    </div>
                                    <Tag bordered={false} color={statusInfo.color}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: statusInfo.color === 'success' ? '#52c41a' : statusInfo.color === 'error' ? '#ff4d4f' : '#faad14',
                                            }} />
                                            {statusInfo.text}
                                        </span>
                                    </Tag>
                                </div>

                                {/* 协议和地区信息 */}
                                <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <SafetyCertificateOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />
                                            <Text type="secondary">协议：</Text>
                                            <Text>{node.protocol}</Text>
                                        </div>
                                        <Tag color={node.multiplier > 1 ? 'warning' : 'success'} style={{ margin: 0 }}>
                                            {node.multiplier}x
                                        </Tag>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <GlobalOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />
                                        <Text type="secondary">地区：</Text>
                                        <Text>{node.region} ({node.regionCode})</Text>
                                    </div>
                                </Space>

                                {/* 标签 */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {node.tags.map((tag, index) => {
                                        const colors = ['magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
                                        return (
                                            <Tag
                                                key={index}
                                                color={colors[index % colors.length]}
                                            >
                                                {tag}
                                            </Tag>
                                        );
                                    })}
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Nodes;
