import { appRoutes } from '@/5_shared/config/appRoutes';

const ANONYMOUS_AVATAR_URL = '/anon_avatar.png';

const parseTimestamp = (timestamp: string) => {
    // Add Z suffix if missing to ensure UTC interpretation
    const normalizedTimestamp = timestamp.endsWith('Z')
        ? timestamp
        : timestamp + 'Z';
    return new Date(normalizedTimestamp);
};
import { RewardExpandedSchema, RewardSchema } from '@/5_shared/gen';
import { Avatar } from '@/5_shared/ui/Avatar/Avatar';
import { getStringDate } from '@/5_shared/utils/getStringDate';
import { Card, Flex, Typography, Tooltip } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import { Prices } from '@/3_features/me/prices';

const RewardCard: FC<RewardExpandedSchema> = (props) => {
    const {
        reward_sats,
        rewarder_data,
        created_at,
        unlocks_at,
        expires_at,
        issue_data,
    } = props;

    const isExpired = Boolean(expires_at);
    const nowIso = new Date().toISOString();

    // Decide locked vs. unlocked
    // - If unlocks_at is null/undefined => unlocked
    // - If unlocks_at is a string in the future => locked
    // - If unlocks_at is a string in the past => unlocked
    const isLocked = unlocks_at != null && unlocks_at > nowIso;

    return (
        <Card className={isExpired ? 'opacity50' : 'opacity100'}>
            <Flex justify=\"space-between\" align=\"flex-end\">
                <Flex vertical gap=\"small\">
                    {props.is_anonymous ? (
                        <>
                            <Avatar avatarUrl={ANONYMOUS_AVATAR_URL} />
                            <Flex align=\"center\" gap=\"small\">
                                <Typography>Anonymous Reward</Typography>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Link
                                href={
                                    '/' +
                                    appRoutes.profile +
                                    '/' +
                                    (props?.rewarder_data?.id ?? '')
                                }
                            >
                                <Avatar
                                    avatarUrl={
                                        props?.rewarder_data?.avatar_url ??
                                        undefined
                                    }
                                />
                            </Link>
                            <Flex align=\"center\" gap=\"small\">
                                <Link
                                    href={
                                        '/' +
                                        appRoutes.profile +
                                        '/' +
                                        (props?.rewarder_data?.id ?? '')
                                    }
                                >
                                    {props.rewarder_data?.github_username}
                                </Link>
                            </Flex>
                        </>
                    )}
                </Flex>
                <Prices amount={props.reward_sats} />
            </Flex>
            <Flex justify=\"space-between\" align=\"flex-end\">
                <Tooltip
                    title={`Reward created at: ${getStringDate(parseTimestamp(props.created_at))}`}
                >
                    <Typography className=\"opacity50\">
                        Added:{' '}
                        {\n                            getStringDate(\n                                parseTimestamp(props.created_at),\n                            ).split(',')[0]\n                        }\n                    </Typography>\n                </Tooltip>\n                {isExpired ? (\n                    <Tooltip\n                        title={\n                            issue_data?.is_closed\n                                ? `Expired at: ${getStringDate(parseTimestamp(expires_at!))} (before issue was claimed)`\n                                : `Expired at:${getStringDate(parseTimestamp(expires_at!))}`\n                        }\n                    >\n                        <Typography className=\"opacity50\">\n                            🗑️{' '}\n                            {issue_data?.is_closed\n                                ? 'Expired before claim'\n                                : 'Expired'}\n                        </Typography>\n                    </Tooltip>\n                ) : (\n                    <Tooltip\n                        title={\n                            issue_data?.is_closed\n                                ? 'Reward was claimed for this closed issue'\n                                : isLocked\n                                  ? `Locked until: ${getStringDate(parseTimestamp(unlocks_at!))}`\n                                  : unlocks_at\n                                    ? `Unlocked at: ${getStringDate(parseTimestamp(unlocks_at))}`\n                                    : 'Unlocked (no lock set)'\n                        }\n                    >\n                        <Typography className=\"opacity50\">\n                            {issue_data?.is_closed\n                                ? '💰 Claimed'\n                                : isLocked\n                                  ? '🔒Locked'\n                                  : '🔓Unlocked'}\n                        </Typography>\n                    </Tooltip>\n                )}\n            </Flex>\n            {/* Engagement Metrics */}\n            <Flex vertical gap=\"extraSmall\" style={{ marginTop: '8px' }}>\n                <Typography variant=\"caption\" className=\"opacity70\">\n                    Engagement\n                </Typography>\n                <Flex gap=\"medium\" wrap>\n                    <Flex vertical gap=\"extraSmall\" align=\"start\">\n                        <Typography variant=\"caption\" className=\"opacity60\">\n                            Total Rewards\n                        </Typography>\n                        <Typography variant=\"caption\">\n                            {issue_data?.total_rewards ?? 0}\n                        </Typography>\n                    </Flex>\n                    <Flex vertical gap=\"extraSmall\" align=\"start\">\n                        <Typography variant=\"caption\" className=\"opacity60\">\n                            Total Bounty\n                        </Typography>\n                        <Typography variant=\"caption\">\n                            {issue_data?.total_reward_sats ?? 0} sat\n                        </Typography>\n                    </Flex>\n                    <Flex vertical gap=\"extraSmall\" align=\"start\">\n                        <Typography variant=\"caption\" className=\"opacity60\">\n                            This Reward\n                        </Typography>\n                        <Typography variant=\"caption\">\n                            {props.reward_sats} sat\n                        </Typography>\n                    </Flex>\n                    {issue_data?.total_reward_sats && issue_data?.total_reward_sats > 0 ? (\n                        <Flex vertical gap=\"extraSmall\" align=\"start\">\n                            <Typography variant=\"caption\" className=\"opacity60\">\n                                Percentage\n                            </Typography>\n                            <Typography variant=\"caption\">\n                                {(((props.reward_sats || 0) / issue_data.total_reward_sats) * 100).toFixed(1)}%\n                            </Typography>\n                        </Flex>\n                    ) : null}\n                </Flex>\n            </Flex>\n        </Card>\n    );\n}; export { RewardCard };
