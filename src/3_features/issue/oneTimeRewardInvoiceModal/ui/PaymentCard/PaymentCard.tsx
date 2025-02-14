'use client'

import { FC, useEffect, useState } from 'react'
import { Card, Space, Spin, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import InvoiceFullDisplay from '@/3_features/me/profileDeposit/ui/InvoiceFullDisplay'
import BrantaRailsDisplay from '@/3_features/me/profileDeposit/ui/BrantaRailsDisplay'

const STUB_JWT = 'your-jwt-token-here'

type PaymentCardProps = {
    amount: number
}

const PaymentCard: FC<PaymentCardProps> = ({ amount }) => {
    const [invoiceInfo, setInvoiceInfo] = useState<undefined | { amount: number, invoice: string, checkingId: string }>(undefined)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setInvoiceInfo({
                amount: 3,
                invoice: "lnbc30n1pn67anwpp5v5mypr98avvkpr228nmcnfr4m2ptlpw5jc4xwpg382zxwevygeyqdq2f38xy6t5wvcqzzsxqrrsssp5z4gu7xgkhddd32pwjnhtv4dh9qhw4ull2l3e86mwle9zy797tezs9qyyssqm75fammc39wk9rr9uv42qznw5wge90hkxknedvwuh048tat9pqz5xgd75s2pqn6x8qj0nn0qnkezj7s3w74pxzz7ya45u8kf7ue0d0sq22m2tk",
                checkingId: "deadbeef"
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []); 

    const { data: invoiceInfoReq, isLoading } = useQuery({
        queryKey: ['createPaymentLink', amount],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/api/wallet/deposit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${STUB_JWT}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount_sats: amount })
            })
            return response.json()
        },
        enabled: !!amount
    })


    if (isLoading) {
        return <Card loading />
    }

    return (
        <Card style={{ marginBottom: 16 }}>
            {invoiceInfo?.invoice && (
                <>
                    <InvoiceFullDisplay amount={invoiceInfo.amount} invoice={invoiceInfo.invoice} />
                    <Space direction="vertical" align="center" style={{ width: '100%', marginTop: '16px' }}>
                        <BrantaRailsDisplay invoice={invoiceInfo.invoice} onClick={() => {}} />
                    </Space>
                    <Space direction="vertical" align="center" style={{ width: '100%', marginTop: '16px' }}>
                        <Spin />
                        <Typography >Waiting payment confirmation...</Typography>
                    </Space>
                </>
            )}
        </Card>
    )
}

export { PaymentCard }
