import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Tabs, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined, AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<string>('account');

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        navigate('/dashboard');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f2f5',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}>
            {/* Header */}
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" style={{ height: 44 }} />
                    <span style={{ fontSize: 33, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>Ant Design Pro</span>
                </div>
                <div style={{ marginTop: 12, color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>
                    Ant Design 是西湖区最具影响力的 Web 设计规范
                </div>
            </div>

            {/* Login Card */}
            <div style={{
                width: '100%',
                maxWidth: 420,
                padding: '32px 40px 24px',
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)'
            }}>
                <Tabs
                    activeKey={loginType}
                    onChange={setLoginType}
                    centered
                    items={[
                        { key: 'account', label: '账户密码登录' },
                        { key: 'mobile', label: '手机号登录' },
                    ]}
                    tabBarStyle={{ marginBottom: 24 }}
                />

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    {loginType === 'account' && (
                        <>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                                    placeholder="用户名: admin or user"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                                    placeholder="密码: ant.design"
                                />
                            </Form.Item>
                        </>
                    )}

                    {loginType === 'mobile' && (
                        <Form.Item>
                            <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.45)' }}>暂未实现</div>
                        </Form.Item>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>自动登录</Checkbox>
                        </Form.Item>
                        <a style={{ color: '#1677ff' }}>忘记密码</a>
                    </div>

                    <Form.Item style={{ marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登 录
                        </Button>
                    </Form.Item>

                    <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>
                        <Divider plain><Text type="secondary" style={{ fontSize: 14 }}>其他登录方式</Text></Divider>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingBottom: 12 }}>
                            <AlipayCircleOutlined style={{ fontSize: 24, color: '#8c8c8c', cursor: 'pointer' }} className="hover:text-[#1890ff]" />
                            <TaobaoCircleOutlined style={{ fontSize: 24, color: '#8c8c8c', cursor: 'pointer' }} className="hover:text-[#ff4d4f]" />
                            <WeiboCircleOutlined style={{ fontSize: 24, color: '#8c8c8c', cursor: 'pointer' }} className="hover:text-[#faad14]" />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                            <a style={{ color: '#1677ff' }}>注册账户</a>
                        </div>
                    </div>
                </Form>
            </div>


        </div>
    );
};

export default Login;
