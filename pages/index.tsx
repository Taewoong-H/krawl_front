import type { NextPage } from 'next';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import WinnerContent from '../components/home/winnerContent';
import UserRanking from '../components/home/ranking';

const contentData = {
  list: [
    {
      id: 1,
      url: 'www.krawl.xyz',
      raw_date: '2022-02-26'
    },
    {
      id: 2,
      url: 'www.naver.com',
      raw_date: '2022-02-27'
    }
  ]
}

const winnerContentData = {
  id: 1,
  url: 'www.krawl.xyz',
  raw_date: '2022-02-26'
}

const userRankingData = {
  list: [
    {
      id: 1,
      profile_image: '/image/1',
      name: '유저이름'
    },
    {
      id: 2,
      profile_image: '/image/1',
      name: '유저이름'
    },
    {
      id: 3,
      profile_image: '/image/1',
      name: '유저이름'
    },
    {
      id: 4,
      profile_image: '/image/1',
      name: '유저이름'
    },
    {
      id: 5,
      profile_image: '/image/1',
      name: '유저이름'
    }
  ]
}

const Home: NextPage = () => {
  return (
    <div>
      <Seo title="home"></Seo>
      <main>
        <Competition></Competition>
        <div>
          <WinnerContent winnerContent={winnerContentData}></WinnerContent>
          <ContentList content={contentData}></ContentList>
        </div>
        <UserRanking users={userRankingData}></UserRanking>
      </main>
      <style jsx>
        {`
          main {
          }
        `}
      </style>
    </div>
  );
};

export default Home;
