import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user.api';

export const useBtcUsdRate = () => {
    return useQuery({
        queryKey: userApi.qkGetBtcUsdRate(),
        queryFn: () => userApi.fetchBtcUsdRate(),
        staleTime: 15 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    });
};
