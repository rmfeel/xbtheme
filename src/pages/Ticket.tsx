import { Card, Table, Tag, Button, Space, Typography, Input, Badge, Segmented, Pagination } from 'antd';
import PageHeader from '../components/PageHeader';
import type { ColumnsType } from 'antd/es/table';
import {
    PlusOutlined,
    SearchOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;

interface TicketItem {
    key: string;
    id: string;
    title: string;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'processing' | 'pending' | 'closed' | 'resolved';
    updatedAt: string;
}

const Ticket = () => {
    const [filterStatus, setFilterStatus] = useState<string | number>('All');

    // Mock Data
    const data: TicketItem[] = [
        {
            key: '1',
            id: '#2023120601',
            title: '服务器带宽异常，请求排查',
            type: '技术支持',
            priority: 'urgent',
            status: 'processing',
            updatedAt: '10分钟前',
        },
        {
            key: '2',
            id: '#2023120588',
            title: '关于企业版套餐续费发票的申请',
            type: '财务相关',
            priority: 'medium',
            status: 'pending',
            updatedAt: '昨天 14:30',
        },
        {
            key: '3',
            id: '#2023120412',
            title: 'API 接口文档 v2.0 字段缺失反馈',
            type: '产品建议',
            priority: 'medium', // Using medium for '中等'
            status: 'resolved',
            updatedAt: '2023-12-04',
        },
        {
            key: '4',
            id: '#2023120309',
            title: 'OSS 存储桶权限配置咨询',
            type: '使用咨询',
            priority: 'low',
            status: 'closed',
            updatedAt: '2023-12-03',
        },
    ];

    const columns: ColumnsType<TicketItem> = [
        {
            title: '工单编号',
            dataIndex: 'id',
            key: 'id',
            responsive: ['md'],
            render: (text) => <Text type="secondary" style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{text}</Text>,
        },
        {
            title: '工单标题',
            dataIndex: 'title',
            key: 'title',
            width: 400,
            render: (text) => (
                <Text strong style={{ cursor: 'pointer' }} className="hover:text-blue-500">
                    {text}
                </Text>
            ),
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            responsive: ['lg'],
            render: (text) => <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>{text}</Text>,
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            responsive: ['md'],
            render: (priority) => {
                const config = {
                    urgent: { color: '#ff4d4f', bg: '#fff1f0', border: '#ffa39e', text: '紧急' },
                    high: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e', text: '高' }, // fallback
                    medium: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591', text: '中等' }, // fallback
                    low: { color: '#0958d9', bg: '#e6f4ff', border: '#91caff', text: '一般' },
                };
                // Handle different priority values properly
                const p = priority === 'urgent' ? 'urgent' : priority === 'low' ? 'low' : 'medium';
                const style = config[p];

                return (
                    <Tag
                        variant="filled"
                        style={{
                            color: style.color,
                            background: style.bg,
                            borderColor: style.border,
                            borderWidth: 1,
                            borderStyle: 'solid'
                        }}
                    >
                        {style.text}
                    </Tag>
                );
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const config = {
                    processing: { status: 'processing', text: '处理中' },
                    pending: { status: 'warning', text: '待回复' },
                    resolved: { status: 'success', text: '已结单' },
                    closed: { status: 'default', text: '已关闭' },
                };
                const s = config[status as keyof typeof config];
                return <Badge status={s.status as any} text={s.text} />;
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            responsive: ['lg'],
            render: (text) => <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>{text}</Text>,
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space separator={<Text type="secondary">|</Text>}>
                    <Button type="link" size="small" style={{ padding: 0 }}>
                        {record.status === 'resolved' || record.status === 'closed' ? '详情' : '查看'}
                    </Button>
                    {record.status === 'processing' && (
                        <Button type="link" size="small" style={{ padding: 0 }}>催单</Button>
                    )}
                    {record.status === 'resolved' && (
                        <Button type="link" size="small" style={{ padding: 0 }}>评价</Button>
                    )}
                </Space>
            ),
        },
    ];



    return (
        <div style={{ paddingTop: 32, maxWidth: 1200, margin: '0 auto' }}>
            {/* Header Section */}
            <PageHeader
                title="工单管理"
                subtitle="您可以在此查看所有已提交的工单进度，或发起新的技术咨询。"
                extra={
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        提交新工单
                    </Button>
                }
                style={{ marginBottom: 24, padding: 0 }}
            />



            {/* Table Section */}
            <Card variant="borderless" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }} styles={{ body: { padding: 0 } }}>
                {/* Filter Bar */}
                <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <Segmented
                        options={['全部', '处理中', '待评价', '已关闭']}
                        value={filterStatus}
                        onChange={setFilterStatus}
                    />
                    <Space>
                        <Input
                            placeholder="输入工单号或关键词"
                            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            style={{ width: 240 }}
                        />
                        <Button icon={<FilterOutlined />}>筛选</Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    style={{ background: 'transparent' }}
                />

                {/* Custom Footer Pagination */}
                <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0' }}>
                    <Space size={16} style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13 }}>
                        <span>共 45 条记录</span>
                        <Pagination defaultCurrent={1} total={45} size="small" />
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default Ticket;
