import { appRoutes } from '@/5_shared/config/appRoutes'

const parseTimestamp = (timestamp: string) => {
    // Add Z suffix if missing to ensure UTC interpretation
    const normalizedTimestamp = timestamp.endsWith('Z') ? timestamp : timestamp + 'Z'
    return new Date(normalizedTimestamp)
}
import { RewardExpandedSchema, RewardSchema } from '@/5_shared/gen'
import { Avatar } from '@/5_shared/ui/Avatar/Avatar'
import { Price } from '@/5_shared/ui/Price/Price'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { Card, Flex, Typography, Tooltip } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

const RewardCard: FC<RewardExpandedSchema> = (props) => {

    const {
        reward_sats,
        rewarder_data,
        created_at,
        unlocks_at,
        expires_at,
        issue_data,
      } = props
    
      const isExpired = Boolean(expires_at)
      const nowIso = new Date().toISOString()
    
      // Decide locked vs. unlocked
      // - If unlocks_at is null/undefined => unlocked
      // - If unlocks_at is a string in the future => locked
      // - If unlocks_at is a string in the past => unlocked
      const isLocked =
        unlocks_at != null &&
        unlocks_at > nowIso

    return (
        <Card 
            className={isExpired ? 'opacity50': 'opacity100'}
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
                    title={`Reward created at: ${getStringDate(parseTimestamp(props.created_at))}` }
                    >
                    <Typography className="opacity50">
                        Added: {getStringDate(parseTimestamp(props.created_at)).split(',')[0]}
                    </Typography>
                </Tooltip>
                { isExpired ?
                    <Tooltip 
                        title={issue_data?.is_closed 
                            ? `Expired at: ${getStringDate(parseTimestamp(expires_at!))} (before issue was claimed)`
                            : `Expired at:${getStringDate(parseTimestamp(expires_at!))}`
                        }>
                        <Typography className="opacity50">
                            🗑️ {issue_data?.is_closed ? "Expired before claim" : "Expired"}
                        </Typography>
                    </Tooltip>
                    : <Tooltip 
                        title={issue_data?.is_closed
                            ? "Reward was claimed for this closed issue"
                            : isLocked 
                                ? `Locked until: ${getStringDate(parseTimestamp(unlocks_at!))}`
                                : unlocks_at
                                    ? `Unlocked at: ${getStringDate(parseTimestamp(unlocks_at))}`
                                    : 'Unlocked (no lock set)'
                        }
                        >
                        <Typography className="opacity50">
                            {issue_data?.is_closed ? "💰 Claimed" : (isLocked ? "🔒Locked" : "🔓Unlocked")}
                        </Typography>
                    </Tooltip>
                }
            </Flex>
        </Card>
    )
}
export { RewardCard }
