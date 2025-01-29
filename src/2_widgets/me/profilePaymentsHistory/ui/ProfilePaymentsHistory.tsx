'use client'

import { FeedCard } from '@/4_entities/feed'
import { PaymentCard, profileApi } from '@/4_entities/me'
import { useQuery } from '@tanstack/react-query'
import { Empty, Flex, Spin } from 'antd'
import { FC } from 'react'

type ProfilePaymentsHistoryProps = {
    activeTab?: 'deposit' | 'withdraw'
}

const ProfilePaymentsHistory: FC<ProfilePaymentsHistoryProps> = ({ activeTab }) => {
    const { data, isLoading } = useQuery({
        queryKey: profileApi.qkGetProfilePaymentsHistory(),
        queryFn: () => profileApi.getProfilePaymentsHistory()
    })

    const filteredData = data?.filter(item => {
        if (!activeTab) return true
        if (activeTab === 'deposit' && item.amount > 0) return true
        if (activeTab === 'withdraw' && item.amount < 0) return true
        return false
    })

    return (
        <Flex vertical gap="small">
            {
                isLoading
                    ? <Spin />
                    : filteredData?.length
                        ? filteredData.map(item => <PaymentCard key={item.time} {...item} />)
                        : <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="The list is empty"
                        />
            }
        </Flex>
    )
}
export { ProfilePaymentsHistory }