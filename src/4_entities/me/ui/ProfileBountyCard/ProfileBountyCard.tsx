'use client'

import { Card, Typography } from 'antd';
import React from 'react';
import Link from 'next/link';
import styles from './ProfileBountyCard.module.css';

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
    htmlUrl
}) => {
    return (
        <Card style={{ marginBottom: '16px' }}>
          <Paragraph style={{ marginBottom: '0px' }}>
    <Link 
        href={`https://github.com/${repository}`} 
        target="_blank" 
        rel="noopener noreferrer"
    >
        <span className={styles.repoLink}>{repository}</span>
    </Link>
</Paragraph>
            <Title level={4} className={styles.title} style={{ marginTop: '10px' }}>
                {title}
                {htmlUrl ? (
                    <Link href={htmlUrl} target="_blank" rel="noopener noreferrer">
                        <span className={styles.issueNumber}>#{issueNumber}</span>
                    </Link>
                ) : (
                    <span className={styles.issueNumber}>#{issueNumber}</span>
                )}
            </Title>
            <Paragraph>
                <strong>Claimed:</strong> {claimedAt ? new Date(claimedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not claimed'}
            </Paragraph>
            <Paragraph>
                <strong>Issue:</strong>
                {htmlUrl ? (
                    <Link href={htmlUrl} target="_blank" rel="noopener noreferrer">
                        <span className={styles.linkText}>{htmlUrl}</span>
                    </Link>
                ) : <span className={styles.linkText}>{htmlUrl}</span>}
            </Paragraph>
            <Paragraph>
                <strong>Total Reward:</strong> {totalReward} sats
            </Paragraph>
        </Card>
    );
};

export { ProfileBountyCard };
