'use client'

import { profileApi, ProfileRewardCard } from '@/4_entities/me'
import { userApi } from '@/4_entities/user'
import { useQuery } from '@tanstack/react-query'
import { Empty, Flex, Spin } from 'antd'
import { FC } from 'react'

const ProfileRewardsHistory: FC = () => {

    const { data: profileInfo } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData()
    })

    const { data, isLoading } = useQuery({
        queryKey: profileApi.qkGetProfileRewardsHistory(profileInfo?.id ?? ''),
        queryFn: () => profileApi.getProfileRewardsHistory(profileInfo?.id ?? ''),
        enabled: profileInfo?.id !== undefined
    })

    const sortedData = data?.slice().sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    return (
        <Flex vertical gap="small">
            {
                isLoading
                    ? <Spin />
                    : sortedData?.length
                        ? sortedData?.map(item => <ProfileRewardCard key={item.id}  {...item} activeController={true} />)
                        : <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No rewards posted yet"
                        />
            }
        </Flex>
    )
}
export { ProfileRewardsHistory }