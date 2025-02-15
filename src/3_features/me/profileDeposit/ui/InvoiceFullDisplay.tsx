import { FC, useState } from 'react';
import { Button, Card, Flex, Popover, Tooltip, Typography } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import s from './ProfileDeposit.module.css';

interface InvoiceFullDisplayProps {
    amount: number;
    invoice: string;
}

const InvoiceFullDisplay: FC<InvoiceFullDisplayProps> = ({ amount, invoice }) => {
    const [qrExpandedMode, setQrExpandedMode] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    return (
        <Flex vertical align="center" gap="small">
            <Typography style={{ flexShrink: 0, marginTop: '5px' }}>Deposit: {amount} sats</Typography>
            <Typography className="opacity50" style={{ textAlign: 'center' }}>
                BOLT-11 Invoice: scan with any lightning wallet
            </Typography>
            <Card className={s.qrBox} style={qrExpandedMode ? { width: '350px', height: '350px' } : { width: '220px', height: '220px' }}>
                <Tooltip placement="top" title={qrExpandedMode ? "Click to reset size" : "Click to enlarge"}>
                    <QRCodeCanvas
                        size={qrExpandedMode ? 350 : 220}
                        value={`lightning:${invoice}`}
                        includeMargin={true}
                        onClick={() => setQrExpandedMode(!qrExpandedMode)}
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
            </Card>
            <Flex align="center" gap="small" className="opacity50" style={{ marginTop: '20px' }}>
                <Tooltip title="Copy Invoice to Clipboard">
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(invoice);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}
                        type="text"
                        size="small"
                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                    >
                        {copied ? 'Copied' : null}
                    </Button>
                </Tooltip>
                <Popover content={<Typography style={{ width: '200px' }}>{invoice}</Typography>}>
                    <Typography style={{ border: '1px solid', padding: ' 5px' }}>
                        {invoice?.slice(0, 10)}...
                    </Typography>
                </Popover>
            </Flex>
        </Flex>
    );
};

export default InvoiceFullDisplay;
