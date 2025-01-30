import { ThemeConfig } from 'antd'

const darkTheme: ThemeConfig = {
    cssVar: true,
    token: {
        colorPrimary: '#597ef7',
        colorBgBase: '#181818',
        colorText: '#FFF',
        colorTextDisabled: '#FFF',
        colorTextQuaternary: 'rgba(255,255,255,.5)',
        colorBorderSecondary: 'rgba(255,255,255,.1)',
        colorBorder: 'rgba(255,255,255,.3)'
    },
    components: {
        Button: {
            controlOutline: 'transparent'
        },
        Input: {
            margin: 0
        },
        Form: {
            itemMarginBottom: 0
        },
        Layout: {
            headerBg: '#000',
            headerPadding: '0 20px'
        },
        Breadcrumb: {
            linkColor: 'rgba(255,255,255,.5)',
            separatorColor: 'rgba(255,255,255,.5)'
        },
        Select: {
            controlItemBgHover: "rgba(255,255,255,.5)",
            controlItemBgActive: "rgb(89, 126, 247)",
        },
    }
}

export { darkTheme }
