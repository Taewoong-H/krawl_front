import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import Pagination from '../components/home/pagination';
import AsideBar from '../components/home/aside';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const HomePage: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const profileImage = localStorage.getItem('profileImage');
    const userId = localStorage.getItem('userId');
    const userToken = getCookie('accessToken');
    if (userToken) {
      if (nickname && typeof nickname === 'string' && typeof profileImage === 'string' && typeof userId === 'string') {
        setUserInfo({ nickname: nickname, profileImage: profileImage, userId: userId });
      } else {
        alert('재로그인 하세요.');
        router.push('/login');
      }
    } else {
    }
  }, []);

  if (router.isFallback) {
    return (
      <>
        <Seo title="home"></Seo>
        <header>
          <NavBar userInfo={userInfo}></NavBar>
          <Competition isContent={true}></Competition>
        </header>
        <main>
          <div>Loading...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
      </header>
      <main className="main pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Competition isContent={true}></Competition>
              <div>
                <ContentList content={props.contentsResult}></ContentList>
              </div>
            </div>
            <div className="col-md-3 ms-auto">
              <AsideBar contents={props.popularContentsResult}></AsideBar>
            </div>
          </div>

          <Pagination pages={props.pages}></Pagination>
        </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }], // id 값 fetch해서 불러올수 있게끔
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const contentsRes = await (await fetch(`${process.env.API_URL}/contents?page=${params.id}`)).json();
  const contentsResult = await Promise.all(
    contentsRes.results.map(async (content: any) => {
      const options = { url: content.url };
      let ogImage = '';
      let ogTitle = '끌올 제목 미상';
      let ogDescription = '끌올 설명 미상';
      await ogs(options, (error: boolean, results: any, response) => {
        if (!error) {
          ogImage = results.ogImage.url ? results.ogImage.url : '';
          ogTitle = results.ogTitle ? results.ogTitle : '끌올 제목 미상';
          ogDescription = results.ogDescription ? results.ogDescription : '끌올 설명 미상';
        }
      });
      return { ...content, ogImage, ogTitle, ogDescription };
    })
  );

  let pages = 0;
  if (contentsRes.next === null) {
    pages = Number(params.id);
  } else {
    pages =
      contentsRes.count % contentsRes.results.length === 0
        ? contentsRes.count / contentsRes.results.length
        : contentsRes.count / contentsRes.results.length + 1;
  }

  const popularContentsRes = await (await fetch(`${process.env.API_URL}/contents/get-popular-posts`)).json();
  const popularContentsResult = await Promise.all(
    popularContentsRes.map(async (content: any) => {
      const options = { url: content.url };
      let ogImage = '';
      let ogTitle = '끌올 제목 미상';
      let ogDescription = '끌올 설명 미상';
      await ogs(options, (error: boolean, results: any, response) => {
        if (!error) {
          ogImage = results.ogImage.url ? results.ogImage.url : '';
          ogTitle = results.ogTitle ? results.ogTitle : '끌올 제목 미상';
          ogDescription = results.ogDescription ? results.ogDescription : '끌올 설명 미상';
        }
      });
      return { ...content, ogImage, ogTitle, ogDescription };
    })
  );

  return {
    props: {
      // isCookie,
      contentsResult,
      pages,
      popularContentsResult,
    },
    revalidate: 30,
  };
};

export default HomePage;
