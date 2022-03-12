import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Seo from '../../components/seo';
import NavBar from '../../components/navbar';
import ContentItem from '../../components/content/contentItem';
import Comments from '../../components/content/comments';
import ogs from 'open-graph-scraper';

const ContentsPage: NextPage = (props: any) => {
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
        </header>
        <main>
          <div>Loading...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo title="contents"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
      </header>
      <main>
        <div className="">
          <div className="card-user row ms-1">
            <Image
              src={props.contentResult.profile_img}
              alt="profile-image"
              className="profile-image col"
              width={30}
              height={30}
            ></Image>
            <span className="col-auto me-auto profile-nickname">{props.contentResult.nickname}</span>
          </div>
          <br />
          <ContentItem item={props.contentResult}></ContentItem>
          <br />
          <p>{props.contentResult.opinion}</p>
          <br />
          <ul className="nav col-md-4 list-unstyled d-flex">
            <li className="me-3">
              <Image src="/image/heart.svg" width={20} height={20}></Image>
            </li>
            <li className="me-3">
              <Image src="/image/share.svg" width={20} height={20}></Image>
            </li>
          </ul>

          <hr />
          <h3>댓글</h3>
          <Comments comments={props.contentResult.comments}></Comments>
          {/* <p>{props.contentResult.comments}</p> */}
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const popularContents = await (await fetch(`${process.env.API_URL}/contents/get-popular-posts`)).json();

  const paths = popularContents.map((content: any) => ({
    params: { id: content.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const contentRes = await (await fetch(`${process.env.API_URL}/contents/get-post/${params.id}`)).json();

  const options = { url: contentRes.url };
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
  const contentResult = { ...contentRes, ogImage, ogTitle, ogDescription };

  // let pages = 0;
  // if (contentRes.next === null) {
  //   pages = Number(context.params.id);
  // } else {
  //   pages =
  //     contentRes.count % contentRes.results.length === 0
  //       ? contentRes.count / contentRes.results.length
  //       : contentRes.count / contentRes.results.length + 1;
  // }

  return {
    props: { contentResult },
    revalidate: 60,
  };
};

export default ContentsPage;
