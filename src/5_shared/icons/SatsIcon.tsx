'use client'

import Icon from '@ant-design/icons'
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const SatsIcon = (props: Partial<CustomIconComponentProps>) => {
    return (
        <Icon
            {...props}
            component={
                () =>
                    <svg
                        viewBox="0 0 681 681"
                        width="1em"
                        height="1em"
                    >
                        <rect x="315" width="58" height="97" fill="currentColor" />
                        <rect x="312" y="584" width="58" height="97" fill="currentColor" />
                        <rect x="122" y="163" width="438" height="61" fill="currentColor" />
                        <rect x="122" y="310" width="438" height="61" fill="currentColor" />
                        <rect x="122" y="457" width="438" height="61" fill="currentColor" />
                    </svg>
            } />
    )
}
export { SatsIcon }