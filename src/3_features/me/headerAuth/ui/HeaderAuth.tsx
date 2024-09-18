'use client'

import { Flex, Typography } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import s from './HeaderAuth.module.css'
import { userApi } from '@/4_entities/user'

const HeaderAuth = () => {

    return (
        <Flex
            align="center"
            gap="small"
            className={s.box}
            onClick={() => {
                const windowLocation = window.location.href
                userApi.loginWithGitHub(windowLocation)
            }}
        >
            <Typography>Login with GitHub</Typography>
            <GithubOutlined style={{ fontSize: '22px' }} />
        </Flex>
    )
}
export { HeaderAuth }