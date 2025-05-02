'use client';
import { FC } from 'react';
import { Flex, Spin, Typography } from 'antd';
import s from '@/5_shared/ui/USDPrice/USDPrice.module.css';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/4_entities/user';

const USDPrice: FC<{ amount?: number; isCaption?: boolean }> = ({
    amount,
    isCaption = false,
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['currency', amount],
        queryFn: () => userApi.convertToUsd(amount),
        gcTime: 0,
    });

    return (
        <Flex align="center">
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <Typography className={isCaption ? s.caption : s.value}>
                        {data}
                    </Typography>
                    <Typography className={isCaption ? s.caption : s.value}>
                        $
                    </Typography>
                </>
            )}
        </Flex>
    );
};

export { USDPrice };
