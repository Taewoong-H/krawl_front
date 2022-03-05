import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import ogs from 'open-graph-scraper';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import Pagination from '../components/home/pagination';

const HomePage: NextPage = (props: any) => {
  return (
    <div className="container-lg">
      <Seo title="home"></Seo>
      <main>
        <Competition></Competition>
        <div className="row">
          <div>
            <ContentList content={props.contentResult}></ContentList>
          </div>
        </div>
      </main>
      <Pagination pages={props.pages}></Pagination>
      <style jsx>
        {`
          @media (min-width: 768px) {
            .layout {
              max-width: 960px;
            }
          }
        `}
      </style>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: false, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const contentRes = await (await fetch(`${process.env.API_URL}/contents?page=${context.params.id}`)).json();
  const contentResult = await Promise.all(
    contentRes.results.map(async (content: any) => {
      const options = { url: content.url };
      let ogImage = '';
      let ogTitle = '';
      await ogs(options, (error: boolean, results: any, response) => {
        if (!error) {
          ogImage = results.ogImage.url;
          ogTitle = results.ogTitle;
        }
      });
      return { ...content, ogImage, ogTitle };
    })
  );
  const pages =
    contentRes.count % contentRes.results.length === 0
      ? contentRes.count / contentRes.results.length
      : contentRes.count / contentRes.results.length + 1;

  return {
    props: {
      // isCookie,
      contentResult,
      // userInfoRes,
      pages,
    },
  };
};

export default HomePage;
