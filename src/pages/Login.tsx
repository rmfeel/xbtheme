import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, AutoComplete } from 'antd';
import { LockOutlined, ThunderboltFilled, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getEmailOptions } from '../utils/emailUtils';
import { BackgroundImage } from '../components/BackgroundImage';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [emailOptions, setEmailOptions] = useState<{ value: string }[]>([]);

    const handleEmailChange = (value: string) => {
        setEmailOptions(getEmailOptions(value));
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 6) setGreeting('夜深了');
        else if (hour < 11) setGreeting('早上好');
        else if (hour < 13) setGreeting('中午好');
        else if (hour < 18) setGreeting('下午好');
        else setGreeting('晚上好');
    }, []);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        setTimeout(() => {
            setLoading(false);
            message.success('登录成功');
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f7fa',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <BackgroundImage />
            <div style={{
                width: '100%',
                maxWidth: 400,
                background: '#fff',
                borderRadius: 4,
                padding: '48px 40px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                    <ThunderboltFilled style={{ fontSize: 28, color: '#1890ff', marginRight: 12 }} />
                    <span style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>Xboard</span>
                </div>

                {/* Greeting */}
                <div style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 8 }}>
                    {greeting}，欢迎回来 👋
                </div>
                <div style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
                    烟花易逝，人情长存。请登录。
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <AutoComplete
                            options={emailOptions}
                            onChange={handleEmailChange}
                            placeholder="邮箱 / 用户名"
                        >
                            <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <a
                                style={{ color: '#1890ff' }}
                                onClick={() => navigate('/forgot-password')}
                            >
                                忘记密码?
                            </a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            登 录
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', color: '#999', fontSize: 14 }}>
                        没有账号? <a onClick={() => navigate('/register')} style={{ color: '#1890ff' }}>注册新账户</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
