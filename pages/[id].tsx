import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../components/navbar';
import Seo from '../components/seo';
import Competition from '../components/home/competition';
import ContentList from '../components/home/contentList';
import Pagination from '../components/home/pagination';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

const HomePage: NextPage = (props: any) => {
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', point: 0 });
  useEffect(() => {
    // Perform localStorage action
    const userToken = localStorage.getItem('userToken');
    if (userToken && typeof userToken === 'string') {
      setUserInfo({ nickname: '', profileImage: userToken, point: 0 });
    } else {
      // const tokenString = getCookie('accessToken');
      // userInfo into localStorage
    }
  }, []);
  return (
    <div className="container-lg">
      <Seo title="home"></Seo>
      <NavBar isCookie={userInfo}></NavBar>
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

  let pages = 0;
  if (contentRes.next === null) {
    pages = Number(context.params.id);
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
      pages,
    },
  };
};

export default HomePage;
