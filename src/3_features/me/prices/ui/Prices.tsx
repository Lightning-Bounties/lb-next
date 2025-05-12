'use client';

import { useUserStore } from '@/4_entities/user/model/user.store';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { USDPrice } from '@/5_shared/ui/USDPrice/USDPrice';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/4_entities/user/api/user.api';

interface PricesProps {
    amount: number;
}

const Prices = ({ amount }: PricesProps) => {
    const currency = useUserStore((state) => state.currency);

    const { data: userData } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
    });

    const effectiveCurrency = userData ? currency : 'BTC';

    return effectiveCurrency === 'BTC' ? (
        <SATPrice amount={amount} />
    ) : (
        <USDPrice amount={amount} />
    );
};

export { Prices };
