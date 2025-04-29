import { profileApi } from '@/4_entities/me';
import { hintsConfig } from '@/5_shared/config/hints.config';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input, notification, Tour, TourProps, Typography, Divider, Alert } from 'antd';
import { useRef, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { catchHTTPValidationError } from '@/5_shared/utils/catchHTTPValidationError';
import { QueryObserverResult } from '@tanstack/react-query';
import { parseInvoice } from '@/5_shared/utils/parseInvoice';


interface DecodedInvoice {
  amount: number | string;
  timestamp: Date;
  expiry: Date;
  memo: string;
  hash: string;
}

type ProfileWithdrawProps = {
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
};

const ProfileWithdraw: React.FC<ProfileWithdrawProps> = ({ refetch }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutateAsync: withdrawFunds } = useMutation({
    mutationFn: profileApi.withdrawFunds,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [decodedData, setDecodedData] = useState<DecodedInvoice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFinishHandler = async (data: { payment_request: string }) => {
    try {
      await withdrawFunds({
        paymentLink: data.payment_request,
      });
      api.success({ message: 'Success' });
      await refetch();
      form.resetFields();
      setIsButtonEnabled(false);
      setDecodedData(null);
    } catch (e) {
      api.error({ message: catchHTTPValidationError(e) });
    }
  };

  const handleValuesChange = async (changedValues: any) => {
    if (changedValues.payment_request) {
      const invoice = changedValues.payment_request.trim();
      setIsButtonEnabled(invoice !== '');
      setError(null);
      setDecodedData(null);

      if (invoice.startsWith('lnbc') || invoice.startsWith('lntb') || invoice.includes('lightning:')) {
        try {
          const parsed = await parseInvoice(invoice);
          if (!parsed || parsed.isLNURL || !parsed.data) {
            setError('Only standard BOLT11 invoices are supported in this form.');
            return;
          }

          const boltData = parsed.data;

          const amount = boltData.satoshis ?? 0;

          const memoTag = boltData.tags.find((tag: { tagName: string; data: unknown }) => tag.tagName === 'description');
            const hashTag = boltData.tags.find((tag: { tagName: string; data: unknown }) => tag.tagName === 'payment_hash');


          const memo = typeof memoTag?.data === 'string' ? memoTag.data : '';
          const hash = typeof hashTag?.data === 'string' ? hashTag.data : '';

          const expiry = (boltData.timeExpireDate ?? boltData.timestamp + 3600) * 1000;

          setDecodedData({
            amount,
            timestamp: new Date(boltData.timestamp * 1000),
            expiry: new Date(expiry),
            memo,
            hash,
          });
        } catch (err) {
          setError((err as Error).message || 'Failed to decode invoice.');
        }
      }
    } else {
      setIsButtonEnabled(false);
      setDecodedData(null);
      setError(null);
    }
  };

  const ref1 = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: hintsConfig['withdrawForm'].title,
      description: hintsConfig['withdrawForm'].body,
      target: () => ref1.current,
      nextButtonProps: {
        children: hintsConfig['withdrawForm'].buttonText,
      },
    },
  ];

  return (
    <>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      {contextHolder}
      <Form form={form} onFinish={onFinishHandler} onValuesChange={handleValuesChange}>
        <Flex gap="small">
          <Typography style={{ marginTop: '4px' }}>Payments request:</Typography>
          <Form.Item
            name="payment_request"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input placeholder="Invoice code" style={{ maxWidth: '200px' }} />
          </Form.Item>
          <Button htmlType="submit" type="primary" disabled={!isButtonEnabled}>
            Withdraw
          </Button>
          <QuestionCircleOutlined
            style={{ flexShrink: 0, marginTop: '4px' }}
            ref={ref1}
            onClick={() => setOpen(true)}
            className="opacity50"
          />
        </Flex>
      </Form>

      {error && (
        <Alert
          message={<Typography.Text style={{ color: 'black', fontWeight: 'medium' }}>Invoice Error</Typography.Text>}
          description={<Typography.Text style={{ color: 'black' }}>{error}</Typography.Text>}
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {decodedData && (
        <div style={{ marginTop: 16 }}>
          <Divider orientation="left" plain>
            <Typography.Text style={{ color: 'white' }}>Decoded Invoice</Typography.Text>
          </Divider>
          
          <Flex vertical gap="small">
            <Flex>
              <Typography.Text strong style={{ width: 80 }}>
                Amount:
              </Typography.Text>
              <Typography.Text>{decodedData.amount} sats</Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text strong style={{ width: 80 }}>
                Expiry:
              </Typography.Text>
              <Typography.Text>{decodedData.expiry.toLocaleString()}</Typography.Text>
            </Flex>
            {decodedData.memo && (
              <Flex>
                <Typography.Text strong style={{ width: 80 }}>
                  Memo:
                </Typography.Text>
                <Typography.Text>{decodedData.memo}</Typography.Text>
              </Flex>
            )}
            <Flex>
              <Typography.Text strong style={{ width: 80 }}>
                Hash:
              </Typography.Text>
              <div style={{ 
                // backgroundColor: '#1f2937', 
                // padding: '8px', 
                // borderRadius: '4px',
                flex: 1
              }}>
                <Typography.Text
                  style={{ fontSize: '12px', wordBreak: 'break-all', color: 'white' }}
                >
                  {decodedData.hash}
                </Typography.Text>
              </div>
            </Flex>
          </Flex>
        </div>
      )}
    </>
  );
};

export { ProfileWithdraw };