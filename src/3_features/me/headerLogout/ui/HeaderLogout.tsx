'use client';

import { Button, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { userApi } from '@/4_entities/user';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const HeaderLogout = () => {
    const router = useRouter();
    const client = useQueryClient();

    return (
        <Tooltip title="Logout">
            <Button
                onClick={() => {
                    userApi.logout();
                    client.refetchQueries({
                        queryKey: userApi.qkGetUserData(),
                    });
                    router.push('/');
                }}
                size="small"
                icon={<LogoutOutlined />}
            />
        </Tooltip>
    );
};
export { HeaderLogout };
