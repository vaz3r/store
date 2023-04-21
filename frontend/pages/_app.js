import Layout from '@/components/Layout';
import '@/styles/globals.css'
import { Fragment } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </Fragment>
  );
};