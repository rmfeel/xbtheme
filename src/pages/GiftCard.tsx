import React from 'react';
import { Card, Table, Typography, Button, Input, Space, Row, Col, Badge, Empty, message } from 'antd';
import {
    InfoCircleOutlined,
    ClockCircleOutlined,
    SearchOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title, Text } = Typography;

const GiftCard: React.FC = () => {
    // Mock Data
    interface RedemptionRecord {
        key: string;
        time: string;
        code: string;
        amount: number;
        status: 'success' | 'invalid';
        balanceAfter: number | null;
    }

    const data: RedemptionRecord[] = [
        {
            key: '1',
            time: '2023-12-06 14:30:22',
            code: 'ABCD-****-****-9988',
            amount: 100.00,
            status: 'success',
            balanceAfter: 1280.00,
        },
        {
            key: '2',
            time: '2023-11-20 09:15:00',
            code: 'XMAS-****-****-0021',
            amount: 50.00,
            status: 'success',
            balanceAfter: 1180.00,
        },
        {
            key: '3',
            time: '2023-11-20 09:12:45',
            code: 'INVA-****-****-1111',
            amount: 50.00,
            status: 'invalid',
            balanceAfter: null,
        },
        {
            key: '4',
            time: '2023-10-01 10:00:00',
            code: 'NEWY-****-****-8888',
            amount: 200.00,
            status: 'success',
            balanceAfter: 1130.00,
        },
    ];

    const columns: TableProps<RedemptionRecord>['columns'] = [
        {
            title: '兑换时间',
            dataIndex: 'time',
            key: 'time',
            render: text => <span style={{ fontFamily: 'monospace', color: '#8c8c8c' }}>{text}</span>,
        },
        {
            title: '礼品卡号 (Code)',
            dataIndex: 'code',
            key: 'code',
            render: text => <span style={{ fontFamily: 'monospace', color: '#8c8c8c' }}>{text}</span>,

        },
        {
            title: '面额',
            key: 'amount',
            render: (_, record) => (
                <span style={{ fontWeight: 500, color: record.status === 'success' ? '#52c41a' : '#8c8c8c' }}>
                    {record.status === 'success' ? `+ ¥ ${record.amount.toFixed(2)}` : `¥ ${record.amount.toFixed(2)}`}
                </span>
            ),
        },
        {
            title: '状态',
            key: 'status',
            render: (_, record) => (
                <Badge
                    status={record.status === 'success' ? 'success' : 'error'}
                    text={<span style={{ color: record.status === 'success' ? 'rgba(0,0,0,0.88)' : '#8c8c8c' }}>
                        {record.status === 'success' ? '兑换成功' : '无效代码'}
                    </span>}
                />
            ),
        },
        {
            title: '变动后余额',
            key: 'balanceAfter',
            align: 'right',
            render: (_, record) => record.balanceAfter ? (
                <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>¥ {record.balanceAfter.toFixed(2)}</span>
            ) : '-',
        },
    ];

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: '0 0 8px 0' }}>礼品卡兑换</Title>
                <Text type="secondary" style={{ fontSize: 14 }}>兑换码成功后金额将立即充值到您的账户余额中</Text>
            </div>

            {/* Redemption Area */}
            <Card variant="borderless" style={{ marginBottom: 24 }} styles={{ body: { padding: 32 } }}>
                <Row gutter={40}>
                    {/* Left: Input */}
                    <Col xs={24} md={16}>
                        <div style={{ marginBottom: 24 }}>
                            <Text strong style={{ display: 'block', marginBottom: 8 }}>请输入兑换码</Text>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                <Input
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    style={{
                                        flex: 1,
                                        minWidth: 200,
                                        maxWidth: 320,
                                        fontFamily: 'monospace',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        fontSize: 16,
                                        padding: '8px 12px'
                                    }}
                                />
                                <Button type="primary" size="large" onClick={() => message.success('兑换成功！')}>立即兑换</Button>
                            </div>
                        </div>

                        <div style={{ background: '#e6f7ff', border: '1px solid #91caff', borderRadius: 8, padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <InfoCircleOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                                <div>
                                    <div style={{ fontWeight: 500, marginBottom: 4 }}>兑换须知：</div>
                                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>
                                        <li>礼品卡代码通常为 16 位字符组合。</li>
                                        <li>兑换成功后无法撤销，金额不过期。</li>
                                        <li>连续输入错误 5 次将锁定兑换功能 1 小时。</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right: Balance */}
                    <Col xs={24} md={8}>
                        <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8, padding: 24, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ marginBottom: 4, color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>当前账户余额</div>
                            <div style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 16 }}>
                                <span style={{ fontSize: 18, verticalAlign: 'top' }}>¥</span> 1,280.00
                            </div>
                            <div style={{ height: 1, background: '#f0f0f0', marginBottom: 16 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'rgba(0,0,0,0.45)' }}>本月已兑换</span>
                                <span style={{ fontWeight: 500 }}>¥ 200.00</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* History Table */}
            <Card variant="borderless" styles={{ body: { padding: 0 } }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 500 }}>兑换历史记录</div>
                    <Space size="small">
                        <div style={{
                            border: '1px solid #d9d9d9', borderRadius: 4, padding: '4px 12px', fontSize: 14,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                        }} className="hover:border-blue-500 hover:text-blue-500 transition-colors">
                            <span style={{ color: 'rgba(0,0,0,0.45)' }}>近三个月</span>
                            <ClockCircleOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />
                        </div>
                        <Button icon={<SearchOutlined />} />
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 800 }}
                    pagination={false}
                    locale={{ emptyText: <Empty description="暂无兑换记录" /> }}
                />
                <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>显示第 1-4 条，共 24 条</Text>
                    <Space size="small">
                        <Button size="small" disabled icon={<LeftOutlined />} />
                        <Button size="small" type="primary">1</Button>
                        <Button size="small">2</Button>
                        <Button size="small" icon={<RightOutlined />} />
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default GiftCard;
