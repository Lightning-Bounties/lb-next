'use client';

import {
    ProfileImage,
    ProfileInfo,
    ProfilePaymentsHistory,
    ProfileRewardsHistory,
} from '@/2_widgets/me';
import { userApi } from '@/4_entities/user';
import { appRoutes } from '@/5_shared/config/appRoutes';
import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row } from 'antd';
import { useRouter } from 'next/navigation';

const Me = () => {
    const router = useRouter();

    const { error, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        retry: false,
    });

    if (error) {
        router.replace(appRoutes.feed);
    }

    return (
        <Flex vertical gap="large">
            <br />
            <Row gutter={[12, 12]}>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <ProfileImage />
                </Col>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <Flex vertical gap="middle">
                        <ProfileInfo
                            rewardsHistorySlot={<ProfileRewardsHistory />}
                            paymentsHistorySlot={<ProfilePaymentsHistory />}
                        />
                    </Flex>
                </Col>
            </Row>
            <br />
        </Flex>
    );
};
export { Me };
