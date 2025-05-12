'use client';

import { Card, Flex, Typography } from 'antd';
import React from 'react';
import Link from 'next/link';
import styles from './ProfileBountyCard.module.css';
import { Prices } from '@/3_features/me/prices';

const { Title, Paragraph } = Typography;

type ProfileBountyCardProps = {
    repository: string;
    title: string;
    issueNumber: number;
    claimedAt: string | null | undefined;
    totalReward: number;
    htmlUrl: string | null | undefined;
};

const ProfileBountyCard: React.FC<ProfileBountyCardProps> = ({
    repository,
    title,
    issueNumber,
    claimedAt,
    totalReward,
    htmlUrl,
}) => {
    return (
        <Card style={{ marginBottom: '16px' }}>
            <Paragraph style={{ marginBottom: '0px' }}>
                <span style={{ color: 'gray' }}>{repository}</span>
            </Paragraph>
            <Title
                level={4}
                className={styles.title}
                style={{ marginTop: '10px' }}
            >
                {title}
                {htmlUrl ? (
                    <Link
                        href={htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span style={{ color: 'gray', marginLeft: '5px' }}>
                            #{issueNumber}
                        </span>
                    </Link>
                ) : (
                    <span style={{ color: 'gray', marginLeft: '5px' }}>
                        #{issueNumber}
                    </span>
                )}
            </Title>
            <Paragraph>
                <strong>Claimed:</strong>{' '}
                {claimedAt
                    ? new Date(claimedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                      })
                    : 'Not claimed'}
            </Paragraph>
            <Paragraph>
                <strong>Issue:</strong>
                {htmlUrl ? (
                    <Link
                        href={htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span style={{ color: 'gray', marginLeft: '5px' }}>
                            {htmlUrl}
                        </span>
                    </Link>
                ) : (
                    <span style={{ color: 'gray', marginLeft: '5px' }}>
                        {htmlUrl}
                    </span>
                )}
            </Paragraph>

            <Flex align="center" gap="small">
                <strong>Total Reward:</strong>
                <Prices amount={totalReward} />
            </Flex>
        </Card>
    );
};

export { ProfileBountyCard };
