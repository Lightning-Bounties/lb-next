'use client'

import { FC, useState } from 'react'
import { Button, Input, Flex, Form, notification } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedApi } from '@/4_entities/feed'
import { useRouter } from 'next/navigation'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';

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
			api.success({ message: 'Reward added successfully' })
			form.resetFields()
			setFormVisible(false)
			router.refresh()
		},
		onError: (error) => {
			api.error({ message: catchHTTPValidationError(error) })
		}
	})

	const onFinish = (values: { amount: number }) => {
		addReward({ issueUrl, rewardAmount: values.amount })
	}

	const handleCancel = () => {
		setFormVisible(false)
	}

	return (
		<Flex vertical gap="large" align="start">
			{contextHolder}
			{!formVisible && (
				<Button onClick={() => setFormVisible(true)}>
					Add Reward To This Issue
				</Button>
			)}
			{formVisible && (
				<Form form={form} onFinish={onFinish} layout="inline">
					<Form.Item
						name="amount"
						rules={[{ required: true, message: 'Please input reward amount' }]}
					>
						<Input type="number" placeholder="Amount in sats" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isPending}>
							Add Reward
						</Button>
					</Form.Item>
					<Form.Item>
						<Button type="default" onClick={handleCancel}>
							Cancel
						</Button>
					</Form.Item>
				</Form>
			)}
		</Flex>
	)
}

export { AddReward }