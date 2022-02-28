import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Image from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <footer>
        <p>
          © 2022 4국회, Inc.
          {/* <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </p>
      </footer>
      <style jsx>
        {`
          p {
            float: right;
          }
        `}
      </style>
    </Layout>
  );
}

export default MyApp;
