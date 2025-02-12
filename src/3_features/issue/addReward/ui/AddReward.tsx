'use client'

import { FC, useState } from 'react'
import { Button, Input, Flex, Form, Collapse, notification, Row, Col } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedApi } from '@/4_entities/feed'
import { profileApi } from '@/4_entities/me'
import { useRouter } from 'next/navigation'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';
import { LockTimeSelector } from '@/5_shared/ui/LockTimeSelector'
import { convertToUnlocksAtTimestamp } from '@/5_shared/utils/timeConversion'

type AddRewardProps = {
	issueId: string
	issueUrl: string
}

const AddReward: FC<AddRewardProps> = ({ issueId, issueUrl }) => {

	const [formVisible, setFormVisible] = useState(false)
	const [form] = Form.useForm()
	const [api, contextHolder] = notification.useNotification()
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: addReward, isPending } = useMutation({
		mutationFn: feedApi.createReward,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['issue', issueId] })
            queryClient.invalidateQueries({ queryKey: profileApi.qkGetUserWallet() })
			api.success({ message: 'Reward added successfully' })
			form.resetFields(['amount', 'lockedUntilAmount', 'lockedUntilUnit'])
			setFormVisible(false)
			router.refresh()
		},
		onError: (error) => {
			api.error({ message: catchHTTPValidationError(error) })
		}
	})

	const onFinish = (values: { amount: number, lockedUntilAmount: number, lockedUntilUnit: string }) => {
		addReward({ 
			issueId,
			rewardAmount: values.amount, 
            unlocks_at: convertToUnlocksAtTimestamp(values.lockedUntilAmount, values.lockedUntilUnit)
		})
	}

	const handleCancel = () => {
		setFormVisible(false)
	}

	const { Panel } = Collapse

    return (
        <Flex vertical gap="large" align="start">
            {contextHolder}
            {!formVisible && (
                <Button onClick={() => setFormVisible(true)}>
                    Add Reward To This Issue
                </Button>
            )}
            {formVisible && (
                <Form 
                    initialValues={{
                        lockedUntilAmount: 2,
                        lockedUntilUnit: 'weeks'
                    }}
                    form={form} 
                    onFinish={onFinish}
                    layout="vertical"
                    style={{ width: '100%' }}
                >
                    <Row gutter={[16, 16]} style={{ marginBottom: '4px' }}>
                        <Col>
                            <Form.Item
                                name="amount"
                                rules={[{ required: true, message: 'Please input reward amount' }]}
                            >
                                <Input type="number" placeholder="Amount in sats" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isPending}>
                                    Add Reward
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button type="default" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Collapse
                                bordered={false}
                                style={{ background: 'none', padding: 0 }}
                            >
                                <Panel key="1" header="Advanced settings" forceRender>
                                    <LockTimeSelector />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Form>
            )}
        </Flex>
    )
}

export { AddReward }
