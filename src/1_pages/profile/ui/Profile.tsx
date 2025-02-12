import { Button, Col, Flex, Row, Tabs } from 'antd'
import s from './Profile.module.css'
import Link from 'next/link'
import Title from 'antd/es/typography/Title'
import { ProfileRewardCard } from '@/4_entities/me'
import { ProfileBountyCard } from '@/4_entities/me'
import { FC } from 'react'
import { appRoutes } from '@/5_shared/config/appRoutes'
import { IssueExpandedSchema, RewardExpandedSchema, UserSchema } from '@/5_shared/gen'
import { ProfileEmptyRewardsList } from './ProfileEmptyRewardsList'

type ProfileProps = {
    userInfo: UserSchema,
    userRewards: RewardExpandedSchema[],
    userBounties: IssueExpandedSchema[]
}

const Profile: FC<ProfileProps> = async ({ userInfo, userRewards, userBounties }) => {


    return (
        <Flex vertical gap="large">
            <br />
            <Row gutter={[12, 12]} >
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <Flex vertical gap="middle">
                        <img className={s.image} src={userInfo.avatar_url ?? ''} alt="profile" />
                        <Link href={appRoutes.github + userInfo.github_username} target='_blank'>
                            <Button
                                style={{ width: '100%' }}
                                type="dashed"
                            >
                                View on GitHub
                            </Button>
                        </Link>
                    </Flex>
                </Col>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <Flex vertical gap="middle">
                        <Flex vertical gap="small">
                            <Title level={3}>{userInfo.github_username}</Title>
                            <Tabs
                                style={{ width: '100%' }}
                                items={[
                                    {
                                        key: '1',
                                        label: 'User Rewards',
                                        children: <Flex vertical gap="small">
                                            {userRewards.length
                                                ? userRewards.map((item) => <ProfileRewardCard key={item.id}  {...item} activeController={false} />)
                                                : <ProfileEmptyRewardsList />}
                                        </Flex>
                                    },
                                    {
                                        key: '2',
                                        label: 'User Bounties',
                                        children: <Flex vertical gap="small">
                                            <pre>
                                                {
                                                    userBounties.length
                                                        ? userBounties
                                                            .sort((a, b) => {
                                                                const dateA = a.claimed_at ? new Date(a.claimed_at) : new Date(0);
                                                                const dateB = b.claimed_at ? new Date(b.claimed_at) : new Date(0);

                                                                return dateB.getTime() - dateA.getTime();
                                                            })
                                                            .map((bounty) => (
                                                                <ProfileBountyCard
                                                                    key={bounty.issue_number}
                                                                    repository={bounty.repository_data.full_name}
                                                                    title={bounty.title}
                                                                    issueNumber={bounty.issue_number}
                                                                    htmlUrl={bounty.html_url}
                                                                    claimedAt={bounty.claimed_at}
                                                                    totalReward={bounty.total_reward_sats}
                                                                />
                                                            ))
                                                        : <ProfileEmptyRewardsList />
                                                }
                                            </pre>
                                        </Flex>
                                    },
                                ]}
                            />
                        </Flex>
                    </Flex>
                </Col>
            </Row>
            <br />
        </Flex>
    )
}
export { Profile }
