import { Card, Flex, Spin, Typography } from 'antd';
import { FC } from 'react';
import s from './PaymentsCard.module.css';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { getStringDate } from '@/5_shared/utils/getStringDate';
import { LightningTransactionSchema } from '@/5_shared/gen';

const PaymentCard: FC<LightningTransactionSchema> = (props) => {
    return (
        <Card bordered={false} style={{ opacity: props.pending ? '.5' : '1' }}>
            <Flex vertical gap="middle">
                <Flex justify="space-between">
                    <Flex gap="middle" align="center">
                        <span
                            className={`${s.amount} ${props.amount < 0 ? s.expense : s.income}`}
                        >
                            <Flex align="center">
                                {props.amount > 0 ? '+' : ''}
                                <SATPrice amount={props.amount} />
                            </Flex>
                        </span>
                        {props.pending ? (
                            <Flex gap="small" align="center">
                                <Spin size="small" />
                                Pending...
                            </Flex>
                        ) : null}
                    </Flex>
                    <Typography className="opacity50">
                        {getStringDate(new Date(props.time * 1000))}
                    </Typography>
                </Flex>
                <Typography style={{ fontStyle: 'italic' }}>
                    {'"' + props.memo + '"'}
                </Typography>
            </Flex>
        </Card>
    );
};
export { PaymentCard };
