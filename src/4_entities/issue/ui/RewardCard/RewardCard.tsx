import { appRoutes } from '@/5_shared/config/appRoutes'
import { RewardExpandedSchema, RewardSchema } from '@/5_shared/gen'
import { Avatar } from '@/5_shared/ui/Avatar/Avatar'
import { Price } from '@/5_shared/ui/Price/Price'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { Card, Flex, Typography, Tooltip } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

const RewardCard: FC<RewardExpandedSchema> = (props) => {
    return (
        <Card 
            className={props.expired_at ? 'opacity50': 'opacity100'}
            >
            <Flex justify="space-between" align="flex-end">
                <Flex vertical gap="small">
                    <Link href={'/' + appRoutes.profile + '/' + (props?.rewarder_data?.id ?? '')} >
                        <Avatar
                            avatarUrl={props?.rewarder_data?.avatar_url ?? undefined}
                        />
                    </Link>
                    <Flex align="center" gap="small">
                        <Link href={'/' + appRoutes.profile + '/' + (props?.rewarder_data?.id ?? '')}>
                            {props.rewarder_data?.github_username}
                        </Link>
                    </Flex>
                </Flex>
                <Price amount={props.reward_sats} />
            </Flex>
            <Flex justify="space-between" align="flex-end">
                <Tooltip 
                    title={`Reward created at: ${getStringDate(new Date(props.created_at))}` }
                    >
                    <Typography className="opacity50">
                        {new Date(props.created_at).toLocaleDateString(
                            'en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            }
                        )}
                    </Typography>
                </Tooltip>
                { props.expired_at ?
                    <Tooltip 
                        title={`Expired at:${getStringDate(new Date(props.expired_at))}`}>
                        <Typography className="opacity50">
                            🗑️ Expired
                        </Typography>
                    </Tooltip>
                    : <Tooltip 
                        title={props.locked_until > new Date().toISOString() ? 
                            `Locked until: ${getStringDate(new Date(props.locked_until))}` : 
                            `Unlocked at: ${getStringDate(new Date(props.locked_until))}` }
                        >
                        <Typography className="opacity50">
                            {props.locked_until > new Date().toISOString()  ? "🔒Locked" : "🔓Unlocked"}
                        </Typography>
                    </Tooltip>
                }
            </Flex>
        </Card>
    )
}
export { RewardCard }