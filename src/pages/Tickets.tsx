import { Card, Table, Tag, Button, Space, Typography, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TicketItem {
    key: string;
    id: string;
    subject: string;
    status: 'open' | 'replied' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

const Tickets = () => {
    const columns: ColumnsType<TicketItem> = [
        {
            title: '工单编号',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => <Text code>{id}</Text>,
        },
        {
            title: '主题',
            dataIndex: 'subject',
            key: 'subject',
            render: (text: string) => (
                <Space>
                    <MessageOutlined style={{ color: '#1677ff' }} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusMap: Record<string, { color: string; text: string }> = {
                    open: { color: 'processing', text: '待处理' },
                    replied: { color: 'success', text: '已回复' },
                    closed: { color: 'default', text: '已关闭' },
                };
                return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
            },
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: string) => {
                const priorityMap: Record<string, { color: string; text: string }> = {
                    low: { color: 'default', text: '低' },
                    medium: { color: 'warning', text: '中' },
                    high: { color: 'error', text: '高' },
                };
                return <Tag color={priorityMap[priority].color}>{priorityMap[priority].text}</Tag>;
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '最后更新',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Button type="link" size="small">
                    查看详情
                </Button>
            ),
        },
    ];

    const data: TicketItem[] = [
        {
            key: '1',
            id: 'TK-20231201-001',
            subject: '无法连接到香港节点',
            status: 'replied',
            priority: 'high',
            createdAt: '2023-12-01 10:30',
            updatedAt: '2023-12-01 14:22',
        },
        {
            key: '2',
            id: 'TK-20231128-003',
            subject: '套餐升级问题咨询',
            status: 'closed',
            priority: 'medium',
            createdAt: '2023-11-28 09:15',
            updatedAt: '2023-11-29 11:00',
        },
        {
            key: '3',
            id: 'TK-20231125-002',
            subject: '账单支付失败',
            status: 'closed',
            priority: 'low',
            createdAt: '2023-11-25 16:45',
            updatedAt: '2023-11-26 10:30',
        },
    ];

    return (
        <div style={{ paddingTop: 32 }}>
            <Card
                title={
                    <Space>
                        <CustomerServiceOutlined />
                        <span>工单列表</span>
                    </Space>
                }
                extra={
                    <Button type="primary" icon={<PlusOutlined />}>
                        创建工单
                    </Button>
                }
            >
                {data.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 10 }}
                        size="middle"
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无工单"
                    >
                        <Button type="primary" icon={<PlusOutlined />}>
                            创建第一个工单
                        </Button>
                    </Empty>
                )}
            </Card>
        </div>
    );
};

export default Tickets;
