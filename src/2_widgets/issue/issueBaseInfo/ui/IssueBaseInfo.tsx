import { Breadcrumb, Flex, Tooltip, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { LinkOutlined } from '@ant-design/icons'
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
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <IssueBaseInfoCheckPull repoName={data.repository_data.full_name} />
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
                        <Price amount={data.total_reward_sats} />
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
                {
                    data.body
                        ? <Flex vertical gap="small">
                            <Typography className="opacity50">Description</Typography>
                            <IssueBaseInfoDesc data={data.body ?? ''} />
                        </Flex>
                        : null
                }
            </Flex>
        )
    } catch (e) {
        return <>Error</>
    }
}

export { IssueBaseInfo }