'use client';

import { ProfileDeposit, ProfileWithdraw } from '@/3_features/me';
import { profileApi } from '@/4_entities/me';
import { userApi } from '@/4_entities/user';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Flex, Tabs, Tour, TourProps, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { FC, ReactNode, useState, useRef } from 'react';
import { hintsConfig } from '@/5_shared/config/hints.config';
import { DualPrices } from '@/3_features/me/prices';

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

    const [openTour, setOpenTour] = useState(false);
    const anonymousHelpRef = useRef(null);
    const hintName = 'profileBalance';
    const tourSteps: TourProps['steps'] = [
        {
            title: hintsConfig[hintName].title,
            description: hintsConfig[hintName].body,
            target: () => anonymousHelpRef.current,
            nextButtonProps: {
                children: hintsConfig[hintName].buttonText,
            },
        },
    ];

    const setActiveTabHandler = (tab: 'deposit' | 'withdraw' | undefined) => {
        activeTab == tab ? setActiveTab(undefined) : setActiveTab(tab);
    };

    return (
        <Flex vertical gap="small">
            <Title level={3}>{data?.github_username}</Title>
            <Flex align="center" gap="small">
                <Typography>Balance:</Typography>
                <DualPrices amount={userWallet?.free_sats} />
                {userWallet?.in_rewards ? (
                    <>
                        <Typography>/</Typography>
                        <Flex className="opacity50" align="center" gap="small">
                            <SATPrice amount={userWallet?.in_rewards} />
                            <Typography>in rewards</Typography>
                        </Flex>
                    </>
                ) : null}
                <QuestionCircleOutlined
                    ref={anonymousHelpRef}
                    onClick={() => setOpenTour(true)}
                    style={{
                        cursor: 'pointer',
                    }}
                    className={'opacity50'}
                />
                <Tour
                    open={openTour}
                    onClose={() => setOpenTour(false)}
                    steps={tourSteps}
                />
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
