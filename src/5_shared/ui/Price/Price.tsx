import { SatsIcon } from '@/5_shared/icons/SatsIcon'
import { Flex, Typography } from 'antd'
import s from './Price.module.css'
import { FC } from 'react'

const Price: FC<{ amount?: number }> = ({ amount }) => {
    return (
        <Flex align="center" >
            <Typography className={s.value}>{amount}</Typography>
            <SatsIcon />
        </Flex>
    )
}
export { Price }