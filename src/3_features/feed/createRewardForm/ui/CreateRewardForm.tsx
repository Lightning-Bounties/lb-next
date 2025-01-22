'use client'

import { userApi } from '@/4_entities/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Collapse, Button, Card, Col, Flex, Form, Input, notification, Row, Spin, Tour, TourProps, Typography, Select } from 'antd'
import { FC, useRef, useState } from 'react'
import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { feedApi } from '@/4_entities/feed'
import { profileApi } from '@/4_entities/me'
import { useRouter } from 'next/navigation'
import s from './CreateRewardForm.module.css'
import { hintsConfig } from '@/5_shared/config/hints.config'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError'
import { LockTimeSelector } from '@/5_shared/ui/LockTimeSelector'
import { convertToUnlocksAtTimestamp } from '@/5_shared/utils/timeConversion'


const CreateRewardForm: FC = () => {
    const queryClient = useQueryClient();

    const { error, isLoading } = useQuery({
        queryKey: userApi.qkGetUserData(),
        queryFn: () => userApi.getUserData(),
        networkMode: 'offlineFirst',
        retry: false
    })

    const { mutateAsync: createRewardMutation, isPending } = useMutation({
        mutationFn: feedApi.createReward
    })
    const [api, contextHolder] = notification.useNotification()
    const router = useRouter()

    const ref1 = useRef<any>(null)
    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['rewardForm'].title,
            description: hintsConfig['rewardForm'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['rewardForm'].buttonText
            }
        }
    ]

    const { Panel } = Collapse
    const [form] = Form.useForm()

    return (
        <Card className={s.box}>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            <QuestionCircleOutlined
                ref={ref1}
                onClick={() => { setOpen(true) }}
                className={`opacity50 ${s.question}`}
            />
            {contextHolder}
            {
                isLoading
                    ? <Flex justify="center"><Spin /></Flex>
                    : error
                        ? <Flex
                            vertical
                            gap="small"
                            align="center">
                            <Typography>To post rewards,</Typography>
                            <Button
                                onClick={() => {
                                    const location = window.location.href
                                    userApi.loginWithGitHub(location)
                                }}
                                icon={<GithubOutlined />}
                                type="primary"
                                style={{ width: '100%' }}
                            >
                                Login with GitHub
                            </Button>
                        </Flex>
                        : <Form
                            initialValues={{
                                lockedUntilAmount: 2,
                                lockedUntilUnit: 'weeks'
                            }}
                            form={form}
                            onFinish={async (vals: { issueUrl: string, rewardAmount: number, lockedUntilAmount: number, lockedUntilUnit: string }) => {
                                try {
                                    const unlocksAtTimeStamp = convertToUnlocksAtTimestamp(vals.lockedUntilAmount, vals.lockedUntilUnit)

                                    await createRewardMutation({
                                        issueUrl: vals.issueUrl,
                                        rewardAmount: vals.rewardAmount,
                                        unlocks_at: unlocksAtTimeStamp
                                    })

                                    queryClient.invalidateQueries({ queryKey: profileApi.qkGetUserWallet() })
                                    router.refresh()
                                    api.success({
                                        message: 'Success'
                                    })
                                    form.resetFields()
                                }
                                catch (e) {
                                    api.error({
                                        message: catchHTTPValidationError(e)
                                    })
                                }
                            }}
                        >
                            <Row gutter={[8, 8]}>
                                <Col span={18} md={18} xs={16}>
                                    <Form.Item
                                        name="issueUrl"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Required field'
                                            }
                                        ]}
                                    >
                                        <Input placeholder="Issue URL e.g. https://github.com/microsoft/vscode/issues/90" />
                                    </Form.Item>
                                </Col>
                                <Col span={6} md={6} xs={8}>
                                    <Form.Item
                                        name="rewardAmount"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Required field'
                                            }
                                        ]}
                                    >
                                        <Input placeholder="Amount in sats" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Collapse
                                bordered={false}
                                style={{ background: 'none', padding: 0, marginTop: '8px' }} // optional styling
                                >
                                {/* forceRender to allow the field values to flow to form submit */}
                                <Panel key="1"  header="Advanced settings" forceRender>  
                                    <LockTimeSelector />
                                </Panel>
                            </Collapse>
                            <Row> 
                                <Col span={24}>
                                    <Button
                                        loading={isPending}
                                        htmlType="submit"
                                        type="primary"
                                        style={{ width: '100%' }}
                                    >
                                        Submit new reward
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
            }
        </Card>
    )
}
export { CreateRewardForm }
