import { appRoutes } from '@/5_shared/config/appRoutes'
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
                { isExpired ?
                    <Tooltip 
                        title={`Expired at:${getStringDate(new Date(expires_at!))}`}>
                        <Typography className="opacity50">
                            🗑️ Expired
                        </Typography>
                    </Tooltip>
                    : <Tooltip 
                        title={isLocked 
                            ? `Locked until: ${getStringDate(new Date(unlocks_at!))}`
                            : unlocks_at
                                ? `Unlocked at: ${getStringDate(new Date(unlocks_at))}`
                                : 'Unlocked (no lock set)'
                        }
                        >
                        <Typography className="opacity50">
                            { isLocked ? "🔒Locked" : "🔓Unlocked"}
                        </Typography>
                    </Tooltip>
                }
            </Flex>
        </Card>
    )
}
export { RewardCard }