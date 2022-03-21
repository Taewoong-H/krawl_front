import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link href="/home">
            <a className="me-2 mb-md-0 text-muted text-decoration-none lh-1">끌올</a>
          </Link>
          <span className="text-muted">© 2022 사국회, Inc.</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link href="/home">
              <a className="text-muted">
                <Image src="/image/twitter.svg" alt="twitter" width={24} height={21} />
              </a>
            </Link>
          </li>
          <li className="ms-3">
            <Link href="/home">
              <a className="text-muted">
                <Image src="/image/instagram.svg" alt="instagram" width={24} height={21} />
              </a>
            </Link>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://github.com/Taewoong-H/krawl_front">
              <Image src="/image/github.svg" alt="github" width={24} height={21} />
            </a>
          </li>
        </ul>
      </footer>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></Script>
      <style jsx>
        {`
          img {
            fill: currentColor;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
