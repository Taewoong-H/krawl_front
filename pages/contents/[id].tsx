import type { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Seo from '../../components/seo';
import NavBar from '../../components/navbar';
import ContentItem from '../../components/content/contentItem';
import Comments from '../../components/content/comments';
import Like from '../../components/content/like';
import ogs from 'open-graph-scraper';

const ContentsPage: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  const [comment, setComment] = useState('');
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

  const submitComment = async () => {
    console.log(props);
    const today = new Date().toLocaleDateString();
    const userToken = getCookie('accessToken');
    const body = {
      user_id: userInfo.userId,
      content_id: props.contentResult.id,
      body: comment,
      del_yn: false,
      created_at: '2022-03-14',
    };

    if (userToken && typeof userToken === 'string') {
      const tokenSplit = userToken.split('"');
      const token = tokenSplit[3];
      const postRes = await (
        await fetch('/api/contents/post-comment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(body),
        })
      ).json();

      if (postRes.user_id) {
        router.reload();
      }
    } else {
      alert('로그인 하세요.');
      router.push('/login');
    }
  };

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
            <span className="col-auto me-auto my-auto profile-nickname">{props.contentResult.nickname}</span>
          </div>
          <br />
          <ContentItem item={props.contentResult}></ContentItem>
          <br />
          {props.contentResult.opinion.split('\n').map((line: any, index: number) => {
            return <p key={index}>{line}</p>;
          })}
          <ul className="nav col-md-4 list-unstyled d-flex align-items-center">
            <li>
              <Like></Like>
            </li>
            <li className="me-3 my-auto">
              <Image src="/image/share.svg" width={29.25} height={28.33}></Image>
            </li>
          </ul>

          <hr />
          <h3>댓글</h3>
          <div className="mb-3 row justify-content-center">
            <div className="col-10 col-md-11 center">
              <textarea
                className="form-control"
                id="commentTextarea"
                rows={2}
                onChange={(e: any) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="col-2  col-md-1 left my-auto">
              <button className="btn btn-primary" type="button" onClick={submitComment}>
                submit{' '}
              </button>
            </div>
          </div>
          <Comments comments={props.contentResult.comments}></Comments>
        </div>
      </main>
      <style jsx>{``}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const contentRes = await (await fetch(`${process.env.API_URL}/contents/get-post/${context.params.id}`)).json();

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

  return {
    props: { contentResult },
  };
};

export default ContentsPage;
