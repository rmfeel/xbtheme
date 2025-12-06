import { Typography, Input, Space, Avatar, Tag, Card, Button } from 'antd';
import { SearchOutlined, EyeOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import PageHeader from '../components/PageHeader';

const { Title, Text, Paragraph } = Typography;

interface Article {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    author: string;
    views: number;
    likes: number;
    cover?: string;
}

const Knowledge = () => {
    const articles: Article[] = [
        {
            id: '1',
            title: 'Design Token 演进之路：从变量到系统化工程',
            description: '设计系统如何支持多主题切换？如何保证开发与设计的一致性？本文将探讨 Design Token 在现代前端工程中的核心作用，以及如何使用 Style Dictionary 进行自动化构建。',
            category: '设计规范',
            date: '1小时前',
            author: '设计中心',
            views: 856,
            likes: 42,
            cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: '2',
            title: '高并发场景下的 Redis 缓存一致性解决方案',
            description: '在秒杀或大促场景下，如何保证数据库与缓存的数据一致性是一个经典难题。本文将对比延迟双删、消息队列、Canal 订阅 Binlog 等多种方案的优劣。',
            category: '后端架构',
            date: '3小时前',
            author: '架构师老王',
            views: 5120,
            likes: 342,
            cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        },
        {
            id: '3',
            title: '微前端架构实战：如何基于 Qiankun 构建企业级中台应用',
            description: '随着企业业务的不断扩张，巨石应用维护变得越来越困难。微前端架构通过将应用拆分为多个独立的子应用，解决了协同开发和技术栈兼容问题。本文将详细介绍我们在生产环境中的落地实践。',
            category: '前端架构',
            date: '1天前',
            author: '技术团队',
            views: 3200,
            likes: 128,
            cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        }
    ];

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 0' }}>
            {/* Header */}
            <PageHeader
                title="知识库"
                subtitle="在这里找到您所有问题的答案。"
            >
                <div style={{ maxWidth: 600 }}>
                    <Input
                        size="large"
                        placeholder="搜索文章..."
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    />
                </div>
            </PageHeader>

            {/* Article List - Replaced List component with map to fix deprecation warning */}
            <div>
                {articles.map((item) => (
                    <Card
                        key={item.id}
                        hoverable
                        style={{ marginBottom: 16 }}
                        styles={{ body: { padding: 24 } }}
                    >
                        <div style={{ display: 'flex', gap: 24 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <Tag color="blue">{item.category}</Tag>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text>
                                </div>

                                <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
                                    {item.title}
                                </Title>

                                <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 16 }}>
                                    {item.description}
                                </Paragraph>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Space>
                                        <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} />
                                        <Text type="secondary">{item.author}</Text>
                                    </Space>

                                    <Space size="large" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                        <Space>
                                            <EyeOutlined />
                                            {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                                        </Space>
                                        <Space>
                                            <LikeOutlined />
                                            {item.likes}
                                        </Space>
                                    </Space>
                                </div>
                            </div>

                            {item.cover && (
                                <div style={{
                                    width: 200,
                                    height: 130,
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    display: 'none', // Hidden on mobile by default
                                }}>
                                    <img
                                        alt={item.title}
                                        src={item.cover}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            {/* Simple responsive display for image */}
                            <style>{`
                                @media (min-width: 768px) {
                                    .article-cover { display: block !important; }
                                }
                            `}</style>
                            {item.cover && (
                                <div
                                    className="article-cover"
                                    style={{
                                        width: 200,
                                        height: 130,
                                        borderRadius: 5,
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        display: 'none'
                                    }}
                                >
                                    <img
                                        alt={item.title}
                                        src={item.cover}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Button size="large">加载更多文章</Button>
            </div>
        </div>
    );
};

export default Knowledge;
