'use client'

import { CheckPull } from '@/3_features/feed'
import { userApi } from '@/4_entities/user'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

type IssueBaseInfoCheckPullProps = {
    repoName: string
}
const IssueBaseInfoCheckPull: FC<IssueBaseInfoCheckPullProps> = ({ repoName }) => {

    const { error, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        retry: false
    })


    return !error ? <CheckPull repoName={repoName} /> : null

}
export { IssueBaseInfoCheckPull }