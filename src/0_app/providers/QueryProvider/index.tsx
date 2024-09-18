'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode, useState } from 'react'

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}
export { QueryProvider }