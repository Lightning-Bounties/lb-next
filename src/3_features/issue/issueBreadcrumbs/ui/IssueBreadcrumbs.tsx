'use client'

import { Breadcrumb, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

type IssueBreadcrumbsProps = {
    title: string
}

const IssueBreadcrumbs: FC<IssueBreadcrumbsProps> = ({ title }) => {
    return (
        <Breadcrumb
            itemRender={(data) => data.href
                ? <Link href={data.href ?? ''}>{data.title}</Link>
                : <Typography>{data.title}</Typography>
            }
            items={[
                {
                    title: 'Feed',
                    href: '/'
                },
                {
                    title: title
                }
            ]}
        />
    )
}
export { IssueBreadcrumbs }