import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../../components/navbar';
import Seo from '../../components/seo';
import Competition from '../../components/home/competition';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { route } from 'next/dist/server/router';

const Post: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  const [url, setUrl] = useState('');
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

  const urlCheck = () => {
    router.push(
      {
        pathname: '/post/validate',
        query: {
          url: url,
        },
      },
      '/post/validate'
    );
  };

  const inputValue = (e: any) => {
    const { value } = e.target;
    setUrl(value);
  };

  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
        <Competition isContent={false}></Competition>
      </header>
      <main>
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="공유하고자 하는 url"
              onChange={inputValue}
              value={url}
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={urlCheck}>
              추가
            </button>
          </div>
          <div className="row row-cols-auto">
            <span className="col">끌올 가능한 콘텐츠 : YYYY년 MM월 DD일 이전 발행 </span>
            <a className="col" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <Image src="/image/question-circle.svg" alt="question" width={24} height={21} />
            </a>
            <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
              <p className="ml-1">
                3년 이전 컨텐츠만 등록 가능합니다.<br></br> 자동으로 날짜 검증이 되지 않는 컨텐츠는 운영자가 직접 보고
                판단해서 올라갈 예정입니다.<br></br> 글이 올라가는 시간이 걸릴 수 있습니다.
              </p>
            </div>
          </div>

          {/* <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
          </div>
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary mt-3" type="button">
              저장하기
            </button>
          </div> */}
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

export default Post;
