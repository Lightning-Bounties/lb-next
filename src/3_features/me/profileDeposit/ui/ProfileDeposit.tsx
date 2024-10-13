'use client'

import { Button, Card, Col, Flex, Form, Input, notification, Popover, Row, Tooltip, Tour, TourProps, Typography } from 'antd'
import s from './ProfileDeposit.module.css'
import { QRCodeCanvas } from 'qrcode.react'
import { FC, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileDepositStatus } from '@/3_features/me/profileDepositStatus/'
import { profileApi } from '@/4_entities/me'
import { CheckOutlined, CopyOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { hintsConfig } from '@/5_shared/config/hints.config'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError'


const ProfileDeposit: FC = () => {

    const queryClient = useQueryClient();
    
    const [invoiceInfo, setInvoiceInfo] = useState<undefined | { amount: number, invoice: string, checkingId: string }>(undefined)
    const [copied, setCopied] = useState<boolean>(false)
    const [qrExpandedMode, setQrExpandedMode ] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification();
    const { mutateAsync: createPaymentLink, isPending } = useMutation({
        mutationFn: profileApi.createPaymentLink
    })
    const onFinishHandler = async (data: { amount_sats: string }) => {
        try {
            const amount_sats = parseInt(data.amount_sats)
            setInvoiceInfo(undefined)
            const depositResponse = await createPaymentLink({
                amount: amount_sats
            })
            setInvoiceInfo({
                amount: amount_sats,
                invoice: depositResponse.invoice,
                checkingId: depositResponse.checking_id
            })
            queryClient.invalidateQueries({queryKey: profileApi.qkGetProfilePaymentsHistory()})
        }
        catch (e) {
            api.error({
                message: catchHTTPValidationError(e)
            })
        }
    }

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['depositForm'].title,
            description: hintsConfig['depositForm'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['depositForm'].buttonText
            }
        },
        {
            title: hintsConfig['depositForm'].title,
            description: hintsConfig['depositForm'].body,
            target: () => ref2.current,
            nextButtonProps: {
                children: hintsConfig['depositForm'].buttonText
            }
        },
    ]

return (
    <>
        {contextHolder}
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        <Row gutter={[12, 12]} align="middle">
            <Col span={10} md={10} xs={24} sm={12}>
                <Form onFinish={onFinishHandler}>
                    <Flex vertical gap="small">
                        <Flex gap="small" align="start">
                            <Typography style={{ flexShrink: 0, marginTop: '5px' }}>Amount:</Typography>
                            <Form.Item
                                name="amount_sats"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Amount Required - how many sats do you want to deposit?'
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value || value <= 100000) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Amount too high; max allowed: 100,000'));
                                        }
                                    }
                                ]}
                            >
                                <Input placeholder='1,000' />
                            </Form.Item>
                        </Flex>
                        <Flex gap="large" align="start">
                            <Typography className="opacity50">max allowed: 100,000</Typography>
                            <QuestionCircleOutlined
                                style={{ flexShrink: 0, marginTop: '4px' }}
                                ref={ref1}
                                onClick={() => { setOpen(true) }}
                                className={`opacity50 ${s.question}`}
                            />
                        </Flex>
                        <Button loading={isPending} htmlType="submit" type="primary" style={{ marginTop: '20px' }}>Generate</Button>
                    </Flex>
                </Form>
                {invoiceInfo && <ProfileDepositStatus checkingId={invoiceInfo.checkingId} />}
            </Col>
            <Col span={14} md={14} xs={24} sm={12}>
                {invoiceInfo && (
                    <Flex vertical align="center" gap="small">
                        <Typography style={{ flexShrink: 0, marginTop: '5px' }}>Deposit: {invoiceInfo.amount} sats</Typography>
                        <Typography className="opacity50" style={{ textAlign: 'center' }}>
                            BOLT-11 Invoice: scan with any lightning wallet
                            &nbsp;
                            <QuestionCircleOutlined
                                style={{ flexShrink: 0, marginTop: '8px' }}
                                ref={ref2}
                                onClick={() => { setOpen(true) }}
                                className={`opacity50 ${s.question}`}
                            />
                        </Typography>
                        <Card className={s.qrBox} style={qrExpandedMode ? { width: '350px', height: '350px' } : { width: '220px', height: '220px' }}>
                            <Tooltip placement="top" title={qrExpandedMode ? "Click to reset size" : "Click to enlarge"}>
                                <QRCodeCanvas
                                    size={qrExpandedMode ? 350 : 220}
                                    value={`lightning:${invoiceInfo.invoice}`}
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
                                        navigator.clipboard.writeText(invoiceInfo.invoice)
                                        setCopied(true)
                                        setTimeout(() => {
                                            setCopied(false)
                                        }, 2000)
                                    }}
                                    type="text"
                                    size="small"
                                    icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                >{copied ? 'Copied' : null}</Button>
                            </Tooltip>
                            <Popover content={<Typography style={{ width: '200px' }}>{invoiceInfo.invoice}</Typography>}>
                                <Typography style={{ border: '1px solid', padding: ' 5px' }}>
                                    {invoiceInfo.invoice?.slice(0, 10)}...
                                </Typography>
                            </Popover>
                        </Flex>
                    </Flex>
                )}
            </Col>
        </Row>
    </>
)
}
export { ProfileDeposit }