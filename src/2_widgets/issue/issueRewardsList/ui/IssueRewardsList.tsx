import { FeedCard } from '@/4_entities/feed'
import { issueApi } from '@/4_entities/issue'
import { RewardCard } from '@/4_entities/issue/ui/RewardCard/RewardCard'
import { Col, Empty, Flex, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { FC } from 'react'

type IssueRewardsListProps = {
    rewardId: string
}

const IssueRewardsList: FC<IssueRewardsListProps> = async ({ rewardId }) => {

    try {
        const data = await issueApi.getAllIssueRewards(rewardId)
        return (
            <Flex vertical gap="small">
                <Title level={3}>Rewards:</Title>
                {
                    data.length
                        ? <Row gutter={[12, 12]}>
                            {
                                data.map(item =>
                                    <Col span={12} md={12} xs={24}>
                                        <RewardCard {...item} />
                                    </Col>
                                )
                            }
                        </Row>
                        : <Empty
                            description="Rewards not found"
                        />
                }
            </Flex>
        )
    } catch (e) {
        return <>Error</>
    }

}
export { IssueRewardsList }