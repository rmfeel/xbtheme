import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Tabs, Form, Input, Switch, List, Avatar, Tag, Divider } from 'antd';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('security');

    // Mock User Data
    const user = {
        name: 'Admin User',
        email: 'user@enterprise.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        balance: 1250.00,
        vip: true,
        uid: 88482
    };

    const securityContent = (
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            {/* Password */}
            <div>
                <Title level={5}>登录密码</Title>
                <div style={{ maxWidth: 400 }}>
                    <Form layout="vertical">
                        <Form.Item label="当前密码" name="currentPassword">
                            <Input.Password placeholder="请输入当前密码" />
                        </Form.Item>
                        <Form.Item label="新密码" name="newPassword">
                            <Input.Password placeholder="8位以上，包含字母和数字" />
                        </Form.Item>
                        <Form.Item>
                            <Button>更新密码</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <Divider />

            {/* Telegram */}
            <div>
                <Title level={5}>Telegram设置</Title>
                <Space orientation="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}>
                        <Space>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2AABEE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <SendOutlined style={{ fontSize: 20 }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 500 }}>
                                    绑定 Telegram 账号 <Tag style={{ marginLeft: 8 }}>未绑定</Tag>
                                </div>
                                <Text type="secondary" style={{ fontSize: 12 }}>用于接收即时告警和账户变动通知</Text>
                            </div>
                        </Space>
                        <Button type="link">去绑定</Button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}>
                        <Space>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#722ed1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <TeamOutlined style={{ fontSize: 20 }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 500 }}>加入用户交流群</div>
                                <Text type="secondary" style={{ fontSize: 12 }}>获取最新公告、技术支持和用户交流</Text>
                            </div>
                        </Space>
                        <Button type="link">立即加入</Button>
                    </div>
                </Space>
            </div>

            <Divider />

            {/* Danger Zone */}
            <div>
                <Title level={5} type="danger">危险区域</Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid #ffccc7', background: '#fff2f0', borderRadius: 8 }}>
                    <div>
                        <div style={{ fontWeight: 500 }}>重置订阅信息 (Reset Subscription)</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>此操作将重置您的 UUID 和 订阅链接，旧链接将立即失效。</Text>
                    </div>
                    <Button danger>重置信息</Button>
                </div>
            </div>
        </Space>
    );

    const notificationContent = (
        <List
            itemLayout="horizontal"
            dataSource={[
                { title: '异地登录提醒', desc: '当账户在未识别设备登录时发送邮件', active: true },
                { title: '余额预警', desc: '当账户余额低于 ¥10.00 时提醒', active: true },
                { title: '流量使用报告 (周报)', desc: '每周一发送上周的流量统计报表', active: false },
                { title: '营销活动与公告', desc: '接收最新的优惠活动和平台公告', active: false },
            ]}
            renderItem={(item) => (
                <List.Item actions={[<Switch defaultChecked={item.active} />]}>
                    <List.Item.Meta
                        title={item.title}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    );

    return (
        <div>
            <Row gutter={24}>
                {/* Left Column */}
                <Col xs={24} md={8}>
                    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                        {/* User Card */}
                        <Card variant="borderless" styles={{ body: { textAlign: 'center' } }}>
                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                                <Avatar size={96} src={user.avatar} style={{ border: '4px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                                <div style={{ position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, background: '#52c41a', border: '2px solid #fff', borderRadius: '50%' }} />
                            </div>
                            <Title level={4} style={{ margin: '0 0 4px 0' }}>{user.name}</Title>
                            <Text type="secondary">{user.email}</Text>
                            <div style={{ marginTop: 16 }}>
                                <Space>
                                    <Tag color="geekblue">企业会员</Tag>
                                    <Tag>UID: {user.uid}</Tag>
                                </Space>
                            </div>
                        </Card>

                        {/* Balance Card */}
                        <Card variant="borderless">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <Text strong>账户余额</Text>
                                <Tag variant="outlined">仅消费</Tag>
                            </div>
                            <div style={{ marginBottom: 24 }}>
                                <Title level={2} style={{ margin: 0 }}>
                                    <span style={{ fontSize: 24 }}>¥</span> {user.balance.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 12 }}>余额不可提现，仅用于服务扣费</Text>
                            </div>
                            <Space orientation="vertical" style={{ width: '100%' }}>
                                <Button type="primary" block>立即充值</Button>
                                <Button block>查看消费明细</Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>

                {/* Right Column */}
                <Col xs={24} md={16}>
                    <Card variant="borderless" style={{ minHeight: 600 }}>
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={[
                                { key: 'security', label: '账户安全', children: securityContent },
                                { key: 'notification', label: '消息通知', children: notificationContent },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
