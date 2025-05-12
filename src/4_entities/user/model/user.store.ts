'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { userApi } from '../api/user.api';
import { createJSONStorage, persist } from 'zustand/middleware';

type Currency = 'BTC' | 'USD';

type UserStore = {
    darkTheme: boolean;
    setDarkTheme: (darkTheme: boolean) => void;
    currency: Currency;
    setCurrency: (currency: Currency) => void;
};

const useUserStore = create<UserStore>()(
    persist(
        immer((set) => ({
            darkTheme: userApi.getIsDarkTheme() === 'true',
            setDarkTheme: (darkTheme) => {
                userApi.setIsDarkTheme(darkTheme ? 'true' : 'false');
                set((state) => {
                    state.darkTheme = darkTheme;
                });
            },
            currency: 'BTC',
            setCurrency: (currency: Currency) => {
                set((state) => {
                    state.currency = currency;
                });
            },
        })),
        {
            name: 'user-settings',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ currency: state.currency }),
        },
    ),
);

export { useUserStore };
