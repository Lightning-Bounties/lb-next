'use client';

import {
    Button,
    Card,
    Col,
    Flex,
    Form,
    Input,
    notification,
    Popover,
    Row,
    Tooltip,
    Tour,
    TourProps,
    Typography,
} from 'antd';
import BrantaRailsDisplay from './BrantaRailsDisplay';
import InvoiceFullDisplay from './InvoiceFullDisplay';
import s from './ProfileDeposit.module.css';
import { QRCodeCanvas } from 'qrcode.react';
import { FC, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileDepositStatus } from '@/3_features/me/profileDepositStatus/';
import { profileApi } from '@/4_entities/me';
import {
    CheckOutlined,
    CopyOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { hintsConfig } from '@/5_shared/config/hints.config';
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';

const ProfileDeposit: FC = () => {
    const queryClient = useQueryClient();

    const [invoiceInfo, setInvoiceInfo] = useState<
        undefined | { amount: number; invoice: string; checkingId: string }
    >(undefined);
    const [copied, setCopied] = useState<boolean>(false);
    const [qrExpandedMode, setQrExpandedMode] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const { mutateAsync: createPaymentLink, isPending } = useMutation({
        mutationFn: profileApi.createPaymentLink,
    });
    const onFinishHandler = async (data: { amount_sats: string }) => {
        try {
            const amount_sats = parseInt(data.amount_sats);
            setInvoiceInfo(undefined);
            const depositResponse = await createPaymentLink({
                amount: amount_sats,
            });
            setInvoiceInfo({
                amount: amount_sats,
                invoice: depositResponse.invoice,
                checkingId: depositResponse.checking_id,
            });
            queryClient.invalidateQueries({
                queryKey: profileApi.qkGetProfilePaymentsHistory(),
            });
        } catch (e) {
            api.error({
                message: catchHTTPValidationError(e),
            });
        }
    };

    const ref1 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['depositForm'].title,
            description: hintsConfig['depositForm'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['depositForm'].buttonText,
            },
        },
    ];

    return (
        <>
            {contextHolder}
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            <Row gutter={[12, 12]} align="middle">
                <Col span={10} md={10} xs={24} sm={12}>
                    <Form onFinish={onFinishHandler}>
                        <Flex vertical gap="small">
                            <Flex gap="small" align="start">
                                <Typography
                                    style={{ flexShrink: 0, marginTop: '5px' }}
                                >
                                    Amount:
                                </Typography>
                                <Form.Item
                                    name="amount_sats"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Amount Required - how many sats do you want to deposit?',
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (!value || value <= 100000) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'Amount too high; max allowed: 100,000',
                                                    ),
                                                );
                                            },
                                        },
                                    ]}
                                >
                                    <Input placeholder="1,000" />
                                </Form.Item>
                            </Flex>
                            <Flex gap="large" align="start">
                                <Typography className="opacity50">
                                    max allowed: 100,000
                                </Typography>
                                <QuestionCircleOutlined
                                    style={{ flexShrink: 0, marginTop: '4px' }}
                                    ref={ref1}
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    className={`opacity50 ${s.question}`}
                                />
                            </Flex>
                            <Button
                                loading={isPending}
                                htmlType="submit"
                                type="primary"
                                style={{ marginTop: '20px' }}
                            >
                                Generate
                            </Button>
                        </Flex>
                    </Form>
                    {invoiceInfo && (
                        <ProfileDepositStatus
                            checkingId={invoiceInfo.checkingId}
                        />
                    )}
                    {invoiceInfo && (
                        <>
                            <br />
                            <BrantaRailsDisplay
                                invoice={invoiceInfo.invoice}
                                onClick={() => {
                                    setOpen(true);
                                }}
                            />
                        </>
                    )}
                </Col>
                <Col span={14} md={14} xs={24} sm={12}>
                    {invoiceInfo && (
                        <InvoiceFullDisplay
                            amount={invoiceInfo.amount}
                            invoice={invoiceInfo.invoice}
                        />
                    )}
                </Col>
            </Row>
        </>
    );
};
export { ProfileDeposit };
