import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import WinnerContent from '../components/home/winnerContent';
import UserRanking from '../components/home/ranking';

const winnerContentData = {
  id: 1,
  url: 'www.krawl.xyz',
  raw_date: '2022-02-26',
};

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Seo title="home"></Seo>
      <NavBar isCookie={props.isCookie}></NavBar>
      <main>
        <Competition></Competition>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <WinnerContent winnerContent={winnerContentData}></WinnerContent>
            <ContentList content={props.contentRes}></ContentList>
          </div>
          <div className="col-xs-6 col-md-4">
            <UserRanking users={props.rankRes}></UserRanking>
          </div>
        </div>
      </main>
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
      await fetch(`https://krawl-backend.herokuapp.com/accounts/navbar`, {
        headers: { Authorization: `Token ${token}`, Accept: 'application/json' },
      })
    ).json();
  }

  console.log(userInfoRes);

  const contentRes = await (await fetch(`https://krawl-backend.herokuapp.com/contents`)).json();
  const rankRes = await (await fetch(`https://krawl-backend.herokuapp.com/accounts/rankings`)).json();

  return {
    props: {
      isCookie,
      contentRes,
      rankRes,
      userInfoRes,
    },
  };
};

export default Home;
