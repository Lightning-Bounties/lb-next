'use client';

import { FeedCard } from '@/4_entities/feed';
import { PaymentCard, profileApi } from '@/4_entities/me';
import { useQuery } from '@tanstack/react-query';
import { Empty, Flex, Spin } from 'antd';

const ProfilePaymentsHistory = () => {
    const { data, isLoading } = useQuery({
        queryKey: profileApi.qkGetProfilePaymentsHistory(),
        queryFn: () => profileApi.getProfilePaymentsHistory(),
    });

    return (
        <Flex vertical gap="small">
            {isLoading ? (
                <Spin />
            ) : data?.length ? (
                data?.map((item) => <PaymentCard key={item.time} {...item} />)
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="The list is empty"
                />
            )}
        </Flex>
    );
};
export { ProfilePaymentsHistory };
