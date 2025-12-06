import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Table, Tag, Tabs, Input, message, Empty } from 'antd';
import {
    CopyOutlined,
    CheckCircleFilled,
    RightOutlined,
    SearchOutlined,
    ExportOutlined,
    FilterOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';

const { Text } = Typography;

const Invite: React.FC = () => {
    const [activeTab, setActiveTab] = useState('records');

    // Mock Data for Stats
    const stats = {
        totalIncome: 12580.00,
        yesterdayIncome: 120.00,
        pendingCommission: 850.50,
        invitedCount: 156,
        paidCount: 42
    };

    // Mock Data for Table
    interface InviteRecord {
        key: string;
        user: string;
        phone: string;
        regTime: string;
        status: 'registered' | 'paid';
        amount: number | null;
        commission: number | null;
    }

    const data: InviteRecord[] = [
        {
            key: '1',
            user: 'Wang**',
            phone: '138****8888',
            regTime: '2023-12-06 14:30',
            status: 'paid',
            amount: 1200.00,
            commission: 240.00,
        },
        {
            key: '2',
            user: 'Li**',
            phone: '139****1234',
            regTime: '2023-12-05 09:12',
            status: 'registered',
            amount: null,
            commission: null,
        },
        {
            key: '3',
            user: 'Zhang**',
            phone: '136****5678',
            regTime: '2023-12-04 18:20',
            status: 'paid',
            amount: 500.00,
            commission: 100.00,
        },
    ];

    const columns: TableProps<InviteRecord>['columns'] = [
        {
            title: '被邀请人',
            key: 'user',
            render: (_, record) => (
                <Space style={{ whiteSpace: 'nowrap' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: record.status === 'paid' ? '#e6f7ff' : '#f5f5f5',
                        color: record.status === 'paid' ? '#1677ff' : '#8c8c8c',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                    }}>
                        {record.user[0]}
                    </div>
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.user}</div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.phone}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: '注册时间',
            dataIndex: 'regTime',
            key: 'regTime',
            render: (text) => <span style={{ color: '#8c8c8c', whiteSpace: 'nowrap' }}>{text}</span>,
        },
        {
            title: '状态',
            key: 'status',
            render: (_, record) => (
                <Tag variant="outlined" color={record.status === 'paid' ? 'success' : 'default'} style={{ borderRadius: 4, whiteSpace: 'nowrap' }}>
                    {record.status === 'paid' ? '已付费' : '已注册'}
                </Tag>
            ),
        },
        {
            title: '首单金额',
            key: 'amount',
            render: (_, record) => <span style={{ whiteSpace: 'nowrap' }}>{record.amount ? `¥ ${record.amount.toFixed(2)}` : '-'}</span>,
        },
        {
            title: '预估佣金',
            key: 'commission',
            render: (_, record) => record.commission ? (
                <span style={{ color: '#52c41a', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ ¥ {record.commission.toFixed(2)}</span>
            ) : <span style={{ whiteSpace: 'nowrap' }}>-</span>,
        },
    ];

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('复制成功');
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
            {/* Header */}
            <PageHeader
                title="邀请返佣计划"
                subtitle={
                    <span>
                        邀请新用户注册并付费，您将获得最高 <Text type="success" strong style={{ color: '#1677ff' }}>20%</Text> 的现金回报。
                    </span>
                }
            />

            {/* Stats Cards */}
            <Row gutter={24} style={{ marginBottom: 24 }}>
                {/* Total Income */}
                <Col xs={24} md={8}>
                    <StatsCard
                        title="累计已到账收益 (元)"
                        value={stats.totalIncome}
                        prefix="¥"
                        color="#52c41a"
                        footer={
                            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    昨日新增: <span style={{ color: '#52c41a' }}>+¥ {stats.yesterdayIncome.toFixed(2)}</span>
                                </Text>
                                <Button type="primary" size="small" style={{ background: '#1677ff' }}>申请提现</Button>
                            </div>
                        }
                    />
                </Col>

                {/* Pending Commission */}
                <Col xs={24} md={8}>
                    <StatsCard
                        title="待结算佣金 (元)"
                        value={stats.pendingCommission}
                        prefix="¥"
                        color="#faad14" // Using warning color for pending as per general convention or keeping default if unspecified, here I chose standard warning/info
                        description="预计下月 10 号发放"
                    />
                </Col>

                {/* Invited Count */}
                <Col xs={24} md={8}>
                    <StatsCard
                        title="成功邀请人数 (人)"
                        value={stats.invitedCount}
                        color="#1677ff"
                        description={
                            <span>
                                其中 <span style={{ color: '#1677ff' }}>{stats.paidCount}</span> 人已产生付费
                            </span>
                        }
                    />
                </Col>
            </Row>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                {/* Invite Methods */}
                <Col xs={24} lg={16}>
                    <Card title="专属邀请方式" variant="borderless" style={{ height: '100%' }}>
                        <div style={{ marginBottom: 32 }}>
                            <Text strong style={{ display: 'block', marginBottom: 8 }}>1. 复制您的专属链接发送给好友</Text>
                            <Space.Compact style={{ width: '100%', display: 'flex' }}>
                                <Input
                                    readOnly
                                    value="https://enterprise.com/invite/r/TECHLEAD888"
                                    style={{ flex: 1, minWidth: 0 }}
                                />
                                <Button type="primary" onClick={() => handleCopy("https://enterprise.com/invite/r/TECHLEAD888")} style={{ flexShrink: 0 }}>
                                    复制链接
                                </Button>
                            </Space.Compact>
                        </div>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Text strong style={{ display: 'block', marginBottom: 8 }}>2. 分享专属邀请码</Text>
                                <div style={{
                                    background: '#e6f7ff',
                                    border: '1px solid #91caff',
                                    borderRadius: 8,
                                    padding: 16,
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }} onClick={() => handleCopy("TECHLEAD888")}>
                                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1677ff', letterSpacing: 1 }}>TECHLEAD888</div>
                                    <div style={{ fontSize: 12, color: '#69b1ff', marginTop: 4 }}>
                                        <CopyOutlined /> 点击复制
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <Text strong style={{ display: 'block', marginBottom: 8 }}>3. 面对面扫码邀请</Text>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ padding: 8, border: '1px solid #f0f0f0', borderRadius: 8, display: 'inline-block' }}>
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://enterprise.com/invite/r/TECHLEAD888" alt="QR" style={{ width: 100, height: 100 }} />
                                    </div>
                                    <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>右键保存图片</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Mechanism */}
                <Col xs={24} lg={8}>
                    <Card title="返佣机制说明" variant="borderless" style={{ height: '100%' }}>
                        <div style={{ position: 'relative', paddingLeft: 10 }}>
                            {/* Step Line */}
                            <div style={{
                                position: 'absolute', left: 24, top: 12, bottom: 20,
                                width: 2, background: '#f0f0f0'
                            }} />

                            {[
                                { num: 1, title: '发送邀请', desc: '通过链接或邀请码分享给好友。' },
                                { num: 2, title: '好友注册并付费', desc: '好友通过您的链接完成首单支付。' },
                                { num: 3, title: '系统计算佣金', desc: '按订单金额的 10%-20% 计算，进入待结算状态。' },
                            ].map(step => (
                                <div key={step.num} style={{ display: 'flex', gap: 16, marginBottom: 32, position: 'relative' }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%', background: '#1677ff',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', zIndex: 1, flexShrink: 0
                                    }}>
                                        {step.num}
                                    </div>
                                    <div>
                                        <Text strong>{step.title}</Text>
                                        <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{step.desc}</div>
                                    </div>
                                </div>
                            ))}

                            <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%', background: '#52c41a',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', zIndex: 1, flexShrink: 0
                                }}>
                                    <CheckCircleFilled />
                                </div>
                                <div>
                                    <Text strong>结算提现</Text>
                                    <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>次月 10 号统一结算，即可申请提现。</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                            <Button type="link" size="small">查看详细规则条款 <RightOutlined /></Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Table */}
            <Card variant="borderless" styles={{ body: { padding: '0 0 24px 0' } }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        { key: 'records', label: '邀请记录' },
                        { key: 'funds', label: '资金明细' },
                    ]}
                    tabBarStyle={{ padding: '0 24px' }}
                />

                <div style={{ padding: '0 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <Text strong>记录列表</Text>
                    <Space wrap>
                        <Input placeholder="搜索用户/手机号" prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} style={{ width: 200, maxWidth: '100%' }} />
                        <Button icon={<FilterOutlined />}>筛选</Button>
                        <Button icon={<ExportOutlined />}>导出</Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        total: 156,
                        showTotal: (total) => `共 ${total} 条记录`,
                        defaultPageSize: 10
                    }}
                    scroll={{ x: 'max-content' }}
                    locale={{ emptyText: <Empty description="暂无邀请记录" /> }}
                />
            </Card>
        </div>
    );
};

export default Invite;
