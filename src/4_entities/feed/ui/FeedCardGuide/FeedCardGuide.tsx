'use client'

import { hintsConfig } from '@/5_shared/config/hints.config';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tour, TourProps } from 'antd';
import { useRef, useState } from 'react';

const FeedCardGuide = () => {

    const ref1 = useRef(null);
    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: hintsConfig['rewardCardFromFeed']?.title,
            description: hintsConfig['rewardCardFromFeed']?.body,
            target: () => ref1.current,
            nextButtonProps: {
                children: hintsConfig['rewardCardFromFeed']?.buttonText
            }
        },
    ]

    return (
        <>
            <QuestionCircleOutlined
                ref={ref1}
                onClick={() => { setOpen(true) }}
                className={`opacity50`}
            />
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </>
    )
}
export { FeedCardGuide }