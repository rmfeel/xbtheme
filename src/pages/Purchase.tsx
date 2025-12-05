import { Card, Row, Col, Typography, Button, Tag } from 'antd';
import { CheckOutlined, CrownFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

interface PlanItem {
    name: string;
    price: number;
    originalPrice?: number;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    bgGradient: string;
}

const Purchase = () => {
    const plans: PlanItem[] = [
        {
            name: '月付套餐',
            price: 19.9,
            period: '月',
            description: '适合轻度使用用户',
            features: ['200GB 流量', '3 设备在线', '标准节点', '工单支持'],
            color: '#1677ff',
            bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            name: '季付套餐',
            price: 49.9,
            originalPrice: 59.7,
            period: '季',
            description: '最受欢迎的选择',
            features: ['600GB 流量', '5 设备在线', '高速节点', '优先支持', '无限速'],
            popular: true,
            color: '#52c41a',
            bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        },
        {
            name: '年付套餐',
            price: 159.9,
            originalPrice: 238.8,
            period: '年',
            description: '长期用户最佳选择',
            features: ['无限流量', '10 设备在线', '全部节点', '专属客服', 'API 接口', '优先更新'],
            color: '#faad14',
            bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
    ];

    return (
        <div style={{ paddingTop: 32 }}>
            <Row gutter={[16, 16]} justify="center">
                {plans.map((plan, index) => (
                    <Col xs={24} sm={12} md={8} lg={7} key={index}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: 4,
                                border: plan.popular ? `2px solid ${plan.color}` : '1px solid #e8e8e8',
                                overflow: 'hidden',
                                height: '100%',
                            }}
                            styles={{ body: { padding: 0 } }}
                        >
                            {/* 头部 */}
                            <div
                                style={{
                                    background: plan.bgGradient,
                                    padding: '24px 20px',
                                    textAlign: 'center',
                                    position: 'relative',
                                }}
                            >
                                {plan.popular && (
                                    <Tag
                                        icon={<CrownFilled />}
                                        color="#faad14"
                                        style={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            margin: 0,
                                            fontWeight: 500,
                                        }}
                                    >
                                        推荐
                                    </Tag>
                                )}
                                <Title level={5} style={{ color: '#fff', margin: 0, fontWeight: 600 }}>
                                    {plan.name}
                                </Title>
                                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
                                    {plan.description}
                                </Text>
                                <div style={{ marginTop: 16 }}>
                                    <span style={{ color: '#fff', fontSize: 14 }}>¥</span>
                                    <span style={{ color: '#fff', fontSize: 36, fontWeight: 700 }}>{plan.price}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>/{plan.period}</span>
                                </div>
                                {plan.originalPrice && (
                                    <Text delete style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
                                        原价 ¥{plan.originalPrice}
                                    </Text>
                                )}
                            </div>

                            {/* 功能列表 */}
                            <div style={{ padding: '20px' }}>
                                {plan.features.map((feature, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 0',
                                            borderBottom: i < plan.features.length - 1 ? '1px dashed #f0f0f0' : 'none',
                                        }}
                                    >
                                        <CheckOutlined style={{ color: plan.color, fontSize: 12 }} />
                                        <Text style={{ fontSize: 13 }}>{feature}</Text>
                                    </div>
                                ))}

                                <Button
                                    type={plan.popular ? 'primary' : 'default'}
                                    block
                                    size="large"
                                    style={{
                                        marginTop: 16,
                                        height: 44,
                                        borderRadius: 8,
                                        fontWeight: 500,
                                        ...(plan.popular
                                            ? { background: plan.color, borderColor: plan.color }
                                            : {}),
                                    }}
                                >
                                    立即订阅
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Purchase;
