'use client'

import { AddReward } from '@/3_features/issue'
import { userApi } from '@/4_entities/user'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

type IssueBaseInfoAddRewardProps = {
    issueId: string
    issueUrl: string
}

const IssueBaseInfoAddReward: FC<IssueBaseInfoAddRewardProps> = ({ issueId, issueUrl }) => {

  const { error, isLoading } = useQuery({
    queryKey: userApi.qkGetUserData(),
    queryFn: () => userApi.getUserData(),
    retry: false
  })

  return !error ? <AddReward issueId={issueId} issueUrl={issueUrl} /> : null

}

export { IssueBaseInfoAddReward }