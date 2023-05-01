"use client"
import { Toaster } from 'react-hot-toast';
import { MessagesProvider } from '@/context/messages'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { FC } from 'react'

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queruClient = new QueryClient()
    return <QueryClientProvider client={queruClient}>
        <MessagesProvider>
            <Toaster position='top-center' />
            {children}
        </MessagesProvider>
    </QueryClientProvider>
}

export default Providers