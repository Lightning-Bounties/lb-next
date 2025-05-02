'use client';

import { useUserStore } from '@/4_entities/user/model/user.store';
import { SATPrice } from '@/5_shared/ui/SATPrice/SATPrice';
import { USDPrice } from '@/5_shared/ui/USDPrice/USDPrice';

interface PricesProps {
    amount: number;
}

const Prices = ({ amount }: PricesProps) => {
    const currency = useUserStore((state) => state.currency);
    return currency === 'BTC' ? (
        <SATPrice amount={amount} />
    ) : (
        <USDPrice amount={amount} />
    );
};

export { Prices };
