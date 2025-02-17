'use client'

import { FC } from 'react'
import { Modal, Card, Button } from 'antd'
import { IssueDetailsCard } from './IssueDetailsCard/IssueDetailsCard'
import { PaymentCard } from './PaymentCard/PaymentCard'

type OneTimeRewardInvoiceModalProps = {
    open: boolean
    onOk: () => void
    onCancel: () => void
    pendingValues: {
        amount: number
        issueUrl: string
        issueId: string
        issueTitle: string
    }
}

const OneTimeRewardInvoiceModal: FC<OneTimeRewardInvoiceModalProps> = ({
    open,
    onOk,
    onCancel,
    pendingValues
}) => {
    return (
        <Modal
            title={<div style={{ textAlign: 'center' }}>Add Reward to Issue</div>}
            open={open}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>
            ]}
            onCancel={onCancel}
            width={600}
            style={{ top: 200 }}
        >
            <IssueDetailsCard 
                issueUrl={pendingValues?.issueUrl || ''}
                issueTitle={pendingValues?.issueTitle || ''}
                rewardAmount={pendingValues?.amount || 0}
            />
            <PaymentCard 
                amount={pendingValues?.amount || 0} 
                issueId={pendingValues?.issueId || ''}
            />
        </Modal>
    )
}

export { OneTimeRewardInvoiceModal }
