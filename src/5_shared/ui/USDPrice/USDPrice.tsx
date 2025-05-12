'use client';
import { FC } from 'react';
import { Flex, Spin, Typography } from 'antd';
import s from '@/5_shared/ui/USDPrice/USDPrice.module.css';
import { userApi } from '@/4_entities/user';
import { useBtcUsdRate } from '@/4_entities/user/hooks/useBtcUsdRate';

const USDPrice: FC<{ amount?: number; isCaption?: boolean }> = ({
    amount,
    isCaption = false,
}) => {
    const { data: btcUsdRate, isLoading } = useBtcUsdRate();

    const usdValue =
        !isLoading && btcUsdRate
            ? userApi.convertSatsToUsd(amount, btcUsdRate)
            : '0.00';

    return (
        <Flex align="center">
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <Typography className={isCaption ? s.caption : s.value}>
                        $
                    </Typography>
                    <Typography className={isCaption ? s.caption : s.value}>
                        {usdValue}
                    </Typography>
                </>
            )}
        </Flex>
    );
};

export { USDPrice };
