import { Flex, Tag, Typography } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import {
    countOpenLinkedPulls,
    type LinkedPullRequest,
} from '@/5_shared/utils/githubLinkedPulls';

type Props = {
    pulls: LinkedPullRequest[];
};

function stateLabel(pr: LinkedPullRequest): string {
    if (pr.draft && pr.state === 'open') return 'draft';
    return pr.state;
}

/**
 * Lists GitHub PRs that reference this bounty issue (LB issue page).
 */
const IssueExistingPulls: FC<Props> = ({ pulls }) => {
    if (!pulls.length) return null;

    const openCount = countOpenLinkedPulls(pulls);

    return (
        <Flex vertical gap="small">
            <Flex align="center" gap="small">
                <Typography className="opacity50">Existing PRs</Typography>
                <Tag color={openCount ? 'blue' : 'default'}>
                    {openCount ? `${openCount} open` : `${pulls.length} closed`}
                </Tag>
            </Flex>
            <Flex vertical gap={6}>
                {pulls.map((pr) => (
                    <Flex
                        key={pr.html_url || pr.number}
                        align="center"
                        gap="small"
                        wrap="wrap"
                    >
                        <Tag
                            color={
                                pr.state === 'open' ? 'processing' : 'default'
                            }
                        >
                            {stateLabel(pr)}
                        </Tag>
                        <Link
                            href={pr.html_url}
                            target="_blank"
                            rel="nofollow noreferrer"
                        >
                            #{pr.number} {pr.title}
                        </Link>
                        <Typography className="opacity50">
                            @{pr.user_login}
                        </Typography>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export { IssueExistingPulls };
