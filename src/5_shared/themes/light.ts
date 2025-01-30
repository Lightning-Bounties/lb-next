import { ThemeConfig } from 'antd'

const lightTheme: ThemeConfig = {
    cssVar: true,
    token: {
        colorPrimary: '#597ef7'
    },
    components: {
        Input: {
            margin: 0
        },
        Form: {
            itemMarginBottom: 0
        },
        Layout: {
            headerBg: '#fff',
            headerPadding: '0 20px'
        },
        Select: {
            colorTextPlaceholder: "rgb(0, 0, 0)"
        },
    }
}

export { lightTheme }
