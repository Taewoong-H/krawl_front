import type { NextPage } from 'next';
import Seo from '../components/seo';

const Home: NextPage = () => {
  return (
    <div>
      <Seo title="home"></Seo>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
      <style jsx>
        {`
          main {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
