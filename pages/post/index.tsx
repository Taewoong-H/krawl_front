import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../../components/navbar';
import Seo from '../../components/seo';
import Competition from '../../components/home/competition';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
// import WinnerContent from '../components/home/winnerContent';
// import UserRanking from '../components/home/ranking';

const Post: NextPage = (props: any) => {
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', point: 0 });
  useEffect(() => {
    // Perform localStorage action
    const userToken = localStorage.getItem('userToken');
    if (userToken && typeof userToken === 'string') {
      setUserInfo({ nickname: '이름', profileImage: userToken, point: 0 });
    } else {
      // const tokenString = getCookie('accessToken');
      // userInfo into localStorage
    }
  }, []);
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
            <input type="text" className="form-control" placeholder="공유하고자 하는 url" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
              추가
            </button>
          </div>
          <div className="mb-3">
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
          </div>
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
