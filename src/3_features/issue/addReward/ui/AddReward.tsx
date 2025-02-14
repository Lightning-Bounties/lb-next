'use client'

import { FC, useState, useRef } from 'react'
import { Button, Input, Flex, Form, Collapse, notification, Row, Col, Checkbox, Tour, TourProps } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedApi } from '@/4_entities/feed'
import { profileApi } from '@/4_entities/me'
import { useRouter } from 'next/navigation'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';
import { LockTimeSelector } from '@/5_shared/ui/LockTimeSelector'
import { convertToUnlocksAtTimestamp } from '@/5_shared/utils/timeConversion'
import { hintsConfig } from '@/5_shared/config/hints.config'

type AddRewardProps = {
	issueId: string
	issueUrl: string
}

const AddReward: FC<AddRewardProps> = ({ issueId, issueUrl }) => {

	const [formVisible, setFormVisible] = useState(false)
	const [openTour, setOpenTour] = useState(false)
	const anonymousHelpRef = useRef(null)
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

	const onFinish = (values: { amount: number, lockedUntilAmount: number, lockedUntilUnit: string, is_anonymous: boolean }) => {
		addReward({ 
			issueId,
			rewardAmount: values.amount,
            unlocks_at: convertToUnlocksAtTimestamp(values.lockedUntilAmount, values.lockedUntilUnit),
            is_anonymous: values.is_anonymous
		})
	}

	const handleCancel = () => {
		setFormVisible(false)
	}

    const tourSteps: TourProps['steps'] = [
        {
            title: hintsConfig['anonRewardCheckbox'].title,
            description: hintsConfig['anonRewardCheckbox'].body,
            target: () => anonymousHelpRef.current,
            nextButtonProps: {
                children: hintsConfig['anonRewardCheckbox'].buttonText
            }
        }
    ]

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
                        lockedUntilUnit: 'weeks',
                        is_anonymous: false
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
                                    <Form.Item style={{ marginBottom: '8px' }}>
                                        <Row align="middle" gutter={8}>
                                            <Col span={1}>
                                                <QuestionCircleOutlined
                                                    ref={anonymousHelpRef}
                                                    onClick={() => setOpenTour(true)}
                                                    style={{ cursor: 'pointer' }}
                                                    className={`opacity50`}
                                                />
                                            </Col>
                                            <Col span={7} style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '8px' }}>Make reward anonymous</span>
                                            </Col>
                                            <Col>
                                                <Form.Item
                                                    name="is_anonymous"
                                                    valuePropName="checked"
                                                    noStyle
                                                >
                                                    <Checkbox />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Tour 
                                        open={openTour}
                                        onClose={() => setOpenTour(false)}
                                        steps={tourSteps}
                                    />
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
