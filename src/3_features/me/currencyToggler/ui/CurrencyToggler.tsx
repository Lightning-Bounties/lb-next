'use client';
import { Switch } from 'antd';
import { SatsIcon } from '@/5_shared/icons/SatsIcon';
import { useUserStore } from '@/4_entities/user';
import { useShallow } from 'zustand/react/shallow';

const CurrencyToggler = () => {
    const { currency, setCurrency } = useUserStore(
        useShallow((state) => ({
            setCurrency: state.setCurrency,
            currency: state.currency,
        })),
    );

    return (
        <Switch
            style={{ backgroundColor: currency === 'BTC' ? 'orange' : 'green' }}
            onClick={() => setCurrency(currency === 'BTC' ? 'USD' : 'BTC')}
            defaultChecked={currency === 'BTC'}
            checked={currency === 'BTC'}
            unCheckedChildren={'$'}
            checkedChildren={<SatsIcon />}
        />
    );
};
export { CurrencyToggler };
export default CurrencyToggler;
