'use client';
import { userApi } from '@/4_entities/user';
import { Avatar } from '@/5_shared/ui/Avatar/Avatar';
import { useQuery } from '@tanstack/react-query';
import { Flex, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import s from './HeaderProfile.module.css';
import { HeaderLogout } from '@/3_features/me';

const HeaderProfile: FC = () => {
    const { data } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        networkMode: 'offlineFirst',
        retry: false,
    });

    return (
        <Flex gap="small" align="center">
            <Link href={`/me`}>
                <Tooltip title="Profile">
                    <Flex align="center" gap="small">
                        <Typography className={s.name}>
                            {data?.github_username}
                        </Typography>
                        <Avatar avatarUrl={data?.avatar_url ?? ''} />
                    </Flex>
                </Tooltip>
            </Link>
            <HeaderLogout />
        </Flex>
    );
};
export { HeaderProfile };
