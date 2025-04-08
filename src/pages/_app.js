import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head'
import React, { useEffect, useState} from 'react';

// contexts
import { AuthProvider } from '@/contexts/AuthContext';

// styles
import '@/styles/globals.css';

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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps['dehydratedState']}>
          <Head>
            <title>EDLM Portal</title>
            <link rel="icon" type="image/png" href="/doteLogo.png" />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
