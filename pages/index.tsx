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
        <div className='home-list'>
          <div className='content-list'>
            <WinnerContent winnerContent={winnerContentData}></WinnerContent>
            <ContentList content={contentData}></ContentList>
          </div>
          <UserRanking users={userRankingData}></UserRanking>
        </div>
      </main>
      <style jsx>
        {`
          main {
            display: flex;
            min-width: 960px;  
            justify-content: center;
            flex-direction: column;
            margin: 10px;
          }
          .home-list {
            display: flex;
            width: 100%;
          }
          .content-list {
            padding: 1.25rem;
            width: 80%;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
