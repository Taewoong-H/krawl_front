import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper'
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import Pagination from '../components/home/pagination';
// import WinnerContent from '../components/home/winnerContent';
// import UserRanking from '../components/home/ranking';

const Home: NextPage = (props: any) => {
  return (
    <div className='container-lg'>
      <Seo title="home"></Seo>
      <NavBar isCookie={props.isCookie}></NavBar>
      <main>
        <Competition></Competition>
        <div className="row">
          <div>
            {/* <WinnerContent winnerContent={winnerContentData}></WinnerContent> */}
            <ContentList content={props.contentResult}></ContentList>
          </div>
          {/* <div className="col-xs-6 col-md-4">
            <UserRanking users={props.rankRes}></UserRanking>
          </div> */}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isCookie = false;
  let userInfoRes = {};

  if (context.req.cookies.accessToken !== undefined) {
    isCookie = true;
    const tokenSplit = context.req.cookies.accessToken.split('"');
    const token = tokenSplit[3];
    userInfoRes = await (
      await fetch(`${process.env.API_URL}/accounts/navbar`, {
        headers: { Authorization: `Token ${token}`, Accept: 'application/json' },
      })
    ).json();
  }

  const contentRes = await (await fetch(`${process.env.API_URL}/contents`)).json();
  const contentResult = await Promise.all(contentRes.results.map(async (content: any) => {
    const options = { url: content.url }
    let ogImage = ''
    let ogTitle = ''
    await ogs(options, (error: boolean, results: any, response) => {
      if (!error) {
        ogImage = results.ogImage.url
        ogTitle = results.ogTitle
      }
    })
    return {...content, ogImage, ogTitle}
  }))
  const pages = contentRes.count % contentRes.results.length === 0 ? contentRes.count / contentRes.results.length : contentRes.count / contentRes.results.length + 1

  const rankRes = await (await fetch(`${process.env.API_URL}/accounts/rankings`)).json();

  return {
    props: {
      isCookie,
      contentResult,
      rankRes,
      userInfoRes,
      pages
    },
  };
};

export default Home;
