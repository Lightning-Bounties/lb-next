'use client';

import { useUserStore } from '@/4_entities/user';
import { Switch } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const ThemeToggler = () => {
    const { isDarkTheme, setDarkTheme } = useUserStore(
        useShallow((state) => ({
            setDarkTheme: state.setDarkTheme,
            isDarkTheme: state.darkTheme,
        })),
    );

    return (
        <Switch
            defaultChecked={!isDarkTheme}
            onClick={() => {
                setDarkTheme(!isDarkTheme);
            }}
            checked={!isDarkTheme}
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
        />
    );
};
export { ThemeToggler };
export default ThemeToggler;
