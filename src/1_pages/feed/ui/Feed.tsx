import { FeedList } from '@/2_widgets/feed'
import { CreateRewardForm, FeedPagination } from '@/3_features/feed'
import { Flex } from 'antd'
import Title from 'antd/es/typography/Title'
import { FC } from 'react'

const Feed: FC<{ page?: number }> = ({ page }) => {
    return (
        <Flex vertical gap="large">
            <br />
            {/* <Title>Posted Bounties for GitHub Issues</Title> */}
            <CreateRewardForm />
            <FeedList page={page} />
            <FeedPagination />
            <br />
        </Flex>
    )
}
export { Feed }