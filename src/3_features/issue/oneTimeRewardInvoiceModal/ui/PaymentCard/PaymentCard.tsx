'use client'

import { FC, useState } from 'react'
import { Card, Space } from 'antd'
import { useQuery } from '@tanstack/react-query'
import InvoiceFullDisplay from '@/3_features/me/profileDeposit/ui/InvoiceFullDisplay'
import BrantaRailsDisplay from '@/3_features/me/profileDeposit/ui/BrantaRailsDisplay'
import { OneTimePaymentStatus } from '../OneTimePaymentStatus/OneTimePaymentStatus'
import { issueApi } from '@/4_entities/issue/api/issue.api'

type PaymentCardProps = {
    amount: number
    issueId: string
}

const PaymentCard: FC<PaymentCardProps> = ({ amount, issueId }) => {
    const { data: invoiceInfo, isLoading } = useQuery({
        queryKey: ['createOneTimePayment', issueId, amount],
        queryFn: async () => {
            const response = await issueApi.createOneTimePayment(issueId, amount)
            return {
                amount: amount,
                invoice: response.invoice,
                checkingId: response.checking_id
            }
        },
        enabled: !!amount && !!issueId,
        refetchOnWindowFocus: false,
        // staleTime: 1000*60*15, //TODO - expire with invoice
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
                        <BrantaRailsDisplay 
                            invoice={invoiceInfo.invoice} 
                            onClick={() => {}} 
                        />
                    </Space>
                    <Space direction="vertical" align="center" style={{ width: '100%', marginTop: '16px' }}>
                        <OneTimePaymentStatus 
                            issueId={issueId}
                            checkingId={invoiceInfo.checkingId}
                        />
                    </Space>
                </>
            )}
        </Card>
    )
}

export { PaymentCard }
