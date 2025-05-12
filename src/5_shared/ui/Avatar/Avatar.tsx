import { FC, ReactNode } from 'react';
import s from './Avatar.module.css';
import { Flex, Tooltip } from 'antd';

type AvatarProps = {
    avatarUrl?: string;
    withOthers?: string[];
    size?: 'big' | 'middle' | 'small';
    icon?: ReactNode;
    iconTitle?: ReactNode;
};

const Avatar: FC<AvatarProps> = ({
    avatarUrl,
    withOthers,
    size = 'middle',
    icon,
    iconTitle,
}) => {
    return (
        <div className={`${s.box} ${s[size]}`}>
            {avatarUrl ? <img src={avatarUrl} alt="profile" /> : null}
            {withOthers ? (
                <div className={s.others}>
                    {withOthers[0] ? (
                        <div
                            className={s.others_1}
                            style={{
                                backgroundImage: 'url(' + withOthers[0] + ')',
                            }}
                        />
                    ) : null}
                    {withOthers[1] ? (
                        <div
                            className={s.others_2}
                            style={{
                                backgroundImage: 'url(' + withOthers[1] + ')',
                            }}
                        />
                    ) : null}
                </div>
            ) : null}
            <Flex justify="center" align="center" className={s.icon}>
                <Tooltip title={iconTitle}>{icon}</Tooltip>
            </Flex>
        </div>
    );
};
export { Avatar };
