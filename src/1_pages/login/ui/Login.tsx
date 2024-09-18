'use client'

import { Button, Card, Flex, notification, Typography } from 'antd'
import s from './Login.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { userApi } from '@/4_entities/user'
import { Suspense } from 'react'
import { appRoutes } from '@/5_shared/config/appRoutes'
import { useQueryClient } from '@tanstack/react-query'

const LoginS = () => {

    const gitHubAuthCode = useSearchParams().get('code')
    const initiatedPage = useSearchParams().get('initiatedAt')
    const router = useRouter()
    const client = useQueryClient()

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        (async () => {
            if (!gitHubAuthCode)
                return

            try {
                const code = await userApi.loginWithGitHubCode({ code: gitHubAuthCode })
                userApi.setAuthToken(code)
                client.refetchQueries({
                    queryKey: userApi.qkGetUserData()
                })
                router.push(initiatedPage ?? appRoutes.feed)
            } catch (e) {
                api.error({
                    message: 'Auth Error, try again!'
                })
            }
        })()
    }, [])


    return (
        <Flex
            style={{ height: '100%', width: '100%' }}
            justify="center"
            align="center"
        >
            {contextHolder}
            <Card>
                <Flex vertical gap="small">
                    <img className={s.image} src="/GitHubLogin.png" alt="GitHub" />
                    <Button onClick={() => { userApi.loginWithGitHub(appRoutes.feed) }}>Login With GitHub</Button>
                </Flex>
            </Card>
        </Flex>
    )
}

const Login = () => {
    return (
        <Suspense>
            <LoginS />
        </Suspense>
    )
}
export { Login }