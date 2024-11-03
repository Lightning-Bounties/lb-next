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
                {invoiceInfo && 
                    <>
                        <br />
                        <div >
                            <a   target="_blank" href={`https://staging.branta.pro/v1/verify/${invoiceInfo.invoice}`}>
                            Verify on
                            
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" version="1.1" 
                                viewBox="0 0 67 67"
                                style={{height: "20px"}}
                                >
                            <defs>
                                <style>
                                    {`.cls-1{fill:#f1c40f;}`}
                                </style>
                            </defs>
                            <g>
                                <g id="Layer_1">
                                <circle cx="33.5" cy="33.5" r="32"/>
                                <path className="cls-1" d="M51.69,22.12c.58.24,1.09.56,1.53.99.44.42.79.95,1.06,1.57.27.63.4,1.32.4,2.07v3.24c0,.72-.19,1.36-.56,1.93-.38.56-.75.99-1.13,1.27.38.22.75.56,1.13,1.03.38.47.56,1.1.56,1.88v3.48c0,.75-.13,1.44-.4,2.07-.27.63-.62,1.15-1.06,1.57-.44.42-.95.75-1.53.99s-1.17.35-1.76.35H12.85v-22.79h37.08c.6,0,1.18.12,1.76.35ZM17.88,30.65h29.98c.47,0,.88-.11,1.25-.33.36-.22.54-.64.54-1.27v-.52c0-.66-.16-1.12-.49-1.39-.33-.27-.78-.4-1.34-.4h-29.94v3.9ZM17.88,39.58h30.03c.56,0,.99-.09,1.29-.26.3-.17.45-.59.45-1.25v-.56c0-.63-.19-1.1-.56-1.41-.38-.31-.8-.47-1.27-.47h-29.94v3.95Z"/>
                                </g>
                            </g>
                            </svg>
                            </a>
                        </div>
                    </>
                }
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