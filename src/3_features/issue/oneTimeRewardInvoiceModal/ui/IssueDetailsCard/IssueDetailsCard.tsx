'use client'

import { FC } from 'react'
import { Card, Typography } from 'antd'

const { Text } = Typography

type IssueDetailsCardProps = {
    issueUrl: string
    issueTitle: string
    rewardAmount: number
}

const IssueDetailsCard: FC<IssueDetailsCardProps> = ({
    issueUrl,
    issueTitle,
    rewardAmount
}) => {
    const truncatedTitle = issueTitle.length > 80 
        ? issueTitle.substring(0, 77) + '...' 
        : issueTitle

    return (
        <Card style={{ marginBottom: 16 }}>
            <div>
                <Text strong>Repository: </Text>
                <Text>{issueUrl}</Text>
            </div>
            <div>
                <Text strong>Issue: </Text>
                <Text>{truncatedTitle}</Text>
            </div>
            <div>
                <Text strong>Deposit Amount: </Text>
                <Text>{rewardAmount} sats</Text>
            </div>
        </Card>
    )
}

export { IssueDetailsCard }
