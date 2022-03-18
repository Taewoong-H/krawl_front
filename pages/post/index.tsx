import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../../components/navbar';
import Seo from '../../components/seo';
import Competition from '../../components/home/competition';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Post: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  const [url, setUrl] = useState('');
  const [opinion, setOpinion] = useState('');
  const [isDiabled, setIsDiabled] = useState(false);

  const today = new Date();
  const year = today.getFullYear();

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

  // query를 넘김과 동시에 redirect하여 refresh 효과. SSR이지만 CSR과 같이
  const urlCheck = () => {
    router.push(
      {
        pathname: '/post',
        query: {
          url: url,
        },
      },
      '/post'
    );
  };

  const inputValue = (e: any) => {
    const { value } = e.target;
    setUrl(value);
  };

  const postContent = async () => {
    const body = {
      user_id: userInfo.userId,
      competition_id: 1,
      url: props.queryUrl,
      raw_date: props.validate ? props.published : '2999-01-01',
      date_check: props.validate,
      opinion: opinion,
      tag: '이거, 저거, 그거',
    };

    const userToken = getCookie('accessToken');
    if (userToken && typeof userToken === 'string') {
      setIsDiabled(true);
      const tokenSplit = userToken.split('"');
      const token = tokenSplit[3];
      const postRes = await (
        await fetch('/api/contents/post-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(body),
        })
      ).json();

      if (postRes.user_id) {
        router.push('/home');
      }
    } else {
      alert('로그인 하세요.');
      router.push('/login');
    }
  };

  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
      </header>
      <main className="main pt-4">
        <div className="container">
          <Competition isContent={false}></Competition>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="공유하고자 하는 url"
              onChange={inputValue}
              value={url}
              disabled={props.queryUrl !== ''}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={urlCheck}
              disabled={props.queryUrl !== ''}
            >
              추가
            </button>
          </div>
          <div className="row row-cols-auto">
            <span className="col">끌올 가능한 콘텐츠 : {year - 3}년 이전 발행 </span>
            {!props.queryUrl ? (
              <>
                <a
                  className="col"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image src="/image/question-circle.svg" alt="question" width={20} height={20} />
                </a>
                <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                  <p className="ml-1">
                    3년 이전 콘텐츠만 등록 가능합니다.<br></br> 자동으로 날짜 검증이 되지 않는 콘텐츠는 운영자가 직접
                    보고 판단해서 올라갈 예정입니다.<br></br> 글이 올라가는 시간이 걸릴 수 있습니다.
                  </p>
                </div>
              </>
            ) : (
              <>
                {props.validate ? (
                  <div className="col">
                    <a
                      className="icon"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* <Image src="/image/check-circle.svg" alt="question" width={24} height={21} /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="blue"
                        className="bi bi-check-circle"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                      </svg>
                    </a>
                    <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                      <p className="ml-1">검증된 출간 시간: {props.published}</p>
                    </div>
                  </div>
                ) : (
                  <div className="col">
                    <a
                      className="icon my-auto"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* <Image src="/image/x-circle.svg" alt="question" width={24} height={21} /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="red"
                        className="bi bi-x-circle"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </a>
                    <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                      <p className="ml-1">
                        검증되지 않음. 운영자가 직접 체크할 예정이므로 포스팅되는데 시간이 걸릴 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {props.queryUrl ? (
            <>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="img-fluid rounded-start" src={props.ogImage} alt="..." />
                  </div>
                  <div className="col-md-8 card-container">
                    <div className="card-body">
                      <h5 className="card-title">{props.ogTitle}</h5>
                      <p className="card-title">{props.ogDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  코멘트
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  onChange={(e: any) => setOpinion(e.target.value)}
                ></textarea>
              </div>
              {/* 
              <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
              <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary mt-3" type="button" onClick={postContent} disabled={isDiabled}>
                  저장하기
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const queryUrl = context.query.url ? context.query.url : '';
  const options = { url: queryUrl };

  const today = new Date();

  let ogImage = '';
  let ogTitle = '';
  let ogDescription = '';
  let published = '';
  let validate = false;

  if (queryUrl !== '') {
    await ogs(options, (error: boolean, results: any, response) => {
      if (!error) {
        ogImage = results.ogImage.url;
        ogTitle = results.ogTitle;
        ogDescription = results.ogDescription;

        let keyValue = '';
        const keyArray = Object.keys(results);
        keyArray.forEach((key) => {
          if (key.indexOf('ublish') > -1) {
            keyValue = key;
          }
        });
        if (keyValue !== '') {
          published = results[keyValue].slice(0, 10);
          const itemDate = new Date(published);
          const calcYear = today.getFullYear() - itemDate.getFullYear();
          if (calcYear >= 3) {
            validate = true;
          }
        }
      }
    });
  }

  return {
    props: { queryUrl, ogImage, ogTitle, ogDescription, published, validate }, // will be passed to the page component as props
  };
};

export default Post;
