import React from 'react';
import { Card, Typography, Row, Col, Divider, Alert, Steps, Button, Anchor } from 'antd';
import { DownloadOutlined, GlobalOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

const Doc: React.FC = () => {
    return (
        <div className="windows-doc-page" style={{ maxWidth: 1200, margin: '0 auto', padding: '10px' }}>
            <Row gutter={24}>
                {/* Left Column: Article Content */}
                <Col xs={24} lg={18}>
                    <Card variant="borderless" className="article-content">
                        <Typography>
                            <Title level={1} id="intro">Windows 使用教程：Clash Verge Rev</Title>
                            <Paragraph>
                                这是一个针对 Windows 用户 的 <Text strong>Clash Verge Rev</Text>（目前最推荐的 Clash 客户端替代品）保姆级教程。
                            </Paragraph>
                            <Paragraph>
                                Clash Verge Rev 是开源、免费且界面现代化的代理软件。本教程将带你从下载到从零开始配置。
                            </Paragraph>

                            <Divider />

                            <Title level={2} id="step1">第一步：下载与安装</Title>
                            <Alert
                                message="安全提示"
                                description="请前往 GitHub 官方发布页面下载，为了安全，请勿在第三方软件站下载。"
                                type="warning"
                                showIcon
                                style={{ marginBottom: 16 }}
                            />
                            <Paragraph>
                                <Link href="https://github.com/clash-verge-rev/clash-verge-rev/releases" target="_blank" strong>
                                    <Button type="primary" icon={<DownloadOutlined />}>
                                        前往 GitHub 下载页面
                                    </Button>
                                </Link>
                            </Paragraph>
                            <Paragraph>
                                找到最新版本的 Assets 列表，下载文件名包含 <Text code>x64-setup.exe</Text> 的文件（例如：<Text code>Clash.Verge_Rev_v1.7.7_x64-setup.exe</Text>）。
                            </Paragraph>
                            <Paragraph type="secondary">
                                注：如果你知道自己电脑架构特殊（如 ARM 架构），请选择对应版本，否则绝大多数 Win10/Win11 电脑选 x64 即可。
                            </Paragraph>

                            <Title level={4}>安装软件</Title>
                            <Paragraph>
                                1. 双击下载的 .exe 文件。<br />
                                2. <Text type="danger">注意</Text>：Windows Defender 或杀毒软件可能会弹出“未知发布者”或“病毒威胁”警告。这是因为开源软件没有购买昂贵的微软数字证书。<br />
                                3. 操作：点击“更多信息” -&gt; “仍要运行”。<br />
                                4. 一路点击“下一步”完成安装。
                            </Paragraph>

                            <Divider />

                            <Title level={2} id="step2">第二步：设置中文界面（可选）</Title>
                            <Paragraph>默认可能是英文界面，如果需要中文：</Paragraph>
                            <Steps
                                direction="vertical"
                                size="small"
                                current={-1}
                                items={[
                                    { title: "打开 Clash Verge Rev" },
                                    { title: "点击左侧菜单栏的 Settings (设置)", icon: <SettingOutlined /> },
                                    { title: "找到 UI Settings (界面设置) &gt; Language (语言)" },
                                    { title: "选择 Chinese (Simplified) (简体中文)" }
                                ]}
                            />
                            <Paragraph style={{ marginTop: 16 }}>软件界面会立即变为中文。</Paragraph>

                            <Divider />

                            <Title level={2} id="step3">第三步：导入订阅（核心步骤）</Title>
                            <Paragraph>
                                你需要先购买机场服务（节点服务商），获取 <Text strong>订阅链接 (Subscription Link)</Text>。
                            </Paragraph>

                            <Title level={4}>方法 A：复制链接导入（最推荐，成功率高）</Title>
                            <ol>
                                <li>在机场官网复制你的 订阅链接（通常是以 http 开头的长链接）。</li>
                                <li>回到 Clash Verge Rev，点击左侧 <Text strong>订阅</Text>。</li>
                                <li>在顶部的输入框中粘贴链接，点击右侧的 <Text strong>导入</Text> 按钮。</li>
                                <li>导入成功后，你会看到下方出现了一个卡片。<Text type="danger" strong>务必点击一下这个卡片</Text>，使其变色（通常高亮显示），表示选中该配置。</li>
                            </ol>

                            <Title level={4}>方法 B：一键导入</Title>
                            <Paragraph>
                                如果在机场官网点击“一键导入 Clash”，会自动唤起软件并导入。但有时浏览器会拦截，所以建议用方法 A。
                            </Paragraph>

                            <Divider />

                            <Title level={2} id="step4">第四步：开启代理</Title>
                            <Paragraph>点击左侧菜单栏的 <Text strong>代理</Text>。</Paragraph>
                            <Paragraph>在顶部你会看到几个模式，强烈建议选择 <Text strong>规则 (Rule)</Text> 模式。</Paragraph>
                            <ul>
                                <li><Text strong>规则 (Rule)</Text>：智能分流。访问国内网站不走代理（速度快），访问国外网站走代理。</li>
                                <li><Text strong>全局 (Global)</Text>：所有流量强制走代理（国内网站会变慢，仅在特殊情况使用）。</li>
                                <li><Text strong>直连 (Direct)</Text>：都不走代理。</li>
                            </ul>
                            <Paragraph>
                                点击右上角的 WiFi图标（或闪电图标），测试节点延迟。选择一个数字较小（绿色或黄色）的节点点击选中。
                            </Paragraph>

                            <Divider />

                            <Title level={2} id="step5">第五步：打开系统代理开关（最后一步）</Title>
                            <Paragraph>
                                <Text strong>只选好节点是没用的，你必须打开“总开关”。</Text>
                            </Paragraph>
                            <Steps
                                direction="vertical"
                                size="small"
                                current={-1}
                                items={[
                                    { title: "点击左侧菜单栏的 设置" },
                                    { title: "找到 系统代理 选项" },
                                    { title: "点击开关将其打开（变为蓝色或高亮）", icon: <GlobalOutlined /> }
                                ]}
                            />
                            <Paragraph style={{ marginTop: 16 }}>
                                此时，打开浏览器访问 Google 或 YouTube，应该可以正常使用了。
                            </Paragraph>

                            <Divider />

                            <Title level={2} id="advanced">进阶技巧：开启 TUN 模式</Title>
                            <Paragraph>
                                如果你需要玩游戏、使用非浏览器软件（如 Telegram 客户端、Discord 客户端），普通的系统代理可能无效。你需要开启 TUN 模式。
                            </Paragraph>
                            <ol>
                                <li>点击左侧 <Text strong>设置</Text>。</li>
                                <li>找到 <Text strong>Tun 模式</Text>。</li>
                                <li>首次开启时，软件会提示需要管理员权限安装“服务模式”，点击“安装”或“授权”。</li>
                                <li>安装完成后，打开 <Text strong>Tun 模式</Text> 开关。</li>
                            </ol>
                            <Alert message="注意：开启 Tun 模式后，通常不需要再开启“系统代理”，它会接管电脑所有流量。" type="info" showIcon />

                            <Divider />

                            <Title level={2} id="faq">常见问题与避坑</Title>

                            <Title level={4}>1. 连不上，全部显示超时/红色？</Title>
                            <Paragraph>
                                <ul>
                                    <li><Text strong>校准时间</Text>：Windows 的系统时间必须准确。如果时间慢了几分钟，节点会无法连接。去 Windows 设置里“同步时间”。</li>
                                    <li><Text strong>流量耗尽</Text>：检查你的机场套餐是否还有流量。</li>
                                </ul>
                            </Paragraph>

                            <Title level={4}>2. 关闭软件后电脑无法上网？</Title>
                            <Paragraph>
                                这是新手最容易遇到的问题。因为系统代理开关没关，但软件退出了，电脑还在尝试发给已经关闭的端口。
                            </Paragraph>
                            <Paragraph>
                                <Text strong>解决方法</Text>：重新打开 Clash Verge Rev，进入设置，关闭“系统代理”，然后再退出软件。或者在 Windows 的“网络和Internet设置” -&gt; “代理”中手动关闭开关。
                            </Paragraph>

                            <Title level={4}>3. 为什么有些网页打不开？</Title>
                            <Paragraph>
                                尝试在“代理”界面，点击右上角的闪电图标刷新延迟，换一个节点试试。
                            </Paragraph>

                        </Typography>
                    </Card>
                </Col>

                {/* Right Column: Table of Contents */}
                <Col xs={24} lg={6}>
                    <Card title="目录" className="toc-card" style={{ position: 'sticky', top: 24 }}>
                        <Anchor
                            targetOffset={80}
                            items={[
                                { key: 'intro', href: '#intro', title: '简介' },
                                { key: 'step1', href: '#step1', title: '第一步：下载与安装' },
                                { key: 'step2', href: '#step2', title: '第二步：设置中文' },
                                { key: 'step3', href: '#step3', title: '第三步：导入订阅' },
                                { key: 'step4', href: '#step4', title: '第四步：开启代理' },
                                { key: 'step5', href: '#step5', title: '第五步：系统代理' },
                                { key: 'advanced', href: '#advanced', title: '进阶：TUN 模式' },
                                { key: 'faq', href: '#faq', title: '常见问题' },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Doc;
