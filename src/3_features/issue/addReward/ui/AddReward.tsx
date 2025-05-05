'use client';

import { FC, useState, useRef } from 'react';
import {
    Button,
    Input,
    Flex,
    Form,
    Collapse,
    notification,
    Row,
    Col,
    Checkbox,
    Tour,
    TourProps,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { OneTimeRewardInvoiceModal } from '@/3_features/issue/oneTimeRewardInvoiceModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedApi } from '@/4_entities/feed';
import { profileApi } from '@/4_entities/me';
import { useRouter } from 'next/navigation';
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';
import { LockTimeSelector } from '@/5_shared/ui/LockTimeSelector';
import { convertToUnlocksAtTimestamp } from '@/5_shared/utils/timeConversion';
import { hintsConfig } from '@/5_shared/config/hints.config';

type AddRewardProps = {
    issueId: string;
    issueUrl: string;
    issueTitle: string;
    isLoggedIn: boolean;
};

const AddReward: FC<AddRewardProps> = ({
    issueId,
    issueUrl,
    issueTitle,
    isLoggedIn,
}) => {
    const [formVisible, setFormVisible] = useState(true);
    const [openTour, setOpenTour] = useState(false);
    const anonymousHelpRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingValues, setPendingValues] = useState<any>(null);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: addReward, isPending } = useMutation({
        mutationFn: feedApi.createReward,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issue', issueId] });
            queryClient.invalidateQueries({
                queryKey: profileApi.qkGetUserWallet(),
            });
            api.success({ message: 'Reward added successfully' });
            form.resetFields([
                'amount',
                'lockedUntilAmount',
                'lockedUntilUnit',
            ]);
            setFormVisible(false);
            router.refresh();
        },
        onError: (error) => {
            api.error({ message: catchHTTPValidationError(error) });
        },
    });

    const handleQuickAmount = (amount: number) => {
        form.setFieldValue('amount', amount);
    };

    const onFinish = (values: {
        amount: number;
        lockedUntilAmount: number;
        lockedUntilUnit: string;
        is_anonymous: boolean;
    }) => {
        if (isLoggedIn) {
            addReward({
                issueId,
                rewardAmount: values.amount,
                unlocks_at: convertToUnlocksAtTimestamp(
                    values.lockedUntilAmount,
                    values.lockedUntilUnit,
                ),
                is_anonymous: values.is_anonymous,
            });
        } else {
            setPendingValues({
                ...values,
                issueUrl,
                issueId,
                issueTitle,
            });
            setIsModalOpen(true);
        }
    };

    const handleModalConfirm = () => {
        if (pendingValues) {
            addReward({
                issueId,
                rewardAmount: pendingValues.amount,
                unlocks_at: convertToUnlocksAtTimestamp(
                    pendingValues.lockedUntilAmount,
                    pendingValues.lockedUntilUnit,
                ),
                is_anonymous: pendingValues.is_anonymous,
            });
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setFormVisible(false);
    };

    const hintName = isLoggedIn
        ? 'anonRewardCheckbox'
        : 'anonRewardCheckboxOneTimeReward';

    const tourSteps: TourProps['steps'] = [
        {
            title: hintsConfig[hintName].title,
            description: hintsConfig[hintName].body,
            target: () => anonymousHelpRef.current,
            nextButtonProps: {
                children: hintsConfig[hintName].buttonText,
            },
        },
    ];

    const { Panel } = Collapse;

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
                        lockedUntilAmount: isLoggedIn ? 2 : 3,
                        lockedUntilUnit: isLoggedIn ? 'weeks' : 'months',
                        is_anonymous: isLoggedIn ? false : true,
                    }}
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{ width: '100%' }}
                >
                    <h4>{'Add Reward to the Bounty'}</h4>
                    <Row gutter={[16, 16]} style={{ marginBottom: '4px' }}>
                        <Col>
                            <Button
                                onClick={() => handleQuickAmount(21)}
                                style={{ marginRight: '8px' }}
                            >
                                21 sats
                            </Button>
                            <Button
                                onClick={() => handleQuickAmount(1000)}
                                style={{ marginRight: '8px' }}
                            >
                                1000 sats
                            </Button>
                            <Button
                                onClick={() => handleQuickAmount(8333)}
                                style={{ marginRight: '8px' }}
                            >
                                8333 sats
                            </Button>
                            <Form.Item
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input reward amount',
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginBottom: 0,
                                    marginRight: '8px',
                                }}
                            >
                                <Input
                                    type="number"
                                    placeholder="Amount in sats"
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isPending}
                                >
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
                    {/* { isLoggedIn && ( */}
                    {true && (
                        <Row>
                            <Col span={24}>
                                <Collapse
                                    bordered={false}
                                    style={{ background: 'none', padding: 0 }}
                                >
                                    <Panel
                                        key="1"
                                        header="Advanced settings"
                                        forceRender
                                    >
                                        <Form.Item
                                            style={{ marginBottom: '8px' }}
                                        >
                                            <Row align="middle" gutter={8}>
                                                <Col span={1}>
                                                    <QuestionCircleOutlined
                                                        ref={anonymousHelpRef}
                                                        onClick={() =>
                                                            setOpenTour(true)
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className={`opacity50`}
                                                    />
                                                </Col>
                                                <Col
                                                    span={7}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginRight: '8px',
                                                        }}
                                                    >
                                                        Make reward anonymous
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        name="is_anonymous"
                                                        valuePropName="checked"
                                                        noStyle
                                                    >
                                                        <Checkbox
                                                            disabled={
                                                                !isLoggedIn
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Tour
                                            open={openTour}
                                            onClose={() => setOpenTour(false)}
                                            steps={tourSteps}
                                        />
                                        <LockTimeSelector
                                            isOneTimeReward={!isLoggedIn}
                                        />
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    )}
                </Form>
            )}
            <OneTimeRewardInvoiceModal
                open={isModalOpen}
                onOk={handleModalConfirm}
                onCancel={() => setIsModalOpen(false)}
                pendingValues={pendingValues}
            />
        </Flex>
    );
};

export { AddReward };
