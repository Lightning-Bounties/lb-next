'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { userApi } from '../api/user.api';

type UserStore = {
    darkTheme: boolean;
    setDarkTheme: (darkTheme: boolean) => void;
};

const useUserStore = create<UserStore>()(
    immer((set) => ({
        darkTheme: userApi.getIsDarkTheme() === 'true' ? true : false,
        setDarkTheme: (darkTheme) => {
            userApi.setIsDarkTheme(darkTheme ? 'true' : 'false');
            set((state) => {
                state.darkTheme = darkTheme;
            });
        },
    })),
);

export { useUserStore };
