import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import WinnerContent from '../components/home/winnerContent';
import UserRanking from '../components/home/ranking';
import axios from 'axios';
import { useEffect } from 'react';

const contentData = {
  list: [
    {
      id: 1,
      url: 'www.krawl.xyz',
      raw_date: '2022-02-26',
    },
    {
      id: 2,
      url: 'www.naver.com',
      raw_date: '2022-02-27',
    },
  ],
};

const winnerContentData = {
  id: 1,
  url: 'www.krawl.xyz',
  raw_date: '2022-02-26',
};

const userRankingData = {
  list: [
    {
      id: 1,
      profile_image: '/image/1',
      name: '유저이름',
    },
    {
      id: 2,
      profile_image: '/image/1',
      name: '유저이름',
    },
    {
      id: 3,
      profile_image: '/image/1',
      name: '유저이름',
    },
    {
      id: 4,
      profile_image: '/image/1',
      name: '유저이름',
    },
    {
      id: 5,
      profile_image: '/image/1',
      name: '유저이름',
    },
  ],
};

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Seo title="home"></Seo>
      <NavBar isCookie={props.isCookie}></NavBar>
      <main>
        <Competition></Competition>
        <div className="home-list">
          <div className="content-list">
            <WinnerContent winnerContent={winnerContentData}></WinnerContent>
            <ContentList content={props.contentRes}></ContentList>
          </div>
          <UserRanking users={props.rankRes}></UserRanking>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isCookie = false;
  console.log(context.req);
  if (context.req.cookies.accessToken !== undefined) {
    isCookie = true;
  }
  const tokenSplit = context.req.cookies.accessToken.split('"');
  const token = tokenSplit[3];
  const userInfoRes = await (
    await fetch(`https://krawl-backend.herokuapp.com/accounts/navbar`, {
      headers: { Authorization: `Token ${token}` },
    })
  ).text();
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
