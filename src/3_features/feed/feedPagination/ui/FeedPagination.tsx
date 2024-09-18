'use client'
import { feedApi } from '@/4_entities/feed'
import { appRoutes } from '@/5_shared/config/appRoutes'
import { FEED_LIMIT } from '@/5_shared/consts/app.consts'
import { useQuery } from '@tanstack/react-query'
import { Flex, Pagination } from 'antd'
import { useRouter, useParams } from 'next/navigation'
import { FC } from 'react'

const FeedPagination: FC = () => {

    const router = useRouter()
    const params = useParams()

    const { data, isLoading } = useQuery({
        queryKey: feedApi.qkGetFeedTotalCount(),
        queryFn: () => feedApi.getFeedTotalCount()
    })

    return (
        <Flex justify="center">
            <Pagination
                hideOnSinglePage
                total={data}
                pageSize={FEED_LIMIT}
                showSizeChanger={false}
                current={parseInt(params.page as string ?? '1')}
                onChange={(page) => {
                    page === 1
                        ? router.push(appRoutes.feed)
                        : router.push(appRoutes.feed + '/' + page)

                }}
            />
        </Flex>
    )
}
export { FeedPagination }