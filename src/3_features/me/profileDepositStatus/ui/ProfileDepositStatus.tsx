import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckSquareFilled, BorderOutlined, LoadingOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { profileApi } from '@/4_entities/me'
import { FC, useState, useEffect } from 'react'

type ProfileDepositStatusProps = {
    checkingId: string
}

const ProfileDepositStatus: FC<ProfileDepositStatusProps> = ({checkingId}) => {
    const queryClient = useQueryClient();

    const [isPaid, setIsPaid] = useState<boolean>(false)

    const paymentCheck = async (checkingId: string) => {
        if (isPaid) return null
        const payments = await profileApi.getProfilePaymentsHistory(5)
        const payment = payments.find(p => p.checking_id === checkingId)
        if (payment && payment.pending === false) {
            setIsPaid(true)
            queryClient.invalidateQueries({queryKey: profileApi.qkGetUserWallet()})
            queryClient.invalidateQueries({queryKey: profileApi.qkGetProfilePaymentsHistory()})
        }
        return null
    }

    const { data } = useQuery({
        queryKey: ['currentDepositStatusChecker'],
        queryFn: () => paymentCheck(checkingId), 
        refetchInterval: 2000,
    })

    useEffect(() => {
        setIsPaid(false)
        queryClient.invalidateQueries({queryKey: ['currentDepositStatusChecker']})
    }, [checkingId])

    return (
            <Typography className="opacity50" style={{ marginTop: '20px' }}>
                { isPaid ? 'Payment received: ' : 'Payment not yet received: '}
                { isPaid ? <CheckSquareFilled /> : <BorderOutlined />}
            </Typography>
    )
}

export { ProfileDepositStatus }

