import { profileApi } from '@/4_entities/me';
import { hintsConfig } from '@/5_shared/config/hints.config';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input, notification, Tour, TourProps, Typography } from 'antd'
import { useRef, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';

const ProfileWithdraw = () => {

    const [api, contextHolder] = notification.useNotification();
    const { mutateAsync: withdrawFunds, isPending } = useMutation({
        mutationFn: profileApi.withdrawFunds
    })

    const onFinishHandler = async (data: { payment_request: string }) => {
        try {
            const resp = await withdrawFunds({
                paymentLink: data.payment_request
            })
            api.success({
                message: 'Success'
            })
        }
        catch (e) {
            api.error({
                message: catchHTTPValidationError(e)
            })
        }
    }


    const ref1 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['withdrawForm'].title,
            description: hintsConfig['withdrawForm'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['withdrawForm'].buttonText
            }
        }
    ]

    return (
        <>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            {contextHolder}
            <Form
                onFinish={onFinishHandler}
            >
                <Flex gap="small">
                    <Typography style={{ marginTop: '4px' }}>Payments request:</Typography>
                    <Form.Item
                        name="payment_request"
                        rules={[
                            {
                                required: true,
                                message: 'Required'
                            }
                        ]}
                    >
                        <Input placeholder="Invoice code" style={{ maxWidth: '200px' }} />
                    </Form.Item>
                    <Button htmlType="submit" type="primary">Create</Button>
                    <QuestionCircleOutlined
                        style={{ flexShrink: 0, marginTop: '4px' }}
                        ref={ref1}
                        onClick={() => { setOpen(true) }}
                        className={`opacity50`}
                    />
                </Flex>
            </Form>
        </>
    )
}
export { ProfileWithdraw }