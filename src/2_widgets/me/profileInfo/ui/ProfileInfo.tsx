'use client';

import { ProfileDeposit, ProfileWithdraw } from '@/3_features/me';
import { profileApi } from '@/4_entities/me';
import { userApi } from '@/4_entities/user';
import { Price } from '@/5_shared/ui/Price/Price';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Flex, Tabs, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { FC, ReactNode, useState } from 'react';

type ProfileInfoProps = {
    rewardsHistorySlot?: ReactNode;
    paymentsHistorySlot?: ReactNode;
};

const ProfileInfo: FC<ProfileInfoProps> = ({
    rewardsHistorySlot,
    paymentsHistorySlot,
}) => {
    const { data } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
    });

    const { data: userWallet, refetch } = useQuery({
        queryKey: profileApi.qkGetUserWallet(),
        queryFn: () => profileApi.getUserWallet(),
    });

    const [activeTab, setActiveTab] = useState<
        'deposit' | 'withdraw' | undefined
    >(undefined);

    const setActiveTabHandler = (tab: 'deposit' | 'withdraw' | undefined) => {
        activeTab == tab ? setActiveTab(undefined) : setActiveTab(tab);
    };

    return (
        <Flex vertical gap="small">
            <Title level={3}>{data?.github_username}</Title>
            <Flex align="center" gap="small">
                <Typography>Balance:</Typography>
                <Price amount={userWallet?.free_sats} />
                {userWallet?.in_rewards ? (
                    <>
                        <Typography>/</Typography>
                        <Flex className="opacity50" align="center" gap="small">
                            <Price amount={userWallet?.in_rewards} />
                            <Typography>in rewards</Typography>
                        </Flex>
                    </>
                ) : null}
            </Flex>
            <Flex gap="small" align="center">
                <Button
                    onClick={() => {
                        setActiveTabHandler('deposit');
                    }}
                    size="small"
                    type={activeTab === 'deposit' ? 'primary' : 'default'}
                >
                    Deposit
                </Button>
                <Button
                    onClick={() => {
                        setActiveTabHandler('withdraw');
                    }}
                    size="small"
                    type={activeTab === 'withdraw' ? 'primary' : 'default'}
                >
                    Withdraw
                </Button>
            </Flex>
            {activeTab !== undefined ? (
                <>
                    <Divider />
                    {activeTab === 'deposit' ? (
                        <ProfileDeposit />
                    ) : (
                        <ProfileWithdraw refetch={refetch} />
                    )}
                    <Divider />
                </>
            ) : null}

            <Tabs
                style={{ width: '100%' }}
                items={[
                    {
                        key: '1',
                        label: 'My Rewards',
                        children: rewardsHistorySlot,
                    },
                    {
                        key: '2',
                        label: 'Payments History',
                        children: paymentsHistorySlot,
                    },
                ]}
            />
        </Flex>
    );
};

export { ProfileInfo };
