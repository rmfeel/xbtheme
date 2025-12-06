import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Text } = Typography;

interface PageHeaderProps {
    title: string;
    subtitle?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, extra, style, children }) => {
    return (
        <Card variant="borderless" style={{ marginBottom: 24, ...style }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <Title level={4} style={{ margin: '0 0 8px 0' }}>{title}</Title>
                    {subtitle && (
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {subtitle}
                        </Text>
                    )}
                </div>
                {extra && (
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        {extra}
                    </div>
                )}
            </div>
            {children && <div style={{ marginTop: 24 }}>{children}</div>}
        </Card>
    );
};

export default PageHeader;
