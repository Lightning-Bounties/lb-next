import { Breadcrumb, Flex, Tooltip, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { LinkOutlined, TrophyFilled } from '@ant-design/icons'
import { Avatar } from '@/5_shared/ui/Avatar/Avatar'
import { Price } from '@/5_shared/ui/Price/Price'
import s from './IssueBaseInfo.module.css'
import { FC } from 'react'
import { issueApi } from '@/4_entities/issue'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { IssueBreadcrumbs } from '@/3_features/issue'
import dynamic from 'next/dynamic'
import { appRoutes } from '@/5_shared/config/appRoutes'
import { IssueBaseInfoCheckPull } from './IssueBaseInfoCheckPull'
import { orange, grey } from '@ant-design/colors';
import { IssueBaseInfoAddReward } from './IssueBaseInfoAddReward'

const IssueBaseInfoDesc = dynamic(() => import('./IssueBaseInfoDesc'), { ssr: false })


type IssueBaseInfoProps = {
    rewardId: string
}

const IssueBaseInfo: FC<IssueBaseInfoProps> = async ({ rewardId }) => {

    try {
        const data = await issueApi.getIssueData(rewardId)

        return (
            <Flex vertical gap="large">
                <div>
                    <IssueBreadcrumbs title={data.repository_data.full_name} />
                    <Title
                        style={{ display: 'inline' }}
                        level={1}
                    >
                        {data.title}
                    </Title>
                    &nbsp;&nbsp;&nbsp;
                    <span className={`${s.title__number} opacity50`}>#{data.issue_number}</span>
                    &nbsp;
                    <Tooltip title="View on GitHub">
                        <Link
                            href={data.html_url ?? ''}
                            target='_blank'
                            rel="nofollow"
                        >
                            <LinkOutlined style={{ fontSize: '22px' }} />
                        </Link>
                    </Tooltip>
                    {data.is_closed && (
                        <Typography
                            style={{
                                display: "inline-block",
                                color: grey[3],
                                padding: "3px 10px",
                                borderRadius: "4px",
                                fontWeight: "bold",
                                marginLeft: "10px",
                                textAlign: "center",
                                border: `1px solid ${grey[1]}`,
                            }}
                        >
                            Closed
                        </Typography>
                    )}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    {!data.is_closed && (
                        <IssueBaseInfoCheckPull 
                            repoName={data.repository_data.full_name} 
                            issueId={data.id}
                        />
                    )}
                </div>
                <Flex className={s.info__line} justify="space-between" align="center">
                    <Flex gap="large" align="center">
                        <Link href={`/${appRoutes.profile}/${data.last_rewarder_data?.id}`}>
                            <Flex align="center" gap="small">
                                <Avatar avatarUrl={data.last_rewarder_data?.avatar_url ?? ''} />
                                <Typography>{data.last_rewarder_data?.github_username}</Typography>
                            </Flex>
                        </Link>
                    </Flex>
                    <Flex align="center" gap="small">
                        <Typography className="opacity50">total reward</Typography>
                        <Price amount={data.unexpired_total_rewards} />
                    </Flex>
                    <Flex align="center" gap="small">
                        <Typography className="opacity50">rewards</Typography>
                        <Typography>{data.total_rewards}</Typography>
                    </Flex>
                    <Flex align="center" gap="small">
                        <Typography className="opacity50">created at</Typography>
                        <Typography>{getStringDate(new Date(data.created_at))}</Typography>
                    </Flex>
                </Flex>
                {data.winner_data && (
                    <Flex
                        className={s.info__line}
                        justify="flex-start"
                        align="center"
                        gap="large"
                    >
                        <Flex gap="large" align="center" style={{ marginRight: "85px" }}>
                            <Link href={`/${appRoutes.profile}/${data?.winner_data?.id}`}>
                                <Flex align="center" gap="small">
                                    <Avatar
                                        icon={<TrophyFilled style={{ color: orange[3] }} />}
                                        iconTitle="Reward Winner"
                                        avatarUrl={data?.winner_data?.avatar_url ?? ""}
                                    />
                                    <Typography>{data?.winner_data?.github_username}</Typography>
                                </Flex>
                            </Link>
                        </Flex>
                        <Flex align="center" gap="small">
                            <Typography>Reward Winner</Typography>
                        </Flex>
                    </Flex>
                )}
                {
                    (data.html_url && !data.winner_id)
                        ? <IssueBaseInfoAddReward 
                            issueId={data.id} 
                            issueUrl={data.html_url} 
                        />
                        : null
                }
                {data.body ? (
                    <Flex vertical gap="small">
                        <Typography className="opacity50">Description</Typography>
                        <IssueBaseInfoDesc data={data.body ?? ""} />
                    </Flex>
                ) 
                    : null
                }
            </Flex>
        )
    } catch (e) {
        return <>Error</>
    }
}

export { IssueBaseInfo }