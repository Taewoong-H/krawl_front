import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container py-3">
      <Component {...pageProps} />
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link href="/">
            <a className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">끌올</a>
          </Link>
          <span className="text-muted">© 2022 4국회, Inc.</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link href="/">
              <a className="text-muted">
                <Image src="/image/twitter.svg" alt="twitter" width={24} height={21} />
              </a>
            </Link>
          </li>
          <li className="ms-3">
            <Link href="/">
              <a className="text-muted">
                <Image src="/image/instagram.svg" alt="twitter" width={24} height={21} />
              </a>
            </Link>
          </li>
          <li className="ms-3">
            <Link href="/">
              <a className="text-muted">
                <Image src="/image/github.svg" alt="twitter" width={24} height={21} />
              </a>
            </Link>
          </li>
        </ul>
      </footer>
      <style jsx>
        {`
          img {
            fill: currentColor;
          }
        `}
      </style>
    </div>
  );
}

export default MyApp;
