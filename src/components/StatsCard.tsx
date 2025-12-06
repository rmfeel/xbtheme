import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface StatsCardProps {
    title: string;
    value: string | number;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    icon?: React.ReactNode;
    color?: string; // Icon wrapper background color or icon color base
    description?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    prefix,
    suffix,
    icon,
    color = '#1677ff',
    description,
    footer,
    style
}) => {
    return (
        <Card variant="borderless" style={{ height: '100%', borderLeft: `4px solid ${color}`, ...style }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Text type="secondary">{title}</Text>
                    <div style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace', marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        {prefix && <span style={{ fontSize: 16, fontWeight: 'normal' }}>{prefix}</span>}
                        {value}
                        {suffix && <span style={{ fontSize: 14, fontWeight: 'normal', color: '#8c8c8c' }}>{suffix}</span>}
                    </div>
                </div>
                {icon && (
                    <div style={{
                        padding: 8,
                        background: `${color}1A`, // 10% opacity hex
                        borderRadius: 8,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </div>
                )}
            </div>
            {(description || footer) && (
                <div style={{ marginTop: 16 }}>
                    {description && <div style={{ fontSize: 12, color: '#8c8c8c' }}>{description}</div>}
                    {footer}
                </div>
            )}
        </Card>
    );
};

export default StatsCard;
