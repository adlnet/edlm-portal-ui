import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head'
import React, { useState} from 'react';

// contexts
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// styles
import '@/styles/globals.css';

import icon from '@/public/icon.ico';

export default function MyApp({ Component, pageProps }) {
  // to avoid sharing results from other users.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>EDLM Portal</title>
        <link rel="icon" href= {icon.src} />
      </Head>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps['dehydratedState']}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}
