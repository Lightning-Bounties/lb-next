import { Col, Form, Input, Row, Select, Typography } from 'antd'
import { FC } from 'react'

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
    return (
        <Row gutter={[8, 8]} align="middle" style={{ marginTop: '8px' }}>
            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography.Text>
                    Lock reward until:
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