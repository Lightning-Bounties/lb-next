'use client';

import { FC, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckSquareFilled, BorderOutlined } from '@ant-design/icons';
import { Typography, notification } from 'antd';
import { issueApi } from '@/4_entities/issue/api/issue.api';

type OneTimePaymentStatusProps = {
    issueId: string;
    checkingId: string;
};

const OneTimePaymentStatus: FC<OneTimePaymentStatusProps> = ({
    issueId,
    checkingId,
}) => {
    const queryClient = useQueryClient();
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    const paymentCheck = async (issueId: string, checkingId: string) => {
        if (isPaid) return null;
        const response = await issueApi.checkOneTimePayment(
            issueId,
            checkingId,
        );
        if (response.is_paid) {
            setIsPaid(true);
            api.success({
                message:
                    'Payment received; reward added! Refreshing in 5 secs...',
            });
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['Issue'] });
                window.location.reload();
            }, 5000);
        }
        return null;
    };

    const { data } = useQuery({
        queryKey: ['oneTimePaymentStatusChecker', issueId, checkingId],
        queryFn: () => paymentCheck(issueId, checkingId),
        refetchInterval: 5000,
    });

    useEffect(() => {
        setIsPaid(false);
        queryClient.invalidateQueries({
            queryKey: ['oneTimePaymentStatusChecker', issueId, checkingId],
        });
    }, [checkingId, issueId]);

    return (
        <Typography className="opacity50" style={{ marginTop: '20px' }}>
            {isPaid ? 'Payment received: ' : 'Payment not yet received: '}
            {isPaid ? <CheckSquareFilled /> : <BorderOutlined />}
            {contextHolder}
        </Typography>
    );
};

export { OneTimePaymentStatus };
