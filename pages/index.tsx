import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import Pagination from '../components/home/pagination';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const profileImage = localStorage.getItem('profileImage');
    const userId = localStorage.getItem('userId');
    if (nickname && typeof nickname === 'string' && typeof profileImage === 'string' && typeof userId === 'string') {
      setUserInfo({ nickname: nickname, profileImage: profileImage, userId: userId });
    } else {
      const userToken = getCookie('accessToken');
      if (userToken) {
        alert('재로그인 하세요.');
        router.push('/login');
      }
    }
  }, []);

  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
        <Competition isContent={true}></Competition>
      </header>
      <main>
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // let isCookie = false;
  // let userInfoRes = {};

  // if (context.req.cookies.accessToken !== undefined) {
  //   isCookie = true;
  //   const tokenSplit = context.req.cookies.accessToken.split('"');
  //   const token = tokenSplit[3];
  //   userInfoRes = await (
  //     await fetch(`${process.env.API_URL}/accounts/navbar`, {
  //       headers: { Authorization: `Token ${token}`, Accept: 'application/json' },
  //     })
  //   ).json();
  // }

  const contentRes = await (await fetch(`${process.env.API_URL}/contents`)).json();
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
  let pages = 0;
  if (contentRes.next === null) {
    pages = 1;
  } else {
    pages =
      contentRes.count % contentRes.results.length === 0
        ? contentRes.count / contentRes.results.length
        : contentRes.count / contentRes.results.length + 1;
  }

  return {
    props: {
      // isCookie,
      contentRes,
      contentResult,
      // userInfoRes,
      pages,
    },
  };
};

export default Home;
