import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryProvider } from './providers/QueryProvider';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';

const App: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </AuthProvider>
        </QueryProvider>
    );
};
export { App };
