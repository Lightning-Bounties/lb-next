import { IssueBaseInfo, IssueRewardsList } from '@/2_widgets/issue';
import { Flex } from 'antd';
import { FC } from 'react';

const Issue: FC<{ issueId?: string }> = ({ issueId }) => {
    return (
        <Flex vertical gap="large">
            <br />
            {issueId ? (
                <>
                    <IssueBaseInfo rewardId={issueId} />
                    <IssueRewardsList rewardId={issueId} />
                </>
            ) : null}
            <br />
        </Flex>
    );
};
export { Issue };
