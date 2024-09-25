'use client'; 
import { Card, Col, Flex, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import s from './FeedCard.module.css'
import { Avatar } from '@/5_shared/ui/Avatar/Avatar'
import { FC, ReactNode } from 'react'
import { Price } from '@/5_shared/ui/Price/Price'
import { IssueExpandedSchema } from '@/5_shared/gen'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { TrophyFilled } from '@ant-design/icons'
import { appRoutes } from '@/5_shared/config/appRoutes'
import { orange } from '@ant-design/colors'
import { useRouter } from 'next/navigation'


type FeedCardProps = IssueExpandedSchema & {
    guideSlot?: ReactNode,
}

const FeedCard: FC<FeedCardProps> = (props) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/${appRoutes.issue}/${props.id}`);
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Card bordered={false}>
            <div className={s.card} onClick={handleCardClick}>
                <span className={s.guide}>{props.guideSlot}</span>
                <Link
                    className={`${s.issue_link} opacity50`}
                    href={props.html_url ?? ''}
                    target="_blank"
                    rel="nofollow"
                    onClick={handleLinkClick}
                >
                    {props.repository_data.full_name}
                </Link>
                <Title level={3} className={s.title}>{props.title}</Title>
                <Row gutter={[12, 12]} align="middle">
                    <Col md={18} xs={14} sm={14} className={s.owner}>
                        <Flex vertical gap="small">
                            <Flex>
                                <Link href={'/' + appRoutes.profile + '/' + props.last_rewarder_data?.id} onClick={handleLinkClick}>
                                    <Avatar
                                        withOthers={[
                                            props.second_last_rewarder_data?.avatar_url ?? '',
                                            props.third_last_rewarder_data?.avatar_url ?? ''
                                        ]}
                                        avatarUrl={props.last_rewarder_data?.avatar_url as string}
                                    />
                                </Link>
                            </Flex>
                            <Flex align="center" gap="small">
                                <Link href={appRoutes.profile + '/' + props.last_rewarder_data?.id} rel="nofollow" onClick={handleLinkClick}>
                                    {props.last_rewarder_data?.github_username}
                                </Link>
                                {
                                    props.total_rewards > 1
                                        ? <Typography className={`opacity50 ${s.more}`}>+ {props.total_rewards - 1}  others</Typography>
                                        : null
                                }
                            </Flex>
                            <Typography className="opacity50">{getStringDate(new Date(props.modified_at))}</Typography>
                        </Flex>
                    </Col>
                    <Col md={6} xs={10} sm={10} className={s.winner}>
                        <Flex vertical gap="small" >
                            {
                                props.winner_id
                                    ? <>
                                        <Link href={appRoutes.profile + '/' + props.winner_data?.id} rel="nofollow" onClick={handleLinkClick}>
                                            <Avatar
                                                icon={<TrophyFilled style={{ color: orange[3] }} />}
                                                iconTitle="Reward Winner"
                                                size="big"
                                                avatarUrl={props.winner_data?.avatar_url as string}
                                            />
                                        </Link>
                                        <Flex align="center" gap="small">
                                            <Link
                                                href={appRoutes.profile + '/' + props.winner_data?.id}
                                                rel="nofollow"
                                                onClick={handleLinkClick}
                                            >
                                                {props.winner_data?.github_username}
                                            </Link>
                                        </Flex>
                                    </>
                                    : null
                            }
                            <Flex align="center" gap="small">
                                <Typography className="opacity50">Reward:</Typography>
                                <Price amount={props.total_reward_sats} />
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
            </div>
        </Card>
    )
}
export { FeedCard }