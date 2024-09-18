'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { FC, ReactNode } from 'react'
import { lightTheme } from '@/5_shared/themes/light'
import { useUserStore } from '@/4_entities/user'
import { useShallow } from 'zustand/react/shallow'
import { darkTheme } from '@/5_shared/themes/dark'

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const { isDarkTheme } = useUserStore(useShallow(state => ({
        isDarkTheme: state.darkTheme
    })))

    return (
        <AntdRegistry>
            <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                {children}
            </ConfigProvider>
        </AntdRegistry>
    )
}
export { ThemeProvider }