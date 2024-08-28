import '@/styles/reset.css';
import '@/styles/globals.css';
import Nav from '@/components/nav';
// css
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isNotNeedNav = [
    '/login',
    '/sign-up',
    '/password/find',
    '/password/reset',
    '/login/googleAuth',
  ].includes(router.pathname);

  return (
    <>
      {!isNotNeedNav && <Nav />}
      <Component {...pageProps} />;
    </>
  );
}
