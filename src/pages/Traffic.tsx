import React from 'react';
import { Card, Row, Col, Typography, Button, Space, DatePicker, Table, Tag, Empty, message } from 'antd';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import {
    SearchOutlined,
    ExportOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const Traffic: React.FC = () => {
    // Mock Data for Chart
    const chartData = [
        { date: '12-01', up: 2.5, down: 10, upHeight: '10%', downHeight: '40%' },
        { date: '12-02', up: 3.5, down: 14, upHeight: '15%', downHeight: '55%' },
        { date: '12-03', up: 2.0, down: 8, upHeight: '8%', downHeight: '30%' },
        { date: '12-04', up: 4.5, down: 18, upHeight: '20%', downHeight: '70%' },
        { date: '12-05', up: 3.0, down: 12, upHeight: '12%', downHeight: '45%' },
        { date: '12-06', up: 4.0, down: 16, upHeight: '18%', downHeight: '60%' },
        { date: '今天', up: 1.2, down: 6, upHeight: '5%', downHeight: '25%' },
    ];

    // Mock Data for Table
    interface TrafficRecord {
        key: string;
        time: string;
        node: string;
        type: 'upload' | 'download';
        original: number;
        rate: number;
        deducted: number;
        isHighRate?: boolean;
    }

    const data: TrafficRecord[] = [
        { key: '1', time: '2023-12-07 14:00:00', node: 'HK-Premium-01', type: 'download', original: 1024, rate: 1.0, deducted: 1024 },
        { key: '2', time: '2023-12-07 13:00:00', node: 'JP-Tokyo-Direct', type: 'upload', original: 512, rate: 1.0, deducted: 512 },
        { key: '3', time: '2023-12-07 12:00:00', node: 'US-GIA-VIP', type: 'download', original: 2000, rate: 1.5, deducted: 3000, isHighRate: true },
        { key: '4', time: '2023-12-07 11:00:00', node: 'HK-Premium-02', type: 'download', original: 500, rate: 1.0, deducted: 500 },
    ];

    const columns: TableProps<TrafficRecord>['columns'] = [
        { title: '记录时间', dataIndex: 'time', key: 'time', render: text => <span style={{ fontFamily: 'monospace', color: '#8c8c8c', whiteSpace: 'nowrap' }}>{text}</span> },
        {
            title: '节点名称', key: 'node', render: (_, record) => (
                <Space style={{ whiteSpace: 'nowrap' }}>
                    {record.node}
                    {record.isHighRate && <Tag color="gold" style={{ border: 'none', fontWeight: 'bold' }}>高倍率</Tag>}
                </Space>
            )
        },
        {
            title: '流量类型', key: 'type', render: (_, record) => (
                <Tag color={record.type === 'download' ? 'blue' : 'green'} variant="outlined" style={{ whiteSpace: 'nowrap' }}>
                    {record.type === 'download' ? '下载' : '上传'}
                </Tag>
            )
        },
        { title: '原始流量', key: 'original', align: 'right', render: (_, record) => <span style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{record.original} MB</span> },
        {
            title: '倍率', key: 'rate', align: 'center', render: (_, record) => (
                <span style={{ fontFamily: 'monospace', color: record.rate > 1 ? '#faad14' : '#8c8c8c', fontWeight: record.rate > 1 ? 'bold' : 'normal', whiteSpace: 'nowrap' }}>
                    {record.rate.toFixed(1)}x
                </span>
            )
        },
        {
            title: '总扣除流量', key: 'deducted', align: 'right', render: (_, record) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {(record.deducted / 1024).toFixed(2)} GB
                </span>
            )
        },
    ];

    const headerExtra = (
        <Space wrap>
            <Space.Compact style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', background: '#fafafa', border: '1px solid #d9d9d9',
                    borderRight: 'none', borderRadius: '6px 0 0 6px', padding: '0 12px', height: 32, fontSize: 14, color: '#8c8c8c'
                }}>
                    统计周期
                </div>
                <RangePicker
                    style={{ borderRadius: '0 6px 6px 0', flex: 1, minWidth: 0 }}
                    defaultValue={[dayjs('2023-12-01'), dayjs('2023-12-07')]}
                />
            </Space.Compact>
            <Button type="primary" icon={<SearchOutlined />} onClick={() => message.success('查询成功')}>查询</Button>
            <Button icon={<ExportOutlined />} onClick={() => message.info('正在导出 CSV...')}>导出</Button>
        </Space>
    );

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="流量使用明细"
                subtitle="查看节点上下行流量统计及具体扣费记录。"
                extra={headerExtra}
            />

            {/* Stats Cards */}
            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <StatsCard
                        title="计费上传流量 (Upload)"
                        value={45.20}
                        suffix="GB"
                        icon={<ArrowUpOutlined style={{ fontSize: 20 }} />}
                        color="#52c41a"
                        description="占比总流量 32%"
                    />
                </Col>

                <Col xs={24} md={8}>
                    <StatsCard
                        title="计费下载流量 (Download)"
                        value={128.80}
                        suffix="GB"
                        icon={<ArrowDownOutlined style={{ fontSize: 20 }} />}
                        color="#1677ff"
                        description="占比总流量 68%"
                    />
                </Col>

                <Col xs={24} md={8}>
                    <StatsCard
                        title="总扣除流量 (Total Deducted)"
                        value={174.00}
                        suffix="GB"
                        icon={<InfoCircleOutlined style={{ fontSize: 20 }} />}
                        color="#001529"
                        style={{ borderLeft: '4px solid #001529' }}
                        description={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#52c41a' }} /> 账户余额充足
                            </div>
                        }
                    />
                </Col>
            </Row>

            {/* Chart */}
            <Card variant="borderless" style={{ marginBottom: 24 }} title="近 7 天流量趋势" extra={
                <Space size="small" style={{ fontSize: 12 }}>
                    <Space size={4}><span style={{ width: 12, height: 12, background: '#1677ff', borderRadius: 2 }} />下载流量</Space>
                    <Space size={4}><span style={{ width: 12, height: 12, background: '#52c41a', borderRadius: 2 }} />上传流量</Space>
                </Space>
            }>
                <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
                    <div style={{
                        height: 256,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: 16,
                        paddingBottom: 8,
                        borderBottom: '1px solid #f0f0f0',
                        position: 'relative',
                        minWidth: 500 // Ensure chart has enough width to scroll on small screens
                    }}>
                        {/* Grid Lines */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} style={{ borderTop: '1px dashed #f0f0f0', width: '100%', height: 0 }} />
                            ))}
                        </div>

                        {chartData.map((item, index) => (
                            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', zIndex: 1, position: 'relative' }}>
                                <div style={{ width: 40, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 1 }}>
                                    <div style={{ width: '100%', background: '#1677ff', opacity: 0.9, borderRadius: '2px 2px 0 0', height: item.downHeight, transition: 'all 0.3s' }} />
                                    <div style={{ width: '100%', background: '#52c41a', opacity: 0.9, borderRadius: '0 0 2px 2px', height: item.upHeight, transition: 'all 0.3s' }} />
                                </div>
                                <div style={{ marginTop: 8, fontSize: 12, color: index === chartData.length - 1 ? '#1677ff' : '#8c8c8c', fontWeight: index === chartData.length - 1 ? 'bold' : 'normal' }}>
                                    {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Table */}
            <Card variant="borderless" title="流量明细记录" extra={<Text type="secondary" style={{ fontSize: 12 }}>每 1 小时结算一次</Text>} styles={{ body: { padding: '0 0 24px 0' } }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 800 }}
                    pagination={{
                        total: 128,
                        showTotal: (total: number) => `共 ${total} 条记录`,
                        defaultPageSize: 10
                    }}
                    locale={{ emptyText: <Empty description="暂无数据" /> }}
                />
            </Card>

            {/* Rules Info */}
            <div style={{ marginTop: 24, background: '#e6f7ff', border: '1px solid #91caff', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <InfoCircleOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>流量计费规则说明</div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: 'rgba(0,0,0,0.65)' }}>
                        <li><Text strong>计费公式：</Text>总扣除流量 = (上传流量 + 下载流量) × 节点倍率。</li>
                        <li><Text strong>倍率说明：</Text>普通节点倍率为 1.0x；IPLC 专线或高级节点倍率可能为 1.5x - 3.0x，请留意节点标注。</li>
                        <li><Text strong>结算周期：</Text>系统每小时自动结算一次并扣除相应的资源包额度，不足 1KB 按 1KB 计算。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Traffic;
