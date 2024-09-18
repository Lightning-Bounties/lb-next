'use client'

import { Flex, Typography } from 'antd'
import s from './s.module.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const BetaNotify = () => {
    return (
        <div className={s.box}>
            <Flex vertical gap="small">
                <div className={s.title}><InfoCircleOutlined /> THIS SITE IS IN BETA</div>
                <div className={s.content}>
                    <Typography>
                        • Do not deposit big amounts because you might lose them <br />
                        • If you see a bug, email us at <Link href="mailto:founders@lightningbounties.com">founders@lightningbounties.com</Link>
                    </Typography>
                </div>
            </Flex>
        </div>
    )
}
export { BetaNotify }