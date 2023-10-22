'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
  children: React.ReactNode
}

const Provider = ({ children }: Props) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Provider
