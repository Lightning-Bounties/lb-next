'use client'

import { feedApi } from '@/4_entities/feed'
import { profileApi } from '@/4_entities/me'
import { hintsConfig } from '@/5_shared/config/hints.config';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Flex, Form, Input, notification, Popover, Tour, TourProps } from 'antd'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError'
import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

type CheckPullProps = {
    repoName: string,
}

const CheckPull: FC<CheckPullProps> = ({ repoName }) => {

    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification()
    const router = useRouter()
    const { mutateAsync: checkPull, isPending } = useMutation({ mutationFn: feedApi.checkPull })

    const ref1 = useRef(null);
    const [open, setOpen] = useState<boolean>(false);
    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['checkPullForm'].title,
            description: hintsConfig['checkPullForm'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['checkPullForm'].buttonText
            }
        }
    ]

    return (
        <>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        <Popover
            content={
                <Form onFinish={async (fields) => {
                    try {
                        await checkPull({
                            'pull_request_number': fields.number,
                            'repo_full_name': repoName
                        })
                        queryClient.invalidateQueries({ queryKey: profileApi.qkGetUserWallet() })
                        router.refresh()
                        api.success({
                            message: 'Reward Claimed Succesfully'
                        })
                    }
                    catch (e) {
                        console.log(e)
                        api.error({
                            message: catchHTTPValidationError(e)
                        })
                    }
                }}>
                    {contextHolder}
                    <Flex gap="small">
                        <Form.Item name="number">
                            <Input placeholder="Pull request number" />
                        </Form.Item>
                        <Button loading={isPending} htmlType="submit" type="primary">Check</Button>
                    <QuestionCircleOutlined
                        style={{ flexShrink: 0, marginTop: '4px' }}
                        ref={ref1}
                        onClick={() => { setOpen(true) }}
                        className={`opacity50`}
                    />
                    </Flex>
                </Form>
            }
        >
            <Button>Claim Reward</Button>
        </Popover>
        </>
    )
}
export { CheckPull }