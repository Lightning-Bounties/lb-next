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
            title: hintsConfig['verifyOnBranta'].title,
            description: hintsConfig['verifyOnBranta'].body,
            target: () => ref2.current,
            nextButtonProps: {
                children: hintsConfig['verifyOnBranta'].buttonText
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
                        <div>
                            <a target="_blank" href={`https://${process.env.NEXT_PUBLIC_DEV_MODE == 'true' ? 'staging' : 'payments'}.branta.pro/v1/verify/${invoiceInfo.invoice}`}>
                            <Typography className="opacity50">Verify Invoice:</Typography>
                            <div style={{display: "inline-block"}}>
                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 410 44" width="90" height="10">
                                <defs><style>{`.cls-1{fill:#747474;}`}</style></defs>
                                  <g>
                                    <path class="cls-1" d="M51.19,11.62c.58.24,1.09.56,1.53.99.44.42.79.95,1.06,1.57.27.63.4,1.32.4,2.07v3.24c0,.72-.19,1.36-.56,1.93-.38.56-.75.99-1.13,1.27.38.22.75.56,1.13,1.03.38.47.56,1.1.56,1.88v3.48c0,.75-.13,1.44-.4,2.07-.27.63-.62,1.15-1.06,1.57-.44.42-.95.75-1.53.99s-1.17.35-1.76.35H12.35V11.27h37.08c.6,0,1.18.12,1.76.35ZM17.38,20.15h29.98c.47,0,.88-.11,1.25-.33.36-.22.54-.64.54-1.27v-.52c0-.66-.16-1.12-.49-1.39-.33-.27-.78-.4-1.34-.4h-29.94v3.9ZM17.38,29.08h30.03c.56,0,.99-.09,1.29-.26.3-.17.45-.59.45-1.25v-.56c0-.63-.19-1.1-.56-1.41-.38-.31-.8-.47-1.27-.47h-29.94v3.95Z"/>
                                    <path class="cls-1" d="M122.87,11.62c.58.24,1.09.56,1.53.99.44.42.79.95,1.06,1.57.27.63.4,1.32.4,2.07v3.9c0,1.35-.34,2.43-1.01,3.24-.67.81-1.51,1.35-2.51,1.6l3.57,9.07h-5.12l-3.99-8.93h-27.73v8.93h-5.03V11.27h37.08c.6,0,1.18.12,1.76.35ZM89.05,20.15h29.98c.47,0,.88-.1,1.25-.31.36-.2.54-.62.54-1.25v-.52c0-.66-.16-1.13-.49-1.41-.33-.28-.78-.42-1.34-.42h-29.94v3.9Z"/>
                                    <path class="cls-1" d="M154.57,34.06l18.42-22.79h4.98l18.42,22.79h-6.2l-4.51-5.5h-20.4l-4.51,5.5h-6.2ZM169.19,23.72h12.6l-6.3-7.57-6.3,7.57Z"/>
                                    <path class="cls-1" d="M230.19,11.27l31.72,17.29V11.27h5.03v22.79h-5.08l-31.72-17.29v17.29h-5.03V11.27h5.08Z"/>
                                    <path class="cls-1" d="M296.79,11.27h41.83v4.98h-18.42v17.81h-5.03v-17.81h-18.38v-4.98Z"/>
                                    <path class="cls-1" d="M358.13,34.06l18.42-22.79h4.98l18.42,22.79h-6.2l-4.51-5.5h-20.4l-4.51,5.5h-6.2ZM372.74,23.72h12.6l-6.3-7.57-6.3,7.57Z"/>
                                  </g>
                              </svg>
                            </div>
                            </a>
                            <span style={{marginLeft: "5px"}}></span>
                            <QuestionCircleOutlined
                                style={{ flexShrink: 0, marginTop: '4px' }}
                                ref={ref2}
                                onClick={() => { setOpen(true) }}
                                className={`opacity50 ${s.question}`}
                            />
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
