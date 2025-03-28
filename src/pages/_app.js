import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import Head from 'next/head'
import React, { useState, useEffect } from 'react';

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

  const router = useRouter();
  
  useEffect(() => {
    console.log('pathname:', router.pathname);
    console.log('asPath:', router.asPath);
    console.log('basePath:', router.basePath);
    console.log('query:', router.query);
    console.log('url:', window.location.href);
  }, [router.asPath]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps['dehydratedState']}>
          <Head>
            <title>EDLM Portal</title>
            <link rel="icon" href="/logo.png" />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
