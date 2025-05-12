'use client';

import { useUserStore } from '@/4_entities/user/model/user.store';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { USDPrice } from '@/5_shared/ui/USDPrice/USDPrice';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/4_entities/user/api/user.api';

interface DualPricesProps {
    amount: number | undefined;
}

const DualPrices = ({ amount }: DualPricesProps) => {
    const currency = useUserStore((state) => state.currency);

    const { data: userData } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
    });

    const effectiveCurrency = userData ? currency : 'BTC';

    return effectiveCurrency === 'BTC' ? (
        <SATPrice amount={amount} />
    ) : (
        <>
            <SATPrice amount={amount} />
            <USDPrice isCaption={true} amount={amount} />
        </>
    );
};

export { DualPrices };
