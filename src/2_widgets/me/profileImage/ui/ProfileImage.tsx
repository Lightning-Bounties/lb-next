'use client'

import { useQuery } from '@tanstack/react-query'
import { Button, Flex } from 'antd'
import { FC } from 'react'
import s from './ProfileImage.module.css'
import { userApi } from '@/4_entities/user'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ProfileImage: FC = () => {

    const { data, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData()
    })

    const router = useRouter()

    return (
        <Flex vertical gap="middle">
            <img className={s.image} src={data?.avatar_url ?? ''} alt="profile" />
            <Link href={'https://github.com/' + data?.github_username} target='_blank'>
                <Button
                    style={{ width: '100%' }}
                    type="dashed"
                >
                    View on GitHub
                </Button>
            </Link>
        </Flex>
    )
}
export { ProfileImage }