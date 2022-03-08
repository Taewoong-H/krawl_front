import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import Seo from '../components/seo';

const Home: NextPage = (props: any) => {
  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <h1>끌올</h1>
      </header>
      <main>
        <div>끌올 페이지에 오신 것을 환영합니다.</div>
      </main>
      <style jsx>
        {`
          @media (min-width: 768px) {
            .layout {
              max-width: 960px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
