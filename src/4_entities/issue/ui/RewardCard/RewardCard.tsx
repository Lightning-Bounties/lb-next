import { appRoutes } from '@/5_shared/config/appRoutes'
import { RewardExpandedSchema, RewardSchema } from '@/5_shared/gen'
import { Avatar } from '@/5_shared/ui/Avatar/Avatar'
import { Price } from '@/5_shared/ui/Price/Price'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { Card, Flex, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

const RewardCard: FC<RewardExpandedSchema> = (props) => {
    return (
        <Card>
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
            <Typography className="opacity50">{getStringDate(new Date(props.modified_at))}</Typography>
        </Card>
    )
}
export { RewardCard }