import Layout from '@/components/layout/Layout';
import { AuthContextProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Login from './login';

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//   <AuthContextProvider>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AuthContextProvider>
//   )
// }

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
