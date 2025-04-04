'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient()

const Providers = ({ children }) => {
    return <QueryClientProvider client={client} >{children}</QueryClientProvider>
}

export default Providers