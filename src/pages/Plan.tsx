import { Card, Row, Col, Typography, Button, Tag, Segmented, Grid } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface FeatureItem {
    text: string;
    included: boolean;
    highlight?: string;
}

interface PlanItem {
    name: string;
    price: number;
    period: string;
    description: string;
    features: FeatureItem[];
    popular?: boolean;
    discount?: string;
    category: 'cycle' | 'traffic';
}

const Plan = () => {
    const screens = useBreakpoint();
    const [filter, setFilter] = useState<string>('全部');
    const [selectedPlan, setSelectedPlan] = useState<string>('季付進階版');

    const plans: PlanItem[] = [
        {
            name: '月付基礎版',
            price: 15,
            period: '月',
            description: '適合輕度使用者，偶爾查閱資料',
            category: 'cycle',
            features: [
                { text: '每月 {100 GB} 流量', included: true, highlight: '100 GB' },
                { text: '限速 {300 Mbps}', included: true, highlight: '300 Mbps' },
                { text: '支持 2 台設備同時在線', included: true },
                { text: '解鎖 ChatGPT / Netflix', included: false },
            ],
        },
        {
            name: '季付進階版',
            price: 40,
            period: '季',
            description: '性價比首選，解鎖全部功能',
            discount: '省 15%',
            popular: true,
            category: 'cycle',
            features: [
                { text: '每月 {500 GB} 高速流量', included: true, highlight: '500 GB' },
                { text: '{不限速}，暢享 4K 視頻', included: true, highlight: '不限速' },
                { text: '支持 5 台設備同時在線', included: true },
                { text: '解鎖 ChatGPT / Disney+ / Netflix', included: true },
            ],
        },
        {
            name: '年付專享版',
            price: 150,
            period: '年',
            description: '長期穩定，適合極客與團隊',
            category: 'cycle',
            features: [
                { text: '每月 {2048 GB} 流量', included: true, highlight: '2048 GB' },
                { text: 'IPLC 專線接入', included: true },
                { text: '支持 10 台設備同時在線', included: true },
                { text: '一對一專屬客服支持', included: true },
            ],
        },
    ];

    const filteredPlans = filter === '全部'
        ? plans
        : filter === '周期'
            ? plans.filter(p => p.category === 'cycle')
            : plans.filter(p => p.category === 'traffic');

    // Calculate transform for desktop view
    const getTransformStyles = (index: number) => {
        // Only trigger animation on desktop (md) and when 3 items are present
        if (!screens.md || filteredPlans.length !== 3) return {};

        const selectedIndex = filteredPlans.findIndex(p => p.name === selectedPlan);

        // If selected is already center (1), no transform needed
        if (selectedIndex === 1) return {};

        // If Left (0) is selected
        // 0 -> moves to Right (+1 slot)
        // 1 -> moves to Left (-1 slot)
        if (selectedIndex === 0) {
            if (index === 0) return { transform: 'translateX(100%)' };
            if (index === 1) return { transform: 'translateX(-100%)' };
        }

        // If Right (2) is selected
        // 2 -> moves to Left (-1 slot)
        // 1 -> moves to Right (+1 slot)
        if (selectedIndex === 2) {
            if (index === 2) return { transform: 'translateX(-100%)' };
            if (index === 1) return { transform: 'translateX(100%)' };
        }

        return {};
    };

    const renderFeatureText = (feature: FeatureItem) => {
        if (feature.highlight) {
            const parts = feature.text.split(`{${feature.highlight}}`);
            return (
                <>
                    {parts[0]}
                    <Text strong>{feature.highlight}</Text>
                    {parts[1]}
                </>
            );
        }
        return feature.text;
    };

    return (
        <div>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ marginBottom: 8, fontWeight: 600 }}>
                    选择最适合你的计划
                </Title>
                <Text type="secondary" style={{ fontSize: 14 }}>
                    灵活的订阅选项，满足您的不同需求。随时可升级或取消。
                </Text>
                <div style={{ marginTop: 24 }}>
                    <Segmented
                        options={['全部', '周期', '按流量']}
                        value={filter}
                        onChange={(value) => setFilter(value as string)}
                        style={{ padding: 4 }}
                    />
                </div>
            </div>

            <Row gutter={[24, 24]} justify="center">
                {filteredPlans.map((plan, index) => {
                    const isSelected = selectedPlan === plan.name;
                    const transformStyle = getTransformStyles(index);

                    return (
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={7}
                            key={plan.name}
                            style={{
                                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                zIndex: isSelected ? 10 : 1,
                                ...transformStyle
                            }}
                        >
                            <Card
                                hoverable
                                onClick={() => setSelectedPlan(plan.name)}
                                style={{
                                    border: '1px solid #f0f0f0',
                                    boxShadow: isSelected
                                        ? '0 0 0 2px #1677ff, 0 4px 12px rgba(22, 119, 255, 0.15)'
                                        : '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                                    height: '100%',
                                    transform: isSelected ? 'translateY(-8px) scale(1.02)' : 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                }}
                                styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', height: '100%' } }}
                            >
                                {/* Header */}
                                <div style={{ marginBottom: 16 }}>
                                    <Title
                                        level={5}
                                        style={{
                                            margin: 0,
                                            fontWeight: 500,
                                            color: isSelected ? '#1677ff' : 'rgba(0, 0, 0, 0.88)',
                                            transition: 'color 0.3s',
                                        }}
                                    >
                                        {plan.name}
                                    </Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {plan.description}
                                    </Text>
                                </div>

                                {/* Price */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    marginBottom: 24,
                                    paddingBottom: 24,
                                    borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
                                }}>
                                    <Text type="secondary" style={{ fontSize: 20, fontWeight: 600 }}>¥</Text>
                                    <span style={{
                                        fontSize: 40,
                                        fontWeight: 700,
                                        color: 'rgba(0, 0, 0, 0.88)',
                                        margin: '0 4px',
                                        lineHeight: 1,
                                    }}>
                                        {plan.price}
                                    </span>
                                    <Text type="secondary" style={{ fontSize: 14 }}>/ {plan.period}</Text>
                                    {plan.discount && (
                                        <Tag
                                            variant="filled"
                                            style={{
                                                marginLeft: 8,
                                                background: '#fff1f0',
                                                color: '#ff4d4f',
                                                border: '1px solid #ffccc7',
                                                fontSize: 12,
                                            }}
                                        >
                                            {plan.discount}
                                        </Tag>
                                    )}
                                </div>

                                {/* Features */}
                                <div style={{ flex: 1, marginBottom: 24 }}>
                                    {plan.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 12,
                                                marginBottom: 16,
                                            }}
                                        >
                                            {feature.included ? (
                                                <CheckOutlined style={{
                                                    color: isSelected ? '#1677ff' : '#52c41a',
                                                    fontSize: 14,
                                                    marginTop: 3,
                                                    flexShrink: 0,
                                                    transition: 'color 0.3s',
                                                }} />
                                            ) : (
                                                <CloseOutlined style={{
                                                    color: 'rgba(0, 0, 0, 0.25)',
                                                    fontSize: 14,
                                                    marginTop: 3,
                                                    flexShrink: 0,
                                                }} />
                                            )}
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: feature.included
                                                        ? (isSelected ? 'rgba(0, 0, 0, 0.88)' : 'rgba(0, 0, 0, 0.65)')
                                                        : 'rgba(0, 0, 0, 0.25)',
                                                    textDecoration: feature.included ? 'none' : 'line-through',
                                                    transition: 'color 0.3s',
                                                }}
                                            >
                                                {renderFeatureText(feature)}
                                            </Text>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <Button
                                    type={isSelected ? 'primary' : 'default'}
                                    block
                                    size="large"
                                    style={{
                                        height: 40,
                                        fontWeight: 500,
                                    }}
                                >
                                    立即訂閱
                                </Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Plan;
