import { FeedCard } from '@/4_entities/feed';
import { issueApi } from '@/4_entities/issue';
import { RewardCard } from '@/4_entities/issue/ui/RewardCard/RewardCard';
import { Col, Empty, Flex, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { FC } from 'react';

type IssueRewardsListProps = {
    rewardId: string;
};

const IssueRewardsList: FC<IssueRewardsListProps> = async ({ rewardId }) => {
    try {
        const data = await issueApi.getAllIssueRewards(rewardId);
        const sortedData = [...data].sort((a, b) => {
            if (!a.expires_at && !b.expires_at) return 0;
            if (!a.expires_at) return -1;
            if (!b.expires_at) return 1;
            return (
                new Date(a.expires_at).getTime() -
                new Date(b.expires_at).getTime()
            );
        });
        return (
            <Flex vertical gap="small">
                <Title level={3}>Rewards:</Title>
                {sortedData.length ? (
                    <Row gutter={[12, 12]}>
                        {sortedData.map((item) => (
                            <Col span={12} md={12} xs={24} key={item.id}>
                                <RewardCard {...item} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="Rewards not found" />
                )}
            </Flex>
        );
    } catch (e) {
        return <>Error</>;
    }
};
export { IssueRewardsList };
