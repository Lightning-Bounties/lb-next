'use client';
import { SatsIcon } from '@/5_shared/icons/SatsIcon';
import { Flex, Typography } from 'antd';
import s from './SATPrice.module.css';
import { FC } from 'react';

const SATPrice: FC<{ amount?: number }> = ({ amount }) => {
    const displayOption = process.env.NEXT_PUBLIC_SATS_DISPLAY_OPTION;

    const formatAmount = () => {
        if (displayOption === 'short') {
            return amount ? `${(amount / 1000).toFixed(0)}k` : '';
        } else if (displayOption === 'text') {
            return amount ? `${amount.toLocaleString()} sats` : '';
        }
        return amount?.toLocaleString();
    };

    return (
        <Flex align="center">
            <Typography className={s.value}>{formatAmount()}</Typography>
            {displayOption !== 'text' && <SatsIcon />}
        </Flex>
    );
};
export { SATPrice };
