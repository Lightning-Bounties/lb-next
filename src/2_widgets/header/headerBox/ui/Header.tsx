'use client'
import { HeaderAuth } from '@/3_features/me'
import { userApi } from '@/4_entities/user'
import { useQuery } from '@tanstack/react-query'
import { Flex, Spin } from 'antd'
import { Header as HeaderAntd } from 'antd/es/layout/layout'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import logo from '../icons/LB_nobg.svg'
import Image from 'next/image'
import s from './Header.module.css'
import { appRoutes } from '@/5_shared/config/appRoutes'
const ThemeToggler = dynamic(() => import('../../../../3_features/me/themeToggler/ui/ThemeToggler'), { ssr: false })


type HeaderProps = {
    profileSlot?: ReactNode,
    walletSlot?: ReactNode
}

const Header: FC<HeaderProps> = ({ profileSlot, walletSlot }) => {

    const { error, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        retry: false
    })
    
    return (
        <HeaderAntd style={{ flexShrink: 0 }}>
            <Flex justify="space-between" align="center">
                <Flex align="center" gap="small" className={s.headerLinks}>
                    <Link href={appRoutes.feed} style={{  display: "flex", alignItems: "center" }}>
                        <Image className={s.logo} width={60} src={logo} alt="logo" />
                    </Link>
                    <Flex align="center" gap="small" >
                        <Link href={appRoutes.feed} className={s.headerFeed}>Feed</Link>
                    </Flex>
                    <Flex align="center" gap="small">
                        <Link href="https://docs.lightningbounties.com/docs" target="_blank" rel="noopener noreferrer">Docs</Link>
                    </Flex>
                    <Flex align="center" gap="small">
                        <Link href="https://www.lightningbounties.com/" target="_blank" rel="noopener noreferrer">About</Link>
                    </Flex>
                </Flex>
                <Flex gap="middle" align="center">
                    <Flex className={s.themeToggler}>
                    <ThemeToggler />
                    </Flex>
                    {
                        isLoading
                            ? <Spin />
                            : error
                                ? <HeaderAuth />
                                : <>
                                    {walletSlot}
                                    {profileSlot}
                                </>
                    }
                </Flex>
            </Flex>
        </HeaderAntd>
    )
}
export { Header }