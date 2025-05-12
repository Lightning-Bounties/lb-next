'use client';

import { AddReward } from '@/3_features/issue';
import { userApi } from '@/4_entities/user';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

type IssueBaseInfoAddRewardProps = {
    issueId: string;
    issueUrl: string;
    issueTitle: string;
};

const IssueBaseInfoAddReward: FC<IssueBaseInfoAddRewardProps> = ({
    issueId,
    issueUrl,
    issueTitle,
}) => {
    const { error, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        retry: false,
    });

    return (
        <AddReward
            issueId={issueId}
            issueUrl={issueUrl}
            issueTitle={issueTitle}
            isLoggedIn={!error}
        />
    );
};

export { IssueBaseInfoAddReward };
