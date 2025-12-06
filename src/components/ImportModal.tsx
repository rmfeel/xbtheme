import React from 'react';
import { Modal, message } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import './ImportModal.css';

interface ImportModalProps {
    open: boolean;
    onCancel: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ open, onCancel }) => {
    const [messageApi, contextHolder] = message.useMessage();

    // Mock subscription URL - in a real app this would come from props or context
    const SUB_URL = "https://example.com/api/v1/subscribe?token=123456";

    const handleCopy = (msg: string) => {
        navigator.clipboard.writeText(SUB_URL).then(() => {
            messageApi.success(msg);
        });
    };

    const handleImport = (scheme_prefix: string, name: string) => {
        const encodedUrl = encodeURIComponent(SUB_URL);
        const finalUrl = `${scheme_prefix}${encodedUrl}`;
        window.location.href = finalUrl;
        messageApi.loading(`正在打开 ${name}`, 1);
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                onCancel={onCancel}
                footer={null}
                closable={true}
                centered
                width={480}
                wrapClassName="windows-import-modal"
                styles={{ mask: { backgroundColor: 'rgba(0, 0, 0, 0.45)' } }}
            >
                <div className="windows-import-modal-body">
                    {/* Header */}
                    <div className="modal-header">
                        <div className="header-left">
                            <h2 className="header-title">Windows 客户端配置</h2>
                            <p className="header-subtitle">请选择一种方式导入订阅配置</p>
                        </div>
                        <div className="header-status">
                            <span className="status-dot"></span>
                            <span>服务正常</span>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="client-grid">
                        {/* Verge Rev */}
                        <div
                            className="client-card verge"
                            onClick={() => handleImport('clash://install-config?url=', 'Clash Verge Rev')}
                        >
                            <div className="card-icon-wrapper">
                                <ThunderboltFilled />
                            </div>
                            <div className="card-info">
                                <div className="card-name">Clash Verge Rev</div>
                                <div className="card-desc">官方推荐 · 稳定</div>
                            </div>
                        </div>

                        {/* Hiddify */}
                        <div
                            className="client-card hiddify"
                            onClick={() => handleImport('hiddify://install-config?url=', 'Hiddify')}
                        >
                            <div className="card-icon-wrapper">
                                <span style={{ fontWeight: 700 }}>H</span>
                            </div>
                            <div className="card-info">
                                <div className="card-name">Hiddify</div>
                                <div className="card-desc">全能客户端</div>
                            </div>
                        </div>

                        {/* Mihomo Party */}
                        <div
                            className="client-card mihomo"
                            onClick={() => handleImport('clash://install-config?url=', 'Mihomo Party')}
                        >
                            <div className="card-icon-wrapper">
                                <span>🎉</span>
                            </div>
                            <div className="card-info">
                                <div className="card-name">Mihomo Party</div>
                                <div className="card-desc">界面美观</div>
                            </div>
                        </div>

                        {/* v2rayN */}
                        <div
                            className="client-card v2rayn"
                            onClick={() => handleCopy('链接已复制，请打开 v2rayN 粘贴')}
                        >
                            <div className="card-icon-wrapper">
                                <span style={{ fontWeight: 700 }}>V</span>
                            </div>
                            <div className="card-info">
                                <div className="card-name">v2rayN</div>
                                <div className="card-desc">复制链接手动添加</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer-action">
                        <button
                            className="copy-link"
                            onClick={() => handleCopy('通用订阅链接已复制')}
                        >
                            复制通用订阅链接
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ImportModal;
