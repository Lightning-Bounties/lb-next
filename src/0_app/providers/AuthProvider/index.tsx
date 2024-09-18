'use client'

import { userApi, setAuthInterceptor } from '@/4_entities/user'
import { apiInstance } from '@/5_shared/api/app.api'
import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        networkMode: 'online',
        retry: false
    })

    setAuthInterceptor(apiInstance)

    return (
        <>
            {children}
        </>
    )
}
export { AuthProvider }