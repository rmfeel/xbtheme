import React from 'react';
import { Card, Table, Tag, Badge, Button, Input, Select, DatePicker, Typography, Space, Row, Col, Empty, message } from 'antd';
import PageHeader from '../components/PageHeader';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Text } = Typography;
const { Option } = Select;

const Orders: React.FC = () => {
    // Mock Data
    interface OrderRecord {
        key: string;
        orderId: string;
        planName: string;
        cycle: string;
        cycleType: 'month' | 'quarter' | 'year' | 'onetime';
        cycleDate: string;
        amount: number;
        status: 'paid' | 'pending' | 'cancelled' | 'failed';
        createTime: string;
    }

    const data: OrderRecord[] = [
        {
            key: '1',
            orderId: '202312060012',
            planName: '专业版套餐 (Pro)',
            cycle: '月付',
            cycleType: 'month',
            cycleDate: '12/06 - 01/06',
            amount: 29.90,
            status: 'pending',
            createTime: '2023-12-06 14:30',
        },
        {
            key: '2',
            orderId: '202312018890',
            planName: '企业团队版 (Team)',
            cycle: '年付',
            cycleType: 'year',
            cycleDate: '2023 - 2024',
            amount: 3999.00,
            status: 'paid',
            createTime: '2023-12-01 09:15',
        },
        {
            key: '3',
            orderId: '202311150022',
            planName: '基础版套餐 (Basic)',
            cycle: '季付',
            cycleType: 'quarter',
            cycleDate: '11/15 - 02/15',
            amount: 88.00,
            status: 'paid',
            createTime: '2023-11-15 11:00',
        },
        {
            key: '4',
            orderId: '202311105521',
            planName: '流量加油包 100G',
            cycle: '一次性',
            cycleType: 'onetime',
            cycleDate: '-',
            amount: 15.00,
            status: 'cancelled',
            createTime: '2023-11-10 16:20',
        },
        {
            key: '5',
            orderId: '202310289912',
            planName: '标准版套餐',
            cycle: '月付',
            cycleType: 'month',
            cycleDate: '10/28 - 11/28',
            amount: 29.90,
            status: 'failed',
            createTime: '2023-10-28 08:00',
        },
    ];

    const getCycleTagColor = (type: string) => {
        switch (type) {
            case 'month': return 'blue';
            case 'quarter': return 'cyan';
            case 'year': return 'purple';
            case 'onetime': return 'default';
            default: return 'default';
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'paid': return { status: 'success' as const, text: '已支付' };
            case 'pending': return { status: 'processing' as const, text: '待支付' };
            case 'cancelled': return { status: 'default' as const, text: '已取消' };
            case 'failed': return { status: 'error' as const, text: '支付失败' };
            default: return { status: 'default' as const, text: '未知' };
        }
    };

    const columns: TableProps<OrderRecord>['columns'] = [
        {
            title: '# 订单号',
            key: 'orderId',
            width: 250,
            render: (_, record) => (
                <div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 500, color: record.status === 'cancelled' ? '#8c8c8c' : '#1677ff', textDecoration: record.status === 'cancelled' ? 'line-through' : 'none', cursor: 'pointer' }}>
                        {record.orderId}
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: record.planName }}>
                        {record.planName}
                    </Text>
                </div>
            ),
        },
        {
            title: '周期',
            key: 'cycle',
            width: 200,
            render: (_, record) => (
                <div>
                    <div style={{ marginBottom: 4 }}>
                        <Tag color={getCycleTagColor(record.cycleType)} style={{ marginRight: 0 }}>{record.cycle}</Tag>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>{record.cycleDate}</Text>
                </div>
            ),
        },
        {
            title: '订单金额',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
            render: (amount, record) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 500, fontSize: 16, color: record.status === 'cancelled' ? '#8c8c8c' : 'rgba(0,0,0,0.88)' }}>
                    ¥ {amount.toFixed(2)}
                </span>
            ),
        },
        {
            title: '订单状态',
            key: 'status',
            width: 150,
            render: (_, record) => {
                const config = getStatusConfig(record.status);
                return <Badge status={config.status} text={<span style={{ color: record.status === 'cancelled' ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.88)' }}>{config.text}</span>} />;
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 200,
            render: text => <span style={{ fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)' }}>{text}</span>,
        },
        {
            title: '操作',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' ? (
                        <>
                            <a style={{ fontWeight: 500 }}>支付</a>
                            <Text type="secondary" style={{ cursor: 'pointer' }}>取消</Text>
                        </>
                    ) : record.status === 'cancelled' ? (
                        <Text type="secondary" style={{ cursor: 'pointer' }}>删除</Text>
                    ) : (
                        <a style={{ fontWeight: 500 }}>详情</a>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
            {/* Header */}
            <PageHeader
                title="我的订单"
                subtitle="查看及管理您的所有服务订阅订单"
                extra={
                    <Space>
                        <Button onClick={() => message.info('发票功能暂未开放')}>发票管理</Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => message.success('跳转至购买页面')}>购买新服务</Button>
                    </Space>
                }
                style={{ marginBottom: 24, padding: 0, background: 'transparent' }} // Match previous 'div' style by resetting card bg if needed, or keep standard card look
            />

            {/* Filter */}
            <Card variant="borderless" style={{ marginBottom: 24 }} styles={{ body: { padding: 24 } }}>
                <Row gutter={24}>
                    <Col xs={24} md={6}>
                        <div style={{ marginBottom: 4 }}><Text style={{ fontSize: 14 }}>订单号</Text></div>
                        <Input placeholder="请输入" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} md={6}>
                        <div style={{ marginBottom: 4 }}><Text style={{ fontSize: 14 }}>订单状态</Text></div>
                        <Select placeholder="全部" style={{ width: '100%' }}>
                            <Option value="paid">已支付</Option>
                            <Option value="pending">待支付</Option>
                            <Option value="cancelled">已取消</Option>
                        </Select>
                    </Col>
                    <Col xs={24} md={6}>
                        <div style={{ marginBottom: 4 }}><Text style={{ fontSize: 14 }}>创建时间</Text></div>
                        <DatePicker style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} md={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Space style={{ width: '100%' }}>
                            <Button type="primary" icon={<SearchOutlined />} onClick={() => message.success('查询列表成功')}>查询</Button>
                            <Button icon={<ReloadOutlined />} onClick={() => message.info('重置筛选条件')}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Table */}
            <Card variant="borderless" title="订单列表" extra={<Text type="secondary" style={{ fontSize: 12 }}>共查询到 42 条记录</Text>} styles={{ body: { padding: 0 } }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 800 }}
                    pagination={{ total: 42, showTotal: (total) => `共 ${total} 条` }}
                    locale={{ emptyText: <Empty description="暂无订单" /> }}
                />
            </Card>
        </div>
    );
};

export default Orders;
