import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head'
import React, { useState} from 'react';
import RouteProtection from '@/utils/RouteProtection';

// contexts
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// styles
import '@/styles/globals.css';

import faviconIcon from '@/public/favicon.ico';

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
          <RouteProtection>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </RouteProtection>
          <Head>
            <title>EDLM Portal</title>
            <link rel="icon" href={faviconIcon.src} />
          </Head>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
