import { Col, Form, Input, Row, Select, Typography, Tour, TourProps, } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { FC, useRef, useState } from 'react'
import { hintsConfig } from '@/5_shared/config/hints.config'

const timeUnits = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
    { label: 'Months', value: 'months' },
]

interface LockTimeSelectorProps {
    amountName?: string;
    unitName?: string;
}

const LockTimeSelector: FC<LockTimeSelectorProps> = ({ 
    amountName = "lockedUntilAmount",
    unitName = "lockedUntilUnit"
}) => {

    const ref1 = useRef<any>(null)
    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['lockTimeSelector'].title,
            description: hintsConfig['lockTimeSelector'].body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['lockTimeSelector'].buttonText
            }
        }
    ]

    return (
        <Row gutter={[8, 8]} align="middle" style={{ marginTop: '8px' }}>
            <Col span={1} style={{ display: 'flex', alignItems: 'center' }}>
                <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                <QuestionCircleOutlined
                    ref={ref1}
                    onClick={() => { setOpen(true) }}
                    className={`opacity50`}
                />
            </Col>
            <Col span={7} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography.Text>
                    Lock reward:
                </Typography.Text>
            </Col>

            <Col span={4}>
                <Form.Item
                    name={amountName}
                    rules={[
                        { required: true, message: 'Required field' },
                        { type: 'number', min: 1, message: 'Value must be at least 1' }
                    ]}
                    normalize={(value: string) => Number(value)}
                >
                    <Input type="number" min={1} placeholder="Duration" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={unitName}
                    rules={[
                        { required: true, message: 'Required field' }
                    ]}
                >
                    <Select
                        options={timeUnits}
                        placeholder="Select unit (e.g. weeks)"
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}

export { LockTimeSelector }