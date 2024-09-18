import { SatsIcon } from '@/5_shared/icons/SatsIcon'
import { Flex, Typography } from 'antd'
import s from './Price.module.css'
import { FC } from 'react'

const Price: FC<{ amount?: number }> = ({ amount }) => {
    const displayOption = process.env.REACT_APP_DISPLAY_OPTION;

    const formatAmount = () => {
        if (displayOption === 'short') {
            return amount ? `${(amount / 1000).toFixed(0)}k` : '';
        } else if (displayOption === 'text') {
            return amount ? `${amount.toLocaleString()} sats` : '';
        }
        return amount?.toLocaleString(); // Default case
    };

    return (
        <Flex align="center" >
            {/* Format the amount based on the display option */}
            <Typography className={s.value}>{formatAmount()}</Typography>
            {displayOption !== 'text' && <SatsIcon />}
        </Flex>
    )
}
export { Price }