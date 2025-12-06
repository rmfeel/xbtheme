import React, { useState } from 'react';
import { Form, Input, Button, message, AutoComplete } from 'antd';
import { MailOutlined, SafetyOutlined, LockOutlined, ThunderboltFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [emailOptions, setEmailOptions] = useState<{ value: string }[]>([]);

    const EMAIL_SUFFIXES = ['qq.com', '163.com', 'gmail.com', 'icloud.com', 'outlook.com', 'yeah.com', 'proton.me', '139.com', 'sina.com', '126.com'];

    const handleEmailChange = (value: string) => {
        if (!value || value.includes('@')) {
            setEmailOptions([]);
        } else {
            setEmailOptions(
                EMAIL_SUFFIXES.map((suffix) => ({ value: `${value}@${suffix}` }))
            );
        }
    };

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        setTimeout(() => {
            setLoading(false);
            message.success('密码重置成功！');
            navigate('/login');
        }, 800);
    };

    const sendVerificationCode = () => {
        setSendingCode(true);
        setTimeout(() => {
            setSendingCode(false);
            setCountdown(60);
            message.success('验证码已发送');
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }, 500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f7fa',
        }}>
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

                {/* Title */}
                <div style={{ fontSize: 20, fontWeight: 600, color: '#1f1f1f', marginBottom: 8 }}>
                    找回密码 🔑
                </div>
                <div style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
                    请输入您的注册邮箱和验证码来重置密码。
                </div>

                <Form
                    name="forgot-password"
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                        ]}
                    >
                        <AutoComplete
                            options={emailOptions}
                            onChange={handleEmailChange}
                            placeholder="邮箱"
                        >
                            <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item
                        name="emailCode"
                        rules={[{ required: true, message: '请输入邮箱验证码' }]}
                    >
                        <Input
                            prefix={<SafetyOutlined style={{ color: '#bfbfbf' }} />}
                            placeholder="邮箱验证码"
                            suffix={
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={sendVerificationCode}
                                    loading={sendingCode}
                                    disabled={countdown > 0}
                                    style={{ padding: 0, height: 'auto' }}
                                >
                                    {countdown > 0 ? `${countdown}s` : '发送验证码'}
                                </Button>
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入新密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                            placeholder="新密码"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: '请确认新密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                            placeholder="确认新密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            重置密码
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', color: '#999', fontSize: 14 }}>
                        想起密码了? <a onClick={() => navigate('/login')} style={{ color: '#1890ff' }}>返回登录</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
