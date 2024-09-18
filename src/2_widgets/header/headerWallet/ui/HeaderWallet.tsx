'use client'

import { profileApi } from '@/4_entities/me'
import { Price } from '@/5_shared/ui/Price/Price'
import { useQuery } from '@tanstack/react-query'
import { Flex, Tooltip, Typography } from 'antd'
import s from './HeaderWallet.module.css'


const HeaderWallet = () => {
    
    const { data: userWallet } = useQuery({
        queryKey: profileApi.qkGetUserWallet(),
        queryFn: () => profileApi.getUserWallet()
    })
    
    const userWalletTooltip = 'Available Balance' + (
        userWallet?.in_rewards 
            ? ' / Reserved balance (in sats)'
            : userWallet?.free_sats === 0
                ? '. To add sats to your go to Profile > Deposit'
                : ' (in sats)'
    )
     

    return (
        <Tooltip title={userWalletTooltip}>
        <Flex className={s.wallet} align='center' gap="small" style={{cursor:'pointer'}}>
            <Price amount={userWallet?.free_sats} />
            {
                userWallet?.in_rewards
                    ? <>
                        <Typography>/</Typography>
                        <Flex className="opacity50" align='center' gap="small">
                            <Price amount={userWallet?.in_rewards} />
                            <Typography className={s.subtext}>reserved</Typography>
                        </Flex>
                    </>
                    : null
                }
        </Flex>
        </Tooltip>
    )
}
export { HeaderWallet }