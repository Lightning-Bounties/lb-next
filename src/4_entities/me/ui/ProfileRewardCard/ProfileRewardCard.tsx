import { RewardExpandedSchema, RewardSchema } from '@/5_shared/gen'
import { Price } from '@/5_shared/ui/Price/Price'
import { getStringDate } from '@/5_shared/utils/getStringDate'
import { Card, Flex, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { FC } from 'react'

const ProfileRewardCard: FC<RewardExpandedSchema> = (props) => {
    return (
        <Card>
            <Flex justify="space-between" align="flex-end">
                <Flex vertical gap="small">
                    <Link href={'/issue/' + props.issue_data.id}>
                        <Title
                            level={5}
                            style={{ marginTop: 0 }}
                        >
                            {props.issue_data.title}&nbsp;
                            <span className="opacity50">#{props.issue_data.issue_number}</span>
                        </Title>
                    </Link>
                </Flex>
                <Flex vertical gap="small">
                    <Price amount={props.reward_sats} />
                </Flex>
            </Flex>
            <Flex justify="space-between" align="center">
                <Typography className="opacity50">{getStringDate(new Date(props.modified_at))}</Typography>
                <Typography><span className="opacity50">{props.issue_data.is_closed ? 'Closed' : null}</span></Typography>
            </Flex>
        </Card>
    )
}

export { ProfileRewardCard }