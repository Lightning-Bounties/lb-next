'use client';

import { profileApi } from '@/4_entities/me';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { useQuery } from '@tanstack/react-query';
import { Flex, Tooltip, Typography } from 'antd';
import s from './HeaderWallet.module.css';
import { USDPrice } from '@/5_shared/ui/USDPrice/USDPrice';
import { WalletOutlined } from '@ant-design/icons';

const HeaderWallet = () => {
    const { data: userWallet } = useQuery({
        queryKey: profileApi.qkGetUserWallet(),
        queryFn: () => profileApi.getUserWallet(),
    });

    const userWalletTooltip =
        'Available Balance' +
        (userWallet?.in_rewards
            ? ' / Reserved balance (in sats)'
            : userWallet?.free_sats === 0
                ? '. To add sats to your go to Profile > Deposit'
                : ' (in sats)');

    return (
        <Tooltip title={userWalletTooltip}>
            <Flex
                className={s.wallet}
                align="center"
                gap="small"
                style={{ cursor: 'pointer' }}
            >
                <SATPrice amount={userWallet?.free_sats} />
                <USDPrice isCaption={true} amount={userWallet?.free_sats} />
                {userWallet?.in_rewards ? (
                    <>
                        <Typography>/</Typography>
                        <Flex className="opacity50" align="center" gap="small">
                            <SATPrice amount={userWallet?.in_rewards} />
                            <Typography className={s.subtext}>
                                reserved
                            </Typography>
                        </Flex>
                    </>
                ) : null}
            </Flex>
        </Tooltip>
    );
};
export { HeaderWallet };
